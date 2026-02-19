import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { z } from "https://esm.sh/zod@3.23.8";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.84.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 5;

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function cleanupExpiredEntries() {
  const now = Date.now();
  for (const [ip, data] of rateLimitStore.entries()) {
    if (now > data.resetTime) {
      rateLimitStore.delete(ip);
    }
  }
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  if (Math.random() < 0.01) cleanupExpiredEntries();
  
  const existing = rateLimitStore.get(ip);
  
  if (!existing || now > existing.resetTime) {
    const resetTime = now + RATE_LIMIT_WINDOW_MS;
    rateLimitStore.set(ip, { count: 1, resetTime });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1, resetTime };
  }
  
  if (existing.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, remaining: 0, resetTime: existing.resetTime };
  }
  
  existing.count++;
  rateLimitStore.set(ip, existing);
  return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - existing.count, resetTime: existing.resetTime };
}

function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  message: z.string().trim().min(1, "Message is required").max(5000),
  website: z.string().optional(),
  source: z.string().optional(),
  service_interest: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
});

function sanitizeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const clientIp = getClientIp(req);
    const rateLimit = checkRateLimit(clientIp);
    
    if (!rateLimit.allowed) {
      const retryAfterSeconds = Math.ceil((rateLimit.resetTime - Date.now()) / 1000);
      console.log(`Rate limit exceeded for IP: ${clientIp.substring(0, 8)}...`);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later.", retryAfter: retryAfterSeconds }),
        { status: 429, headers: { "Content-Type": "application/json", "Retry-After": String(retryAfterSeconds), ...corsHeaders } }
      );
    }

    const body = await req.json();
    
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      console.log("Validation failed:", validationResult.error.flatten());
      return new Response(
        JSON.stringify({ error: "Invalid input", details: validationResult.error.flatten() }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { name, email, message, website, source, service_interest, budget, timeline } = validationResult.data;

    // Honeypot check
    if (website && website.trim() !== "") {
      console.log("Honeypot triggered - bot detected");
      return new Response(JSON.stringify({ success: true }), {
        status: 200, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    console.log("Processing contact form submission");

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing Supabase configuration");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert contact submission with new tracking fields
    const { error: dbError } = await supabase
      .from("contact_submissions")
      .insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim(),
        source: source || "quick",
        service_interest: service_interest || null,
        budget: budget || null,
        timeline: timeline || null,
        email_sent: false, // Will be updated after email send
      });

    if (dbError) {
      console.error("Database error:", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to save submission" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Submission saved to database");

    const safeName = sanitizeHtml(name);
    const safeEmail = sanitizeHtml(email);
    const safeMessage = sanitizeHtml(message).replace(/\n/g, '<br>');

    // Try to send emails, but don't fail the submission if they fail
    let emailSent = false;

    try {
      const teamEmailResponse = await resend.emails.send({
        from: "ProjGrowth <onboarding@resend.dev>",
        to: ["info@projgrowth.com"],
        replyTo: email,
        subject: `New Contact Form Submission from ${safeName}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Source:</strong> ${source || "quick"}</p>
          ${service_interest ? `<p><strong>Service Interest:</strong> ${sanitizeHtml(service_interest)}</p>` : ""}
          ${budget ? `<p><strong>Budget:</strong> ${sanitizeHtml(budget)}</p>` : ""}
          ${timeline ? `<p><strong>Timeline:</strong> ${sanitizeHtml(timeline)}</p>` : ""}
          <p><strong>Message:</strong></p>
          <p>${safeMessage}</p>
        `,
      });
      console.log("Team notification sent:", teamEmailResponse);

      const userEmailResponse = await resend.emails.send({
        from: "ProjGrowth <onboarding@resend.dev>",
        to: [email],
        subject: "We received your message - ProjGrowth",
        html: `
          <!DOCTYPE html>
          <html>
          <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0f0f10; color: #f0ede6;">
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <div style="text-align: center; margin-bottom: 40px;">
                <h1 style="font-size: 32px; font-weight: 500; margin: 0; color: #82b3c9;">PG</h1>
              </div>
              <h2 style="font-size: 24px; font-weight: 500; margin-bottom: 20px; color: #f0ede6;">
                Thank you for reaching out, ${safeName}!
              </h2>
              <p style="font-size: 16px; line-height: 1.6; color: #888888; margin-bottom: 20px;">
                We've received your message and are excited to connect with you. Our team typically responds within 24-48 hours.
              </p>
              <div style="background-color: #18181b; border: 1px solid #27272a; border-radius: 12px; padding: 24px; margin: 30px 0;">
                <p style="font-size: 14px; color: #888888; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 1px;">Your message:</p>
                <p style="font-size: 16px; line-height: 1.6; color: #f0ede6; margin: 0;">${safeMessage}</p>
              </div>
              <p style="font-size: 16px; line-height: 1.6; color: #888888; margin-bottom: 30px;">
                In the meantime, feel free to explore our recent work at <a href="https://projgrowth.com/work" style="color: #82b3c9; text-decoration: none;">projgrowth.com/work</a>.
              </p>
              <p style="font-size: 16px; line-height: 1.6; color: #f0ede6;">Best regards,<br><strong>The ProjGrowth Team</strong></p>
              <hr style="border: none; border-top: 1px solid #27272a; margin: 40px 0;">
              <p style="font-size: 12px; color: #666666; text-align: center;">ProjGrowth • Digital Design Studio<br><a href="https://projgrowth.com" style="color: #82b3c9; text-decoration: none;">projgrowth.com</a></p>
            </div>
          </body>
          </html>
        `,
      });
      console.log("User confirmation sent:", userEmailResponse);

      emailSent = true;
    } catch (emailError) {
      console.error("EMAIL SEND FAILED:", emailError);
      // Don't fail the submission — the lead is saved, email just didn't send
    }

    // Update the email_sent status
    if (emailSent) {
      const { error: updateError } = await supabase
        .from("contact_submissions")
        .update({ email_sent: true })
        .eq("email", email.trim().toLowerCase())
        .order("created_at", { ascending: false })
        .limit(1);

      if (updateError) {
        console.error("Failed to update email_sent status:", updateError);
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", "X-RateLimit-Remaining": String(rateLimit.remaining), ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred. Please try again." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);

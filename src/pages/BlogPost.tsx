import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Clock, ArrowLeft, ArrowRight, User, Calendar, Share2, Twitter, Linkedin, Facebook, Link as LinkIcon } from "lucide-react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import DOMPurify from "dompurify";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
  author: string;
  category: string;
  read_time: number;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  published_at: string;
}

const parseInlineMarkdown = (text: string): string => {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-text font-medium">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-accent hover:underline">$1</a>');
};

const renderContent = (content: string) => {
  const lines = content.split('\n');
  const elements: JSX.Element[] = [];
  let currentList: string[] = [];
  let listType: 'ul' | 'ol' | null = null;

  const flushList = () => {
    if (currentList.length > 0 && listType) {
      const ListComponent = listType === 'ul' ? 'ul' : 'ol';
      elements.push(
        <ListComponent 
          key={`list-${elements.length}`} 
          className={`mb-6 space-y-2 ${listType === 'ul' ? 'list-disc' : 'list-decimal'} list-inside text-mute`}
        >
          {currentList.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(parseInlineMarkdown(item)) }} />
          ))}
        </ListComponent>
      );
      currentList = [];
      listType = null;
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (trimmed.startsWith('# ')) {
      flushList();
      elements.push(
        <h1 key={index} className="text-3xl md:text-4xl font-medium text-text mb-6 mt-8">
          {trimmed.slice(2)}
        </h1>
      );
    } else if (trimmed.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={index} className="text-2xl md:text-3xl font-medium text-text mb-4 mt-10">
          {trimmed.slice(3)}
        </h2>
      );
    } else if (trimmed.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={index} className="text-xl md:text-2xl font-medium text-text mb-3 mt-8">
          {trimmed.slice(4)}
        </h3>
      );
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (listType !== 'ul') {
        flushList();
        listType = 'ul';
      }
      currentList.push(trimmed.slice(2));
    } else if (/^\d+\.\s/.test(trimmed)) {
      if (listType !== 'ol') {
        flushList();
        listType = 'ol';
      }
      currentList.push(trimmed.replace(/^\d+\.\s/, ''));
    } else if (trimmed === '') {
      flushList();
    } else {
      flushList();
      elements.push(
        <p 
          key={index} 
          className="text-mute mb-6"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(parseInlineMarkdown(trimmed)) }}
        />
      );
    }
  });

  flushList();
  return elements;
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();

      if (error) throw error;
      if (!data) throw new Error("Post not found");
      return data as BlogPost;
    },
    enabled: !!slug,
  });

  const { data: relatedPosts } = useQuery({
    queryKey: ["related-posts", post?.category, post?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, slug, title, excerpt, category, read_time, published_at")
        .eq("published", true)
        .eq("category", post!.category)
        .neq("id", post!.id)
        .order("published_at", { ascending: false })
        .limit(3);

      if (error) throw error;
      return data;
    },
    enabled: !!post,
  });

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = post?.title || "";

  const handleShare = (platform: string) => {
    let url = "";
    switch (platform) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case "copy":
        navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied to clipboard!");
        return;
    }
    window.open(url, "_blank", "width=600,height=400");
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="section">
          <div className="container-site max-w-4xl">
            <Skeleton className="h-8 w-48 mb-8" />
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-6 w-64 mb-8" />
            <Skeleton className="aspect-video w-full mb-8" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout>
        <div className="section">
          <div className="container-site max-w-4xl text-center">
            <h1 className="text-3xl font-medium text-text mb-4">Post Not Found</h1>
            <p className="text-mute mb-8">The blog post you're looking for doesn't exist.</p>
            <Link to="/blog" className="text-accent hover:underline">
              ← Back to Blog
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const contentWithoutTitle = post.content.replace(/^#\s.+\n\n?/, '');

  return (
    <Layout>
      <Helmet>
        <title>{post.meta_title || post.title}</title>
        <meta name="description" content={post.meta_description || post.excerpt} />
        {post.meta_keywords && <meta name="keywords" content={post.meta_keywords} />}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.meta_title || post.title} />
        <meta property="og:description" content={post.meta_description || post.excerpt} />
        {post.featured_image && <meta property="og:image" content={post.featured_image} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.meta_title || post.title} />
        <meta name="twitter:description" content={post.meta_description || post.excerpt} />
        <link rel="canonical" href={`https://projgrowth.com/blog/${post.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            author: { "@type": "Person", name: post.author },
            publisher: {
              "@type": "Organization",
              name: "ProjGrowth",
              logo: { "@type": "ImageObject", url: "https://projgrowth.com/favicon.png" },
            },
            datePublished: post.published_at,
            dateModified: post.published_at,
            mainEntityOfPage: { "@type": "WebPage", "@id": `https://projgrowth.com/blog/${post.slug}` },
          })}
        </script>
      </Helmet>

      <article className="section">
        <div className="container-site max-w-4xl">
          <Breadcrumbs />

          <ScrollReveal>
            <header className="mb-10">
              <span className="pill-accent mb-4">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-text mb-6 leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-mute">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(post.published_at), "MMMM d, yyyy")}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.read_time} min read
                </span>
              </div>
            </header>
          </ScrollReveal>

          {post.featured_image && (
            <ScrollReveal delay={0.1}>
              <div className="aspect-video mb-10 rounded-lg overflow-hidden">
                <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
              </div>
            </ScrollReveal>
          )}

          <div className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 flex-col gap-3 z-40">
            <button onClick={() => handleShare("twitter")} className="p-3 bg-surface border border-line rounded-full hover:border-accent hover:text-accent transition-colors" aria-label="Share on Twitter">
              <Twitter className="w-4 h-4" />
            </button>
            <button onClick={() => handleShare("linkedin")} className="p-3 bg-surface border border-line rounded-full hover:border-accent hover:text-accent transition-colors" aria-label="Share on LinkedIn">
              <Linkedin className="w-4 h-4" />
            </button>
            <button onClick={() => handleShare("facebook")} className="p-3 bg-surface border border-line rounded-full hover:border-accent hover:text-accent transition-colors" aria-label="Share on Facebook">
              <Facebook className="w-4 h-4" />
            </button>
            <button onClick={() => handleShare("copy")} className="p-3 bg-surface border border-line rounded-full hover:border-accent hover:text-accent transition-colors" aria-label="Copy link">
              <LinkIcon className="w-4 h-4" />
            </button>
          </div>

          <ScrollReveal delay={0.2}>
            <div className="prose prose-invert max-w-none">
              {renderContent(contentWithoutTitle)}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="lg:hidden mt-10 pt-6 border-t border-line">
              <p className="text-sm text-mute mb-4 flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Share this article
              </p>
              <div className="flex gap-3">
                <button onClick={() => handleShare("twitter")} className="p-3 bg-surface border border-line rounded-full hover:border-accent hover:text-accent transition-colors" aria-label="Share on Twitter">
                  <Twitter className="w-4 h-4" />
                </button>
                <button onClick={() => handleShare("linkedin")} className="p-3 bg-surface border border-line rounded-full hover:border-accent hover:text-accent transition-colors" aria-label="Share on LinkedIn">
                  <Linkedin className="w-4 h-4" />
                </button>
                <button onClick={() => handleShare("facebook")} className="p-3 bg-surface border border-line rounded-full hover:border-accent hover:text-accent transition-colors" aria-label="Share on Facebook">
                  <Facebook className="w-4 h-4" />
                </button>
                <button onClick={() => handleShare("copy")} className="p-3 bg-surface border border-line rounded-full hover:border-accent hover:text-accent transition-colors" aria-label="Copy link">
                  <LinkIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="mt-12 surface-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-medium text-text mb-1">{post.author}</h3>
                  <p className="text-sm text-mute">
                    The ProjGrowth team helps Orlando businesses grow through strategic web design, branding, and digital marketing.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {relatedPosts && relatedPosts.length > 0 && (
            <ScrollReveal delay={0.4}>
              <div className="mt-16">
                <h2 className="text-2xl font-medium text-text mb-8">Related Articles</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((related) => (
                    <Link key={related.id} to={`/blog/${related.slug}`} className="group surface-card p-6">
                      <span className="text-xs text-accent mb-2 block">{related.category}</span>
                      <h3 className="font-medium text-text group-hover:text-accent transition-colors mb-2 line-clamp-2">{related.title}</h3>
                      <span className="text-xs text-mute flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {related.read_time} min read
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}

          <div className="mt-12 pt-8 border-t border-line">
            <Link to="/blog" className="inline-flex items-center gap-2 text-mute hover:text-accent transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost;

import assert from "node:assert/strict";
import test from "node:test";
import {
  contactFlowTransition,
  initialContactFlow,
  type ContactFlowState,
} from "./contactFlow.ts";
import { nextNavChrome } from "./navChrome.ts";
import { initialMobileMenu, mobileMenuTransition } from "./mobileMenu.ts";
import { initialReviewGateway, reviewGatewayTransition } from "./reviewGateway.ts";
import {
  annotationTransition,
  initialAnnotation,
  notesLoadTransition,
} from "./reviewRoom.ts";
import { composerTransition } from "./noteComposer.ts";
import { ADMIN_GATE_ERRORS, adminGateTransition, initialAdminGate } from "./adminGate.ts";
import { initialMutation, mutationTransition, signInTransition } from "./signIn.ts";
import { initialJob, jobTransition } from "./job.ts";
import { discoveryTransition, intakeTransition, restoreDiscoveryPhase } from "./discoveryFlow.ts";
import { initialUpload, uploadTransition } from "./referenceUpload.ts";
import { activeCategory, readWorkFilters, writeWorkFilters } from "./workFilters.ts";
import { POST_NOT_FOUND, articleView, listView, recordView } from "./remoteView.ts";

const contactAt = (step: "service" | "details" | "timeline" | "budget" | "contact"): ContactFlowState => ({
  status: "editing",
  step,
  errors: { name: "", email: "" },
});

test("contact flow walks named steps and ignores continue when blocked", () => {
  let state = initialContactFlow;
  state = contactFlowTransition(state, { type: "continue", allowed: false });
  assert.deepEqual(state, contactAt("service"));
  state = contactFlowTransition(state, { type: "continue", allowed: true });
  assert.deepEqual(state, contactAt("details"));
  state = contactFlowTransition(state, { type: "back" });
  assert.deepEqual(state, contactAt("service"));
  state = contactFlowTransition(state, { type: "back" });
  assert.deepEqual(state, contactAt("service"));
});

test("contact submit is only legal on the contact step and locks navigation", () => {
  const early = contactFlowTransition(contactAt("budget"), { type: "submit" });
  assert.equal(early.status, "editing");

  const submitting = contactFlowTransition(contactAt("contact"), { type: "submit" });
  assert.deepEqual(submitting, { status: "submitting" });
  assert.deepEqual(contactFlowTransition(submitting, { type: "back" }), submitting);
  assert.deepEqual(contactFlowTransition(submitting, { type: "continue", allowed: true }), submitting);

  const invalid = contactFlowTransition(submitting, {
    type: "invalid",
    errors: { name: "Name is required", email: "" },
  });
  assert.deepEqual(invalid, {
    status: "editing",
    step: "contact",
    errors: { name: "Name is required", email: "" },
  });

  const again = contactFlowTransition(contactAt("contact"), { type: "submit" });
  const done = contactFlowTransition(again, { type: "succeeded" });
  assert.deepEqual(done, { status: "succeeded", confetti: true });
  assert.deepEqual(contactFlowTransition(done, { type: "submit" }), done);
  assert.deepEqual(contactFlowTransition(done, { type: "confettiFinished" }), {
    status: "succeeded",
    confetti: false,
  });
});

test("nav chrome matches the scroll thresholds", () => {
  assert.equal(nextNavChrome(0, 0), "top");
  assert.equal(nextNavChrome(0, 20), "top");
  assert.equal(nextNavChrome(0, 21), "docked");
  assert.equal(nextNavChrome(50, 80), "docked");
  assert.equal(nextNavChrome(90, 100), "docked");
  assert.equal(nextNavChrome(100, 101), "hidden");
  assert.equal(nextNavChrome(180, 140), "docked");
  assert.equal(nextNavChrome(40, 10), "top");
});

test("mobile services toggle is ignored while the sheet is closed", () => {
  const closed = mobileMenuTransition(initialMobileMenu, { type: "toggleServices" });
  assert.deepEqual(closed, initialMobileMenu);
  const open = mobileMenuTransition(initialMobileMenu, { type: "sheet", open: true });
  const expanded = mobileMenuTransition(open, { type: "toggleServices" });
  assert.equal(expanded.services, "expanded");
  const navigated = mobileMenuTransition(expanded, { type: "navigate" });
  assert.deepEqual(navigated, { sheet: "closed", services: "expanded" });
});

test("review gateway cannot be granted without a session", () => {
  const restored = initialReviewGateway({ url: "https://example.com", token: "t" });
  assert.equal(restored.status, "granted");
  const prompt = initialReviewGateway(null);
  assert.deepEqual(prompt, { status: "prompt", notice: null });

  const checking = reviewGatewayTransition(prompt, { type: "submit" });
  assert.deepEqual(checking, { status: "checking" });
  assert.deepEqual(reviewGatewayTransition(checking, { type: "submit" }), checking);

  const granted = reviewGatewayTransition(checking, {
    type: "ready",
    review: { url: "https://example.com", token: "abc" },
  });
  assert.deepEqual(granted, { status: "granted", review: { url: "https://example.com", token: "abc" } });

  const expired = reviewGatewayTransition(granted, { type: "expired" });
  assert.deepEqual(expired, { status: "prompt", notice: "expired" });

  const rejected = reviewGatewayTransition(
    reviewGatewayTransition(expired, { type: "submit" }),
    { type: "rejected", notice: "invalid" },
  );
  assert.deepEqual(rejected, { status: "prompt", notice: "invalid" });
});

test("review notes and annotation cannot combine impossible modes", () => {
  assert.deepEqual(notesLoadTransition({ status: "loading" }, { type: "failed" }), { status: "failed" });
  assert.deepEqual(notesLoadTransition({ status: "failed" }, { type: "retry" }), { status: "loading" });
  assert.deepEqual(notesLoadTransition({ status: "loading" }, { type: "loaded" }), { status: "ready" });

  const armed = annotationTransition(initialAnnotation, { type: "toggleCommentMode" });
  assert.deepEqual(armed, { mode: "armed" });
  assert.deepEqual(annotationTransition(initialAnnotation, { type: "place", pin: { x: 1, y: 2 } }), initialAnnotation);

  const composing = annotationTransition(armed, { type: "place", pin: { x: 10, y: 20 } });
  assert.deepEqual(composing, { mode: "composing", pin: { x: 10, y: 20 } });
  assert.deepEqual(annotationTransition(composing, { type: "contextChanged" }), { mode: "armed" });
  assert.deepEqual(annotationTransition(composing, { type: "noteSent" }), { mode: "browse" });
  assert.deepEqual(annotationTransition(composing, { type: "cancelDraft" }), { mode: "armed" });
});

test("note composer rejects a second submit while sending", () => {
  const sending = composerTransition("editing", { type: "submit" });
  assert.equal(sending, "sending");
  assert.equal(composerTransition(sending, { type: "submit" }), "sending");
  assert.equal(composerTransition(sending, { type: "failed" }), "failed");
  assert.equal(composerTransition("failed", { type: "submit" }), "sending");
});

test("admin gate moves verify then leads, and a rejection cannot stay busy", () => {
  const verifying = adminGateTransition(initialAdminGate, { type: "submit" });
  assert.deepEqual(verifying, { status: "verifying" });
  assert.deepEqual(adminGateTransition(verifying, { type: "submit" }), verifying);
  const loading = adminGateTransition(verifying, { type: "verified" });
  assert.deepEqual(loading, { status: "loadingLeads" });
  assert.deepEqual(adminGateTransition(loading, { type: "rejected", message: ADMIN_GATE_ERRORS.leads }), {
    status: "rejected",
    message: ADMIN_GATE_ERRORS.leads,
  });
});

test("sign-in and mutations ignore overlapping starts", () => {
  const submitting = signInTransition({ status: "idle" }, { type: "submit" });
  assert.equal(submitting.status, "submitting");
  assert.deepEqual(signInTransition(submitting, { type: "submit" }), submitting);
  assert.equal(signInTransition(submitting, { type: "rejected", message: "Invalid email or password" }).status, "rejected");

  const saving = mutationTransition(initialMutation, { type: "start" });
  assert.deepEqual(saving, { status: "saving" });
  assert.deepEqual(mutationTransition(saving, { type: "start" }), saving);
  assert.deepEqual(mutationTransition(saving, { type: "failed", message: "nope" }), {
    status: "failed",
    message: "nope",
  });
});

test("jobs cannot finish before they start or dismiss while running", () => {
  const idle = initialJob<string>();
  assert.deepEqual(jobTransition(idle, { type: "finish", result: "x" }), idle);
  const running = jobTransition(idle, { type: "start" });
  assert.deepEqual(jobTransition(running, { type: "dismiss" }), running);
  const settled = jobTransition(running, { type: "finish", result: "ok" });
  assert.deepEqual(settled, { status: "settled", result: "ok" });
  assert.deepEqual(jobTransition(settled, { type: "dismiss" }), { status: "idle" });
});

test("discovery intake skips vision unless a logo is in play, and submit failure stays on the reveal", () => {
  assert.deepEqual(
    intakeTransition("identity", {
      type: "continue",
      identityReady: false,
      helpReady: false,
      wantsLogo: false,
      visionReady: false,
    }),
    { type: "stay", step: "identity" },
  );
  assert.deepEqual(
    intakeTransition("help", {
      type: "continue",
      identityReady: true,
      helpReady: true,
      wantsLogo: false,
      visionReady: false,
    }),
    { type: "begin" },
  );
  assert.deepEqual(
    intakeTransition("help", {
      type: "continue",
      identityReady: true,
      helpReady: true,
      wantsLogo: true,
      visionReady: false,
    }),
    { type: "stay", step: "vision" },
  );

  assert.deepEqual(restoreDiscoveryPhase("form"), { status: "form" });
  assert.deepEqual(restoreDiscoveryPhase("submitting"), { status: "landing" });

  const reveal = discoveryTransition({ status: "form" }, { type: "review" });
  assert.deepEqual(reveal, { status: "reveal", submitError: null });
  const submitting = discoveryTransition(reveal, { type: "submit" });
  assert.deepEqual(submitting, { status: "submitting" });
  assert.deepEqual(discoveryTransition(submitting, { type: "submit" }), submitting);
  assert.deepEqual(discoveryTransition(submitting, { type: "submitFailed", message: "Submission failed. Please try again." }), {
    status: "reveal",
    submitError: "Submission failed. Please try again.",
  });
  assert.deepEqual(discoveryTransition(submitting, { type: "submitSucceeded" }), { status: "done" });
});

test("reference upload ignores a second start and keeps a partial-failure notice", () => {
  const uploading = uploadTransition(initialUpload, { type: "start" });
  assert.deepEqual(uploading, { status: "uploading", notice: null });
  assert.deepEqual(uploadTransition(uploading, { type: "start" }), uploading);
  const noticed = uploadTransition(uploading, { type: "notice", message: "Max 5MB per file." });
  assert.deepEqual(uploadTransition(noticed, { type: "finish" }), {
    status: "idle",
    notice: "Max 5MB per file.",
  });
});

test("work filters and remote views name the legal combinations", () => {
  const allowed = ["All", "Brand & Messaging"];
  const read = readWorkFilters(new URLSearchParams("category=nope&q=law"), allowed);
  assert.deepEqual(read, { category: "All", query: "law" });
  const params = writeWorkFilters({ category: "Brand & Messaging", query: "law" });
  assert.equal(params.get("category"), "Brand & Messaging");
  assert.equal(params.get("q"), "law");
  assert.equal(writeWorkFilters({ category: "All", query: "" }).toString(), "");
  assert.equal(activeCategory("Gone", ["All", "Notes"]), "All");

  assert.equal(listView({ isLoading: true, isError: true, count: 0 }), "loading");
  assert.equal(listView({ isLoading: false, isError: true, count: 0 }), "error");
  assert.equal(listView({ isLoading: false, isError: false, count: 0 }), "empty");
  assert.equal(listView({ isLoading: false, isError: false, count: 2 }), "ready");
  assert.equal(recordView({ isLoading: false, isError: true, hasRecord: false }), "error");
  assert.equal(recordView({ isLoading: false, isError: false, hasRecord: false }), "missing");
  assert.equal(articleView({ isLoading: false, error: new Error(POST_NOT_FOUND), hasRecord: false }), "missing");
  assert.equal(articleView({ isLoading: false, error: new Error("network"), hasRecord: false }), "error");
  assert.equal(articleView({ isLoading: false, error: null, hasRecord: true }), "ready");
});

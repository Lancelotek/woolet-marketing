# Lovable Build Prompt — Woolet Bespoke Eyewear Configurator

> Paste everything below into Lovable as the initial build prompt.
> First, upload the 25 product images from the `eyewear-images/` folder (files `wr-03.jpg` … `wr-40.jpg`) to the project's assets/public folder, keeping the exact filenames — the catalogue data references them by name.

---

## 0) Role & goal

Build a production-grade **made-to-order ("bespoke") eyewear configurator and store** for the brand **Woolet** — handmade bio-acetate frames. A customer chooses a frame, composes its colour, gets measured (AI scan **or** mailed tape kit), adds an optional laser engraving, selects lenses/prescription, and pays. Because every pair is **unique and made-to-order**, the flow must handle measurement verification, biometric-data consent, deposits, and a production handoff — not just a normal "add to cart".

Build it as a **mobile-first, fully responsive** React app with **Supabase** (auth, database, storage, edge functions), **Stripe** for payments, and a **Shopify Draft Order** handoff for fulfilment. Hit **WCAG 2.1 AA**.

---

## 1) Brand & visual direction

- **Brand name:** Woolet. Tagline: *"Bespoke handmade eyewear."*
- **Mood:** quiet luxury, minimal, editorial. Lots of negative space.
- **Palette:** near-black background `#0c0c0c`, warm ivory ink `#f4f1ec`, muted gold accent `#c8a96a`, soft gold `#e7d6b0`. Status: success `#6fbf8b`, warning `#e0a23a`, critical `#e06a5a`.
- **Type:** display/serif = *Cormorant Garamond*; UI/sans = *Inter* (light/300 base weight). Generous letter-spacing on labels and the wordmark.
- **Components:** rounded 14px cards, 30px pill buttons, thin `#2b2b2b` hairlines, subtle fade-in on step change.
- A persistent **summary sidebar** (desktop) / **sticky summary drawer** (mobile) shows the live build + running price in EUR and Back/Next.

---

## 2) Tech stack & integrations

- **Frontend:** React + Tailwind, mobile-first, accessible (semantic HTML, keyboard nav, focus states, ARIA labels, prefers-reduced-motion respected).
- **Backend:** Supabase — Postgres, Auth (email magic link + Google), Storage (Rx uploads, scan artefacts), Edge Functions for Stripe + Shopify + PDF spec generation.
- **Payments:** Stripe (Payment Intents). Support **deposit / manual capture** (authorise now, capture when production starts).
- **Fulfilment:** Shopify Admin API — push each order as a **Draft Order** with the full configuration as **line-item properties** (see §8).
- **Email:** transactional emails (order received, in production, fit-check, dispatched) via Resend or Supabase + SMTP.
- **AI face scan:** abstract behind a `MeasurementProvider` interface so a real SDK (e.g. a face-landmark / PD-detection library or vendor) can be dropped in later. Ship a working **mock** that requests camera permission, shows a guided overlay, and returns plausible measurements — plus a **manual fallback**.

---

## 3) Catalogue data (seed these 25 frames)

Each frame: `id`, `name`, `shape`, `image` (filename in assets), `base_price_eur` (use 480 for all unless noted), `available` (true). Material is **bio-acetate**, handmade.

```
wr-03  Bold square           wr-03.jpg
wr-05  Keyhole round         wr-05.jpg
wr-07  Soft cat-eye          wr-07.jpg
wr-13  Panto round           wr-13.jpg
wr-15  Rectangular           wr-15.jpg
wr-17  Aviator               wr-17.jpg
wr-19  Geometric             wr-19.jpg
wr-20  Round classic         wr-20.jpg
wr-21  Browline              wr-21.jpg
wr-22  Oversized square      wr-22.jpg
wr-24  Hexagonal             wr-24.jpg
wr-25  Slim oval             wr-25.jpg
wr-26  Angular cat-eye       wr-26.jpg
wr-27  Round contemporary    wr-27.jpg
wr-29  Wide panto            wr-29.jpg
wr-30  Pillow square         wr-30.jpg
wr-31  Tear-drop             wr-31.jpg
wr-32  Bevelled square       wr-32.jpg
wr-34  Round bold            wr-34.jpg
wr-35  Octagonal             wr-35.jpg
wr-36  Square classic        wr-36.jpg
wr-37  Slim rectangle        wr-37.jpg
wr-38  Round wire-look       wr-38.jpg
wr-39  Modern cat-eye        wr-39.jpg
wr-40  Bold panto            wr-40.jpg
```

**Colours (front & temples, chosen independently):** Noir, Havana, Crystal, Dark Tortoise, Forest, Smoke Grey, Honey Amber, Bordeaux, Cobalt, Ivory.
**Finishes:** Shiny hand-polished, Matte, Scratched/brushed.
**Lens types & add-on price (EUR):** Plano 0 · Single vision 120 · Progressive 280 · Sun/tinted 90 · Blue-light only 70.
**Lens materials:** CR-39, Polycarbonate, 1.67 Hi-index, 1.74 Ultra hi-index. **Coatings:** Anti-reflective, AR+Blue-light, AR+Photochromic, None.
**Engraving:** +€45.

---

## 4) The configurator flow (steps)

A 6-step stepper with a live summary. Each step persists to a `configuration` record so the build can be **saved & resumed** (see §6) and shared via a link.

### Step 1 — Choose frame
Grid of all 25 frames (image, id, shape). Selectable card. **Face-shape recommendation:** if a scan or a quick "what's your face shape?" picker exists, badge the recommended silhouettes ("Recommended for oval faces") and let users filter by shape.

### Step 2 — Compose colour
Independent **front colour** and **temple colour** swatch pickers + **finish** chips. Live preview swatch in summary. Note that each acetate sheet is unique (kept as a keepsake — brand story).

### Step 3 — Measure your fit  *(critical accuracy + consent)*
Two methods, toggleable, can be combined:

- **AI face scan:** request camera permission with a clear explainer first. Guided face overlay, good-lighting hint, ~15s capture, returns: **Pupillary distance (PD)**, temple-to-temple width, bridge width, temple length, lens height, face width. **PD is mandatory.** Provide a **calibration / printable-ruler fallback** (credit-card or printed ruler) when the scan can't lock PD.
- **Tape measure:** manual numeric entry from the mailed Woolet measuring kit, every field with mm units.

**Validation:** sanity-check every value against plausible ranges; block "Next" on out-of-range values with inline guidance. All measurements are stored but **flagged `needs_verification`** — they are NOT sent to production until a human approves them (see §9).

**GDPR / biometric consent (MUST, launch blocker):** Before the camera starts, show an explicit consent modal — what is captured, why, where stored, retention period, and the right to deletion. Face-scan imagery/landmarks are **special-category biometric data**: store only what's needed, encrypt at rest in Supabase Storage, set an automatic **retention/auto-delete** policy (e.g. purge raw scan artefacts after measurements are confirmed), and expose a "delete my scan data" action in the account. Record consent (timestamp, version) in the DB. Provide a manual path for users who decline the scan.

### Step 4 — Laser engraving  *(optional, +€45)*
Text (**max 20 chars**), position (inner left / inner right / both temples / bridge), font (Serif/Sans/Script/Mono), live preview on a temple mockup. **Engraving content rules:** enforce char limit, block profanity/prohibited content, validate the chosen position is feasible for the selected frame, and surface that engraving adds **2–3 days** to production and is **permanent / non-returnable**.

### Step 5 — Lenses & prescription  *(MUST — not "frame only" by default)*
Lens type chips (prices above), material, coatings. **Prescription upload** (PDF/photo) to Supabase Storage; **PD auto-fills from Step 3.** For high powers / progressives, flag `optician_review_required` and route to a manual review queue (see §9) and/or a lab-partner handoff. Allow an explicit **"frame only (no lenses)"** choice so the intent is unambiguous.

### Step 6 — Checkout
Contact + shipping address. **Shipping options** with tracked/insured tiers and country selector. **Tax & currency:** show prices in the user's currency, calculate **EU VAT (OSS)**, and warn non-EU buyers about possible **duties** (ships from Greece). 

**Payment (Stripe):** card element. Because bespoke is made-to-order:
- Surface a clear **custom-order policy**: made-to-order, **non-refundable** once production starts; require a checkbox to proceed.
- Support **deposit OR authorise-now/capture-later (manual capture)** so the customer is only fully charged once measurements are verified and the frame enters production.

On success → order-received screen with realistic **lead time (3–4 weeks, handmade in Greece)** and what happens next.

---

## 5) Pricing
`total = base_price + (engraving ? 45 : 0) + lens_addon`. Show running total live in EUR (and converted display currency). Deposit option shows the deposit amount and the balance due before dispatch.

---

## 6) Accounts, save/resume & order tracking
- **Save & resume:** every configuration is a DB record tied to user (or an anonymous token); generate a **shareable link** to reopen a build.
- **Account area:** list orders with **production status timeline** — `Received → Measurements verified → In production → Fit check → Dispatched` — plus tracking number, downloadable spec/invoice, Rx files, and a **"delete my biometric scan data"** control.
- **Remote fit guarantee (SHOULD):** publish a clear policy and add a post-delivery flow: report a fit issue → choose **re-make**, **local-optician adjustment voucher**, or **mail-back tweak**.

---

## 7) Post-purchase & comms
Transactional emails at each status change. Include care instructions, the bio-acetate / handmade-in-Greece story, and the keepsake acetate-sheet note as brand touches.

---

## 8) Shopify fulfilment handoff  *(MUST — bespoke ≠ stock item)*
On paid (or deposit-authorised) order, an Edge Function creates a **Shopify Draft Order**:
- Each pair is **unique → do NOT decrement catalogue inventory.** Represent the bespoke pair as a single custom line item priced from the config, with the full build serialised as **line-item properties**: frame id, front/temple colour, finish, all measurements (PD etc.), engraving (text/position/font), lens type/material/coatings, prescription file link, deposit/balance, verification status.
- Generate a **production spec sheet (PDF)** for the atelier (clean, printable, all values + chosen options) and attach/email it. This is the manufacturing source of truth.

---

## 9) Admin / atelier console  *(human verification — MUST)*
A protected admin area:
- **Verification queue:** every order lands here first. An optician/maker reviews AI/tape measurements (with range flags), approves or requests a re-measure. Production and **final Stripe capture** only happen **after approval** — bespoke errors are unrecoverable.
- **Optician-review queue** for complex prescriptions.
- Update production status (drives the customer timeline + emails).
- View/print the spec sheet; mark dispatched with tracking.

---

## 10) Compliance, accessibility & trust (cross-cutting)
- **WCAG 2.1 AA:** keyboard navigable end-to-end, visible focus, sufficient contrast, labelled inputs, error messaging, `prefers-reduced-motion`.
- **Camera UX:** explicit permission rationale, graceful denial → manual fallback, mobile-tested.
- **Privacy:** privacy policy + biometric-consent record; data minimisation, encryption at rest, retention/auto-delete, user-initiated deletion.
- **Security:** Supabase RLS so users only see their own configs/orders/files; admin role gated.

---

## 11) Build order (do this incrementally)
1. Design system + layout shell (header, stepper, summary sidebar/drawer) with the brand tokens.
2. Steps 1–2 (frame + colour) with live summary & pricing.
3. Step 3 measurement: consent modal → mock AI scan + manual entry + validation + Supabase persistence.
4. Steps 4–5 (engraving + lenses/Rx upload).
5. Step 6 checkout: address, tax/currency, custom-order policy, Stripe (deposit/manual capture).
6. Accounts: auth, save/resume, shareable link, order timeline, scan-data deletion.
7. Edge functions: Shopify Draft Order + PDF spec sheet + transactional emails.
8. Admin console: verification queue, optician review, status updates, capture-on-approval.
9. Accessibility + privacy/retention pass.
10. (Later/optional) Virtual try-on (AR) preview of frame + chosen colours on the user's face.

## 12) Acceptance checklist
- [ ] All 25 frames render from uploaded assets; selection drives summary + price.
- [ ] Independent front/temple colour + finish; live preview.
- [ ] AI-scan **requires biometric consent first**; PD captured; manual tape fallback; out-of-range values blocked.
- [ ] Engraving: 20-char limit, content/position rules, permanence + lead-time notice.
- [ ] Lens step with Rx upload + PD auto-fill + "frame only" option; complex Rx flagged for optician review.
- [ ] Checkout shows VAT/currency, duties warning, **non-refundable custom-order policy** checkbox, Stripe deposit/manual-capture.
- [ ] Orders create a **Shopify Draft Order** with config as line-item properties; no inventory decrement; PDF spec generated.
- [ ] Admin **verification queue** gates production & Stripe capture; status timeline + emails to customer.
- [ ] Save/resume + shareable config link; account order tracking; **delete-my-scan-data** action.
- [ ] WCAG 2.1 AA; mobile-first; RLS-secured data.

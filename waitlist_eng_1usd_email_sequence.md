# Woolet Waitlist ENG — $1 Reservation Warm-up Sequence

**MailerLite automation:** "Woolet Waitlist ENG — $1 Reservation Warm-up (DRAFT)"
**Automation ID:** 189444919330342757
**Dashboard:** https://dashboard.mailerlite.com/automations/189444919330342757
**Trigger:** subscriber joins group "Woolet Waitlist ENG" (id 181841182994728358)
**Cadence:** 7 emails, 2-day delays — days 0 / 2 / 4 / 6 / 8 / 10 / 12
**Goal:** warm up + convert to a $1 reservation → https://woolet.co/en/products/007
**Status:** DRAFT (not activated)

## Woolet brand palette (from live woolet.co)
- Gold / accent (buttons, links): **#CAA449**
- Cream background (email-safe): **#F8F6F1**
- Dark text / headings: **#1F1B16**
- Dark hero background: #080807 · Cream text on dark: #EDE9DE · Success green: #2A5F3A
- Email 1 brand styling target (MailerLite Style panel): Background #F8F6F1 · Text #1F1B16 · Link #CAA449 · Border #CAA449 · Button bg #CAA449 / text #1F1B16 · Heading #1F1B16. NOTE: the MailerLite colour picker did not accept typed hex via automation — apply these by hand in the Style panel (Hex field + Enter).

## Funnel infrastructure (IDs)
- **Warm-up automation (pre-$1):** `189456004965991985` (v2 — currently named "…Warm-up v2 (STRUCTURE TEST)", rename it) — trigger: joins group "Woolet Waitlist ENG" (`181841182994728358`). 7 emails. DRAFT. Email 1 fully built (body+button+sender+preheader+UTM). Emails 2–7 still need building in the UI Simple editor. (Old v1 `189444919330342757` deleted — API step-PUTs had orphaned its emails 2–7; setting sender/preheader via API resets parent_id, so do per-email config in the UI, not API.)
  - **Per-email build recipe (UI):** click email card → set Subject, "Who is it from"=Marek from Woolet, Sender email=marek@woolet.co, Preheader (from list below), tick UTM → "Design email" → Start from scratch → Simple editor → Continue → type the body paragraphs → on a new line type "/button" → pick Button → set its text ("Reserve for $1 →") → link icon → paste that email's Stripe payment-link URL (with utm_content=emailN) → Next → Save. CTA URL base: https://buy.stripe.com/6oU8wQfyBgKm3ERgZnfbq0n
- **Reserved group:** "Woolet Reserved" = `189449279680546761`.
- **Delivery automation (post-$1):** `189449617481401816` — trigger: joins "Woolet Reserved" → 1 email with the secret pledge link. DRAFT. Sender/preheader/UTM set. ⚠️ Body has placeholder `[PASTE_SECRET_PLEDGE_LINK_HERE]` — paste the real hidden-pledge URL before activating.
- **Stripe:** account JAY23 LLC (`acct_1IZBv9LEPUSL9e9m`). NO dedicated Woolet "$1 reservation" product found (only lens-upgrade products). Same account also runs WellBri + Tennis $1 reservations → the webhook MUST filter to Woolet's specific product/price, not just amount=$1.
- **Make:** org 269430 / team 165689. MailerLite connection ("mailerlite2") active. Template to clone: scenarios "Wellbri — Stripe $1 Deposit" (`5076479`) + "Wellbri — … → MailerLite $1 Reservation" (`4981733`, webhook → MailerLite Add Subscriber to Group).

### Integration (Stripe $1 → Make → MailerLite "Woolet Reserved") — BUILT & TESTED ✅
- **Stripe Payment Link** (the $1 reservation checkout): `plink_1Tf0TZLEPUSL9e9mxvobMS8U` → https://buy.stripe.com/6oU8wQfyBgKm3ERgZnfbq0n (USD, collects name+email). Email CTAs now point here.
- **Make scenario** `6061390` "Woolet — Stripe $1 Reservation → MailerLite Woolet Reserved" (ACTIVE). Flow: gateway webhook → filter (`type=checkout.session.completed` AND `data.object.payment_link=plink_1Tf0TZ…`) → `CreateUpdateSubscriber` (email + name, status active, source_migrated=stripe-1usd-woolet) → `AddSubscribertoGroup` (subscriber_id → group 189449279680546761).
- **Make webhook URL** (give this to Stripe): `https://hook.eu1.make.com/<REDACTED-make-webhook-id>` (hook 3178785).
- Tested 2026-06-05: positive payload → subscriber landed in Woolet Reserved; negative payload (other plink) → correctly filtered out. Test sub deleted.
- Note: first build used `AddSubscribertoGroup` v1 with email/group mapper → MailerLite returned `[405] POST api/subscribers/groups`. Fix = 2-step (CreateUpdateSubscriber → AddSubscribertoGroup with subscriber_id, which uses PUT).

### ⛔ Remaining manual steps to go live
1. **Stripe Dashboard → Developers → Webhooks → Add endpoint** (Live mode): URL `https://hook.eu1.make.com/<REDACTED-make-webhook-id>`, event `checkout.session.completed`. (Stripe MCP can't create endpoints — this is the only thing linking real payments to the scenario.)
2. **Paste the secret pledge URL** into delivery automation `189449617481401816` (replace `[PASTE_SECRET_PLEDGE_LINK_HERE]`).
3. **Design** the 8 email bodies (7 warm-up + 1 delivery) in MailerLite from this file.
4. **Activate** both MailerLite automations when ready.
5. Optional: warm-up exit for people in Woolet Reserved (trigger exclusion / condition step in UI).

### ⚠️ Price discrepancy to resolve
Product page woolet.co/007 says **$114** (−40% of $190). KS secret-pledge screenshot + these emails say **$119**. 40% off $190 = $114, so $119 isn't exactly −40%. Align the number across page / KS pledge / emails.

### Delivery email copy (automation 189449617481401816)
**Subject:** You're in — here's your private link 🔒
**Preheader:** Your $1 reservation is confirmed. Here's the secret pledge link — 100 spots.

Hi {$name|there},

You're in. Your $1 reservation is confirmed — and it just bought you something the public can't see.

Here's your private link to the secret Founder Acetate pledge on Kickstarter:

👉 [PASTE_SECRET_PLEDGE_LINK_HERE]

What's waiting there:
- The Havana Founder Acetate frame (007 oval or 009 square) — Mazzucchelli 1849, made in Milan
- Numbered 1 to 100, premium founder box, ships first (Q3 2026)
- 40% off: $119 instead of $190 — and your $1 is already credited
- Free worldwide shipping + 30-day fit guarantee

Only 100 spots exist, and only reservation-holders have this link. Claim your number before they're gone — the link is yours, but your spot isn't locked until you back the pledge.

Trouble with the link? Just reply to this email.

— [Founder], Woolet

P.S. Please don't share the link — it's the hidden pledge. The 100 spots are first-come.

---

## Per-email settings applied in MailerLite (draft 189444919330342757)
All 7 email steps set via API on 2026-06-05:
- Sender name: **Marek from Woolet** · Sender email / reply-to: **marek@woolet.co**
- UTM tags (Google Analytics link tagging): **ON**
- Preheaders:
  1. The one number no eyewear brand prints — and the reason nothing ever fit.
  2. Pushing your glasses up by noon isn't your head. It's about 15mm.
  3. Mazzucchelli 1849 acetate, cut in Milan — and a phone scan that proves the fit first.
  4. One batch of the Havana acetate. 100 numbered frames. Then it's gone.
  5. 4,900 people waiting — and a co-founder who already delivered a €1M campaign.
  6. Refunds, fit, shipping, what happens after launch — straight answers.
  7. 100 founder frames, claimed in order. Your $1 is your place in line.

⚠️ **UTM double-tagging:** MailerLite's UTM tagging is now ON, AND the CTA links in the copy already carry manual `?utm_source=mailerlite&utm_campaign=waitlist_warmup&utm_content=emailN`. Don't keep both — when designing the body, either (a) use the clean link `https://woolet.co/en/products/007` and let MailerLite append UTMs (set utm_content per email in the UTM panel), or (b) keep the manual links and turn MailerLite UTM OFF. Two UTM sets on one URL break attribution.

⚠️ **Body still needs design:** all 7 emails are is_designed=false — the plain-text body is NOT in MailerLite yet. Build each in the "Design email" editor using the copy below.

## Implementation notes
- Replace `[Founder]` with the founder's name (the 161mm story narrator).
- Confirm the Founder Acetate "one batch, never again" claim with Mazzucchelli before activating (used in emails 4 & 6).
- Set an EXIT: when someone pays the $1, move them to a "Reserved" group (Shopify→MailerLite webhook) and end this automation for that group — don't keep selling to buyers.
- Emails were created with plain-text content; run a design pass in the MailerLite visual editor before activating.
- A/B test subjects on emails 1, 4, 7. UTMs already on every link (utm_content=email1..7).

---

## EMAIL 1 — Day 0
**Subject A:** You're on the list. Here's the number that started Woolet.
**Subject B:** 161mm. That's why you're here.

Hi {$name|there},

You just joined 4,900+ people waiting for Woolet. Genuinely — thank you.

A quick story about why this exists.

For years I bought glasses that pinched my temples by mid-afternoon and left two red dents on the sides of my head. I assumed my head was the problem. It wasn't.

Every frame lists lens width, bridge, temple length. Almost none list the one number that decides whether glasses fit a wide face: total frame width. Mine needs 161mm. Most "standard" frames are 137–148mm. Zenni runs ~140. Warby ~148. No wonder they pinched.

Woolet does one job: frames in the 155–161mm range, made properly in Milan, for faces the industry rounds down.

Over the next week I'll show you how they're made, how to measure your own face in 15 seconds with your phone, and how to lock in founder access before we go public on Kickstarter.

One thing you can do today: reserve your frame for $1. It holds your spot for the limited founder run — a hidden Kickstarter pledge only reservation-holders ever get to see — and the $1 comes straight off your pledge. No commitment beyond a dollar.

Reserve frame 007 for $1:
https://buy.stripe.com/6oU8wQfyBgKm3ERgZnfbq0n?utm_source=mailerlite&utm_campaign=waitlist_warmup&utm_content=email1

More soon,
[Founder], Woolet

---

## EMAIL 2 — Day 2
**Subject A:** The red dents on the side of my head
**Subject B:** Why "one size fits most" never fit you

Hi {$name|there},

Let's talk about the thing nobody at the optician mentions.

If you have a wider face, you already know the symptoms:

- Frames that slide forward and need pushing back by noon
- Temple arms that press until you get a headache
- The "these look a little small on you" you've learned to ignore
- Photos where the glasses clearly stop before your face does

It's not in your head. It's the measurement. The industry designs around a 138–145mm average and lets the edges fend for themselves. If your face needs 155mm+, you're buying compromise every single time.

I measured mine after a decade of it: 161mm. Then I checked the market — almost nothing honest above 152mm that wasn't a novelty or a $400 bespoke job.

So we built the brand that starts where the others stop.

Next email: how to measure your own number in about 15 seconds — before you pay, not after.

If you already know you want in, your $1 reservation holds founder access and credits off your pledge:
https://buy.stripe.com/6oU8wQfyBgKm3ERgZnfbq0n?utm_source=mailerlite&utm_campaign=waitlist_warmup&utm_content=email2

— [Founder]

---

## EMAIL 3 — Day 4
**Subject A:** Measure your face in 15 seconds (before you pay)
**Subject B:** Made in Milan, measured by your phone

Hi {$name|there},

Two things separate Woolet from "we also stock large sizes."

1) Where it's made.
The acetate is Mazzucchelli — the Italian material house most premium eyewear quietly uses. We cut frames from it in Milan, in the wide blanks most factories don't bother stocking. Same material as frames that retail north of $300. Our founder price is $119.

2) Fit before you pay.
We built FitLens — hold a standard card against your cheek, run the scan with your phone camera, and it returns your real numbers (e.g. "L 161 / bridge 24"). You'll know whether Woolet fits you before you spend a cent. No guessing, no return lottery.

That's the whole philosophy: tell you the number, prove the fit, then sell you the frame. In that order.

When we launch on Kickstarter, founder pricing and the limited run go to this list first. A $1 reservation is how you hold your place — and it credits back against your pledge.

Reserve frame 007 for $1:
https://buy.stripe.com/6oU8wQfyBgKm3ERgZnfbq0n?utm_source=mailerlite&utm_campaign=waitlist_warmup&utm_content=email3

— [Founder]

---

## EMAIL 4 — Day 6 (main conversion)
**Subject A:** Why we're asking for exactly $1
**Subject B:** 100 frames, numbered, never made again

Hi {$name|there},

Fair question: why $1, not just "notify me"?

Because the Founder Acetate pledge is hidden.

It's a secret reward on our Kickstarter — it won't show up anywhere on the public page. The only way to get the link is to reserve with $1.

Here's what's behind that link:

- The Havana Founder Acetate frame — 007 oval or 009 square — cut from a single Mazzucchelli 1849 batch, never made again, numbered 1 to 100
- Premium founder box, ships first (Q3 2026)
- 40% off: $119 instead of $190
- Free worldwide shipping + 30-day fit guarantee
- 100 spots. Kickstarter-only. When they're gone, they're gone.

Your $1 does two things: it reserves your place in the 100, and it sends you the private pledge link the moment we launch. It also comes straight off your pledge — a $1 credit, not a fee.

One dollar for the only key to a door the public never sees.

Reserve frame 007 for $1:
https://buy.stripe.com/6oU8wQfyBgKm3ERgZnfbq0n?utm_source=mailerlite&utm_campaign=waitlist_warmup&utm_content=email4

— [Founder]

P.S. No reservation, no link. The 100 spots open to $1 holders first — everyone else waits for whatever's left, at full price.

---

## EMAIL 5 — Day 8
**Subject A:** "Will it actually ship?" — fair. Here's our record.
**Subject B:** 4,900 waiting, €1M already delivered

Hi {$name|there},

The honest fear with anything on Kickstarter: I pay, and the thing never arrives.

So here's our record, plainly.

You're one of 4,900+ people on this list — before the campaign page is even public. That's the demand.

On delivery: Woolet's co-founder, Vincent Vergonjeanne, has done this before. He founded Lucky Duck Games and grew it to $20M ARR before its 2024 acquisition. His crowdfunding campaigns — including The Dark Quarter, which raised €1,014,957 from 11,540 backers — shipped to backers worldwide. This is a team that has delivered seven-figure runs and put product in people's hands.

Add to that: free worldwide shipping and a 30-day fit guarantee. If the frames don't sit right, you send them back.

So the risk on a $1 reservation is, precisely, one dollar — backed by a team that ships.

Reserve frame 007 for $1:
https://buy.stripe.com/6oU8wQfyBgKm3ERgZnfbq0n?utm_source=mailerlite&utm_campaign=waitlist_warmup&utm_content=email5

— [Founder]

---

## EMAIL 6 — Day 10
**Subject A:** What your $1 actually gets you (every question, answered)
**Subject B:** Before you decide — the five things people ask us

Hi {$name|there},

The questions we get most, answered straight.

"What does the $1 actually do?"
Holds your spot for founder pricing and the 100-frame founder run, and credits against your pledge. A reservation, not a purchase.

"What if the frames don't fit?"
Use FitLens first to check your numbers. After delivery you have a 30-day fit guarantee — wrong fit, send them back.

"Shipping?"
Free, worldwide. No surprise customs-shaped fees at checkout.

"What is the Founder Acetate — will it come back?"
The Havana: a Mazzucchelli 1849 Italian acetate (the Milan house behind 175 years of premium eyewear), cut for this campaign in one batch only. Numbered 1–100. It does not return. After the campaign it's standard colourways at standard ($190) pricing.

"Where do I find the Founder Acetate pledge?"
You don't — it's hidden. It's a secret Kickstarter reward, not shown on the public page. Reserve with $1 and we email you the private link at launch.

"When does it ship?"
Q3 2026. Founder Box backers ship first.

If that clears it up, your dollar holds the front of the line:
https://buy.stripe.com/6oU8wQfyBgKm3ERgZnfbq0n?utm_source=mailerlite&utm_campaign=waitlist_warmup&utm_content=email6

— [Founder]

---

## EMAIL 7 — Day 12 (last before launch)
**Subject A:** 100 founder frames. This list gets them first.
**Subject B:** Founder pricing reaches you before the public — if you're holding a spot

Hi {$name|there},

Quick and direct, because we're about to open.

The Havana Founder Acetate pledge is a secret reward — it won't appear anywhere on the public Kickstarter page. Only people holding a $1 reservation get the private link.

The facts:

- 100 spots. That's the whole run.
- 4,900+ people on this list.
- $1 holders get the link first; the 100 are claimed in order.

The math is uncomfortable on purpose: far more people than frames. The $1 is the only thing that puts you ahead of that line — and it credits straight off your $119 pledge.

Reserve frame 007 for $1:
https://buy.stripe.com/6oU8wQfyBgKm3ERgZnfbq0n?utm_source=mailerlite&utm_campaign=waitlist_warmup&utm_content=email7

If a frame that finally fits — and a never-again Havana acetate at 40% off — is worth a dollar to hold, this is the moment.

— [Founder]

P.S. Last note before we open. Next time you hear from me, the secret link will be live — and the 100 will already be filling.

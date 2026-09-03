# Woolet Link-Building Playbook

> **Ahrefs connected (2026-09-03, Advanced plan).** Data-driven mode is ON — the agent
> uses Ahrefs MCP instead of guesswork wherever possible:
> - **T2 (competitor patterns):** `site-explorer-referring-domains` / `all-backlinks`
>   on competitors (BXL, WILDZEN, Cubitts, EYESHELLS…) → who actually links to them.
> - **T3 (broken links):** `site-explorer-broken-backlinks` on competitors → pages
>   linking to their dead URLs → replacement pitch.
> - **T6/T8 (reclamation):** woolet.co has **636 ref. domains / 1 919 live links**,
>   mostly legacy (smart-wallet era). Audit `site-explorer-all-backlinks` for links
>   hitting 404s → redirect or reclaim. Also `broken-backlinks` on woolet.co itself.
> - **Qualification:** `public-domain-rating-free` (0 units) for every tracker prospect
>   → DR-based priority; drop DR<10 unless niche-perfect.
> - **Budget:** stay under ~50k units/run (limit 1M/mo, shared workspace).
 — 8 Automated Tactics

Operational spec for the `/link-building` skill. Each tactic defines: trigger queries,
automation steps (tool-level), qualification, and the outreach template to use.
Templates live in `templates/outreach-templates.md`. Every qualified prospect is
appended to `tracker/prospects.csv`.

Shared rules: qualification + guardrails from `woolet-context.md` apply to every tactic.

---

## Tactic 1 — Listicles that recommend competitors (but not Woolet)

**Goal:** get added to "best of" lists where the author already recommends our category.

**Find:**
1. WebSearch each buyer question from `woolet-context.md` (plain + `"best" ... 2025/2026`
   variants). Also search `intitle:"best" (bespoke OR custom OR handmade OR sustainable) eyewear`.
2. WebFetch each candidate listicle. Keep it if: mentions **≥2 competitors**, does **not**
   mention Woolet, updated/published within ~18 months, has a named author or editor.
3. Extract: which competitors are listed, what category framing they use, what's missing
   (no true-bespoke option? no bio-acetate option? no AI-fit option?).

**Pitch:** show the exact gap — usually "you list custom-tint D2C brands but no
made-to-order bespoke option under €500". Provide an edit-ready blurb (60–80 words),
pricing, 2 screenshots, and what differentiates Woolet from the brands already listed.
If the list is affiliate-driven, lead with partnership potential (disclosed, `rel=sponsored`).

**Template:** `T1-listicle-gap` · **Tracker tactic code:** `listicle`

---

## Tactic 2 — Reverse-engineer competitor backlinks

**Goal:** find *patterns* of how competitors earn links, then replicate the pattern.

**Find:**
1. For 3–5 competitors: WebSearch `link:` style discovery is dead, so use:
   `"<competitor>" (review OR interview OR "founder") -site:<competitor-domain>`,
   `"<competitor>" intitle:(resources OR guide OR brands)`, and news search for coverage.
   (If the user connects Ahrefs/Semrush exports later, ingest the CSV instead — the skill
   accepts a `--backlinks-csv` input.)
2. Classify each found link: listicle / statistics citation / founder interview /
   resource page / guest post / expert quote.
3. Prioritize domains that cover **≥2 competitors** — they cite the category, not a brand.

**Act:** per pattern → route to the right tactic: listicle → T1; statistics citation →
build/point to stats page (Tactic 4); founder interview → pitch Marek's founder story
(Founder Acetate, $1 reservation mechanic); resource page → pitch the relevant guide.

**Template:** `T2-pattern-pitch` · **Tracker tactic code:** `competitor-backlink`

---

## Tactic 3 — Broken-link building (competitor 404s)

**Goal:** replace dead competitor/industry pages that still earn links.

**Find:**
1. Collect candidate dead URLs: WebSearch `"<competitor>" guide OR report` for old content;
   check archived sitemaps via `web.archive.org`; watch for discontinued lines/rebrands.
2. Verify status with `curl -sIL -o /dev/null -w "%{http_code} %{url_effective}" <url>`
   (Bash). 404/410 or redirect-to-homepage counts as broken.
3. Find pages still linking to the dead URL: WebSearch the exact dead URL in quotes and
   the dead page's old title (recover title from Wayback).
4. Check the Wayback copy to understand what the page contained.

**Act:** only pitch if Woolet has (or can quickly build) a genuinely equivalent
replacement — e.g. an acetate-care guide, fit guide, or the statistics page. Never offer
the homepage. Pitch = "your link to X is dead, here's what it covered, here's a current
replacement."

**Template:** `T3-broken-link` · **Tracker tactic code:** `broken-link`

---

## Tactic 4 — Statistics page journalists can cite

**Goal:** one definitive, always-fresh stats page that earns passive citations and powers
Tactics 3/5/7 pitches.

**Build:** full spec in `statistics-page-brief.md` (target query: "eyewear industry
statistics 2026" + sustainable eyewear / bio-acetate clusters).

**Automate:**
1. Quarterly: WebSearch for new primary research (The Vision Council, Statista teasers,
   Grand View / Mordor summaries, EU sustainability reports); verify each number at the
   primary source before adding; update the visible "last updated" date.
2. After each refresh: WebSearch `intitle:"statistics" eyewear OR glasses` to find
   competing stats pages, and pages citing *older* stats → feed those into Tactic 7.

**Tracker tactic code:** `stats-asset`

---

## Tactic 5 — Journalist requests (HARO / Connectively, Featured, Qwoted, #journorequest)

**Goal:** expert quotes + citations of the stats page.

**Automate:**
1. The skill can't read HARO inboxes directly — user forwards relevant digests to
   themselves and runs `/link-building haro <pasted request>`; or we monitor
   `#journorequest` via WebSearch on X/Bluesky for: eyewear, sustainable fashion, D2C,
   made-to-order, AI in retail.
2. For each request: qualify (publication real? deadline feasible? topic in our lane?),
   then draft a reply: direct answer in first 2 sentences, one specific insight/number
   (cite stats page), 2-sentence bio, no product pitch.

**Template:** `T5-journalist-reply` · **Tracker tactic code:** `haro`

---

## Tactic 6 — Editorial citations network (partners, not link exchange)

**Goal:** natural citations between genuinely related content — within Google guidelines.

**Rules:** no forced reciprocity, no sitewide placements, no anchor-text spam. A citation
happens only where it helps the reader.

**Automate:**
1. Maintain a partner list (suppliers, complementary brands: opticians' blogs, acetate
   suppliers, sustainable-fashion publications, PL craft/design media) in the tracker
   with `tactic=network`.
2. When Woolet publishes an article: scan partner content for places our piece genuinely
   helps; when partners publish: check if citing them helps our readers. Suggest — never
   demand — and track given/received in the tracker `notes` column.

**Template:** `T6-editorial-citation` · **Tracker tactic code:** `network`

---

## Tactic 7 — Outdated-resource replacement (Moving Man)

**Goal:** links that technically work but point at discontinued products, acquired
companies, abandoned reports, stale stats.

**Find:**
1. Watch for: eyewear brands that shut down/rebranded, discontinued custom-fit services
   (e.g. any 3D-fit pilots that closed), stats pages not updated in 3+ years.
2. WebSearch pages linking to those resources (exact URL + old brand name searches).
3. Verify each linking page: still live, relevant, editorially maintained.

**Act:** explain exactly what changed ("X was discontinued in 2024; readers clicking your
link land on a redirect"), offer the current equivalent (often the stats page or a guide).

**Template:** `T7-moving-man` · **Tracker tactic code:** `moving-man`

---

## Tactic 8 — Reclaim unlinked mentions & assets

**Goal:** convert existing mentions into links — warmest outreach there is.

**Find (monthly sweep):**
1. WebSearch: `"woolet" (eyewear OR glasses OR acetate) -site:woolet.co`,
   `"founder acetate"`, founder name + eyewear, distinctive stat/quote strings once the
   stats page is live. Also reverse-image candidates: pages using our product shots
   (search distinctive filenames/alt-text phrases).
2. WebFetch each hit; check whether the mention links to us. No link → prospect.

**Act:** thank them, show the exact mention, give the one correct URL, ask for
attribution "so readers can verify". Never demand.

**Template:** `T8-unlinked-mention` · **Tracker tactic code:** `mention`

---

## Weekly run (default `/link-building run`)

1. **Mon sweep:** Tactic 8 (mentions) + Tactic 1 (2 buyer questions, rotating).
2. **Qualify** everything against `woolet-context.md` rules; dedupe against tracker.
3. **Draft** outreach (max 15) → Gmail drafts, never send.
4. **Report:** summary table — new prospects, drafts ready for approval, follow-ups due
   (status `sent` + 5–7 days), and which linkable asset gaps are blocking pitches.

## Follow-up policy

Max 2 follow-ups, 5–7 days apart, each adds new value (extra screenshot, updated stat,
shorter blurb). No reply after follow-up 2 → status `dead`, never contact again for the
same ask.

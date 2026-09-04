# Woolet — Action Plan: More Links + Traffic Capture (2026-09-03)

Data-driven plan built from: legacy link audit, DR-scored tracker (20 targets),
competitor backlink gap, and US keyword volumes (Ahrefs).

## The strategic picture (what the data says)

1. **Woolet out-links the whole wide-fit niche ~100×.** woolet.co: 636 ref. domains,
   DR 26. BXL Eyewear: **1** quality ref. domain. EYESHELLS: **3**. They rank on
   content and exact-match alone. → With redirect fixes + modest link wins + focused
   content, Woolet can take the SERP.
2. **The traffic prize (US/month):** sunglasses for big heads **1 800** · wide frame
   glasses **1 300** · glasses for wide faces **600** · glasses for big heads **500**
   · extra wide glasses **300** · glasses for large heads **150** · wide fit glasses
   **40**. Cluster ≈ **4 700/mo US** (globally ~2–3×). Low-DR sites already rank →
   winnable at DR 26.
3. **Fastest equity: fix what we already own** (legacy audit): 302→301 on www,
   wildcard 301 for dead subdomains (links from DR 96/89/82/80/79/75…), real 301s
   for soft-404 paths.

## Workstream A — Recover owned equity (owner: Marek, ~30 min) 🔴 blocks everything

- [ ] Cloudflare: proxy (orange-cloud) `www`, `*`, `shop` records
- [ ] 3 Redirect Rules (www 301 dynamic; `*.woolet.co` → `/en`; legacy `/blog/*` +
      `/products/*` → `/en`) — specs in `legacy-link-audit.md`
- [ ] Say "sprawdź" → agent re-verifies via Make diag scenario

## Workstream B — Reclamation wave "the comeback story" (agent drafts, Marek sends)

Warm outlets that covered the wallet era; pitch = link **update** + comeback angle
("polski brand z Kickstartera wraca — okulary wide-fit"):
spidersweb.pl (75, dofollow) · mamstartup.pl (71 — wrote the post-KS story, perfect
sequel) · antyweb.pl (72) · cultofmac.com (80, dofollow) · thegadgetflow.com (73,
dofollow — can relist product) · tecmundo.com.br (79) · blesk.cz (79) · zive.cz (76)
· kocpc.com.tw (60). **Prereq: Workstream A live** (their old links must resolve).

## Workstream C — Tier-A outreach (7 now + 2 at launch)

Now (after page qualification): goodonyou.eco 79 · thegoodtrade 77 · fashionbeans 73
· theroundup 73 · ecocult 67 · themodestman 65 · apetogentleman 64 · abc7news 83
(central commerce desk — syndication multiplier). At KS launch: forbes.com 94 (Larry
Olmsted) · readsunoptical 14 (trade). Then Tier B (9) and niche C (markus-hagner —
monthly-updated roundup). Drafts → Make bridge → `support@woolet.co`.

## Workstream D — Traffic capture (content targeting the cluster)

Site already ranks its own `best-glasses-for-big-heads-2026` post. Build out the hub:

| Page | Target keyword (US vol) | Type |
|---|---|---|
| `/en/blog/best-sunglasses-for-big-heads` | sunglasses for big heads (1 800) | Listicle incl. competitors honestly + Woolet |
| `/en/collections/wide-frame-glasses` (or landing) | wide frame glasses (1 300) | Commercial |
| `/en/blog/glasses-for-wide-faces-guide` | glasses for wide faces (600) + fit guide | Info hub (FitLens CTA) |
| existing big-heads post | glasses for big heads (500) | strengthen internal links |
| `/en/eyewear-statistics` | citation asset | brief in `statistics-page-brief.md` |

Every outreach mail should point editors at the most relevant page above (not only
the homepage) — deep links rank pages, pages capture traffic.

## Workstream E — Kickstarter launch press wave (prep now, fire at launch)

- Map outlets that covered Breezm & REFRAMD fit-eyewear campaigns → same beat
- Forbes (Olmsted) pitch: precision wide-fit + KS data story
- Reclamation follow-up round 2: "campaign is live" note to responders from B

## Cadence & measurement

- Weekly agent run (Mondays) continues: fresh prospects + follow-ups (max 2, 5–7 d)
- Ahrefs monthly: DR, ref. domains (target: +15 quality dofollow in 90 days),
  cluster rankings (target: top-5 for 3 of 7 keywords in 90 days)
- Statistics page: build before KS launch — powers C, E and passive links

## Sequence

A (30 min, Marek) → B drafts (agent, same day) → D pages (parallel; Lovable/site)
→ C wave 1 (needs page qualification: local run or open network) → E at launch.

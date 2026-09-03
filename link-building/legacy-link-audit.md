# Legacy Link Audit — woolet.co (2026-09-03)

Source: Ahrefs API (Site Explorer). Profile: **1 919 live backlinks / 636 referring
domains / DR 26** — overwhelmingly inherited from the domain's previous life as the
Woolet smart-wallet brand (Kickstarter 2015–2020 era). This equity is real and mostly
recoverable. Three problems block it today.

## Problem A — www → root redirect is 302 (temporary)

`https://www.woolet.co/` → **302** → `woolet.co` (126 links, 50 dofollow, sources up
to DR 92). `http://www` → 302 as well. A 302 signals "temporary" — link equity
consolidation is unreliable.

**Fix (hosting/DNS panel):** change both www variants to **301**. `http://woolet.co`
already 301s correctly.

## Problem B — dead subdomains with the strongest legacy links (biggest win)

These resolve to nothing (no DNS), so every link is 100% wasted today:

| Subdomain | Links seen | Strongest sources |
|---|---|---|
| `shop.woolet.co` (+ deep product/collection URLs) | 16+ | Shopify forum DR 96, TNW DR 89, TrendHunter 82, Cult of Mac 80, TecMundo 79, Blesk.cz 79, brack.ch 74, GadgetFlow 73 (dofollow), Spider's Web 75 (dofollow) |
| `blog.woolet.co` | 6 | DR 72 top |
| `pl.shop.woolet.co` | 2+ | android.com.pl 65 (dofollow) |
| `id.woolet.co`, `ad./ae./al./api./ar.` … dozens of country-code subdomains | 2 each | DR 49 source |

**Fix (DNS):** wildcard `*.woolet.co` → point at hosting → **301 everything to
`https://woolet.co/en`**. One record + one redirect rule recovers every row above.

## Problem C — soft 404s on legacy paths

Old wallet URLs on the root domain return **200 with "Page not found | Woolet"**
(soft 404 — Google discounts these instead of passing equity):

- `/blog/what-does-a-smart-wallet-do` — 10 links (9 dofollow), sources up to DR 88
- `/products/smart-wallet-howl`, `/products/daily-wallet`,
  `/products/wooden-iphone-apple-watch-combo-dock`, `/products/qi-charging-pad`

**Fix (app router / hosting):** real **301s**:
`/blog/*` (legacy slugs) → `/en/blog` · `/products/*` (wallet slugs) → `/en`.
Serve real 404 (status 404) only for genuinely unknown paths.

## Reclamation outreach list (Tactic 6/8 — warm contacts)

Press that reviewed the wallet still links to dead pages. After redirects are live,
pitch a link **update** (new story: "the Polish Kickstarter brand is back — wide-fit
eyewear"). Polish media are the warmest:

| Outlet | DR | Link type | Angle |
|---|---|---|---|
| spidersweb.pl | 75 | dofollow | PL — reviewed Woolet Tracker; comeback story |
| antyweb.pl | 72 | nofollow | PL — reviewed the wallet |
| mamstartup.pl | 71 | nofollow | PL — wrote "Woolet po Kickstarterze"; perfect sequel pitch |
| cultofmac.com | 80 | dofollow | EN — full review; update request |
| thegadgetflow.com | 73 | dofollow | EN — product listing; can relist eyewear |
| tecmundo.com.br / blesk.cz / zive.cz / kocpc.com.tw | 60–79 | dofollow | Intl — link update note |

## Expected impact

~30+ dofollow links from DR 60–96 domains currently dead → recovered by DNS+301 work
alone (no outreach needed). Reclamation outreach on top can convert several legacy
mentions into fresh, contextual eyewear links.

## Action checklist (owner: Marek — hosting/DNS access required)

- [ ] www.woolet.co (http+https) → 301 → https://woolet.co/
- [ ] Wildcard `*.woolet.co` DNS + 301 → https://woolet.co/en
- [ ] Legacy `/blog/*` and wallet `/products/*` → 301 → live pages; real 404 elsewhere
- [ ] Tell the agent when done → verification re-crawl via Ahrefs + reclamation drafts

# Linkable Asset Brief — "Eyewear & Sustainable Acetate Statistics 2026"

The single most important asset in the system: Tactics 3, 4, 5 and 7 all pitch it.
Target: a page journalists and bloggers cite instead of hunting through paywalled reports.

## Target queries

Primary: `eyewear industry statistics 2026` · `eyewear statistics`
Clusters: `sustainable eyewear statistics` · `bio-acetate` (informational) ·
`custom / bespoke eyewear market` · `online glasses purchase statistics` ·
`eyewear market size 2026`

These are writer-intent queries — lower volume, but the searcher is looking for
something to cite.

## Page structure (one long page, anchor-linked TOC)

1. **Key takeaways** — 8–10 one-line, quotable stats at the top (each ≤140 chars, so
   they can be pasted into an article or tweet verbatim).
2. **Global eyewear market** — size, growth, segment split (frames/lenses/sun).
3. **Online & D2C eyewear** — share of online purchases, try-on/AI-fit adoption.
4. **Sustainability & materials** — consumer willingness-to-pay for sustainable,
   bio-acetate vs petro-acetate facts, industry waste numbers, made-to-order vs
   inventory waste.
5. **Custom & bespoke segment** — personalization demand stats, fit-problem stats
   (% of wearers with poorly fitting frames), premium personalization spend.
6. **Consumer behaviour** — replacement cycles, average spend, prescription trends.
7. **Woolet original data** (the differentiator) — anonymized configurator stats:
   most-chosen colours/finishes, % choosing engraving, AI-scan vs tape-kit split,
   $1-reservation conversion funnel from the Founder Acetate launch. *Original data
   is what earns citations no competitor can copy.*
8. **Sources** — full list, linked.

## Editorial rules

- Every number links to its **primary source** (The Vision Council, Statista, Eurostat,
  peer-reviewed, or named market-research firm). No "studies show". If only a press
  release of a paywalled report is public, cite the press release and say so.
- Visible **"Last updated: {date}"** at top. Refresh quarterly (playbook Tactic 4).
- Every chart: original (brand palette — gold #CAA449 on #F8F6F1, see
  `../woolet-brand-book-colors.md`), embeddable, with a caption that includes
  "Source: Woolet, woolet.co" — makes every embed a Tactic 8 reclamation candidate.
- Tone: neutral and reportorial. The page sells nothing; one quiet CTA at the very
  bottom is enough.

## Build checklist

- [ ] Verify current numbers at primary sources (agent gathers candidates via
      WebSearch; human verifies anything paywalled)
- [ ] Pull Woolet original data (configurator DB + MailerLite/Stripe funnel)
- [ ] Design 4–6 charts in brand palette (dataviz skill)
- [ ] Publish at `/eyewear-statistics` (stable URL — never change it; redirects kill
      accumulated links)
- [ ] Add JSON-LD `Dataset`/`Article` markup + `dateModified`
- [ ] Announce: 1 Buffer/social post per key takeaway (drip over 2 weeks)
- [ ] Register the URL in `woolet-context.md` assets table as **live**

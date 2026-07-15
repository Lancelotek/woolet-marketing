# Woolet Link-Building System

Agent + playbook that turns the "8 SEO link-building tactics" approach into repeatable
workflows for Woolet. Instead of mass templated outreach, every prospect must show
**proof of link intent** (links to competitors, maintains a relevant list, cites a dead
or outdated resource, mentions us without linking, or is a journalist asking right now).

## How to use

In Claude Code, from this repo:

```
/link-building              # weekly sweep (mentions + rotating listicle hunt)
/link-building listicles    # find "best of" lists that include competitors but not us
/link-building competitors  # reverse-engineer how competitors earn links
/link-building broken-links # dead competitor pages that still have backlinks
/link-building stats-refresh# refresh the statistics asset + find stale citations
/link-building haro <req>   # draft a reply to a pasted journalist request
/link-building moving-man   # links pointing at outdated (but live) resources
/link-building mentions     # reclaim unlinked Woolet mentions
/link-building status       # pipeline report from the tracker
```

The agent researches, qualifies, logs to `tracker/prospects.csv`, and creates **Gmail
drafts** — it never sends. You review drafts, send, and tell the agent what was sent /
replied so it updates the tracker and schedules follow-ups.

## Files

| File | Purpose |
|---|---|
| `../.claude/skills/link-building/SKILL.md` | The agent (Claude Code skill) |
| `woolet-context.md` | Brand context, competitor set, qualification rules, guardrails — **edit this first** |
| `playbook.md` | The 8 tactics, operationalized |
| `templates/outreach-templates.md` | Email templates (T1–T8 + follow-ups) |
| `tracker/prospects.csv` | Prospect pipeline (contains one example row — delete it) |
| `statistics-page-brief.md` | Spec for the "Eyewear Statistics 2026" linkable asset |

## Before the first real run

1. In `woolet-context.md`: confirm the production domain, founder name/title, and trim
   the competitor set to the 3–5 most relevant.
2. Build the statistics page (`statistics-page-brief.md`) — half the tactics pitch it.
3. Delete the example row from `tracker/prospects.csv`.

## Guardrails (non-negotiable)

Drafts only, human sends · no paid/reciprocal links · affiliate = disclosed
`rel=sponsored` · max 15 drafts/run · max 2 follow-ups · full rules in
`woolet-context.md`.

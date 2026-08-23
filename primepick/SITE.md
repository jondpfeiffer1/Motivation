# The Site — Prime Pick Daily storefront

Replaces bio.site. Built in Lovable.

- **Project:** `c7cfa683-95f0-4a2d-9fa5-648ebb08cfed`
- **Workspace:** Jon's Lovable (`ECcWAIZHdxSVUFPH02j4`, Pro)
- **Editor:** https://lovable.dev/projects/c7cfa683-95f0-4a2d-9fa5-648ebb08cfed
- **Preview:** https://id-preview--c7cfa683-95f0-4a2d-9fa5-648ebb08cfed.lovable.app

---

## Why we rebuilt

bio.site reported ~11K clicks at 65% CTR. Amazon logged 87 clicks in 30 days.
Those numbers cannot both be right, and there was no way to find out which was
wrong — bio.site gives no per-link destination tracking.

Plus ~120 links on one page is choice paralysis. The top 10 links accounted
for roughly 5,900 clicks; the long tail diluted everything.

**The new site fixes three things at once:** it shows only 10 products, it
logs every click server-side so the funnel is finally measurable, and it gives
each gate word its own landing page.

---

## The gate-word loop

This is the mechanism that ties content to revenue:

```
Video posted, caption says: Write "RICE" and I'll send you the link
        ↓
Viewer comments RICE           ← the comment feeds the algorithm
        ↓
You DM them: primepickdaily.../rice
        ↓
Gate page: one product, one button, above the fold
        ↓
Click logged to `clicks`, then → Amazon with pfeiffer2-20
```

Every step is measurable. When clicks don't convert we will know whether the
drop-off is at the DM, the page, or Amazon.

**Compliance:** the DM sends them to the site, never a raw affiliate link.
Amazon's Operating Agreement prohibits affiliate links in email and DMs are
unsettled — routing through the site keeps this clean.

---

## Schema

`products` — id, **slug** (the gate word), title, tagline, image_url,
amazon_url, price_text, category, is_active, sort_order, created_at

`clicks` — id, product_id, slug, source, referrer, user_agent, created_at

`subscribers` — id, email, source, created_at

Clicks are written with `sendBeacon` before navigation so they survive the
redirect. If logging fails the user still navigates — tracking never blocks
a sale.

---

## Publishing

Claude Code pushes each week's products through the Lovable MCP as part of the
Sunday batch. No admin page — the flow is:

1. Sunday batch produces 7 videos + 7 gate words
2. Claude inserts 7 rows into `products` via Lovable MCP
3. Only the newest 10 ever display; older ones fall off automatically

**Rolling window of 10 is by design.** Never let this grow into another
120-link wall.

---

## Per-platform source tags

Append `?src=` so `clicks.source` tells us which platform actually converts:

| Platform | Link |
|---|---|
| Instagram DM | `/rice?src=igdm` |
| Instagram bio | `/?src=igbio` |
| TikTok bio | `/?src=tiktok` |
| YouTube description | `/?src=yt` |
| Pinterest | `/?src=pin` |

Within a month this answers a question we currently cannot: which platform
sends buyers, not just viewers.

---

## Week 1 gate words → URLs

| Day | Product | Slug |
|---|---|---|
| Mon | Komzon rice container | `/rice` |
| Tue | Foldable invisible hooks | `/hooks` |
| Wed | simplehuman pet container | `/kibble` |
| Thu | BISSELL Little Green | `/green` |
| Fri | Water bottle pump | `/pump` |
| Sat | GE Opal nugget ice | `/ice` |
| Sun | Rolling tree storage | `/tree` |

---

## Open items

- [ ] Custom domain (currently on the Lovable subdomain — a branded link
      converts better in a DM and is worth ~$12/yr)
- [ ] Point the Instagram/TikTok/YouTube bio links at the new site
- [ ] Decide what happens to the old bio.site page (redirect, or leave as a
      control to compare against for a month)
- [ ] Email delivery for the subscriber list — capture works, sending does not
      exist yet

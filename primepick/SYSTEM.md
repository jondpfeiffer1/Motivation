# The System — how Prime Pick Daily runs

## Daily, 7:00am Central (12:00 UTC)

Routine `trig_01JCCFFYq5NtwnR2ynBGWBtn` fires a fresh session that runs the
`primepick-daily` skill:

```
queue/products.json → pick today's product
   ↓  (skips any product with no real image_url — never fakes one)
media_import_url on the real Amazon listing photo
   ↓
veo3_1_lite · 9:16 · 8s · female voiceover · ~12 credits
   ↓
script + on-screen cards + gate word + 4 platform captions
   ↓
push product to primepickdailystore.lovable.app/<slug>
   ↓
commit, push, report to Jon
```

Push and email notification on each run.

## Sundays, additionally
`ugc-outreach` drafts 5 brand pitches. This is the path that actually pays.

---

## Files

| Path | What |
|---|---|
| `primepick/queue/products.json` | The queue. **Jon fills `image_url`.** |
| `.claude/skills/primepick-daily/` | Daily production procedure |
| `.claude/skills/ugc-outreach/` | Brand outreach + rate card |
| `primepick/PRODUCTION-SPEC.md` | Locked pipeline + measured costs |
| `primepick/BEST-PRACTICES.md` | Growth rules from outlier research |
| `primepick/SHOT-TEMPLATE.md` | The 4.2M-view shot structure |
| `primepick/MONETIZATION-STRATEGY.md` | Where the money actually is |
| `primepick/FINDINGS-2026-08-23.md` | vidIQ audit of the accounts |
| `primepick/SITE.md` | Storefront architecture |
| `primepick/ugc/pipeline.md` | Outreach tracker |

---

## The one manual step

**Jon pastes Amazon listing image URLs into the queue.**

Amazon is unreachable from the build environment. Higgsfield fetches the image
server-side, so the block does not apply to generation — but the URL has to be
supplied by hand.

Right-click the main listing photo → Copy image address →
`m.media-amazon.com/images/I/71XXXX._AC_SL1500_.jpg`

Ten minutes fills a month of queue. Without it the daily task correctly refuses
to run, which is the intended behavior.

---

## Economics

| Item | Cost |
|---|---|
| Video, veo3_1_lite 8s + audio | ~12 credits |
| Daily for a month | ~360 credits |
| Plan allowance | 1,000/month |

Leaves ~640 credits of headroom for re-rolls and a weekly Seedance hero.

| Income path | Rate |
|---|---|
| UGC for brands | **$150–400/video** |
| TikTok Shop affiliate | 13% avg |
| Amazon Associates | 1–3%, cut ~50% in 2026 |

Last full month of Amazon affiliate income: **$6.46**.
One UGC video at $200 is **~31x that**.

The videos feed the audience. **The audience is not the product — the videos
are.** Sell them.

---

## Known limitations, stated plainly

1. **The fired Routine has no MCP connectors.** Triggers created from this
   session cannot pass connector grants through, so its sessions launch without
   Higgsfield, Lovable or vidIQ tools and cannot generate video. **Recreate the
   Routine from the claude.ai Routines UI** to attach connectors. Until then it
   will fire, find no tools, and report that.
2. **Claude cannot see rendered video.** The Higgsfield CDN is proxy-blocked.
   Every QA gate is Jon's to run. No run may describe a video it has not seen.
3. **`veo3_1_lite` is untested for this use.** Priced at 12 credits and chosen
   on that basis. Validate once before trusting the daily loop.

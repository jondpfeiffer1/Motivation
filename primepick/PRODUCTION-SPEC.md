# Production Spec — the corrected pipeline

Supersedes the Kling/Cinema-Studio guidance in BEST-PRACTICES.md and
VIDEO-001. Those were wrong for this use case.

---

## What failed and why

Video 001 used **Kling 3.0 Turbo** on an **AI-invented product**.

Two separate errors:

1. **The product was generated, not real.** The workflow's hard rule says a
   real product reference is REQUIRED and that you must never invent, generate,
   or borrow a product image. Amazon was unreachable, so the correct action was
   to stop. Generating one instead is what produced water passing through the
   glass — with no real object to respect, nothing held the physics honest.
2. **Wrong model for the job.** Kling applies camera motion. It does not
   render a product demo with narration. Seedance does, and Seedance is what
   produced the August videos that actually performed.

---

## The pipeline (locked)

```
Real Amazon listing photo
   → media_import_url            (server-side fetch, free)
   → gpt_image_2 storyboard      (21:9, 4 vertical slots, 7 credits)
   → seedream_v5_pro de-slop     (mandatory realism pass, 3 credits)
   → seedance_2_5                (9:16, 1080p, omni_reference,
                                  generate_audio: true — native voiceover)
```

**Voice:** female, warm, natural American — described in the Seedance prompt,
not selected by id. Seedance renders the voiceover itself; no separate TTS
call and no lip-sync, because nobody is on camera.

**No person on screen at any point.** Hands only, at the edge of frame, if at
all. This is what separates it from the August reels whose reach collapsed.

---

## Measured costs (preflighted, not estimated)

| Step | Credits |
|---|---|
| Storyboard, gpt_image_2 21:9 2k high | 7 |
| De-slop, seedream_v5_pro 21:9 2k | 3 |
| Seedance 2.5, **15s** 1080p + audio | **135** |
| Seedance 2.5, **10s** 1080p + audio | **90** |
| **Total per video, 15s** | **145** |
| **Total per video, 10s** | **100** |

For contrast: standalone TTS (`seed_audio`) is **1 credit**, and Kling 3.0
Turbo 15s is **30**. Seedance's premium is almost entirely its native audio
and scene rendering.

### Budget reality
Plan is 1,000 credits/month.

| Cadence | Monthly cost | Fits? |
|---|---|---|
| Daily, 15s | 4,350 | No — 4x the plan |
| Daily, 10s | 3,000 | No — 3x the plan |
| 2x/week, 15s | 1,160 | No — just over |
| **Weekly, 15s** | **580** | Yes |
| **2x/week, 10s** | **800** | Yes, thin |

**Seedance and daily posting cannot both be true on the Plus plan.** Either
the cadence drops, or the plan moves to Ultra (3,000/mo), or cheaper videos
fill the non-hero days.

Decide this after the test video, not before.

---

## Test video — spec ready, awaiting one input

**Product:** Countertop Water Bottle Dispenser (top link, 1,613 clicks)
**Length:** 15s · 9:16 · 1080p
**Voice:** warm natural American female, conversational, mid-30s

**Script (~30 words, fits 15s):**
> "Okay so I stopped lifting the water jug completely. It just sits on the
> floor now. One press and my glass fills. My back has never been happier."

**4-slot storyboard arc:**
1. Jug on the floor, pump seated on top, glass empty on the counter
2. One finger presses the pump, water starts filling the glass
3. Wider — the tube arcing up from the floor, jug never moving
4. Full glass lifted from the counter, condensation on it

### BLOCKED ON
**The real Amazon listing image URL.** Amazon is unreachable from this
environment. On the listing: right-click the main product photo →
"Copy image address" → `m.media-amazon.com/images/I/71XXXX._AC_SL1500_.jpg`

Higgsfield fetches it server-side, so the proxy block does not apply — but
the URL has to come from Jon.

**Nothing gets generated until that URL exists.** That rule is what this
whole document is about.

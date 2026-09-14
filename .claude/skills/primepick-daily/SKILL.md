---
name: primepick-daily
description: Run the Prime Pick Daily production loop for one day — pick the next product from the queue, generate the 9:16 product video with a female voiceover, write per-platform captions, push the product to the storefront, and hand Jon a ready-to-post package. Use when Jon says "run today's video", "daily video", "primepick daily", when the daily scheduled task fires, or when he asks for today's content. Store pfeiffer2-20.
---

# Prime Pick Daily — daily production run

Read `primepick/PRODUCTION-SPEC.md` and `primepick/BEST-PRACTICES.md` for the
reasoning. This file is the procedure.

## The hard rule, before anything else

**Never generate, invent, or substitute a product image.** If the day's product
has no `image_url`, the run does not produce a video. Tell Jon which product is
blocked and what to paste. That rule exists because breaking it once produced
an unusable video with water passing through glass.

Amazon is unreachable from this environment. The image URL must come from Jon.

---

## Step 1 — pick the product

Read `primepick/queue/products.json`. Choose the first product where
`status == "ready"` AND `image_url` is non-empty. Prefer one whose `day`
matches today's weekday.

**If every ready product is missing `image_url`:** stop. Post a short message
listing the next 3 products and exactly what to paste:

> Right-click the main listing photo → Copy image address →
> `m.media-amazon.com/images/I/71XXXX._AC_SL1500_.jpg`

Do not generate anything. Do not pick a different product to be helpful.

---

## Step 2 — import the real photo

`media_import_url` with the `image_url` → `media_id`. This runs server-side on
Higgsfield, so the local proxy block does not apply.

If the import fails, report it and stop. A failed import is not a reason to
generate a substitute.

---

## Step 3 — generate the video

**Preflight the cost first** with `get_cost: true`, every time. Model prices
change and a surprise 150-credit charge is unacceptable.

Primary model (pending Jon's approval after the first test):

| Param | Value |
|---|---|
| model | `veo3_1_lite` |
| aspect_ratio | `9:16` |
| duration | `8` |
| generate_audio | `true` |
| medias | the imported photo as `start_image` |

~12 credits. Veo renders native audio including speech, so no separate TTS call.

**Fallbacks, in order, only if Veo fails the quality bar:**

| Model | Spec | Credits |
|---|---|---|
| `seedance_2_5` | 10s 1080p omni_reference + audio | 90 |
| `seedance_2_5` | 15s 1080p omni_reference + audio | 135 |

Seedance is 8–11x the cost. Use it only for a weekly hero, never by default.

### Voice
Warm, natural, conversational American woman, mid-30s. Describe it in the
prompt — Veo and Seedance both take the voice from the prompt, not a voice id.

### Prompt shape
Open on the **magic trick** (the `magic_trick` field), product already in
motion in the first frame. Product is the sole subject throughout. Hands only
at the frame edge if at all. **No person on camera, ever.** No baked text.

---

## Step 4 — QA gate

The Higgsfield CDN is blocked here, so **Claude cannot see the output.** Say so
plainly and give Jon the checklist:

- [ ] Exactly one product, no duplicates mid-clip
- [ ] Nothing morphs or warps during camera moves
- [ ] Absent features stayed absent (no cord on a cordless item)
- [ ] Scale matches any hand in frame
- [ ] No gibberish labels, no invented logos
- [ ] No people, hands aside
- [ ] **The product does only what the real listing says it does**

Never describe the video as good, clean, or working. You have not seen it.

---

## Step 5 — write the package

**Script:** ~18 words for 8s, ~30 for 15s. First person, concrete, sensory.
Banned: literally, obsessed, game-changer, holy grail, hits different, elevate,
seamless, effortless, "Hey guys".

**On-screen text cards**, lowercase serif, rotating position, no CTA on screen.

**Gate word** — one short all-caps word tied to the product, in the caption
only. Never on screen. This is the single biggest lever on comments, which are
currently near zero and capping distribution.

**Captions** for Instagram, TikTok, YouTube Shorts, Pinterest. YouTube title in
first person ("The couch stain that haunted me is GONE" style — that rewrite
was worth ~40x).

**Pinned first comment**: an easy question.

**Affiliate disclosure** in every caption.

Save to `primepick/briefs/YYYY-MM-DD-<slug>.md`.

---

## Step 6 — push to the storefront

Add the product to the Lovable site (project `c7cfa683-95f0-4a2d-9fa5-648ebb08cfed`,
live at https://primepickdailystore.lovable.app) so `/<slug>` resolves for the
DM funnel. Only the newest 10 display; older ones fall off by design.

Then mark the product `"status": "posted"` in the queue.

---

## Step 7 — report

Give Jon: the video URL, the captions, the gate word, the `/<slug>` link, the
QA checklist, credits spent, and credits remaining.

Keep it short enough to act on from a phone.

---

## Weekly, on Sunday — the money step

Amazon Associates now pays 1–3% after the spring 2026 cuts, and attribution is
ASIN-only. The affiliate links are not the business.

On Sundays also run `ugc-outreach`: five brand pitches. At $150–400 per video
that path is worth roughly 100x the current affiliate income, and it does not
depend on views.

---

## Never

- Generate or substitute a product image
- Claim the video looks good when you have not seen it
- State a spec that is not on the real listing
- Put a person on camera
- Skip the cost preflight
- Spend more than ~35 credits on a routine daily video without asking

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

**Quality is the priority. Jon's instruction: it has to be realistic and it has
to look good.** Seedance is the default. It is expensive; that is accepted.

| Param | Value |
|---|---|
| model | `seedance_2_5` |
| aspect_ratio | `9:16` |
| resolution | `1080p` |
| mode | `omni_reference` |
| generate_audio | `true` |
| duration | `10` default, `15` when the script needs it |
| medias | the imported real photo |

Seedance renders the female voiceover natively — no separate TTS call, no
lip-sync, nobody on camera.

### Measured cost
| Spec | Credits |
|---|---|
| Storyboard `gpt_image_2` 21:9 2k high | 7 |
| De-slop `seedream_v5_pro` 21:9 2k | 3 |
| Seedance 10s 1080p + audio | 90 |
| Seedance 15s 1080p + audio | 135 |
| **Total, 10s** | **100** |
| **Total, 15s** | **145** |

**This does not support daily on a 1,000-credit plan.** ~10 videos/month at 10s.
Post 2-3 times a week at this quality, or move to Ultra (3,000/mo) for daily.
Never silently downgrade the model to fit a cadence — ask Jon.

### Cheaper fallback, only if Jon approves it for a given run
`veo3_1_lite`, 8s, 9:16, `generate_audio: true`, real photo as `start_image`
— 12 credits. Untested for realism. Never substitute it to save money without
being told to.

### THE LOCKED RECIPE — approved by Jon 15 Sep 2026

This exact configuration produced the first video Jon accepted. Do not deviate
without being told to.

| Setting | Value | Why |
|---|---|---|
| Duration | **15s** | 10s forced beats too short to show change |
| Beats | **3 x 5s**, hard cuts | 2.5s beats produced static, lifeless shots |
| Board panels | **3**, matching the beats | |
| Glass / product state | **starts EMPTY** | v1 started two-thirds full, so nothing could visibly change |
| Camera | **handheld, continuous natural sway** | "locked and static" produced animated stills |
| Setting | **lived-in home, not styled** | dish towel, mismatched mugs, ordinary daylight |
| People | hand + forearm only, never a face | |

**The three-beat arc:**
1. **Beat 1 (0-5s)** — Wide, off-level. Product in its real context, in its
   starting state. Hand reaches in from the bottom of frame.
2. **Beat 2 (5-10s)** — Close. The hand operates the mechanism. Include one
   physical tell that is hard to fake: a fingertip pad flattening and whitening
   under pressure, a latch giving, fabric compressing.
3. **Beat 3 (10-15s)** — Tight. **The change happens here and must be
   continuous and unmistakable across the whole beat.** State it in capitals in
   the prompt, describe the start and end states explicitly, and add "do not
   hold [the thing] at a constant level/position at any point."

**Audio:** one warm, natural, conversational American woman, mid-thirties,
relaxed and slightly amused, OFF-SCREEN voiceover only, no lip-sync. Add a real
physical sound that tracks the change — pour pitch rising as a glass fills,
a zip closing, wheels on a floor. Room tone underneath. No music.

**Two failures to never repeat:**
- Never write "locked / static camera" — it kills the realism.
- Never let the de-slop prompt alter the state being demonstrated. Tell it
  explicitly not to change how full / open / folded the product is.

### The de-slop pass is mandatory
Never feed a raw `gpt_image_2` storyboard to Seedance. Run the
`seedream_v5_pro` realism pass first. That pass is what removes waxy skin,
HDR bloom, oversharpening and the plastic AI look — it is the difference
between "realistic" and "obviously generated".

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

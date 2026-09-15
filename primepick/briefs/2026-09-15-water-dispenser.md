# Video 002 — Countertop Water Bottle Dispenser

**First video built the right way: real Amazon listing photo, full Seedance pipeline.**

- **Product:** Countertop Water Bottle Dispenser — top link, 1,613 clicks
- **Slug:** `/water-dispenser` · **Gate word:** `POUR`
- **Format:** 10s · 9:16 · 1080p · native female voiceover

## Files
**Video:** https://d8j0ntlcm91z4.cloudfront.net/user_3BS4QwSWGvzraaxEX3W4To5MSsJ/hf_20260915_215104_9ed81790-6c97-46d9-9e42-e808ddcc5bbe.mp4

**De-slopped storyboard:** https://d8j0ntlcm91z4.cloudfront.net/user_3BS4QwSWGvzraaxEX3W4To5MSsJ/hf_20260915_214905_f72d1f5f-3b29-4804-9f14-4baf2f68f44b.png

**Source photo (Jon's, real):** `m.media-amazon.com/images/I/61QsCs7QlhL._AC_SL1500_.jpg`

## Pipeline actually run
| Step | Model | Credits |
|---|---|---|
| Import real listing photo | `media_import_url` | 0 |
| Storyboard, 4 slots, 21:9 | `gpt_image_2` 2k high | 7 |
| **De-slop realism pass** | `seedream_v5_pro` 2k | 3 |
| Video + native VO | `seedance_2_5` 10s 1080p omni_reference | 90 |
| | **Total** | **100** |

Higgsfield suggested a cinematic "IN THE DARK" preset — declined, wrong for a
bright kitchen demo. Generated literally.

## Voiceover (in the video)
> "I haven't lifted a water jug in months. You press the amount you want, and
> it pours exactly that."

18 words. The second clause is the differentiator — every competitor says "no
more heavy jugs"; **nobody leads with the fact that it measures.** The
100/200/300/500/700/1000 ML buttons are the unclaimed hook.

## Beats
| Time | Shot |
|---|---|
| 0.0–2.5 | Wide. Dispenser on marble, empty glass on base, tube to the jug on the floor |
| 2.5–5.0 | Hand enters bottom-right, finger presses a volume button. Hand only |
| 5.0–7.5 | Tight on the rose-gold spout, water arcing in, bubbles, condensation |
| 7.5–10 | Hand lifts the full glass off the base, dispenser sharp behind |

## On-screen text — burn these in
Lowercase serif, rotating position, **no CTA on screen.**

| Time | Text | Position |
|---|---|---|
| 0.0–2.5 | `Amazon` + `KITCHEN FIND` | top + mid center |
| 2.5–5.0 | `pick your amount` | lower-center |
| 5.0–7.5 | `it pours exactly that` | upper-center |
| 7.5–10 | `the jug never moves` | center-left |

## Captions

### Instagram
> I haven't lifted a water jug in months 💧
>
> the part nobody mentions: you press the amount you want and it pours exactly that. 100ml for the dog bowl, 500 for my bottle. it just stops on its own.
>
> Write "POUR" and I'll send you the link 🔗
>
> #amazonfinds #kitchengadgets #homehacks #amazonmusthaves #kitchenfinds

### TikTok
> you press the amount, it pours exactly that 💧 the jug stays on the floor forever
>
> comment POUR and I'll send it 🔗
>
> #amazonfinds #tiktokmademebuyit #kitchengadgets #homehacks

### YouTube Shorts
**Title:** `Nobody told me it measures the water for you`

**Description:**
> Press the amount you want — 100ml to a full litre — and it pours exactly that, then stops. The jug stays on the floor.
>
> https://primepickdailystore.lovable.app/water-dispenser?src=yt
>
> As an Amazon Associate I earn from qualifying purchases.
>
> #shorts #amazonfinds #kitchengadgets

### Pinterest
**Title:** `The water dispenser that measures for you`
> Press 100, 300 or 1000ml and it pours exactly that, then stops on its own. No lifting a 5-gallon jug, no overfilling.

## Pinned first comment
> okay but the measuring part is what got me 😅 what would you use the 100ml
> setting for?

## ⚠️ QA — Jon must run this
The Higgsfield CDN is proxy-blocked. **I have not seen this video.**

- [ ] One dispenser only, no duplicates mid-clip
- [ ] The product matches the listing photo — matte black column, copper spout
      ring, round base with volume markings, white tube
- [ ] Nothing morphs at the hard cuts
- [ ] Water behaves like water; glass doesn't overfill or refill oddly
- [ ] **Hands only — no face, head or shoulders ever enter frame**
- [ ] Hand has five fingers, correct scale against the product
- [ ] No gibberish text or invented branding on the base
- [ ] Voiceover is one warm female voice, audible, matches the script
- [ ] No baked-in captions

**Any failure → re-roll is 90 credits.** Say the word.

## Claims check
Every claim traceable to the photo: preset volume buttons are visible on the
base (100/200/300/500/700/1000 ML), and the intake tube implies the external
jug. Nothing about battery life, filtration or capacity was claimed, because
none of that is verifiable from the image.

---
name: primepick-batch
description: Build the week's batch of 10-second product-only Amazon affiliate videos for Prime Pick Daily (store pfeiffer2-20). Use when Jon says "run the batch", "make this week's videos", "primepick batch", sends a list of Amazon products to turn into videos, or asks for daily product videos with no people on camera. Produces MP4s plus per-platform captions and tagged affiliate links.
---

# Prime Pick Daily — Weekly Batch

Read `primepick/PLAYBOOK.md` first for the numbers, decisions and schedule.
This file is the execution procedure.

## Locked parameters — never ask about these

| Setting | Value |
|---|---|
| Duration | 10s |
| Aspect | 9:16 |
| Model | `cinematic_studio_video` |
| Media role | `start_image` (the Amazon listing photo) |
| People | None on camera. Hands only, at the edge, if at all. |
| Text | Never baked into generation. Captions burned after. |
| Batch size | 7 |
| Store ID | `pfeiffer2-20` |

Cost ≈ 5 credits per video, ~35 per batch. Do not switch to Seedance 2.5
(65 credits) without Jon explicitly approving the spend.

## Inputs needed from Jon

Per product: **Amazon product URL** + **direct listing image URL**
(`m.media-amazon.com/images/...`).

The image URL is required — this environment cannot reach Amazon. If Jon
sends only a product URL, ask for the image URL or an uploaded photo. Never
generate a substitute product image: it will invent features the real
product doesn't have, which is both a conversion problem and an Amazon
Operating Agreement problem.

## Procedure

1. **Import** each image: `media_import_url` → `media_id`. This runs
   server-side on Higgsfield, so the local proxy block doesn't apply.

2. **Script** each video. 12–20 words, target ~18. Three beats:
   - 0–2s Problem: the annoying situation, product idle
   - 2–7s Mechanism: the satisfying thing it does — this is the video
   - 7–10s Result: outcome + CTA

   Concrete and sensory. Every claim traceable to the listing.
   Banned: literally, obsessed, game-changer, holy grail, hits different,
   elevate, seamless, effortless, "Hey guys".

3. **Generate** all 7 in one parallel batch via `generate_video_batch`,
   then `jobs_wait`, then one `show_generation_by_ids`.

4. **QA every clip** against the checklist below. This gate is mandatory.

5. **Burn captions.**

6. **Build links**: `https://www.amazon.com/dp/<ASIN>?tag=pfeiffer2-20`

7. **Deliver** per video: MP4, caption for TikTok / Reels / Shorts /
   Pinterest, hashtags (2 niche + 1–2 broad), and the tagged link.
   Save the brief to `primepick/briefs/YYYY-MM-DD.md`.

## QA gate — every clip, no exceptions

- [ ] Exactly one hero product, no duplicates
- [ ] Absent features stayed absent (no cord on a cordless item)
- [ ] Scale matches the hand or surface
- [ ] Label not gibberish, mirrored, or another real brand
- [ ] Prop states consistent
- [ ] No generator-baked text
- [ ] ≤2 hands per person
- [ ] **Product does only what the listing says it does**

Failure → fix the prompt, re-roll that clip. 5 credits is cheap; an account
strike is not.

Every caption carries an affiliate disclosure (`#ad` or "Commissions earned").

## Weekly themes

Mon kitchen · Tue organization · Wed **pets** · Thu cleaning ·
Fri water/drink · Sat big-ticket ($150+) · Sun wildcard/rerun

## Report at the end

Credits spent, credits remaining, and any clip that needed a re-roll and why.

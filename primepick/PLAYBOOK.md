# Prime Pick Daily — Product-Only Video System

Operating doc for the daily Amazon-affiliate video engine.
Store ID: `pfeiffer2-20`

---

## 1. What the numbers said (baseline, Aug 2026)

| Metric | Value | Read |
|---|---|---|
| Conversion rate | 11.76% | Strong. Amazon avg is 3–9%. Product picks are good. |
| Clicks (30d) | 87 | **The bottleneck.** |
| Commissions (30d) | $27.23 | ~$0.31 earned per click |
| This month | $6.46 / 68 clicks | ~$0.095 per click |
| Bounties | $0.00 | Untouched revenue stream |
| Items ordered (mo) | 8 | 7 shipped |

**Diagnosis: traffic volume and per-item value, not persuasion.**
The audience buys when it clicks. There just aren't enough clicks, and the
items are low-ticket at a 3–4.5% category rate.

### The leak worth checking first
bio.site reports **17K views / 11K clicks / 65% CTR**. Amazon logged **87 clicks
in 30 days**. Even accounting for bio.site being lifetime vs. Amazon being 30-day,
the #1 link alone (Water Bottle Dispenser, 1,613 clicks) should have produced
far more. Likely causes, in order of probability:

1. Links point at Storefront / Idea List pages that don't carry the tracking tag
2. Links missing `?tag=pfeiffer2-20`
3. Dead or rotated ASINs
4. bio.site counting clicks Amazon never saw (redirect/bot filtering)

At the observed $0.31/click, recovering even 10% of that volume is ~$340.
**This is worth more than a month of new video.** Audit before scaling.

### Proven demand (top clicked links)
1. Desktop Water Bottle Dispenser — 1,613
2. Giant Rolling Christmas Tree Storage — 906
3. simplehuman XL Pet Food Container — 747
4. Wagon → 2-Person Chair — 610
5. Water Bottle Pump (5 gal) — 480
6. ANTBOX Shoe Rack Organizer — 355
7. Folding Sofa Lounge (Humans + Pets) — 338
8. KU XIU 3-in-1 Magnetic Charger — 324
9. Joseph Joseph Spice Rack — 284
10. Innovia Touchless Paper Towel Dispenser — 271

**The pattern:** an annoying household problem solved by a *visible mechanism*.
Something unfolds, collapses, dispenses, or transforms. That is exactly what
product-only video is best at — the mechanism IS the hook.

### Social funnel
IG 25 clicks / TikTok 21 / YouTube 11. Traffic flows *into* bio.site from
social and never sideways. bio.site is the funnel — and it currently carries
~120 links, which is choice paralysis on a page that already converts.

---

## 2. Locked decisions

| Decision | Choice |
|---|---|
| Format | 10s vertical 9:16, product-only, no people on camera |
| Cadence | Batch 7 on Sunday, Jon posts daily |
| Visual source | Amazon listing images |
| Model | Cinema Studio (test first vs Seedance) |
| Niche | Home / kitchen / organization + one themed day |
| Handoff | MP4 + per-platform captions |
| Posting | Jon posts manually to all platforms |

---

## 3. The credit math (from real transaction history)

Observed per-generation costs on this account:

| Model | Credits | Note |
|---|---|---|
| Seedance 2.5 | **65** | Premium. Actual billed cost. |
| Cinema Studio Video | **5** | 5s and 10s, 9:16, sound |
| Cinema Studio 2.5 | **2** | Cheapest |
| Recraft V4.1 (image) | 8 | Only if we must generate a frame |

Balance: **312 credits.** Plan: Plus, **1,000/mo**. No unlimited allowance
active (`unlim.available: false`, trial not eligible).

**Daily on Seedance is not affordable:** 30 × 65 = 1,950/mo — nearly double
the plan. Confirmed, not estimated.

**Daily on Cinema Studio is very affordable:**

```
Amazon listing photo → media_import_url (free)
   → cinematic_studio_video, start_image, 9:16, 10s   = 5 credits
```

Because the listing photo becomes the start frame, **no image generation is
needed at all.** ~5 credits per video.

- 30 videos/month ≈ **150 credits** of a 1,000 allowance
- Current 312 balance ≈ **60 videos** before any refill
- Leaves ~850 credits/mo of headroom for hero pieces and reshoots

This is the single most important finding: the cadence you asked for is
already fully funded on your current plan. No upgrade needed.

---

## 4. The 10-second structure

10s is too short for the standard 4-beat arc. Use **3 beats**:

| Beat | Time | Job |
|---|---|---|
| 1. Problem | 0–2s | The annoying situation, product present but idle |
| 2. Mechanism | 2–7s | The satisfying thing it does. This is the whole video. |
| 3. Result | 7–10s | Outcome + on-screen CTA |

**Script density: 12–20 words total.** ~18 is the target.

Voice/copy rules:
- Concrete and sensory, never generic praise
- Every claim tied to something on the actual listing
- Banned: literally, obsessed, game-changer, holy grail, hits different,
  elevate, seamless, effortless, "Hey guys"
- Captions burned in — most viewers watch muted
- No text baked into the generation; captions are a post-render burn

---

## 5. Weekly schedule

Six days core niche, one themed day. Pets is the clear second signal —
simplehuman pet container (#3, 747 clicks), Folding Sofa for Humans+Pets
(#7, 338), plus PETKIT litter box, MudBuster, human dog bed, cat brush.

| Day | Theme | Angle |
|---|---|---|
| Mon | Kitchen | Gadget that solves a prep/storage annoyance |
| Tue | Organization | Something that collapses, stacks, or hides |
| Wed | **PET DAY** | Themed slot — second audience test |
| Thu | Cleaning | Visible before/after |
| Fri | Water / drink | Your #1 and #5 links live here |
| Sat | Big-ticket | $150+ item — attacks the per-item value problem |
| Sun | Wildcard | Reruns of proven winners in a new format |

Saturday exists on purpose: at a 3% rate, a $30 item pays $0.90 and a $300
item pays $9. One Saturday sale ≈ ten weekday sales.

---

## 6. Sunday batch runbook

1. Jon supplies 7 products (URL + direct listing image URL each)
2. Import each image via `media_import_url` → `media_id`
3. Write 7 scripts, ~18 words each, 3-beat structure
4. Generate 7 clips: `cinematic_studio_video`, 9:16, 10s, start_image
5. **Frozen-frame QA on every clip** (see §7) — non-negotiable
6. Burn captions
7. Build tagged affiliate links
8. Deliver: 7 MP4s + captions for TikTok / Reels / Shorts / Pinterest

Cost: ~35 credits/week, ~150/month.

---

## 7. QA gate — check every clip before it ships

AI video invents details. For affiliate content about a *real* product that
is a genuine account risk, not just a quality issue. Amazon's Operating
Agreement prohibits misrepresenting products.

Step through frames and confirm:
- [ ] Exactly one hero product, no duplicates
- [ ] Absent features stayed absent (no cord on a cordless item)
- [ ] Product scale matches the hand or surface holding it
- [ ] Label is not gibberish, mirrored, or a different real brand
- [ ] Prop states consistent (a lid is on or off, never both)
- [ ] No baked-in text from the generator
- [ ] ≤2 hands per person, edges and mirrors included
- [ ] **The product does only what the listing says it does**

Any failure → fix the prompt and re-roll that clip. 5 credits is cheap;
an account strike is not.

Also required: affiliate disclosure on every post. "#ad" or "Commissions
earned" — platform-native, in the caption.

---

## 8. Open items

**Blocked pending Jon:**
- Bio.site link audit — confirm every link carries `pfeiffer2-20`
- Bio.site pruning — ~120 links down to a curated set
- TikTok → Higgsfield connection (enables auto-publish + live trending sounds)
- Bounty programs — currently $0.00, entirely untapped

**Environment limits found this session:**
- amazon.com and m.media-amazon.com — blocked by egress proxy (403)
- youtube.com, bio.site — blocked
- instagram.com, tiktok.com, pinterest.com — assume blocked

Workaround: Higgsfield's `media_import_url` fetches server-side from
Higgsfield's own infrastructure, not through this proxy. Jon supplies the
direct image URL; Higgsfield pulls it. To be verified on the first real URL.

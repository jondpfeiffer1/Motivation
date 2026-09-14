# What Jon needs to send — the complete list

Everything else is built. These are the only inputs that cannot be produced
from inside the build environment.

---

## 1. Product data — the one real blocker

Amazon is blocked by this environment's egress proxy. Higgsfield and the
storefront both fetch images server-side, so the block only applies to
*discovering* the URLs — not to using them.

**For each product, two things:**

### The image URL
Open the listing → right-click the main product photo → **Copy image address**

Looks like: `https://m.media-amazon.com/images/I/71AbCdEfGh._AC_SL1500_.jpg`

### The product URL (or just the ASIN)
The ASIN is in the address bar after `/dp/` — ten characters, e.g. `B0CH3ZWXQD`

With the ASIN I build `amazon.com/dp/<ASIN>?tag=pfeiffer2-20`, a direct product
link. The site currently uses **tagged search links**, which work and earn
commission but convert worse than landing on the product page itself.

---

## Paste format

One line per product. Any order. Partial is fine — send one and I can start.

```
water-dispenser | ASIN | IMAGE_URL
tree-storage    | ASIN | IMAGE_URL
pet-food        | ASIN | IMAGE_URL
wagon-chair     | ASIN | IMAGE_URL
jug-pump        | ASIN | IMAGE_URL
shoe-rack       | ASIN | IMAGE_URL
pet-lounge      | ASIN | IMAGE_URL
charger         | ASIN | IMAGE_URL
spice-rack      | ASIN | IMAGE_URL
paper-towel     | ASIN | IMAGE_URL
```

**Start with one: `water-dispenser`.** It is the top link at 1,613 clicks, and
one product unblocks both the first real video and the storefront hero.

Roughly one minute per product. Ten minutes covers the month.

---

## 2. Recreate the scheduled Routine from the UI

The Routine created from this session carries **no MCP connectors**, so the
sessions it fires launch without Higgsfield and cannot generate video. Triggers
made from inside a session cannot pass connector grants through — this is a
platform limit, not something that can be fixed from here.

**Fix:** claude.ai → Routines → new Routine → paste the prompt from
`primepick/SYSTEM.md` → attach the Higgsfield and Lovable connectors →
schedule `0 12 * * 0,2,5` (Tue/Fri video, Sun outreach, 7am Central).

Then delete or disable `trig_01JCCFFYq5NtwnR2ynBGWBtn`.

---

## 3. Optional, but worth doing

### A domain — ~$12/year
`primepickdaily.com/pump` in an Instagram DM converts meaningfully better than
`primepickdailystore.lovable.app/pump`, which reads as spam in a message. Buy
it, point it at Lovable, and no rebuild is needed.

### Connect TikTok to Higgsfield
Unlocks auto-publish and live trending-sound data. One auth link.

### Export the Amazon Associates report
Per-link clicks and conversions as CSV. The dashboard summary is not enough to
find where the funnel leaks — 12,000 views produced 68 clicks and the raw data
would say why.

---

## Priority

| | What | Why |
|---|---|---|
| **1** | One image URL + ASIN | Unblocks the first real video AND the storefront |
| **2** | Recreate the Routine with connectors | Otherwise nothing runs automatically |
| **3** | The other nine products | Fills the month |
| 4 | Domain | Better DM conversion |
| 5 | Associates CSV | Finds the leak |

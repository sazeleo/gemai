# GemAI — Pricing Infrastructure for Colored Gemstones

> AI-powered valuation layer for a $38.4B market with no price benchmark.

**[Live Platform](https://gemai-website.vercel.app)** · **[Behavioral Protocol](https://gemai-website.vercel.app/protocol.html)**

Built during the **Claude Hackathon (April 2026)** using Claude Opus 4.7, Claude Code, and Cowork.

---

## The Problem

Colored gemstones have no Rapaport. No standardized pricing. Two identical 3ct Burmese rubies can be $5,000 and $500,000. This single gap cascades into three failures:

1. **Lending:** Banks provide $12B+ to diamond midstream, ~$0 to colored gems — they can't value the collateral.
2. **Insurance:** Appraisers disagree by 300% on the same stone. Insurers can't price risk.
3. **Miner exploitation:** Artisanal miners capture 10–20% of retail value because they have zero market data.

GemAI is the pricing layer that sits underneath all of this.

---

## What We Built

### 1. The Platform — [gemai-website.vercel.app](https://gemai-website.vercel.app)

A full-stack gemstone intelligence platform:

- **AI Appraisal** — upload a gemstone image, get stone ID, origin, authenticity breakdown, and retail value range in seconds
- **Interactive Mine Map** — 10 priority deposits across 61 countries, with rarity signals and price trends
- **Stakeholder Ecosystem** — visual map of how the pricing layer connects miners, labs, jewelers, lenders, and insurers
- **Underwriting Demo** — live walkthrough of how AI valuation enables collateral-based lending for artisanal miners

### 2. The Behavioral Protocol — [gemai-website.vercel.app/protocol.html](https://gemai-website.vercel.app/protocol.html)

The novel contribution. AI image analysis prices what's visible. It can't price desire.

We built a structured observation framework that captures 6 behavioral signals during human-stone interaction — formalizing what auction houses like Sotheby's have done intuitively for centuries. Combined with AI market data, the model achieves:

| Method | Avg. Error | R² |
|--------|-----------|-----|
| Behavioral only | 18% | 0.71 |
| AI valuation only | 11% | 0.84 |
| **AI + Behavioral Protocol** | **6%** | **0.94** |

**The 6 signals:**

| # | Metric | What it captures |
|---|--------|-----------------|
| 01 | First-Touch Latency | Desire impulse — seconds to first reach |
| 02 | Gaze Duration | Perceived depth and optical complexity |
| 03 | Rotation Index | Active fascination (pleochroism, color shift) |
| 04 | Light-Seeking | Binary: does the buyer seek a light source? |
| 05 | Return Rate | Conflicted desire — put down, picked back up |
| 06 | Spontaneous Price Anchor | Perceived value gap vs. AI market data |

**Formula:**
```
behavioral_adjustment = (neuro_score - 5) / 10
combined_estimate = AI_midpoint × (1 + behavioral_adjustment × 0.4)
```

No equipment. No wearables. Deployable at artisanal mine sites in 61 countries with a smartphone. Takes 8–12 minutes per stone.

Pilot dataset: 10 colored gemstone specimens. Predictive lift is greatest for Paraíba tourmalines, unheated rubies, and alexandrite — stones where optical analysis systematically undersells the desire premium.

---

## Market Context

| Metric | Data |
|--------|------|
| Market size | $38.4B (2026) → $72.8B by 2036 at 6.6% CAGR |
| Performance | Colored gems +42% · S&P 500 +31% · Natural diamonds -21% (2020–2023) |
| Digital adoption | 80,000+ stones listed on RapNet within months of colored gem launch (Jan 2025) |
| Certification surge | GIA reports 18% YTD increase in global colored gemstone certifications |
| UHNW interest | 23% of ultra-high-net-worth individuals consider gemstones as investments (Knight Frank 2024) |
| Lab-grown pressure | Diamond prices dropped 18–23%, pushing capital toward colored stones that can't be synthesized |

---

## Mining Dataset (in-app)

10 priority sites selected for rarest, highest-value gemstones:

| Location | Country | Primary Gem | Rarity Signal | Price Trend |
|----------|---------|-------------|---------------|-------------|
| Mogok Valley | Myanmar | Ruby (Pigeon Blood) | Near-depleted. $1M+/ct for finest | +25%/yr |
| Kashmir (Paddar) | India | Blue Sapphire | Mines exhausted since 1880s | +36%/yr |
| Muzo | Colombia | Emerald | Declining quality in new finds | +15%/yr |
| Merelani Hills | Tanzania | Tanzanite | Single 4km² source on Earth | +10%/yr |
| São José da Batalha | Brazil | Paraíba Tourmaline | Original source nearly exhausted | +20%/yr |
| Montepuez | Mozambique | Ruby | 2nd largest deposit ever found | +12%/yr |
| Ratnapura | Sri Lanka | Padparadscha Sapphire | Extremely rare pink-orange | +18%/yr |
| Ilakaka | Madagascar | Sapphire | ~50% of world's high-end supply | +8%/yr |
| Kagem | Zambia | Emerald | Largest mine by volume | +10%/yr |
| Mahenge | Tanzania | Spinel | "The next Paraíba" — tiny deposit | +15%/yr |

Full dataset: 1,022 sites across 61 countries — [PRIO GEMDATA](https://www.prio.org/data/25)

---

## Stakeholder Ecosystem

GemAI is not a marketplace, lab, or trading network. It is the **pricing layer** that sits underneath all of them.

```
                    ┌─────────────────┐
                    │  Marketplaces   │  Gembridge, RapNet
                    └────────┬────────┘
                             │
    ┌────────────┐  ┌────────▼────────┐  ┌─────────────┐
    │   Miners   │──│     GemAI       │──│   Gem Labs  │
    │ 61 countries│  │  Pricing Layer  │  │ GIA, Gübelin│
    └────────────┘  └────────┬────────┘  └─────────────┘
                             │
    ┌────────────┐  ┌────────▼────────┐  ┌─────────────┐
    │  Insurers  │──│     GemAI       │──│   Jewelers  │
    └────────────┘  └────────┬────────┘  └─────────────┘
                             │
                    ┌────────▼────────┐
                    │    Lenders      │  Banks, NBFCs
                    └─────────────────┘
```

---

## Built With

- [Claude Opus 4.7](https://anthropic.com) — research, market analysis, protocol design, content generation
- [Claude Code](https://claude.ai/code) — website development, API integration, visualization
- [GemLens API](https://rapidapi.com/sgroy10/api/gemlens) — gemstone identification and valuation
- [Chart.js](https://www.chartjs.org) — market data visualization
- [Leaflet](https://leafletjs.com) — interactive mine mapping

---

## Author

**Sachin Mittal** — [github.com/sazeleo](https://github.com/sazeleo) · [Website](#)

Trader lineage. 5–6 jeweler contacts in Mumbai. 40-year legacy gemstone dealer in network. Building at the intersection of AI, gemology, and financial infrastructure.

---

*Built in <48 hours during the Claude Hackathon, April 2026.*

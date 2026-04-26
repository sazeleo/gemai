# GemAI — Pricing Infrastructure for Colored Gemstones

> AI-powered valuation layer for a $38.4B market with no price benchmark.

**[Live Demo](#)** · **[Website](#)** · **[API Docs](#)**

Colored gemstones have no Rapaport. No standardized pricing. Two identical 3ct Burmese rubies can be $5,000 and $500,000. GemAI builds the missing infrastructure — starting with AI appraisal, extending toward an underwriting protocol that unlocks financing for the artisanal mining industry.

Built during the **Claude Hackathon (April 2026)** using Claude Opus 4.7, Claude Code, and Cowork.

---

## Repository

```
gemai/
├── index.html          # Single-page application
├── app.js              # Core app logic & GemLens API integration
├── gems.js             # Gemstone data and valuation helpers
├── styles.css          # Dark theme, luxury aesthetic
└── package.json
```

---

## Architecture

```
┌──────────────┐     ┌──────────────────┐     ┌─────────────────────┐
│  Gemstone    │────▶│  GemLens API     │────▶│  Valuation Output   │
│  Image       │     │  (RapidAPI)      │     │  - Stone ID (92%+)  │
│  (base64)    │     │  POST /analyze   │     │  - Authenticity     │
└──────────────┘     └──────────────────┘     │  - Origin           │
                                               │  - Price range      │
                                               └──────────┬──────────┘
                                                          │
                                               ┌──────────▼──────────┐
                                               │  Behavioral Layer   │
                                               │  (Phase 2)          │
                                               │  6 observational    │
                                               │  metrics → 60/40    │
                                               │  AI + behavioral    │
                                               └──────────┬──────────┘
                                                          │
                                               ┌──────────▼──────────┐
                                               │  Underwriting       │
                                               │  Protocol (Phase 3) │
                                               │  - Risk scoring     │
                                               │  - Collateral val.  │
                                               │  - Financing        │
                                               └─────────────────────┘
```

---

## Core Thesis

The colored gemstone supply chain — 1,022 mine sites across 61 countries — operates without pricing infrastructure. This creates three downstream failures:

1. **Lending:** Banks provide $12B+ to diamond midstream, ~$0 to colored gems. They can't value the collateral.
2. **Insurance:** Appraisers disagree by 300% on the same stone. Insurers can't price risk.
3. **Miner exploitation:** Artisanal miners capture 10–20% of retail value due to zero market data.

A consistent, reproducible AI valuation layer solves all three.

---

## API Integration

### GemLens (live)

```bash
curl -X POST "https://gemlens.p.rapidapi.com/analyze" \
  -H "X-RapidAPI-Key: $GEMLENS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"image": "data:image/jpeg;base64,YOUR_BASE64_IMAGE"}'
```

**Response:**
```json
{
  "success": true,
  "gemstone": {
    "type": "London Blue Topaz",
    "confidence": 0.92,
    "cut": "Emerald Cut",
    "estimated_carat": "4.5-5.0",
    "clarity": "Eye-clean"
  },
  "authenticity": { "natural": 0.95, "synthetic": 0.03, "simulant": 0.02 },
  "origin": "Brazil",
  "estimated_retail": { "low": 1200, "high": 2800, "currency": "USD" }
}
```

Free tier: 50 calls/month · Dataset: ~5,500 gemstone samples · [RapidAPI listing](https://rapidapi.com/sgroy10/api/gemlens)

---

## Behavioral Pricing Protocol (Phase 2)

A secondary pricing signal from observable human response to physical stones. No devices required — structured observation only.

| Metric | What it measures | Scoring |
|--------|-----------------|---------|
| First-touch latency | Desire impulse | Seconds to first reach (<2s = high) |
| Handling duration | Captivation depth | Seconds held before put down |
| Re-pick rate | Attachment signal | Count of re-examinations |
| Verbal valence | Emotional response | 1–5 scale (5 = asked the price unprompted) |
| Comparison winner | Relative preference | Binary win/loss vs paired stone |
| Blind price guess | Perceived value | Dollar amount (gap vs AI = emotional premium) |

**Combined valuation formula:**

```
behavioral_adjustment = (neuro_score - 5) / 10
combined_estimate = AI_midpoint × (1 + behavioral_adjustment × 0.4)
```

Hypothesis: combined model outperforms AI-only or behavioral-only signals. Validated against dealer asking prices and auction results.

---

## Mining Dataset

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
                    │  $100M catalog  │  Need: price signals
                    └────────┬────────┘
                             │
    ┌────────────┐  ┌────────▼────────┐  ┌─────────────┐
    │   Miners   │──│   AI Valuation  │──│   Gem Labs  │
    │ 61 countries│  │     Layer       │  │ GIA, Gübelin│
    │ 10–20% share│  │    (GemAI)     │  │ +18% certs  │
    └────────────┘  └────────┬────────┘  └─────────────┘
                             │
    ┌────────────┐  ┌────────▼────────┐  ┌─────────────┐
    │  Insurers  │──│                 │──│   Jewelers  │
    │ 300% spread│  │                 │  │ 500K+ India │
    └────────────┘  └────────┬────────┘  └─────────────┘
                             │
                    ┌────────▼────────┐
                    │    Lenders      │  Banks, NBFCs
                    │  ~$0 to colored │  Need: collateral valuation
                    └─────────────────┘
```

---

## Market Context

| Metric | Data |
|--------|------|
| Market size | $38.4B (2026) → $72.8B by 2036 at 6.6% CAGR |
| Performance vs alternatives | Colored gems +42% · S&P 500 +31% · Natural diamonds -21% (2020–2023) |
| Digital adoption | 80,000+ stones listed on RapNet within months of colored gem launch (Jan 2025) |
| Certification surge | GIA reports 18% YTD increase in global colored gemstone certifications |
| UHNW interest | 23% of ultra-high-net-worth individuals consider gemstones as investments (Knight Frank 2024) |
| Lab-grown pressure | Diamond prices dropped 18–23%, pushing capital toward colored stones that can't be synthesized |

---

## Research References

- [Gemtelligence: ML gemstone identification, 99%+ accuracy](https://www.nature.com/articles/s44172-024-00252-x) — Nature, 2024
- [GemLens API](https://rapidapi.com/sgroy10/api/gemlens) — AI gemstone analysis via RapidAPI
- [PRIO GEMDATA](https://www.prio.org/data/25) — 1,022 mining sites dataset
- [Gemdat.org](https://www.gemdat.org) — 3,156 locality records
- [The Rise of Centralized Sourcing in the Colored Gemstone Market](https://nationaljeweler.com/articles/14621-the-rise-of-centralized-sourcing-in-the-colored-gemstone-market) — National Jeweler, Jan 2026
- [Colored Gemstones as an Alternative Investment](https://www.nasdaq.com/articles/colored-gemstones-as-an-alternative-investment) — Nasdaq
- [ASM Financing Barriers](https://www.sciencedirect.com/science/article/pii/S2949697724000080) — ScienceDirect, 2024
- [Gembridge](https://gembridge.com/how-it-works) — marketplace operations
- [Investment Gemstone Guide](https://sosnagems.com/blogs/investment-insights/investment-gemstones-guide) — Sosna Gems

---

## Built With

- [Claude Opus 4.7](https://anthropic.com) — research, market analysis, protocol design, content generation
- [Claude Code](https://claude.ai/code) — website development, API integration, visualization
- [GemLens API](https://rapidapi.com/sgroy10/api/gemlens) — gemstone identification and valuation
- [Chart.js](https://www.chartjs.org) — market data visualization
- [Leaflet](https://leafletjs.com) — interactive mine mapping

---

## Roadmap

- [ ] Connect GemLens API to live appraisal on website
- [ ] Conduct behavioral protocol study — 10 stones × 8 observers
- [ ] Validate combined model against 50 dealer asking prices
- [ ] Build underwriting risk score from combined valuation
- [ ] Partner with 1 NBFC for pilot inventory financing program
- [ ] Onboard 5 Mumbai jewelers for beta testing

---

## Author

**Sachin Mittal** — [github.com/sazeleo](https://github.com/sazeleo) · [Website](#)

Trader lineage. 5–6 jeweler contacts in Mumbai. 40-year legacy gemstone dealer in network. Building at the intersection of AI, gemology, and financial infrastructure.

---

*Built in <48 hours during the Claude Hackathon, April 2026.*

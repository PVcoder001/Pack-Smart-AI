# PackAI — AI-Based Intelligent Food Packaging Material Recommendation System

A fully interactive, client-side web application that recommends optimized packaging materials and
specifications for food commodities based on their physical, chemical and biological properties.

## ✨ Features

- **Smart Analyzer** — input form with all required parameters:
  - Commodity category & name (12 categories, 45+ commodities with sensible auto-defaults)
  - Moisture content, oil/fat content, pH, oxygen sensitivity
  - Respiration rate (fresh produce; auto-toggles & auto-fills)
  - Storage type (ambient / chilled / frozen), temperature, relative humidity
  - Desired shelf life, transportation condition, sustainability preference
- **Live validation with constraints** (ranges, storage-type ↔ temperature cross-check, pH bounds,
  moisture+fat sanity, respiration bounds) and friendly inline error messages.
- **AI recommendation engine** (rule-and-score hybrid):
  - Profiles barrier & mechanical requirements from the inputs
  - Scores 12 packaging materials: LDPE, HDPE, BOPP/PP, PET, Metalized PET, Alu Foil Laminate,
    EVOH Coex, PLA/Biodegradable, Micro-Perforated, Nylon Laminate, Coated Paperboard, PVDC Coated
  - Ranks top 3 with AI scores, animated "AI pipeline" visual
- **Packaging specification sheet** — OTR, WVTR, film thickness, sealability, gas permeability,
  mechanical strength, MAP suitability, temperature range, food-contact safety.
- **MAP (Modified Atmosphere Packaging)** — O₂/CO₂/N₂ gas blend + micro-perforation strategy for
  fresh produce, based on respiration rate.
- **Shelf-life forecast** — gauge + text vs. the target shelf life (Q10 model + barrier uplift).
- **Sustainability analysis** — recyclability, eco index, circularity, carbon footprint estimate,
  eco alternative suggestion.
- **Cost estimate** — resin weight, conversion, printing and per-pack cost (₹).
- **QR traceability** — generated QR-style code + JSON payload of the analysis.
- **Downloadable report** — plain-text packaging recommendation report.
- **Material database** — searchable / filterable knowledge base of all 12 materials.
- **Modern UI/UX** — hero, feature cards, 4-step explainer, FAQ accordion, scroll-reveal animations,
  responsive layout, range sliders synced with number inputs.

## 🚀 Run

No build step and no server required — just open `index.html` in any modern browser
(double-click the file). `app.js` and `styles.css` must sit next to `index.html`.

## 📁 Files

| File        | Purpose                                          |
|-------------|--------------------------------------------------|
| `index.html`| Page structure & content                         |
| `styles.css`| Design system, layout, animations, responsiveness|
| `app.js`    | Knowledge base, recommendation engine, rendering |

## 🧠 How the recommendation works

1. `computeRequirements()` converts inputs into barrier needs (0–10) for oxygen, moisture, light,
   strength, seal, cold, eco, cost and breathability.
2. `scoreMaterial()` aligns each material's property profile against those needs with domain weights
   and normalizes to a 0–99 AI score.
3. `predictShelfLife()` forecasts achievable days using a Q10 temperature model plus a barrier uplift
   and fresh-produce respiration factor.
4. Results are ranked, burst into a report dashboard, and downloadable.

## ⚖️ Disclaimer

Recommendations are decision-support estimates generated from domain heuristics and an extensible
material database. Always validate with physical trials and regulatory compliance (FSSAI / FDA / EU)
before commercialization.
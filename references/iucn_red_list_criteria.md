# IUCN Red List Categories and Criteria (Version 3.1)

## Operational Framework

This reference distills IUCN Red List Categories and Criteria (Version 3.1, 2nd edition, 2012) into concrete steps for conceptual extinction-risk assessment. 

## Table of Contents

1. [Category Overview](#category-overview)
2. [The Five Criteria](#the-five-criteria)
3. [Application Workflow](#application-workflow)
4. [Quantitative Thresholds](#quantitative-thresholds)
5. [Common Pitfalls](#common-pitfalls)
6. [Disclaimer Requirements](#disclaimer-requirements)

## Category Overview

### IUCN Red List Categories (hierarchical order)

```
Data Deficient (DD)
  ↓ (insufficient information)
Not Evaluated (NE)
  ↓ (not yet assessed)
Least Concern (LC)
  ↓ (meets none of the threatened criteria)
Near Threatened (NT)
  ↓ (close to qualifying for threatened)
Vulnerable (VU) — Threatened
Endangered (EN) — Threatened
Critically Endangered (CR) — Threatened
Extinct in the Wild (EW)
Extinct (EX)
```

**Key operational principle:** Start by assessing against the threatened categories (VU, EN, CR). If none apply, consider NT (close to qualifying), then LC (meets none). If insufficient data, apply DD.

## The Five Criteria

### Criterion A: Population Reduction

**Operational principle:** Quantify observed, estimated, inferred, or suspected population reduction over specified timeframes.

#### Subcriteria:
- **A1:** Population reduction observed, estimated, inferred, or suspected in the past 10 years or 3 generations (whichever is longer), where the causes of the reduction are clearly reversible AND understood AND have ceased.

**Thresholds:**
- CR: ≥90% reduction
- EN: ≥70% reduction
- VU: ≥50% reduction

- **A2:** Population reduction observed, estimated, inferred, or suspected in the past 10 years or 3 generations (whichever is longer), where the causes of reduction may NOT have ceased OR may NOT be understood OR may be reversible.

**Thresholds:**
- CR: ≥80% reduction
- EN: ≥50% reduction
- VU: ≥30% reduction

- **A3:** Population reduction projected or suspected to be met in the future (10 years or 3 generations), based on (and specifying) any of (b), (c), (d) or (e) below.

**Thresholds:** Same as A2

- **A4:** An observed, estimated, inferred, projected or suspected population reduction where the time period must include both the past and the future, and where the causes of reduction may not have ceased OR may not be understood OR may be reversible.

**Thresholds:** Same as A2

**Causes to specify (b, c, d, e):**
- (b) Direct observation
- (c) An index of abundance appropriate to the taxon
- (d) A decline in area of occupancy (AOO), extent of occurrence (EOO), and/or habitat quality
- (e) Actual or potential levels of exploitation
- (f) The effects of introduced taxa, hybridization, pathogens, pollutants, competitors or parasites.

**Application step-by-step:**
1. Determine the generation length for the species
2. Calculate the appropriate timeframe (10 years or 3 generations, whichever longer)
3. Quantify population reduction over that timeframe
4. Assess whether causes are reversible, understood, and/or ceased
5. Select the appropriate subcriterion (A1-A4)
6. Compare against thresholds (CR≥90%/80%, EN≥70%/50%, VU≥50%/30%)

### Criterion B: Geographic Range

**Operational principle:** Assess both extent of occurrence (EOO) and area of occupancy (AOO) with specific thresholds, plus require two additional conditions.

#### Subcriteria:
- **B1:** Extent of Occurrence (EOO) — the area contained within the shortest continuous imaginary boundary which can be drawn to encompass all the known, inferred or projected sites of present occurrence of a taxon, excluding cases of vagrancy.

**Thresholds:**
- CR: EOO <100 km²
- EN: EOO <5,000 km²
- VU: EOO <20,000 km²

- **B2:** Area of Occupancy (AOO) — the area within its extent of occurrence which is actually occupied by the taxon, excluding cases of vagrancy.

**Thresholds:**
- CR: AOO <10 km²
- EN: AOO <500 km²
- VU: AOO <2,000 km²

**Additional requirements (must meet TWO):**
- (a) Severely fragmented OR number of locations ≤ specified number
  - CR: ≤1 location
  - EN: ≤5 locations
  - VU: ≤10 locations

- (b) Continuing decline in any of: EOO, AOO, area, extent and/or quality of habitat, number of locations or subpopulations, number of mature individuals

- (c) Extreme fluctuation in any of: EOO, AOO, number of locations or subpopulations, number of mature individuals

**Application step-by-step:**
1. Map all known, inferred, or projected occurrence sites
2. Calculate EOO (minimum convex polygon encompassing all sites)
3. Calculate AOO (grid cells where species actually present)
4. Assess population fragmentation and number of locations
5. Evaluate continuing decline in range/habitat/population parameters
6. Check for extreme fluctuations in any parameter
7. Apply thresholds (CR<100/10km², EN<5000/500km², VU<20000/2000km²)
8. Ensure at least TWO additional conditions (a, b, or c) are met

### Criterion C: Small Population and Decline

**Operational principle:** Apply when population size is small AND declining, with specified thresholds.

#### Subcriteria:
- **C1:** Population reduction projected, inferred or suspected to be met in the future (10 years or 3 generations), based on specified causes.

**Thresholds:**
- CR: Population size <250 mature individuals AND ≥25% projected decline in 3 generations or 10 years
- EN: Population size <2,500 mature individuals AND ≥20% projected decline in 5 years or 2 generations
- VU: Population size <10,000 mature individuals AND ≥10% projected decline in 10 years or 3 generations

- **C2:** Population size AND restricted geographic distribution (either (a) or (b) must apply)

**Thresholds:**
- CR: Population size <250 mature individuals AND (a) AOO ≤10 km² OR (b) number of locations ≤1
- EN: Population size <2,500 mature individuals AND (a) AOO ≤500 km² OR (b) number of locations ≤5
- VU: Population size <10,000 mature individuals AND (a) AOO ≤2,000 km² OR (b) number of locations ≤10

**Application step-by-step:**
1. Estimate the number of mature individuals in the population
2. Assess whether population is declining (and rate)
3. For C1: Apply projection thresholds
4. For C2: Assess AOO and number of locations
5. Select C1 or C2 based on available information
6. Compare against thresholds (CR<250, EN<2500, VU<10000 mature individuals)

### Criterion D: Very Small or Restricted Population

**Operational principle:** Apply when population is very small OR distribution is extremely restricted.

#### Subcriteria:
- **D1:** Population size estimated to be below specified threshold.

**Thresholds:**
- CR: <50 mature individuals
- EN: <250 mature individuals
- VU: <1,000 mature individuals

- **D2:** Population with a very restricted area of occupancy (typically AOO <20 km²) OR number of locations (typically ≤5), making it prone to stochastic events.

**Thresholds (applies to VU only):** AOO <20 km² OR number of locations ≤5

**Application step-by-step:**
1. For D1: Count mature individuals; apply thresholds (CR<50, EN<250, VU<1000)
2. For D2: Assess AOO (<20 km² for VU) or number of locations (≤5 for VU)
3. Evaluate susceptibility to stochastic events (demographic, environmental, catastrophic)

### Criterion E: Quantitative Analysis

**Operational principle:** Apply when quantitative modeling (e.g., Population Viability Analysis) indicates specified extinction probability in the wild.

**Thresholds:**
- CR: Probability of extinction in the wild ≥50% within 10 years or 3 generations (whichever longer)
- EN: Probability of extinction in the wild ≥20% within 20 years or 5 generations (whichever longer)
- VU: Probability of extinction in the wild ≥10% within 100 years

**Application step-by-step:**
1. Conduct or review quantitative analysis (PVA, metapopulation models, etc.)
2. Determine the time frame (10 years/3 generations for CR, 20 years/5 generations for EN, 100 years for VU)
3. Extract the probability of extinction in the wild
4. Compare against thresholds (CR≥50%, EN≥20%, VU≥10%)

## Application Workflow

**Step-by-step conceptual assessment process:**

1. **Gather baseline data:**
   - Population size and trend (mature individuals, total population)
   - Generation length for the species
   - Geographic distribution (EOO, AOO)
   - Number of locations and subpopulations
   - Observed threats and their severity
   - Habitat quality and trends

2. **Apply each criterion independently:**
   - Criterion A: Calculate population reduction over appropriate timeframe
   - Criterion B: Calculate EOO and AOO, assess fragmentation and decline
   - Criterion C: Evaluate small population + decline
   - Criterion D: Evaluate very small population or restricted distribution
   - Criterion E: If quantitative analysis available, extract extinction probability

3. **Determine the category:**
   - If ANY criterion qualifies for CR → List as CR (highest threat)
   - Else if ANY criterion qualifies for EN → List as EN
   - Else if ANY criterion qualifies for VU → List as VU
   - Else if nearly qualifies for VU → List as NT
   - Else if clearly does not qualify for threatened → List as LC
   - Else if insufficient data → List as DD

4. **Document the reasoning:**
   - Specify which criterion(s) triggered the category
   - Provide quantitative values and how they were derived
   - List the specific threshold met
   - Include data sources and assumptions

## Quantitative Thresholds Reference Table

| Criterion | Parameter | CR | EN | VU |
|-----------|-----------|----|----|-----|
| **A1** | Population reduction | ≥90% | ≥70% | ≥50% |
| **A2/A3/A4** | Population reduction | ≥80% | ≥50% | ≥30% |
| **B1** | EOO | <100 km² | <5,000 km² | <20,000 km² |
| **B2** | AOO | <10 km² | <500 km² | <2,000 km² |
| **B (a)** | Number of locations | ≤1 | ≤5 | ≤10 |
| **C1** | Mature individuals | <250 | <2,500 | <10,000 |
| **C1** | Projected decline | ≥25% (3 gen) | ≥20% (5 years) | ≥10% (10 years) |
| **D1** | Mature individuals | <50 | <250 | <1,000 |
| **D2** | AOO | N/A | N/A | <20 km² |
| **D2** | Number of locations | N/A | N/A | ≤5 |
| **E** | Extinction probability | ≥50% (10 yrs) | ≥20% (20 yrs) | ≥10% (100 yrs) |

## Common Pitfalls

**1. Using "individuals" instead of "mature individuals"**
- Correction: Specify mature individuals whenever possible; otherwise, state assumptions

**2. Mixing EOO and AOO**
- Correction: EOO = minimum convex polygon; AOO = actually occupied area; calculate separately

**3. Ignoring the "AND" requirements in Criterion C**
- Correction: Must meet BOTH the population-size threshold AND the decline/distribution threshold

**4. Forgetting Criterion B requires TWO additional conditions**
- Correction: Even if EOO/AOO thresholds are met, must also satisfy at least two of (a), (b), or (c)

**5. Applying generation length incorrectly**
- Correction: Use the longer timeframe (10 years OR 3 generations); generation length varies widely by taxa

**6. Not documenting assumptions and data sources**
- Correction: Always specify how values were derived and from what data

**7. Treating "location" and "subpopulation" as synonyms**
- Correction: A "location" is a geographically or ecologically distinct area in which a single threatening event can rapidly affect all individuals; subpopulations are separate breeding groups

## Disclaimer Requirements

**Every assessment must include:**

1. **Standing disclaimer:** This is a conceptual assessment for educational/research purposes, not a formal IUCN Red List assessment.

2. **Formal-assessment referral:** Official IUCN Red List status requires submission to and evaluation by the IUCN Species Survival Commission and relevant Red List Authority.

3. **Data-quality acknowledgment:** The assessment is only as good as the available data; key data gaps should be explicitly listed.

4. **Professional-referral recommendation:** For conservation action, consultation with qualified conservation biologists and compliance with local regulations is essential.

## Example Output Format

```
# IUCN Red List Conceptual Assessment: [Species Name]

## Assessment Summary
**Preliminary Category:** [Category]
**Criterion Applied:** [Specific criterion, e.g., A2c]
**Generation Length:** [X] years
**Assessment Timeframe:** [10 years / 3 generations = X years]

## Criterion-by-Criterion Evaluation

### Criterion A: Population Reduction
- **Population reduction:** [X]% over [timeframe]
- **Basis:** [Direct observation / Index of abundance / AOO decline / Exploitation / etc.]
- **Causes:** [Reversible? / Understood? / Ceased?]
- **Subcriterion:** [A1/A2/A3/A4]
- **Threshold met:** [CR/EN/VU or none]

### Criterion B: Geographic Range
- **EOO:** [X] km² [threshold comparison]
- **AOO:** [X] km² [threshold comparison]
- **Number of locations:** [X] [threshold comparison]
- **Severely fragmented:** [Yes/No]
- **Continuing decline:** [Yes/No — in which parameters]
- **Extreme fluctuation:** [Yes/No — in which parameters]
- **Subcriteria B1/B2:** [met or not met]
- **Additional conditions:** [(a), (b), (c) — which are met]
- **Threshold met:** [CR/EN/VU or none]

[Continue for Criteria C, D, E...]

## Final Category Determination
[The highest qualifying category across all criteria]

## Key Assumptions
[List key assumptions made during assessment]

## Data Gaps and Limitations
[Identify missing or uncertain data]

## Recommended Next Steps
1. [Data collection needed]
2. [Professional consultation recommended]
3. [Formal assessment pathway]

---

**DISCLAIMER:** This is a conceptual assessment for educational and research purposes only. Formal IUCN Red List status determination requires accredited IUCN assessors and submission to the IUCN Species Survival Commission. Conservation action requires qualified conservation biologists and compliance with local, national, and international regulations.
```

---

**Research source:** IUCN (2012). IUCN Red List Categories and Criteria: Version 3.1 (2nd ed.). IUCN Species Survival Commission.

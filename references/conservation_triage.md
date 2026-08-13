# Conservation Triage and Cost-Effectiveness Prioritization

## Operational Framework

This reference operationalizes conservation triage frameworks—systematic approaches to allocating limited conservation resources across species, actions, and places to maximize conservation outcomes. It distills decision-theory principles (Possingham et al. 2001; Joseph et al. 2009) into concrete prioritization steps.

## Table of Contents

1. [Triage Philosophy](#triage-philosophy)
2. [Cost-Effectiveness Framework](#cost-effectiveness-framework)
2. [Prioritization Dimensions](#prioritization-dimensions)
3. [Step-by-Step Prioritization](#step-by-step-prioritization)
4. [Multi-Criteria Decision Analysis](#multi-criteria-decision-analysis)
5. [Portfolio Optimization](#portfolio-optimization)
6. [Implementation Considerations](#implementation-considerations)
7. [Example Application](#example-application)

## Triage Philosophy

### Core Principles

**1. Resources are limited**
- Conservation budgets, personnel, and time are finite
- Cannot save everything—must make strategic choices
- Explicit prioritization is more defensible than implicit choices

**2. Maximize conservation benefit per unit cost**
- Goal is not just to maximize benefit, but benefit per dollar (or per staff hour)
- Cost-effectiveness: (Benefit achieved) ÷ (Cost incurred)
- Highest cost-effectiveness actions should be prioritized

**3. Account for uncertainty and risk**
- Conservation outcomes are uncertain
- Include risk in prioritization (expected benefit = benefit × probability of success)
- Diversify portfolios to manage risk

**4. Consider complementarity and diminishing returns**
- First dollar spent on a species has higher marginal benefit than subsequent dollars
- Actions that complement each other provide more benefit than redundant actions
- Consider synergies and trade-offs across actions

**5. Be transparent and systematic**
- Prioritization criteria and weights should be explicit
- Stakeholders should understand how decisions are made
- Decisions should be reproducible and defensible

### Ethical Considerations

**Cost-effectiveness is not the only value**
- Some species have cultural, aesthetic, or existence value beyond cost-effectiveness
- Some actions are required by law or treaty (cannot be deprioritized)
- Equity considerations: some communities or regions may deserve priority

**Principle:** Use cost-effectiveness analysis to inform decisions, not replace values and judgment

## Cost-Effectiveness Framework

### Basic Formula

**Cost-Effectiveness (CE) = Benefit (B) ÷ Cost (C)**

Where:
- **Benefit (B):** Conservation outcome achieved (e.g., species saved, habitat protected, extinction probability reduced)
- **Cost (C):** Resources expended (financial, staff time, opportunity costs)

### Extended Formula with Risk

**Expected Cost-Effectiveness (ECE) = (Benefit × Probability of Success) ÷ Cost**

Where:
- **Probability of Success (p):** Likelihood that the action will achieve its intended benefit (0 ≤ p ≤ 1)

### Extended Formula with Complementarity

**Marginal Cost-Effectiveness (MCE) = Additional Benefit ÷ Additional Cost**

Where:
- **Additional Benefit:** Benefit added by this action beyond what's already achieved by other actions in the portfolio
- **Additional Cost:** Cost of this action

**Principle:** Prioritize actions with high marginal cost-effectiveness—those that add substantial benefit at relatively low cost, considering what's already being done

## Prioritization Dimensions

### Dimension 1: Species Characteristics

**Extinction Risk**
- **Higher risk = higher priority** (all else equal)
- Red List category: CR > EN > VU > NT > LC
- Population trend: Declining > Stable > Increasing
- Time to extinction: Species with less time deserve priority

**Distinctiveness**
- **Evolutionary distinctiveness:** Species with few close relatives represent unique evolutionary history
- **Phylogenetic diversity:** Prioritize species that add more to total tree of life
- **Functional distinctiveness:** Species with unique ecological roles

**Feasibility of Recovery**
- **Recovery potential:** Species with higher probability of successful recovery
- **Time to recovery:** Species that can recover quickly vs. long-term commitments
- **Cost of recovery:** Species that are cheaper to recover

### Dimension 2: Action Characteristics

**Cost**
- **Financial cost:** Direct budget requirements
- **Staff time:** Personnel requirements
- **Opportunity cost:** What other actions are foregone

**Effectiveness**
- **Expected benefit:** How much extinction risk is reduced
- **Probability of success:** Likelihood of achieving the benefit
- **Time to benefit:** How soon benefits accrue

**Co-benefits**
- **Umbrella species:** Action benefits multiple species
- **Ecosystem services:** Action provides services beyond species conservation
- **Human well-being:** Action benefits local communities

**Irreversibility**
- **Urgency:** Actions that must be taken soon to prevent irreversible loss
- **Windows of opportunity:** Actions that are only feasible now

### Dimension 3: Contextual Factors

**Legal and Policy Commitments**
- **Treaty obligations:** Species covered by international agreements
- **Legal protection:** Species with legal status requiring action
- **Policy priorities:** Species aligned with current policy frameworks

**Social and Cultural Values**
- **Cultural significance:** Species important to local cultures
- **Charisma:** Species that generate public support
- **Flagship potential:** Species that can mobilize conservation funding

**Economic Values**
- **Use value:** Direct economic benefits (ecotourism, harvest)
- **Option value:** Potential future benefits
- **Existence value:** Value of knowing the species exists

### Dimension 4: Geographic Considerations

**Representativeness**
- **Ecoregion representation:** Prioritize species in under-represented ecoregions
- **Habitat type:** Ensure coverage across habitat types

**Concentration of Diversity**
- **Biodiversity hotspots:** Areas with many endemic species
- **Key Biodiversity Areas:** sites of global significance

**Opportunities for Protection**
- **Threat status:** Areas with high threat but also high opportunity
- **Cost of protection:** Areas where conservation is cheaper

## Step-by-Step Prioritization

### Step 1: Define the Scope and Constraints

**Define the prioritization problem:**
```
## Prioritization Scope
- **Objective:** [e.g., Maximize number of species saved with $1M budget]
- **Constraints:**
  - Budget: [Total budget available]
  - Time: [Planning horizon, e.g., 5 years]
  - Capacity: [Staffing, expertise, institutional capacity]
  - Legal: [Species or actions that cannot be deprioritized]
- **Geographic scope:** [Which regions or ecoregions]
- **Taxonomic scope:** [Which taxa, e.g., all mammals, all freshwater fish]
```

### Step 2: Assemble Candidate Species/Actions

**Create a comprehensive list:**
```
## Candidate List
| Species | Current Status | Primary Threats | Recovery Options |
|---------|----------------|-----------------|------------------|
| [Species 1] | [Red List category, trend] | [Threat list] | [Action options] |
| [Species 2] | [Red List category, trend] | [Threat list] | [Action options] |
```

### Step 3: Characterize Each Species/Action

**Gather data on key dimensions:**
```
## Species/Action Characterization
| Species | Extinction Risk | Distinctiveness | Recovery Feasibility | Cost | Effectiveness | Co-benefits |
|---------|----------------|-----------------|----------------------|------|---------------|-------------|
| [Species 1] | [CR/EN/VU, trend] | [Score] | [High/Med/Low] | [$ amount] | [Expected benefit] | [Umbrella, ecosystem services] |
| [Species 2] | [CR/EN/VU, trend] | [Score] | [High/Med/Low] | [$ amount] | [Expected benefit] | [Umbrella, ecosystem services] |
```

### Step 4: Calculate Cost-Effectiveness Scores

**Apply the cost-effectiveness formula:**
```
## Cost-Effectiveness Calculation
| Species | Benefit | Probability | Expected Benefit | Cost | Cost-Effectiveness |
|---------|---------|-------------|------------------|------|-------------------|
| [Species 1] | [e.g., reduce extinction prob. by 50%] | [e.g., 0.7] | [Benefit × Prob.] | [$ amount] | [Expected Benefit ÷ Cost] |
| [Species 2] | [e.g., reduce extinction prob. by 30%] | [e.g., 0.9] | [Benefit × Prob.] | [$ amount] | [Expected Benefit ÷ Cost] |
```

### Step 5: Account for Complementarity

**Calculate marginal benefits:**
```
## Complementarity Analysis
### Scenario A: Save only Species 1
- Cost: $500,000
- Benefit: Prevent 1 extinction (Species 1)
- Cost-effectiveness: 1 extinction prevented per $500,000

### Scenario B: Save only Species 2
- Cost: $200,000
- Benefit: Prevent 1 extinction (Species 2)
- Cost-effectiveness: 1 extinction prevented per $200,000

### Scenario C: Save both Species 1 and 2
- Cost: $700,000 (Species 1 + Species 2 costs)
- Benefit: Prevent 2 extinctions
- Cost-effectiveness: 1 extinction prevented per $350,000

### Marginal Cost-Effectiveness
- Adding Species 1 to a portfolio that already includes Species 2:
  - Additional cost: $500,000
  - Additional benefit: 1 extinction prevented
  - MCE: 1 per $500,000

- Adding Species 2 to a portfolio that already includes Species 1:
  - Additional cost: $200,000
  - Additional benefit: 1 extinction prevented
  - MCE: 1 per $200,000

**Conclusion:** Prioritize Species 2 first, then consider Species 1 if budget allows
```

### Step 6: Apply Multi-Criteria Analysis (if needed)

**When cost-effectiveness is not the only criterion, use MCDA:**
```
## Multi-Criteria Decision Analysis
### Criteria and Weights
| Criterion | Weight | Rationale |
|-----------|--------|-----------|
| Cost-effectiveness | 40% | Maximize conservation return on investment |
| Extinction risk | 25% | Prioritize most threatened species |
| Distinctiveness | 15% | Preserve evolutionary history |
| Feasibility | 10% | Prioritize achievable actions |
| Cultural value | 10% | Respect social values |

### Scoring
For each species/action, score each criterion on a standardized scale (e.g., 0-100 or 1-5).

### Weighted Sum
Calculate overall score: Σ(Scoreᵢ × Weightᵢ)

### Ranking
Rank species/actions by overall score
```

### Step 7: Optimize Portfolio Under Constraints

**Use systematic conservation planning approaches:**
```
## Portfolio Optimization
### Constraint: Budget = $1,000,000

### Option 1: Prioritize by cost-effectiveness alone
- Species 2: $200,000, 1 extinction prevented
- Species 3: $300,000, 1 extinction prevented
- Species 5: $400,000, 1 extinction prevented
- Total: $900,000, 3 extinctions prevented
- Remaining budget: $100,000 (insufficient for next species)

**Portfolio:** {Species 2, 3, 5}
**Outcome:** 3 extinctions prevented for $900,000

### Option 2: Consider complementarity
- Species 2: $200,000, 1 extinction prevented, umbrella for 5 species
- Species 4: $500,000, 1 extinction prevented, umbrella for 10 species
- Total: $700,000, 2 extinctions prevented, 15 species benefiting from umbrella effect
- Remaining budget: $300,000 (could protect habitat for additional species)

**Portfolio:** {Species 2, 4}
**Outcome:** 2 extinctions prevented, 15 species benefiting from umbrella effect

**Conclusion:** Option 2 may be preferred if umbrella benefits are substantial
```

### Step 8: Apply Sensitivity Analysis

**Test robustness of priorities:**
```
## Sensitivity Analysis
### Scenario 1: Base case (current assumptions)
- Priorities: [Ranked list]

### Scenario 2: Budget 50% smaller
- Priorities: [Re-ranked list]
- Questions: How does the priority order change? Which actions are dropped?

### Scenario 3: Probability of success 50% lower
- Priorities: [Re-ranked list]
- Questions: How does reduced success probability affect priorities?

### Scenario 4: Criterion weights changed
- Priorities: [Re-ranked list]
- Questions: How sensitive are priorities to criterion weights?

**Conclusion:** Prioritize actions that are robust across scenarios
```

## Multi-Criteria Decision Analysis

### Weighted Scoring Model

**Step 1: Define criteria and weights**
```
## Criteria Definition
| Criterion | Definition | Scale |
|-----------|------------|-------|
| Extinction risk | Current Red List category and trend | 1 (LC) to 5 (CR) |
| Distinctiveness | Evolutionary distinctiveness score | 1 (low) to 5 (high) |
| Recovery cost | Estimated cost to achieve recovery | 1 (>$1M) to 5 (<$100k) |
| Recovery feasibility | Probability of successful recovery | 1 (<20%) to 5 (>80%) |
| Cultural value | Social and cultural importance | 1 (low) to 5 (high) |
| Umbrella potential | Number of co-occurring threatened species | 1 (0) to 5 (>10) |
```

**Step 2: Assign weights**
```
## Weights
| Criterion | Weight (%) | Rationale |
|-----------|------------|-----------|
| Extinction risk | 25% | Prevent extinctions first |
| Recovery cost | 20% | Maximize return on investment |
| Recovery feasibility | 15% | Prioritize achievable actions |
| Umbrella potential | 15% | Leverage co-benefits |
| Distinctiveness | 10% | Preserve evolutionary history |
| Cultural value | 10% | Respect social values |
| Infeasibility | 5% | Avoid infeasible projects |

**Total: 100%**
```

**Step 3: Score each species/action**
```
## Species Scoring
### Species: Amur leopard (*Panthera pardus orientalis*)

| Criterion | Score (1-5) | Weighted Score (Score × Weight) |
|-----------|-------------|--------------------------------|
| Extinction risk | 5 (CR, declining) | 5 × 0.25 = 1.25 |
| Distinctiveness | 4 (unique subspecies) | 4 × 0.10 = 0.40 |
| Recovery cost | 2 (expensive, >$1M) | 2 × 0.20 = 0.40 |
| Recovery feasibility | 3 (moderate, ~50% success) | 3 × 0.15 = 0.45 |
| Cultural value | 4 (high public interest) | 4 × 0.10 = 0.40 |
| Umbrella potential | 5 (benefits many species) | 5 × 0.15 = 0.75 |
| Infeasibility | 2 (moderately feasible) | 2 × 0.05 = 0.10 |

**Total Score:** 3.75
```

**Step 4: Rank and prioritize**
```
## Ranking
| Rank | Species | Total Score | Key Strengths |
|------|---------|-------------|---------------|
| 1 | [Species name] | [Score] | [High scores on...] |
| 2 | [Species name] | [Score] | [High scores on...] |
...
```

### Analytical Hierarchy Process (AHP)

For more complex decisions, use AHP to systematically compare alternatives:

**Step 1: Structure hierarchy**
- Goal: Choose conservation priorities
- Criteria: Extinction risk, cost, feasibility, etc.
- Alternatives: Species/actions being compared

**Step 2: Pairwise comparisons**
- Compare criteria pairwise to determine weights
- Compare alternatives pairwise for each criterion

**Step 3: Calculate priorities**
- Derive criterion weights from pairwise comparisons
- Derive alternative scores for each criterion
- Calculate overall priorities

**Step 4: Check consistency**
- Ensure comparisons are logically consistent
- Adjust if inconsistency ratio is too high

## Portfolio Optimization

### Marxan and Systematic Conservation Planning

**Principles:**
- Represent all conservation features (species, habitats) at least once
- Minimize total cost of the reserve network
- Account for complementarity (protecting area A reduces need to protect similar area B)

**Inputs:**
- **Feature data:** Distribution maps of species/habitats
- **Cost data:** Cost of protecting each planning unit
- **Targets:** How much of each feature to protect (e.g., 30% of range)
- **Constraints:** Lock-in features (already protected), lock-out features (unprotectable)

**Outputs:**
- **Near-optimal solutions:** Multiple efficient portfolios
- **Irreplaceability:** How often each planning unit appears in solutions
- **Trade-offs:** Visualizing alternative portfolios

### Budget-Constrained Optimization

**Linear programming approach:**

**Objective:** Maximize total conservation benefit
```
Maximize: Σ(Benefitᵢ × Xᵢ)

Subject to:
- Σ(Costᵢ × Xᵢ) ≤ Budget
- Xᵢ ∈ {0, 1} (binary: protect or not)
- [Optional constraints: Must protect certain species, minimum representation, etc.]

Where:
- Benefitᵢ = Expected benefit of protecting species i
- Costᵢ = Cost of protecting species i
- Xᵢ = Decision variable (1 if protected, 0 if not)
```

**Solution approach:**
- Solve linear programming problem
- Identify optimal portfolio
- Test sensitivity to budget and benefit estimates

### Complementarity and Diminishing Returns

**Principle:** First actions have higher marginal benefit than subsequent actions

**Application:**
- When selecting species to protect, prioritize those that add most to portfolio
- Avoid redundant actions (protecting similar species or habitats)
- Diversify across taxa, ecosystems, and threat types

**Example:**
```
## Marginal Benefit Analysis
### Scenario A: Protect nothing
- Total benefit: 0

### Scenario B: Protect Species 1 ($200,000)
- Additional benefit: 10 "benefit units"
- Marginal cost-effectiveness: 10 ÷ $200,000 = 1 per $20,000

### Scenario C: Protect Species 1 + Species 2 ($350,000 total)
- Additional benefit from Species 2: 5 benefit units (Species 2 shares habitat with Species 1)
- Marginal cost-effectiveness of Species 2: 5 ÷ $150,000 = 1 per $30,000

### Scenario D: Protect Species 1 + Species 2 + Species 3 ($450,000 total)
- Additional benefit from Species 3: 8 benefit units (Species 3 adds new habitat)
- Marginal cost-effectiveness of Species 3: 8 ÷ $100,000 = 1 per $12,500

**Conclusion:** Prioritize Species 1 (first), then Species 3 (second), then Species 2 (if budget allows)
```

## Implementation Considerations

### Institutional Capacity

**Assess organizational capacity:**
- **Technical expertise:** Does the organization have the required skills?
- **Financial capacity:** Can the organization sustain long-term funding?
- **Political capital:** Does the organization have the necessary influence?

**Match capacity to actions:**
- High-capacity organizations can undertake complex, multi-species projects
- Low-capacity organizations should focus on simple, achievable actions

### Legal and Policy Frameworks

**Identify constraints:**
- **Protected species:** Legal requirements to protect certain species
- **Protected areas:** Restrictions on what can be done in protected areas
- **Treaty obligations:** International commitments

**Identify opportunities:**
- **Policy windows:** Opportunities created by policy changes
- **Funding mechanisms:** Dedicated funding streams
- **Partnerships:** Opportunities for collaboration

### Stakeholder Engagement

**Identify key stakeholders:**
- Local communities
- Government agencies
- NGOs and civil society
- Private sector

**Engagement strategies:**
- **Participatory planning:** Involve stakeholders in prioritization
- **Benefit-sharing:** Ensure stakeholders receive benefits
- **Conflict resolution:** Address conflicts early and transparently

### Adaptive Management

**Build in learning:**
- **Monitoring:** Track implementation and outcomes
- **Evaluation:** Assess whether priorities are achieving intended outcomes
- **Adaptation:** Adjust priorities based on what's learned

**Trigger mechanisms:**
- **Re-prioritization triggers:** Conditions that trigger re-evaluation
- **Exit criteria:** When to stop investing in an action
- **Escalation criteria:** When to increase investment

## Example Application

### Scenario: Prioritizing 10 Critically Endangered Mammals with $1M Budget

**Candidate Species and Data:**
```
## Species Characterization
| Species | Extinction Risk (trend) | Distinctiveness | Recovery Cost | Recovery Feasibility | Umbrella Potential |
|---------|--------------------------|-----------------|----------------|----------------------|-------------------|
| Javan rhino | CR (declining) | Very high (genus: 1 species) | $500,000 | Low (30%) | High (10+ co-occurring) |
| Vaquita | CR (rapid decline) | High (species: 1 of 2 in genus) | $200,000 | Moderate (50%) | Low (few co-occurring) |
| Amur leopard | CR (stable) | Moderate (subspecies) | $400,000 | Moderate (60%) | Very high (20+ co-occurring) |
| Sumatran orangutan | CR (declining) | High (species: 1 of 2) | $300,000 | Moderate (50%) | Moderate (5-10 co-occurring) |
| [Continue for all 10 species] |
```

**Step 1: Calculate Cost-Effectiveness**
```
## Cost-Effectiveness Analysis
| Species | Benefit (extinction prob. reduction) | Probability | Expected Benefit | Cost | CE (Benefit/$100k) |
|---------|--------------------------------------|-------------|------------------|------|---------------------|
| Javan rhino | 80% | 0.3 | 0.24 | $500k | 0.048 |
| Vaquita | 90% | 0.5 | 0.45 | $200k | 0.225 |
| Amur leopard | 70% | 0.6 | 0.42 | $400k | 0.105 |
| Sumatran orangutan | 60% | 0.5 | 0.30 | $300k | 0.100 |
| [Continue for all species] |
```

**Step 2: Apply Complementarity**
```
## Complementarity Analysis
### Scenario A: Prioritize by CE alone
1. Vaquita: $200k, 0.45 expected benefit, 0.225 CE
2. Amur leopard: $400k, 0.42 expected benefit, 0.105 CE
3. Sumatran orangutan: $300k, 0.30 expected benefit, 0.100 CE
4. [Next species...]
Total cost: $900k, Total expected benefit: 1.17

### Scenario B: Account for umbrella benefits
1. Amur leopard: $400k, 0.42 expected benefit, protects 20+ species → Effective benefit: ~2.0
2. Vaquita: $200k, 0.45 expected benefit, protects few → Effective benefit: 0.5
3. Sumatran orangutan: $300k, 0.30 expected benefit, protects 5-10 species → Effective benefit: ~0.6
Total cost: $900k, Total expected benefit: ~3.1 (with umbrella benefits)

**Conclusion:** Scenario B provides higher total conservation benefit by accounting for co-benefits
```

**Step 3: Apply Multi-Criteria Analysis**
```
## MCDA Scoring (weights: Extinction Risk 30%, Cost 25%, Feasibility 20%, Umbrella 15%, Distinctiveness 10%)
| Species | Extinction Risk (30%) | Cost (25%) | Feasibility (20%) | Umbrella (15%) | Distinctiveness (10%) | Total |
|---------|-----------------------|------------|--------------------|----------------|------------------------|-------|
| Javan rhino | 5 (CR) × 0.3 = 1.5 | 1 (>$500k) × 0.25 = 0.25 | 2 (30%) × 0.2 = 0.4 | 4 (10+) × 0.15 = 0.6 | 5 (very high) × 0.1 = 0.5 | 3.25 |
| Vaquita | 5 (CR) × 0.3 = 1.5 | 3 ($200k) × 0.25 = 0.75 | 3 (50%) × 0.2 = 0.6 | 2 (few) × 0.15 = 0.3 | 4 (high) × 0.1 = 0.4 | 3.55 |
| Amur leopard | 4 (CR, stable) × 0.3 = 1.2 | 2 ($400k) × 0.25 = 0.5 | 4 (60%) × 0.2 = 0.8 | 5 (20+) × 0.15 = 0.75 | 3 (moderate) × 0.1 = 0.3 | 3.55 |
| Sumatran orangutan | 5 (CR) × 0.3 = 1.5 | 3 ($300k) × 0.25 = 0.75 | 3 (50%) × 0.2 = 0.6 | 3 (5-10) × 0.15 = 0.45 | 4 (high) × 0.1 = 0.4 | 3.70 |

**Ranking:** Sumatran orangutan > Vaquita = Amur leopard > Javan rhino
```

**Step 4: Final Portfolio Recommendation**
```
## Recommended Portfolio
**Budget:** $1,000,000

**Selected Actions:**
1. **Amur leopard** ($400,000)
   - Rationale: Highest umbrella potential, good feasibility, protects 20+ species
   - Expected benefit: 0.42 direct, ~2.0 with umbrella

2. **Sumatran orangutan** ($300,000)
   - Rationale: High MCDA score, good complementarity with leopard (different region)
   - Expected benefit: 0.30 direct, ~0.6 with umbrella

3. **Vaquita** ($200,000)
   - Rationale: High urgency, good cost-effectiveness, fills marine gap
   - Expected benefit: 0.45 direct, minimal umbrella

4. **Reserve for other actions** ($100,000)
   - Rationale: Maintain flexibility for emerging opportunities or emergencies

**Total expected benefit (with umbrella): ~3.05 extinctions prevented**

**Key justifications:**
- Balances cost-effectiveness with umbrella benefits
- Represents geographic and taxonomic diversity
- Includes both high-urgency and high-feasibility actions
- Maintains reserve for adaptive management

**Monitoring triggers:**
- If Amur leopard population >500 individuals in 5 years: Shift funding to other species
- If Vaquita population <10 individuals: Re-evaluate feasibility (may be beyond recovery)
- If new funding becomes available: Add next-ranked species (Javan rhino or other)
```

---

**Research sources:** Joseph et al. (2009). Prioritizing conservation efforts. In Conservation Biology for All; Possingham et al. (2001). Making Smart Conservation Decisions. In Conservation Biology: Research Priorities for the Next Decade; Murdoch et al. (2007). Maximizing return on conservation investment. Conservation Biology.

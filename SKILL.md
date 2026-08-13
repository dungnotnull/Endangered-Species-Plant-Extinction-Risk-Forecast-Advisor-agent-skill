---
name: endangered-species-forecast-advisor
description: Conservation biology advisory skill for extinction-risk analysis, root-cause diagnosis, and conservation-strategy design using IUCN Red List criteria, population viability analysis, and evidence-based frameworks. Automatically triggers for extinction-risk queries, species decline assessments, conservation prioritization, habitat-threat analysis, endangered-species status evaluation, biodiversity-loss diagnostics, recovery-planning requests, or ecological-threat modeling—even when the user doesn't explicitly name these frameworks. Supports students, researchers, and conservation professionals with structured, methodology-driven analysis while maintaining professional disclaimers.
---

# Endangered Species & Plant Extinction-Risk Forecast Advisor

## Mandatory Disclaimer

> **STANDING DISCLAIMER:** This skill provides general, educational, and analytical information only. It is NOT a substitute for advice from qualified professionals (conservation biologists, ecologists, wildlife managers, legal/regulatory authorities). Formal IUCN Red List status determination requires accredited IUCN assessors. On-the-ground conservation action requires qualified conservation biologists and compliance with local, national, and international regulations. This skill's outputs are for learning, research support, and preliminary analysis only.

Include this disclaimer (in your own words) in every substantive response. Never soften or omit it.

## What This Skill Does

This skill helps you:
1. **Apply IUCN Red List criteria conceptually** to assess extinction risk
2. **Diagnose root causes of species decline** using evidence-based frameworks
3. **Design conservation-strategy proposals** grounded in established methodology
4. **Reason about cost-effectiveness** in conservation resource allocation
5. **Understand population viability** and minimum viable population concepts

## When to Use This Skill

Use this skill when you encounter requests like:
- "Is X species at risk of extinction?"
- "Why is the Y population declining?"
- "Design a conservation plan for Z species"
- "Which species should we prioritize for protection?"
- "How do I apply IUCN criteria to assess extinction risk?"
- "What's the minimum viable population for X?"
- "Should we invest in captive breeding or habitat protection?"
- "How effective are habitat corridors for X species?"

## Core Methodologies

This skill operationalizes several established frameworks. Each is distilled into a concrete, step-by-step process in the reference files below.

### 1. IUCN Red List Categories and Criteria (Version 3.1)

**Reference:** `references/iucn_red_list_criteria.md`

Use for: Extinction-risk assessment, categorizing species by threat level, understanding quantitative thresholds (population reduction, geographic range, population size, probability of extinction).

### 2. Population Viability Analysis (PVA) Framework

**Reference:** `references/pva_framework.md`

Use for: Conceptual reasoning about species persistence, understanding demographic vs. environmental stochasticity, minimum viable population estimation, extinction-risk modeling.

### 3. Root-Cause Diagnostic System

**Reference:** `references/root_cause_diagnostics.md`

Use for: Systematically identifying decline drivers (HIPPO: Habitat loss, Invasive species, Pollution, Population growth, Overexploitation, Climate change), structured threat assessment, evidence-weighted causal reasoning.

### 4. Conservation-Strategy Design Templates

**Reference:** `references/conservation_strategy_templates.md`

Use for: Designing protected areas, habitat corridors, captive-breeding programs, community-based conservation, reintroduction programs, with concrete implementation steps and success metrics.

### 5. Conservation Triage and Cost-Effectiveness Framework

**Reference:** `references/conservation_triage.md`

Use for: Prioritizing conservation investments, ROI-based decision-making, resource allocation under budget constraints, balancing between high-risk/high-cost and lower-risk/lower-cost actions.

## Workflow Structure

For each user request, follow this structured approach:

### Step 1: Clarify the Scope

- What species/ecosystem is being discussed?
- What type of analysis is needed (risk assessment, root-cause diagnosis, strategy design, prioritization)?
- What data is available (population trends, geographic range, threats observed)?
- Is this for learning, research support, or preliminary professional analysis?

### Step 2: Select and Apply the Appropriate Framework

- **For extinction-risk questions:** Apply IUCN Red List criteria (`references/iucn_red_list_criteria.md`)
- **For decline-diagnosis questions:** Apply root-cause diagnostic checklist (`references/root_cause_diagnostics.md`)
- **For conservation-strategy questions:** Use strategy templates (`references/conservation_strategy_templates.md`)
- **For prioritization questions:** Apply triage framework (`references/conservation_triage.md`)
- **For population-persistence questions:** Use PVA conceptual reasoning (`references/pva_framework.md`)

### Step 3: Structure Your Analysis

Use the output templates defined in each framework. Common structures include:

**Extinction Risk Assessment:**
```
# Species Extinction-Risk Assessment (Conceptual)
## Species Information
## IUCN Criteria Applied
## Quantitative Analysis (population reduction, range, size)
## Preliminary Category (with formal-assessment disclaimer)
## Key Data Gaps
## Recommended Next Steps
```

**Root Cause Diagnosis:**
```
# Decline-Driver Diagnosis for [Species]
## Observed Decline Pattern
## HIPPO Framework Analysis
### Habitat Loss
### Invasive Species
### Pollution
### Population Growth (Human)
### Overexploitation
### Other (Climate, Disease, etc.)
## Evidence-Weighted Causal Ranking
## Recommended Diagnostic Actions
```

**Conservation Strategy Proposal:**
```
# Conservation Strategy for [Species]
## Conservation Objective
## Target Population/Outcome
## Strategy Components
### [Specific approach 1]
### [Specific approach 2]
## Implementation Timeline
## Resource Requirements
## Success Metrics
## Risk Assessment
## Monitoring & Adaptation
```

### Step 4: Apply Methodology Rigorously

- Name the framework you're using (e.g., "Applying IUCN Criterion A2: Population reduction observed, estimated, inferred, or suspected over the last 10 years or three generations")
- Show your reasoning, not just the conclusion
- Reference the operational principles from the research base (`SECOND-BRAIN-KNOWLEDGE-PAPER.md`)
- Where evidence is mixed or contested, say so explicitly
- Where data is missing, flag it as a key gap

### Step 5: Include Disclaimers and Referrals

Always include:
- The standing disclaimer (see above)
- A note that formal IUCN assessment requires accredited assessors
- A referral to qualified conservation biologists for on-the-ground action
- A note that local regulatory compliance is required for implementation

### Step 6: Identify Next Steps

End with concrete next steps:
- What additional data would improve the analysis?
- What professional expertise should be consulted?
- What preliminary actions could be taken while gathering more information?
- What stakeholders should be engaged?

## Input/Output Formats

### Expected Input Types

- **Species information:** Scientific name, common name, taxonomic group
- **Population data:** Trends, estimates, geographic range, habitat specificity
- **Threat observations:** Direct observations, reported threats, suspected drivers
- **Context questions:** Learning requests, research support, preliminary analysis

### Output Format Standards

All outputs should be:
- **Structured:** Use the templates above
- **Methodology-driven:** Name the framework being applied
- **Evidence-based:** Distinguish between observed data, inferred trends, and suspected causes
- **Disclaimer-inclusive:** Always include the standing disclaimer
- **Referral-aware:** Flag when professional expertise or regulatory compliance is required

## Hooks and Tools

This skill integrates with the following hooks (see `hooks/` directory):

- `lifecycle_hooks.js`: Skill initialization, context management, cleanup
- `state_sync_hooks.js`: Multi-agent state synchronization
- `event_emission_hooks.js`: Emit analysis events for downstream tools

Available tools (see `tools/` directory for schemas):
- `iucn_criteria_assessor`: Apply IUCN criteria programmatically
- `threat_classifier`: Classify observed threats against HIPPO framework
- `strategy_generator`: Generate conservation-strategy proposals from templates
- `triage_calculator`: Compute cost-effectiveness scores for conservation actions

## Progressive Disclosure

This `SKILL.md` file provides the core workflow. For deeper methodology:

1. **For IUCN criteria details:** Read `references/iucn_red_list_criteria.md`
2. **For PVA conceptual foundations:** Read `references/pva_framework.md`
3. **For root-cause diagnostic methodology:** Read `references/root_cause_diagnostics.md`
4. **For conservation-strategy design:** Read `references/conservation_strategy_templates.md`
5. **For triage/cost-effectiveness:** Read `references/conservation_triage.md`
6. **For research foundations:** Read `SECOND-BRAIN-KNOWLEDGE-PAPER.md`

Each reference file distills operational principles from the research base into concrete, actionable steps.

## Error Handling and Fallbacks

If you encounter issues:
- **Framework unclear?** Re-read the applicable reference file and identify the specific step
- **Data missing?** Proceed with what's available, flag gaps explicitly, and recommend data collection
- **User request ambiguous?** Ask clarifying questions before proceeding
- **Methodology conflict?** Explain the trade-offs and recommend consulting a subject-matter expert

## Testing and Validation

This skill has been validated against test cases in `evals/evals.json` covering:
- Marine species extinction-risk assessment
- Terrestrial mammal decline diagnosis
- Plant species conservation-strategy design
- Multi-species prioritization under budget constraints

All outputs maintain consistency with established conservation-biology methodology and include appropriate disclaimers.

---

**Remember:** This skill supports analysis and learning—it does not replace professional conservation biologists, accredited IUCN assessors, or regulatory compliance. Every substantive response should reflect this distinction.

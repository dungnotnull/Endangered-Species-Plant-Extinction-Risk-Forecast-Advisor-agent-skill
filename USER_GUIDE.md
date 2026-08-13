# USER_GUIDE.md — Endangered Species Forecast Advisor

## Quick Start Guide

### Installation

**For Claude Code:**
```bash
# Copy the skill directory to your skills folder
cp -r endangered-species-forecast-advisor ~/.claude/skills/

# Or install from package (when published)
claude skill install endangered-species-forecast-advisor
```

**For API Integration:**
```bash
# Install SDK
npm install @endangered-species/advisor-sdk

# Or Python
pip install endangered-species-advisor
```

---

## Basic Usage

### As a Claude Skill

The skill automatically triggers for conservation-related queries:

```
"Assess the extinction risk of the Amur leopard"
"Why is staghorn coral declining?"
"Design a conservation strategy for Javan rhinos"
"Prioritize conservation investments with $1M budget"
```

### As an API Client

**JavaScript Example:**
```javascript
const Advisor = require('@endangered-species/advisor-sdk');

const client = new Advisor({
  apiKey: 'your-api-key',
  baseURL: 'https://api.endangered-species-advisor.org/v1'
});

// Perform IUCN assessment
const assessment = await client.assess.iucn({
  species: 'Panthera pardus orientalis',
  populationData: {
    populationSize: 80,
    populationTrend: 'stable',
    generationLength: 8,
    // ... more parameters
  }
});

console.log(assessment.assessedCategory); // 'CR'
```

**Python Example:**
```python
from endangered_species_advisor import Client

client = Client(api_key='your-api-key')

# Diagnose threats
diagnosis = client.assess.threats({
    'species': 'Acropora cervicornis',
    'observed_threats': [
        {
            'threat_description': 'Bleaching events',
            'threat_category': 'climateChange',
            'severity': 'critical'
        }
    ]
})

print(diagnosis['threat_ranking'])
```

---

## Feature Overview

### 1. Extinction Risk Assessment

Assess species against IUCN Red List criteria:

**Input:**
- Population size and trend
- Generation length
- Geographic range (EOO, AOO)
- Threat information

**Output:**
- IUCN category (CR, EN, VU, NT, LC)
- Criteria applied
- Detailed rationale
- Data gaps identified

**Use cases:**
- Preliminary Red List assessments
- Educational analysis
- Research support

### 2. Root Cause Diagnosis

Identify drivers of species decline:

**Input:**
- Observed threats
- Decline pattern
- Evidence strength

**Output:**
- HIPPO framework classification
- Causal importance ranking
- Threat interactions
- Recommended investigations

**Use cases:**
- Understanding why species are declining
- Designing targeted interventions
- Research direction

### 3. Strategy Design

Generate conservation action plans:

**Input:**
- Threat diagnosis
- Budget and timeframe
- Constraints and options

**Output:**
- Comprehensive strategy
- Implementation phasing
- Monitoring framework
- Cost estimates

**Use cases:**
- Conservation planning
- Grant proposal development
- Management planning

### 4. Conservation Prioritization

Optimize resource allocation:

**Input:**
- Species list with attributes
- Budget constraints
- Optimization criteria

**Output:**
- Optimal portfolio
- Cost-effectiveness analysis
- Sensitivity analysis
- Alternative scenarios

**Use cases:**
- Funding decisions
- Species triage
- Portfolio management

---

## Advanced Usage

### Custom Configuration

```javascript
const client = new Advisor({
  apiKey: 'your-api-key',
  config: {
    assessmentYear: 2024,
    assessmentRegion: 'global',
    confidenceLevel: 'high',
    frameworks: {
      iucn_red_list: { enabled: true },
      pva: { enabled: true, timeHorizon: 100 }
    }
  }
});
```

### Batch Processing

```javascript
// Submit multiple assessments
const batch = await client.batch.assess({
  assessments: [
    { id: '1', species: 'Species 1', populationData: {...} },
    { id: '2', species: 'Species 2', populationData: {...} }
  ],
  callbackUrl: 'https://your-server.com/callback'
});

// Check status
const status = await client.batch.getStatus(batch.batchId);
```

### Custom Frameworks

```javascript
// Use only specific frameworks
const assessment = await client.assess.iucn({
  species: 'Panthera pardus orientalis',
  populationData: {...},
  frameworks: ['iucn_red_list', 'root_cause_diagnostics']
});
```

---

## Best Practices

### 1. Data Quality

**Best:**
- Use primary data sources (field surveys, monitoring)
- Specify generation length
- Quantify uncertainty
- Document assumptions

**Avoid:**
- Guessing population parameters
- Ignoring data gaps
- Mixing different population units

### 2. Interpretation

**Best:**
- Review data gaps section
- Consider confidence levels
- Validate assumptions
- Consult specialists for formal assessments

**Avoid:**
- Treating conceptual assessments as formal Red List listings
- Implementing actions without expert consultation
- Ignoring uncertainty ranges

### 3. Integration

**Best:**
- Combine multiple frameworks for comprehensive analysis
- Use output to inform specialist assessments
- Document methodology in reports

**Avoid:**
- Relying on single-framework outputs
- Presenting as definitive without context

---

## Common Use Cases

### Use Case 1: Rapid Assessment

**Scenario:** Need quick extinction risk evaluation for a report

**Workflow:**
1. Gather basic population data
2. Run IUCN assessment
3. Review category and rationale
4. Document assumptions
5. Present with disclaimers

### Use Case 2: Conservation Planning

**Scenario:** Designing a recovery plan for a threatened species

**Workflow:**
1. Run threat diagnosis
2. Identify primary drivers
3. Generate conservation strategy
4. Optimize with cost-effectiveness
5. Develop monitoring framework

### Use Case 3: Funding Decisions

**Scenario:** Allocating limited conservation budget

**Workflow:**
1. Compile candidate species list
2. Run prioritization analysis
3. Review sensitivity analysis
4. Document trade-offs
5. Make allocation decision

### Use Case 4: Research Support

**Scenario:** Understanding factors affecting species persistence

**Workflow:**
1. Run PVA conceptual analysis
2. Identify key extinction drivers
3. Quantify uncertainty
4. Recommend research priorities
5. Publish with methodology

---

## Output Interpretation

### IUCN Categories

- **CR (Critically Endangered):** Extremely high risk of extinction in wild
- **EN (Endangered):** High risk of extinction in wild
- **VU (Vulnerable):** High risk of extinction in wild
- **NT (Near Threatened):** Close to qualifying for threatened
- **LC (Least Concern):** Does not qualify for threatened

### Threat Ranking

Higher scores = greater causal importance
- 80-100: Primary driver
- 60-79: Important contributor
- 40-59: Minor contributor
- <40: Uncertain importance

### Cost-Effectiveness

Higher values = more conservation benefit per dollar
- Consider both direct and umbrella benefits
- Account for uncertainty and feasibility

---

## Troubleshooting

### Issue: Assessment returns Data Deficient

**Cause:** Insufficient data to meet any threatened criteria

**Solution:**
- Add more population data
- Specify generation length
- Provide range estimates

### Issue: Inconsistent results across runs

**Cause:** Different parameters or framework versions

**Solution:**
- Document all input parameters
- Use consistent configuration
- Check framework versions

### Issue: Strategy seems generic

**Cause:** Limited threat specificity or budget constraints

**Solution:**
- Provide detailed threat diagnosis
- Add specific constraints
- Increase budget if feasible

---

## Examples

### Example 1: Marine Coral Assessment

```
"Assess the extinction risk of elkhorn coral (Acropora palmata) in the Caribbean. 
The population has declined by 80% over the past 30 years due to bleaching 
and disease. Remaining populations are fragmented and isolated."
```

**Output includes:**
- IUCN category assessment (likely EN or CR)
- Criteria applied (A2, B2)
- Rationale with quantitative thresholds
- Data gaps (exact AOO, generation length)

### Example 2: Terrestrial Mammal Strategy

```
"Design a conservation strategy for the snow leopard. Primary threats are 
poaching, habitat loss from mining, and climate change reducing prey 
availability. Budget is $2 million over 10 years."
```

**Output includes:**
- Protected area network design
- Anti-poaching measures
- Climate adaptation strategies
- Implementation timeline
- Monitoring framework

### Example 3: Multi-Species Prioritization

```
"With $500,000 to protect Critically Endangered birds in Southeast Asia, 
which 5 species should we prioritize? Consider extinction risk, cost, 
umbrella benefits, and cultural importance."
```

**Output includes:**
- Ranked species list
- Cost-effectiveness analysis
- Optimal portfolio under budget
- Sensitivity to budget changes
- Alternative portfolios

---

## Support Resources

- **Documentation:** https://docs.endangered-species-advisor.org
- **API Reference:** https://docs.endangered-species-advisor.org/api
- **Examples:** https://github.com/endangered-species/advisor/examples
- **Community Forum:** https://community.endangered-species-advisor.org
- **Support Email:** support@endangered-species-advisor.org

---

## Tips for Success

1. **Start with good data:** Quality input determines quality output
2. **Document everything:** Track data sources, assumptions, decisions
3. **Use multiple frameworks:** Comprehensive analysis requires multiple approaches
4. **Review disclaimers:** Understand the limitations and appropriate uses
5. **Consult experts:** This tool supports, not replaces, professional expertise

---

## Version History

- **v1.0.0** (2024-08-04): Initial production release

---

**Document Version:** 1.0.0  
**Last Updated:** 2026-08-04

# API Documentation — Endangered Species Forecast Advisor

## Version: 1.0.0
## Last Updated: 2026-08-04

---

## Overview

This API documentation describes the programmatic interfaces for the Endangered Species & Plant Extinction-Risk Forecast Advisor system. The system provides RESTful endpoints for conservation assessment, threat diagnosis, strategy design, and prioritization.

---

## Base URL

```
Development: http://localhost:3000/api/v1
Production: https://api.endangered-species-advisor.org/v1
```

---

## Authentication

All endpoints require API authentication using Bearer tokens.

```
Authorization: Bearer YOUR_API_KEY
```

### Obtaining an API Key

1. Register at https://portal.endangered-species-advisor.org
2. Navigate to API Keys section
3. Generate new API key with appropriate scopes

### Rate Limits

- **Free Tier:** 100 requests/minute, 10,000 requests/day
- **Professional:** 1,000 requests/minute, 100,000 requests/day
- **Enterprise:** Custom limits

---

## Endpoints

### 1. Assessment Endpoints

#### POST /assess/iucn

Perform IUCN Red List criteria assessment for a species.

**Request Body:**
```json
{
  "species": "Panthera pardus orientalis",
  "populationData": {
    "populationSize": 80,
    "populationTrend": "stable",
    "generationLength": 8,
    "populationReduction": 85,
    "reductionPeriod": 15,
    "reductionCauses": ["habitatLoss", "overexploitation"],
    "causesReversible": false,
    "causesUnderstood": true,
    "causesCeased": false,
    "extentOfOccurrence": 8000,
    "areaOfOccupancy": 1200,
    "numberOfLocations": 3,
    "severelyFragmented": true,
    "continuingDecline": ["areaOfOccupancy", "habitatQuality"]
  },
  "assessmentParameters": {
    "assessmentYear": 2024,
    "regionalPopulation": false
  },
  "metadata": {
    "assessor": "user@example.com",
    "dataSources": ["fieldSurvey2023", "literatureReview"],
    "confidenceLevel": "medium"
  }
}
```

**Response (200 OK):**
```json
{
  "species": "Panthera pardus orientalis",
  "assessedCategory": "CR",
  "criteriaApplied": ["B2ab(iii)"],
  "criterionResults": {
    "criterionA": {
      "evaluated": true,
      "thresholdMet": "EN",
      "rationale": "..."
    },
    "criterionB": {
      "evaluated": true,
      "thresholdMet": "CR",
      "rationale": "..."
    }
  },
  "rationale": "Based on the evaluation...",
  "dataGaps": [],
  "assumptions": [],
  "recommendations": [],
  "disclaimer": "...",
  "assessmentMetadata": {
    "assessedDate": "2024-08-04T10:30:00Z",
    "assessor": "user@example.com"
  }
}
```

**Error Responses:**
- 400 Bad Request: Invalid input data
- 401 Unauthorized: Invalid API key
- 422 Unprocessable Entity: Data validation failed
- 500 Internal Server Error: Assessment processing error

---

#### POST /assess/threats

Diagnose root causes of species decline using HIPPO framework.

**Request Body:**
```json
{
  "species": "Acropora cervicornis",
  "observedThreats": [
    {
      "threatDescription": "Bleaching events increasing",
      "threatCategory": "climateChange",
      "severity": "critical",
      "spatialExtent": "widespread",
      "temporalPattern": "ongoing",
      "evidenceStrength": "strong",
      "trend": "increasing",
      "managementStatus": "unmanaged"
    },
    {
      "threatDescription": "White band disease outbreaks",
      "threatCategory": "disease",
      "severity": "high",
      "spatialExtent": "range-wide",
      "temporalPattern": "ongoing",
      "evidenceStrength": "strong",
      "trend": "stable",
      "managementStatus": "unmanaged"
    }
  ],
  "declinePattern": {
    "temporal": "accelerating",
    "spatial": "range-wide",
    "demographic": "all life stages"
  }
}
```

**Response (200 OK):**
```json
{
  "species": "Acropora cervicornis",
  "classifiedThreats": [
    {
      "category": "climateChange",
      "subcategories": ["oceanWarming", "bleaching"],
      "severity": "critical",
      "evidenceStrength": "strong",
      "causalImportance": 95,
      "mechanism": "Thermal stress causes coral bleaching and mortality",
      "proximateCause": true,
      "ultimateCause": false
    }
  ],
  "threatRanking": [
    {
      "rank": 1,
      "threat": "climateChange",
      "score": 95,
      "confidence": "high"
    },
    {
      "rank": 2,
      "threat": "disease",
      "score": 85,
      "confidence": "high"
    }
  ],
  "threatInteractions": [
    {
      "threat1": "climateChange",
      "threat2": "disease",
      "interactionType": "synergistic",
      "description": "Thermal stress increases disease susceptibility"
    }
  ],
  "dataGaps": [],
  "recommendedInvestigations": []
}
```

---

### 2. Strategy Endpoints

#### POST /strategy/generate

Generate conservation strategy proposals based on diagnosis.

**Request Body:**
```json
{
  "species": "Panthera pardus orientalis",
  "diagnosis": {
    "primaryThreats": ["habitatLoss", "poaching"],
    "threatRanking": [
      {"threat": "habitatLoss", "score": 90},
      {"threat": "poaching", "score": 85}
    ],
    "threatInteractions": []
  },
  "strategyType": "integrated",
  "constraints": {
    "budget": 5000000,
    "timeframe": 10,
    "feasibility": "medium",
    "stakeholderSupport": "medium"
  },
  "options": {
    "includeMonitoring": true,
    "includeAdaptiveManagement": true,
    "includeCostBreakdown": true,
    "detailLevel": "comprehensive"
  }
}
```

**Response (200 OK):**
```json
{
  "species": "Panthera pardus orientalis",
  "strategyType": "integrated",
  "conservationObjectives": [
    "Achieve self-sustaining population of 200 mature individuals by 2034"
  ],
  "strategyComponents": [
    {
      "component": "protectedArea",
      "description": "Establish protected area network...",
      "threatsAddressed": ["habitatLoss"],
      "actions": [...],
      "expectedOutcomes": [...],
      "successMetrics": [...]
    }
  ],
  "implementationPhasing": [...],
  "monitoringFramework": {...},
  "adaptiveManagement": {...},
  "costEstimate": {
    "totalBudget": 5000000,
    "annualBudget": [...],
    "costBreakdown": [...]
  },
  "feasibilityAssessment": {...},
  "risksAndUncertainties": [...],
  "disclaimer": "..."
}
```

---

### 3. Prioritization Endpoints

#### POST /triage/optimize

Compute conservation prioritization under budget constraints.

**Request Body:**
```json
{
  "speciesList": [
    {
      "species": "Panthera pardus orientalis",
      "extinctionRisk": "CR",
      "populationTrend": "stable",
      "distinctiveness": 75,
      "recoveryCost": 400000,
      "recoveryFeasibility": 60,
      "umbrellaPotential": 20,
      "culturalValue": 85,
      "expectedBenefit": 70
    }
  ],
  "constraints": {
    "budget": 1000000,
    "timeframe": 10,
    "minimumSpecies": 3,
    "requiredSpecies": [],
    "excludedSpecies": []
  },
  "optimizationOptions": {
    "objective": "maximizeBenefit",
    "accountForComplementarity": true,
    "accountForUmbrella": true,
    "riskTolerance": "medium",
    "diversification": false
  },
  "criteriaWeights": {
    "extinctionRisk": 25,
    "distinctiveness": 10,
    "costEffectiveness": 20,
    "feasibility": 15,
    "umbrella": 15,
    "cultural": 10,
    "infeasibility": 5
  }
}
```

**Response (200 OK):**
```json
{
  "selectedPortfolio": [
    {
      "species": "Panthera pardus orientalis",
      "investment": 400000,
      "expectedBenefit": 70,
      "umbrellaBenefit": 20,
      "costEffectiveness": 0.000175,
      "score": 72.5
    }
  ],
  "optimizationResults": {
    "totalInvestment": 1000000,
    "remainingBudget": 0,
    "totalExpectedBenefit": 250,
    "speciesProtected": 3,
    "umbrellaSpeciesProtected": 45,
    "optimizationScore": 0.00025
  },
  "alternativePortfolios": [...],
  "sensitivityAnalysis": [...],
  "ranking": [...],
  "assumptions": [...],
  "recommendations": [...]
}
```

---

### 4. Batch Processing Endpoints

#### POST /batch/assess

Submit multiple species for batch assessment.

**Request Body:**
```json
{
  "assessments": [
    {
      "id": "assessment-1",
      "species": "Species 1",
      "populationData": {...}
    },
    {
      "id": "assessment-2",
      "species": "Species 2",
      "populationData": {...}
    }
  ],
  "callbackUrl": "https://your-server.com/callback"
}
```

**Response (202 Accepted):**
```json
{
  "batchId": "batch-abc123",
  "status": "processing",
  "submittedAt": "2024-08-04T10:30:00Z",
  "estimatedCompletion": "2024-08-04T11:00:00Z",
  "assessmentCount": 2
}
```

---

#### GET /batch/{batchId}

Retrieve batch assessment status.

**Response (200 OK):**
```json
{
  "batchId": "batch-abc123",
  "status": "completed",
  "submittedAt": "2024-08-04T10:30:00Z",
  "completedAt": "2024-08-04T10:55:00Z",
  "assessments": [
    {
      "id": "assessment-1",
      "status": "completed",
      "result": {...}
    },
    {
      "id": "assessment-2",
      "status": "completed",
      "result": {...}
    }
  ]
}
```

---

### 5. Data Management Endpoints

#### GET /data/species/{speciesName}

Retrieve species profile data.

**Response (200 OK):**
```json
{
  "species": "Panthera pardus orientalis",
  "commonName": "Amur leopard",
  "taxonomy": {
    "kingdom": "Animalia",
    "phylum": "Chordata",
    "class": "Mammalia",
    "order": "Carnivora",
    "family": "Felidae",
    "genus": "Panthera",
    "species": "P. pardus"
  },
  "redListStatus": {
    "category": "CR",
    "year": 2015,
    "criteria": "A2bc",
    "trend": "stable"
  },
  "populationData": {
    "populationSize": "80-100 mature individuals",
    "generationLength": 8
  },
  "distribution": {
    "countries": ["China", "Russia", "North Korea"],
    "extentOfOccurrence": 8000,
    "areaOfOccupancy": 1200
  },
  "threats": [
    "Habitat loss and fragmentation",
    "Poaching and illegal wildlife trade",
    "Prey depletion"
  ],
  "lastUpdated": "2024-08-04"
}
```

---

#### POST /data/species

Create or update species profile data.

**Request Body:**
```json
{
  "species": "New species",
  "commonName": "Common name",
  "taxonomy": {...},
  "populationData": {...},
  "distribution": {...},
  "threats": [...]
}
```

**Response (201 Created):**
```json
{
  "species": "New species",
  "created": true,
  "createdAt": "2024-08-04T10:30:00Z",
  "version": 1
}
```

---

### 6. System Endpoints

#### GET /system/health

Check system health and availability.

**Response (200 OK):**
```json
{
  "status": "healthy",
  "timestamp": "2024-08-04T10:30:00Z",
  "services": {
    "api": "operational",
    "database": "operational",
    "cache": "operational",
    "queue": "operational"
  },
  "version": "1.0.0",
  "environment": "production"
}
```

---

#### GET /system/metrics

Retrieve system performance metrics.

**Response (200 OK):**
```json
{
  "timestamp": "2024-08-04T10:30:00Z",
  "requests": {
    "total": 1000000,
    "perMinute": 500,
    "successRate": 0.995
  },
  "performance": {
    "averageResponseTime": 250,
    "p50ResponseTime": 200,
    "p95ResponseTime": 500,
    "p99ResponseTime": 1000
  },
  "resources": {
    "cpu": 45,
    "memory": 60,
    "disk": 30
  }
}
```

---

## Error Response Format

All error responses follow this format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {
      "field": "Specific field that caused error",
      "value": "Invalid value",
      "constraint": "Constraint that was violated"
    },
    "requestId": "unique-request-id",
    "timestamp": "2024-08-04T10:30:00Z"
  }
}
```

### Common Error Codes

| Code | Description | HTTP Status |
|------|-------------|-------------|
| INVALID_INPUT | Input validation failed | 400 |
| UNAUTHORIZED | Invalid or missing API key | 401 |
| FORBIDDEN | Insufficient permissions | 403 |
| NOT_FOUND | Resource not found | 404 |
| RATE_LIMIT_EXCEEDED | Rate limit exceeded | 429 |
| INTERNAL_ERROR | Internal server error | 500 |
| SERVICE_UNAVAILABLE | Service temporarily unavailable | 503 |

---

## Webhooks

### Callback URL Format

When submitting batch jobs, specify a callback URL for results:

```json
{
  "callbackUrl": "https://your-server.com/callback",
  "callbackHeaders": {
    "Authorization": "Bearer your-webhook-secret"
  }
}
```

### Webhook Payload

```json
{
  "batchId": "batch-abc123",
  "status": "completed",
  "completedAt": "2024-08-04T10:55:00Z",
  "resultsUrl": "https://api.endangered-species-advisor.org/v1/batch/batch-abc123/results",
  "assessmentCount": 2,
  "successCount": 2,
  "failureCount": 0
}
```

---

## Rate Limiting

Rate limits use the token bucket algorithm:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 950
X-RateLimit-Reset: 1691234567
```

When rate limited:
```
HTTP/1.1 429 Too Many Requests
Content-Type: application/json

{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Try again in 60 seconds.",
    "retryAfter": 60
  }
}
```

---

## Pagination

List endpoints support pagination:

```
GET /data/species?limit=50&offset=0
```

Response includes pagination metadata:
```json
{
  "data": [...],
  "pagination": {
    "total": 1000,
    "limit": 50,
    "offset": 0,
    "hasMore": true
  }
}
```

---

## Versioning

The API uses URL versioning (`/v1/`). Major version changes will be announced 90 days in advance. Backward-compatible changes will not change the major version number.

---

## SDKs and Libraries

Official SDKs available for:
- JavaScript/TypeScript (npm: `@endangered-species/advisor-sdk`)
- Python (pip: `endangered-species-advisor`)
- R (CRAN: `endangeredSpeciesAdvisor`)

---

## Support

- Documentation: https://docs.endangered-species-advisor.org
- Status Page: https://status.endangered-species-advisor.org
- Support: support@endangered-species-advisor.org
- GitHub: https://github.com/endangered-species/advisor

---

**Document Version:** 1.0.0  
**Last Updated:** 2026-08-04  
**API Version:** 1.0.0

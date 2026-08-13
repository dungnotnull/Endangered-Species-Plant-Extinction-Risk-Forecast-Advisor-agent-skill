# PROJECT-detail.md — Endangered Species & Plant Extinction-Risk Forecast Advisor

## 1. Problem Statement

A skill supporting conservationists, researchers, and students in analyzing which species/plants face elevated extinction risk, diagnosing root causes, and designing comprehensive conservation-strategy proposals, grounded in established conservation-biology methodology (IUCN Red List criteria, population viability analysis). Explicitly disclaims that formal Red List status determination requires accredited IUCN assessment and that on-the-ground conservation action requires qualified conservation biologists and local regulatory compliance.

## 2. Target Users

Describe the primary user personas for this skill (fill in based on real usage once built): e.g., students, professionals, hobbyists, or practitioners in the relevant domain.

## 3. Functional Specification

### 3.1 Core Capabilities

- Explain and apply IUCN Red List extinction-risk assessment criteria conceptually
- Support population viability analysis (PVA) conceptual reasoning for a given species scenario
- Diagnose root causes of decline (habitat loss, invasive species, climate change, overexploitation, pollution)
- Design comprehensive conservation-strategy proposals (protected areas, captive breeding, habitat corridors, community-based conservation)
- Support cost-effectiveness reasoning for conservation-resource allocation (triage frameworks)
- Explain the role of genetic diversity and minimum viable population concepts
- Flag where formal IUCN assessment, accredited conservation biologists, and local regulatory bodies are required

### 3.2 Key Methodologies & Frameworks Applied

- **IUCN Red List Categories and Criteria**
- **Population Viability Analysis (PVA)**
- **Minimum Viable Population theory (Shaffer)**
- **Conservation triage / cost-effectiveness prioritization frameworks**
- **Habitat corridor and metapopulation theory**

Each framework above should be operationalized as a concrete step, checklist, or template inside the skill's SKILL.md and reference files once this scaffold is turned into a runnable skill (see `DEVELOPMENT-TASK-BY-PHASES.md`).

### 3.3 Expected Input

Typical user requests this skill should handle (fill in with real example prompts during development and testing).

### 3.4 Expected Output Format

Define the structured output format(s) this skill should produce (e.g., structured report, checklist, scored recommendation, memo). Align with the methodologies above so outputs are consistent and auditable.

## 4. Out of Scope / Guardrails

- Always include the standing disclaimer for this domain (see CLAUDE.md).
- Never present output as a certified/professional determination (e.g., not a diagnosis, not a legal opinion, not a guaranteed forecast).
- Where the skill involves a named third party (e.g., a partner, a suspect, a specific person), do not produce a definitive judgment about that individual — stay at the level of general, population-based information and structured reasoning support.
- Flag explicitly when a licensed professional (doctor, lawyer, engineer, certified analyst, etc.) should be consulted.

## 5. Knowledge Base Dependency

This skill's reasoning quality depends on the research foundations catalogued in `SECOND-BRAIN-KNOWLEDGE-PAPER.md`. When building the actual skill (SKILL.md + references/), extract the operational principles from each paper into concrete reference files rather than leaving them as a flat reading list.

## 6. Success Criteria

- Output correctly applies the named methodologies rather than generic reasoning.
- Output is well-structured and consistent across repeated runs on similar inputs.
- Domain-appropriate guardrails/disclaimers are respected in every response.
- Test prompts (see `DEVELOPMENT-TASK-BY-PHASES.md`, Phase 5) produce outputs a subject-matter-competent reviewer would rate as sound.

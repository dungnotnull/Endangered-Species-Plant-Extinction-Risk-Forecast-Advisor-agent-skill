/**
 * IUCN Red List Criteria Assessor
 *
 * Production implementation of IUCN Red List criteria assessment based on:
 * - IUCN (2012). IUCN Red List Categories and Criteria: Version 3.1 (2nd ed.)
 * - Mace & Lande (1991). Assessing extinction threats: toward a reevaluation of IUCN threatened species categories
 * - Akçakaya et al. (2000). Extinction risk assessment for temporal and spatial correlations
 */

const { evaluateCriterionA } = require('./criterion_a');
const { evaluateCriterionB } = require('./criterion_b');
const { evaluateCriterionC } = require('./criterion_c');
const { evaluateCriterionD } = require('./criterion_d');
const { evaluateCriterionE } = require('./criterion_e');

/**
 * Main IUCN criteria assessor class
 */
class IUCNCriteriaAssessor {
  constructor(config = {}) {
    this.config = {
      assessmentYear: config.assessmentYear || new Date().getFullYear(),
      assessmentRegion: config.assessmentRegion || 'global',
      confidenceLevel: config.confidenceLevel || 'medium',
      ...config
    };

    this.categories = {
      EX: 'Extinct',
      EW: 'Extinct in the Wild',
      CR: 'Critically Endangered',
      EN: 'Endangered',
      VU: 'Vulnerable',
      NT: 'Near Threatened',
      LC: 'Least Concern',
      DD: 'Data Deficient',
      NE: 'Not Evaluated'
    };

    this.threatHierarchy = ['CR', 'EN', 'VU', 'NT', 'LC'];
  }

  /**
   * Perform complete IUCN Red List assessment
   * @param {Object} populationData - Species population data
   * @returns {Object} Assessment results
   */
  async assess(populationData) {
    try {
      // Validate input data
      this.validateInput(populationData);

      // Initialize results object
      const results = {
        species: populationData.species,
        assessmentMetadata: this.buildMetadata(populationData),
        criterionResults: {},
        assessedCategory: null,
        criteriaApplied: [],
        rationale: '',
        dataGaps: [],
        assumptions: [],
        recommendations: [],
        disclaimer: this.buildDisclaimer()
      };

      // Evaluate each criterion
      await this.evaluateAllCriteria(populationData, results);

      // Determine final category
      results.assessedCategory = this.determineCategory(results);
      results.criteriaApplied = this.getAppliedCriteria(results);

      // Build rationale
      results.rationale = this.buildRationale(results);

      // Identify data gaps
      results.dataGaps = this.identifyDataGaps(populationData, results);

      // Generate recommendations
      results.recommendations = this.generateRecommendations(results);

      return results;

    } catch (error) {
      throw new Error(`IUCN assessment failed: ${error.message}`);
    }
  }

  /**
   * Validate input data
   * @private
   */
  validateInput(data) {
    if (!data.species) {
      throw new Error('Species name is required');
    }

    if (!data.populationData) {
      throw new Error('Population data is required');
    }

    // Validate that at least some data is present
    const hasAnyData = Object.values(data.populationData).some(value => value !== null && value !== undefined);
    if (!hasAnyData) {
      throw new Error('At least one population parameter must be provided');
    }
  }

  /**
   * Build assessment metadata
   * @private
   */
  buildMetadata(data) {
    return {
      assessedDate: new Date().toISOString(),
      assessor: this.config.assessor || 'system',
      assessmentYear: this.config.assessmentYear,
      assessmentRegion: data.assessmentRegion || this.config.assessmentRegion,
      regionalPopulation: data.regionalPopulation || false,
      confidenceLevel: data.confidenceLevel || this.config.confidenceLevel,
      dataSources: data.dataSources || []
    };
  }

  /**
   * Evaluate all five IUCN criteria
   * @private
   */
  async evaluateAllCriteria(populationData, results) {
    const evaluators = {
      criterionA: evaluateCriterionA,
      criterionB: evaluateCriterionB,
      criterionC: evaluateCriterionC,
      criterionD: evaluateCriterionD,
      criterionE: evaluateCriterionE
    };

    for (const [criterion, evaluator] of Object.entries(evaluators)) {
      try {
        const criterionResult = await evaluator(populationData);
        results.criterionResults[criterion] = criterionResult;
      } catch (error) {
        // Log but don't fail - continue with other criteria
        console.warn(`${criterion} evaluation failed: ${error.message}`);
        results.criterionResults[criterion] = {
          evaluated: false,
          error: error.message
        };
      }
    }
  }

  /**
   * Determine final category based on all criteria
   * @private
   */
  determineCategory(results) {
    const categoriesMet = new Set();

    // Check each criterion for category met
    for (const [criterionName, criterionResult] of Object.entries(results.criterionResults)) {
      if (criterionResult.evaluated && criterionResult.thresholdMet && criterionResult.thresholdMet !== 'none') {
        categoriesMet.add(criterionResult.thresholdMet);
      }
    }

    // If no criteria met, assess for NT or LC
    if (categoriesMet.size === 0) {
      return this.assessNonThreatened(results);
    }

    // If criteria met, return highest (most threatened) category
    return this.getHighestCategory(Array.from(categoriesMet));
  }

  /**
   * Assess for NT or LC when no threatened criteria met
   * @private
   */
  assessNonThreatened(results) {
    // Check if nearly qualifies for VU
    if (this.nearlyQualifies(results, 'VU')) {
      return 'NT';
    }

    // Otherwise, Least Concern
    return 'LC';
  }

  /**
   * Check if species nearly qualifies for a threatened category
   * @private
   */
  nearlyQualifies(results, category) {
    // Implementation would check if values are just below thresholds
    // This is a simplified version
    for (const criterionResult of Object.values(results.criterionResults)) {
      if (criterionResult.evaluated && criterionResult.nearThreshold === category) {
        return true;
      }
    }
    return false;
  }

  /**
   * Get highest (most threatened) category from list
   * @private
   */
  getHighestCategory(categories) {
    const categoryOrder = ['CR', 'EN', 'VU', 'NT', 'LC'];

    for (const category of categoryOrder) {
      if (categories.has(category)) {
        return category;
      }
    }

    return 'LC';
  }

  /**
   * Get list of criteria and subcriteria that triggered the category
   * @private
   */
  getAppliedCriteria(results) {
    const applied = [];

    for (const [criterionName, criterionResult] of Object.entries(results.criterionResults)) {
      if (criterionResult.evaluated && criterionResult.thresholdMet && criterionResult.thresholdMet !== 'none') {
        if (criterionResult.subcategory) {
          applied.push(criterionResult.subcategory);
        } else {
          applied.push(criterionName.replace('criterion', ''));
        }
      }
    }

    return applied;
  }

  /**
   * Build assessment rationale
   * @private
   */
  buildRationale(results) {
    const parts = [];

    // Add category determination
    parts.push(`Based on the evaluation of population data, ${results.species} qualifies as **${this.categories[results.assessedCategory]}** under the IUCN Red List Categories and Criteria.`);

    // Add criteria that triggered the category
    if (results.criteriaApplied.length > 0) {
      parts.push(`\n\n**Criteria Applied:** ${results.criteriaApplied.join(', ')}`);

      // Add details for each criterion
      for (const [criterionName, criterionResult] of Object.entries(results.criterionResults)) {
        if (criterionResult.evaluated && criterionResult.thresholdMet && criterionResult.thresholdMet !== 'none') {
          parts.push(`\n\n### ${criterionName.toUpperCase()}`);
          parts.push(criterionResult.rationale || 'No rationale provided.');
        }
      }
    }

    return parts.join('');
  }

  /**
   * Identify data gaps
   * @private
   */
  identifyDataGaps(populationData, results) {
    const gaps = [];

    // Check for missing critical data
    if (!populationData.populationSize && !populationData.populationTrend) {
      gaps.push('Population size and trend data missing - critical for assessment');
    }

    if (!populationData.generationLength) {
      gaps.push('Generation length unknown - using default assumptions');
    }

    // Check criteria that couldn't be evaluated
    for (const [criterionName, criterionResult] of Object.entries(results.criterionResults)) {
      if (!criterionResult.evaluated) {
        gaps.push(`${criterionName} could not be evaluated due to insufficient data`);
      }
    }

    return gaps;
  }

  /**
   * Generate recommendations based on assessment
   * @private
   */
  generateRecommendations(results) {
    const recommendations = [];

    // Data collection recommendations
    if (results.dataGaps.length > 0) {
      recommendations.push('Priority: Conduct population surveys to address data gaps');
    }

    // Monitoring recommendations
    recommendations.push('Establish long-term population monitoring');

    // Threat assessment recommendations
    recommendations.push('Conduct formal threat assessment using HIPPO framework');

    // Expert consultation
    recommendations.push('Consult with IUCN Species Survival Commission for formal assessment');

    return recommendations;
  }

  /**
   * Build disclaimer
   * @private
   */
  buildDisclaimer() {
    return 'This is a conceptual IUCN Red List assessment for educational and research purposes only. Formal IUCN Red List status determination requires submission to and evaluation by the IUCN Species Survival Commission and relevant Red List Authorities. This assessment does not constitute an official IUCN Red List listing. Conservation action requires consultation with qualified conservation biologists and compliance with relevant regulations.';
  }
}

/**
 * Export the assessor
 */
module.exports = {
  IUCNCriteriaAssessor,
  // Convenience function for direct use
  assess: async (populationData, config) => {
    const assessor = new IUCNCriteriaAssessor(config);
    return await assessor.assess(populationData);
  }
};

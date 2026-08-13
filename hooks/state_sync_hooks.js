/**
 * State Synchronization Hooks for Multi-Agent Coordination
 *
 * These hooks manage state synchronization between multiple agents
 * and sub-advisors in the endangered species forecast system.
 */

/**
 * State types for different components of the system
 */
const StateType = {
  ANALYSIS_STATE: 'ANALYSIS_STATE',
  DIAGNOSIS_STATE: 'DIAGNOSIS_STATE',
  STRATEGY_STATE: 'STRATEGY_STATE',
  PRIORITIZATION_STATE: 'PRIORITIZATION_STATE',
  SPECIES_DATA_STATE: 'SPECIES_DATA_STATE',
  THREAT_DATA_STATE: 'THREAT_DATA_STATE',
  SESSION_STATE: 'SESSION_STATE'
};

/**
 * State manager for coordinating state across agents
 */
class StateManager {
  constructor() {
    this.stateStore = new Map();
    this.subscribers = new Map();
    this.version = 0;
    this.locks = new Map();
  }

  /**
   * Initialize state for a specific type
   * @param {string} stateType - The type of state to initialize
   * @param {Object} initialState - Initial state object
   */
  initializeState(stateType, initialState = {}) {
    if (!this.stateStore.has(stateType)) {
      this.stateStore.set(stateType, {
        data: { ...initialState },
        version: 0,
        lastModified: Date.now(),
        modifiedBy: null
      });
    }
  }

  /**
   * Get state for a specific type
   * @param {string} stateType - The type of state to retrieve
   * @returns {Object|null} The state object or null if not found
   */
  getState(stateType) {
    const stateEntry = this.stateStore.get(stateType);
    return stateEntry ? { ...stateEntry.data } : null;
  }

  /**
   * Update state for a specific type with version control
   * @param {string} stateType - The type of state to update
   * @param {Object} updates - Updates to apply to the state
   * @param {string} agentId - ID of the agent making the update
   * @returns {boolean} Whether the update was successful
   */
  updateState(stateType, updates, agentId = 'system') {
    // Check if state is locked
    if (this.isLocked(stateType) && this.locks.get(stateType) !== agentId) {
      return false;
    }

    const stateEntry = this.stateStore.get(stateType);
    if (!stateEntry) {
      this.initializeState(stateType, updates);
      return true;
    }

    // Apply updates with deep merge
    stateEntry.data = this.deepMerge(stateEntry.data, updates);
    stateEntry.version++;
    stateEntry.lastModified = Date.now();
    stateEntry.modifiedBy = agentId;

    // Notify subscribers
    this.notifySubscribers(stateType, stateEntry);

    return true;
  }

  /**
   * Lock a state type for exclusive access
   * @param {string} stateType - The type of state to lock
   * @param {string} agentId - ID of the agent requesting the lock
   * @returns {boolean} Whether the lock was acquired
   */
  lockState(stateType, agentId) {
    if (this.isLocked(stateType) && this.locks.get(stateType) !== agentId) {
      return false;
    }

    this.locks.set(stateType, agentId);
    return true;
  }

  /**
   * Unlock a state type
   * @param {string} stateType - The type of state to unlock
   * @param {string} agentId - ID of the agent releasing the lock
   * @returns {boolean} Whether the unlock was successful
   */
  unlockState(stateType, agentId) {
    if (this.locks.get(stateType) === agentId) {
      this.locks.delete(stateType);
      return true;
    }

    return false;
  }

  /**
   * Check if a state type is locked
   * @param {string} stateType - The type of state to check
   * @returns {boolean} Whether the state is locked
   */
  isLocked(stateType) {
    return this.locks.has(stateType);
  }

  /**
   * Subscribe to state changes for a specific type
   * @param {string} stateType - The type of state to subscribe to
   * @param {Function} callback - Callback function when state changes
   * @param {string} subscriberId - ID of the subscriber
   */
  subscribe(stateType, callback, subscriberId) {
    if (!this.subscribers.has(stateType)) {
      this.subscribers.set(stateType, new Map());
    }

    const subscribers = this.subscribers.get(stateType);
    subscribers.set(subscriberId, callback);
  }

  /**
   * Unsubscribe from state changes
   * @param {string} stateType - The type of state to unsubscribe from
   * @param {string} subscriberId - ID of the subscriber
   */
  unsubscribe(stateType, subscriberId) {
    const subscribers = this.subscribers.get(stateType);
    if (subscribers) {
      subscribers.delete(subscriberId);
    }
  }

  /**
   * Notify subscribers of state changes
   * @param {string} stateType - The type of state that changed
   * @param {Object} stateEntry - The updated state entry
   */
  notifySubscribers(stateType, stateEntry) {
    const subscribers = this.subscribers.get(stateType);
    if (!subscribers) {
      return;
    }

    for (const [subscriberId, callback] of subscribers) {
      try {
        callback({
          stateType,
          data: { ...stateEntry.data },
          version: stateEntry.version,
          lastModified: stateEntry.lastModified,
          modifiedBy: stateEntry.modifiedBy
        });
      } catch (error) {
        console.error(`Subscriber ${subscriberId} callback error:`, error);
      }
    }
  }

  /**
   * Deep merge two objects
   * @param {Object} target - The target object
   * @param {Object} source - The source object
   * @returns {Object} The merged object
   */
  deepMerge(target, source) {
    const output = { ...target };

    if (this.isObject(target) && this.isObject(source)) {
      Object.keys(source).forEach(key => {
        if (this.isObject(source[key])) {
          if (!(key in target)) {
            Object.assign(output, { [key]: source[key] });
          } else {
            output[key] = this.deepMerge(target[key], source[key]);
          }
        } else {
          Object.assign(output, { [key]: source[key] });
        }
      });
    }

    return output;
  }

  /**
   * Check if value is an object
   * @param {*} item - The item to check
   * @returns {boolean} Whether the item is an object
   */
  isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
  }

  /**
   * Get state version for a specific type
   * @param {string} stateType - The type of state
   * @returns {number} The version number
   */
  getVersion(stateType) {
    const stateEntry = this.stateStore.get(stateType);
    return stateEntry ? stateEntry.version : 0;
  }

  /**
   * Rollback state to a previous version
   * @param {string} stateType - The type of state to rollback
   * @param {number} targetVersion - The target version to rollback to
   * @returns {boolean} Whether the rollback was successful
   */
  rollbackToVersion(stateType, targetVersion) {
    const stateEntry = this.stateStore.get(stateType);
    if (!stateEntry || stateEntry.version <= targetVersion) {
      return false;
    }

    // Implementation would require version history storage
    // For now, this is a placeholder
    return false;
  }

  /**
   * Clear all state (useful for testing or cleanup)
   */
  clearAll() {
    this.stateStore.clear();
    this.subscribers.clear();
    this.version = 0;
    this.locks.clear();
  }
}

/**
 * Global state manager instance
 */
const stateManager = new StateManager();

/**
 * Initialize default state for the endangered species advisor
 */
function initializeDefaultState() {
  // Analysis state
  stateManager.initializeState(StateType.ANALYSIS_STATE, {
    currentAnalysis: null,
    analysisHistory: [],
    activeFrameworks: [],
    cachedResults: new Map()
  });

  // Diagnosis state
  stateManager.initializeState(StateType.DIAGNOSIS_STATE, {
    currentDiagnosis: null,
    diagnosisHistory: [],
    threatClassifications: new Map(),
    evidenceWeights: new Map()
  });

  // Strategy state
  stateManager.initializeState(StateType.STRATEGY_STATE, {
    currentStrategy: null,
    strategyHistory: [],
    activeStrategies: [],
    strategyEffectiveness: new Map()
  });

  // Prioritization state
  stateManager.initializeState(StateType.PRIORITIZATION_STATE, {
    currentPrioritization: null,
    speciesRankings: [],
    budgetConstraints: null,
    optimizationResults: null
  });

  // Species data state
  stateManager.initializeState(StateType.SPECIES_DATA_STATE, {
    speciesProfiles: new Map(),
    populationData: new Map(),
    distributionData: new Map()
  });

  // Threat data state
  stateManager.initializeState(StateType.THREAT_DATA_STATE, {
    threatProfiles: new Map(),
    threatInteractions: new Map(),
    mitigationOptions: new Map()
  });

  // Session state
  stateManager.initializeState(StateType.SESSION_STATE, {
    sessionId: generateSessionId(),
    startTime: Date.now(),
    queryCount: 0,
    cacheHits: 0,
    cacheMisses: 0
  });
}

/**
 * Generate a unique session ID
 * @returns {string} A unique session ID
 */
function generateSessionId() {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * State synchronization hooks for coordinating multi-agent workflows
 */
class StateSyncHooks {
  /**
   * Hook to sync analysis state with diagnosis
   * @param {Object} context - The analysis context
   */
  static async syncAnalysisToDiagnosis(context) {
    const analysisState = stateManager.getState(StateType.ANALYSIS_STATE);

    if (analysisState && analysisState.currentAnalysis) {
      const diagnosisUpdates = {
        species: analysisState.currentAnalysis.species,
        analysisId: analysisState.currentAnalysis.id,
        analysisTimestamp: analysisState.currentAnalysis.timestamp
      };

      stateManager.updateState(
        StateType.DIAGNOSIS_STATE,
        diagnosisUpdates,
        context.agentId || 'system'
      );
    }
  }

  /**
   * Hook to sync diagnosis state with strategy
   * @param {Object} context - The diagnosis context
   */
  static async syncDiagnosisToStrategy(context) {
    const diagnosisState = stateManager.getState(StateType.DIAGNOSIS_STATE);

    if (diagnosisState && diagnosisState.currentDiagnosis) {
      const strategyUpdates = {
        diagnosisId: diagnosisState.currentDiagnosis.id,
        primaryThreats: diagnosisState.currentDiagnosis.primaryThreats,
        threatRanks: diagnosisState.currentDiagnosis.threatRanks,
        diagnosisTimestamp: diagnosisState.currentDiagnosis.timestamp
      };

      stateManager.updateState(
        StateType.STRATEGY_STATE,
        strategyUpdates,
        context.agentId || 'system'
      );
    }
  }

  /**
   * Hook to sync strategy state with prioritization
   * @param {Object} context - The strategy context
   */
  static async syncStrategyToPrioritization(context) {
    const strategyState = stateManager.getState(StateType.STRATEGY_STATE);

    if (strategyState && strategyState.currentStrategy) {
      const prioritizationUpdates = {
        strategyId: strategyState.currentStrategy.id,
        actionOptions: strategyState.currentStrategy.actions,
        costEstimates: strategyState.currentStrategy.costs,
        strategyTimestamp: strategyState.currentStrategy.timestamp
      };

      stateManager.updateState(
        StateType.PRIORITIZATION_STATE,
        prioritizationUpdates,
        context.agentId || 'system'
      );
    }
  }

  /**
   * Hook to validate state consistency
   * @param {Object} context - The validation context
   */
  static async validateStateConsistency(context) {
    const inconsistencies = [];

    // Check analysis-diagnosis consistency
    const analysisState = stateManager.getState(StateType.ANALYSIS_STATE);
    const diagnosisState = stateManager.getState(StateType.DIAGNOSIS_STATE);

    if (analysisState?.currentAnalysis && diagnosisState?.currentDiagnosis) {
      if (analysisState.currentAnalysis.species !== diagnosisState.currentDiagnosis.species) {
        inconsistencies.push({
          type: 'ANALYSIS_DIAGNOSIS_MISMATCH',
          details: 'Species mismatch between analysis and diagnosis'
        });
      }
    }

    // Check diagnosis-strategy consistency
    if (diagnosisState?.currentDiagnosis) {
      const strategyState = stateManager.getState(StateType.STRATEGY_STATE);
      if (strategyState?.currentStrategy) {
        const diagnosisPrimaryThreats = diagnosisState.currentDiagnosis.primaryThreats || [];
        const strategyActions = strategyState.currentStrategy.actions || [];

        // Check if strategy addresses primary threats
        const addressedThreats = strategyActions.flatMap(action => action.threatsAddressed || []);
        const unaddressedThreats = diagnosisPrimaryThreats.filter(
          threat => !addressedThreats.includes(threat)
        );

        if (unaddressedThreats.length > 0) {
          inconsistencies.push({
            type: 'STRATEGY_DIAGNOSIS_GAP',
            details: `Strategy does not address primary threats: ${unaddressedThreats.join(', ')}`
          });
        }
      }
    }

    if (inconsistencies.length > 0) {
      console.warn('State inconsistencies detected:', inconsistencies);

      // Optionally trigger recovery or notification
      if (context.inconsistencyHandler) {
        await context.inconsistencyHandler(inconsistencies);
      }
    }

    return inconsistencies;
  }

  /**
   * Hook to cache analysis results for performance
   * @param {Object} context - The caching context
   */
  static async cacheAnalysisResults(context) {
    if (!context.analysisResults) {
      return;
    }

    const cacheKey = this.generateCacheKey(context);
    const analysisState = stateManager.getState(StateType.ANALYSIS_STATE);

    if (analysisState) {
      const cachedResults = analysisState.cachedResults || new Map();
      cachedResults.set(cacheKey, {
        results: context.analysisResults,
        timestamp: Date.now(),
        context: {
          species: context.species,
          analysisType: context.analysisType,
          frameworks: context.frameworks
        }
      });

      stateManager.updateState(
        StateType.ANALYSIS_STATE,
        { cachedResults },
        context.agentId || 'system'
      );

      // Update session metrics
      const sessionState = stateManager.getState(StateType.SESSION_STATE);
      if (sessionState) {
        sessionState.cacheHits = (sessionState.cacheHits || 0) + 1;
        stateManager.updateState(StateType.SESSION_STATE, sessionState, 'system');
      }
    }
  }

  /**
   * Generate cache key from context
   * @param {Object} context - The context object
   * @returns {string} A unique cache key
   */
  static generateCacheKey(context) {
    const keyParts = [
      context.species,
      context.analysisType,
      context.frameworks ? context.frameworks.sort().join(',') : '',
      JSON.stringify(context.parameters || {})
    ];

    return keyParts.filter(Boolean).join(':');
  }

  /**
   * Hook to retrieve cached results if available
   * @param {Object} context - The retrieval context
   * @returns {Object|null} Cached results or null
   */
  static async getCachedResults(context) {
    const cacheKey = this.generateCacheKey(context);
    const analysisState = stateManager.getState(StateType.ANALYSIS_STATE);

    if (analysisState && analysisState.cachedResults) {
      const cached = analysisState.cachedResults.get(cacheKey);

      if (cached) {
        // Check cache age (default TTL: 1 hour)
        const cacheAge = Date.now() - cached.timestamp;
        const ttl = context.cacheTtl || 3600000; // 1 hour in milliseconds

        if (cacheAge < ttl) {
          // Update session metrics
          const sessionState = stateManager.getState(StateType.SESSION_STATE);
          if (sessionState) {
            sessionState.cacheHits = (sessionState.cacheHits || 0) + 1;
            stateManager.updateState(StateType.SESSION_STATE, sessionState, 'system');
          }

          return cached.results;
        } else {
          // Remove stale cache entry
          analysisState.cachedResults.delete(cacheKey);
          stateManager.updateState(
            StateType.ANALYSIS_STATE,
            { cachedResults: analysisState.cachedResults },
            'system'
          );
        }
      }

      // Update session metrics for cache miss
      const sessionState = stateManager.getState(StateType.SESSION_STATE);
      if (sessionState) {
        sessionState.cacheMisses = (sessionState.cacheMisses || 0) + 1;
        stateManager.updateState(StateType.SESSION_STATE, sessionState, 'system');
      }
    }

    return null;
  }

  /**
   * Hook to cleanup stale state data
   * @param {Object} context - The cleanup context
   */
  static async cleanupStaleState(context = {}) {
    const maxAge = context.maxAge || 86400000; // 24 hours in milliseconds
    const now = Date.now();

    // Cleanup analysis cache
    const analysisState = stateManager.getState(StateType.ANALYSIS_STATE);
    if (analysisState && analysisState.cachedResults) {
      for (const [key, value] of analysisState.cachedResults) {
        if (now - value.timestamp > maxAge) {
          analysisState.cachedResults.delete(key);
        }
      }

      stateManager.updateState(
        StateType.ANALYSIS_STATE,
        { cachedResults: analysisState.cachedResults },
        'system'
      );
    }

    // Cleanup other state history as needed
    // Similar cleanup for other state types...
  }
}

/**
 * Export the state synchronization system
 */
module.exports = {
  StateType,
  StateManager,
  stateManager,
  StateSyncHooks,
  initializeDefaultState
};

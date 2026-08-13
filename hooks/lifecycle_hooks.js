/**
 * Lifecycle Hooks for Endangered Species Forecast Advisor
 *
 * These hooks manage the skill initialization, context management,
 * and cleanup processes for the advisor system.
 */

/**
 * Hook types supported by this system
 */
const HookType = {
  BEFORE_INIT: 'BEFORE_INIT',
  AFTER_INIT: 'AFTER_INIT',
  BEFORE_ANALYSIS: 'BEFORE_ANALYSIS',
  AFTER_ANALYSIS: 'AFTER_ANALYSIS',
  BEFORE_STRATEGY: 'BEFORE_STRATEGY',
  AFTER_STRATEGY: 'AFTER_STRATEGY',
  ON_ERROR: 'ON_ERROR',
  ON_CLEANUP: 'ON_CLEANUP'
};

/**
 * Hook registry for storing and executing lifecycle hooks
 */
class HookRegistry {
  constructor() {
    this.hooks = new Map();

    // Initialize hook collections for each hook type
    Object.values(HookType).forEach(type => {
      this.hooks.set(type, []);
    });
  }

  /**
   * Register a hook for a specific hook type
   * @param {string} hookType - The type of hook to register
   * @param {Function} hookFn - The hook function to execute
   * @param {Object} options - Hook options (priority, once, etc.)
   */
  register(hookType, hookFn, options = {}) {
    const { priority = 50, once = false } = options;

    if (!this.hooks.has(hookType)) {
      throw new Error(`Unknown hook type: ${hookType}`);
    }

    const hook = {
      fn: hookFn,
      priority,
      once,
      executed: false
    };

    const hooks = this.hooks.get(hookType);
    hooks.push(hook);

    // Sort by priority (higher priority executes first)
    hooks.sort((a, b) => b.priority - a.priority);
  }

  /**
   * Execute all hooks registered for a specific type
   * @param {string} hookType - The type of hook to execute
   * @param {Object} context - The context object to pass to hooks
   * @returns {Promise<void>}
   */
  async execute(hookType, context = {}) {
    if (!this.hooks.has(hookType)) {
      throw new Error(`Unknown hook type: ${hookType}`);
    }

    const hooks = this.hooks.get(hookType);
    const promises = [];

    for (const hook of hooks) {
      if (hook.once && hook.executed) {
        continue;
      }

      promises.push(this._executeHook(hook, context));
    }

    await Promise.all(promises);
  }

  /**
   * Execute a single hook with error handling
   * @param {Object} hook - The hook object
   * @param {Object} context - The context object
   * @returns {Promise<void>}
   */
  async _executeHook(hook, context) {
    try {
      await hook.fn(context);
      hook.executed = true;
    } catch (error) {
      // Log hook execution error but don't fail the entire process
      console.error(`Hook execution error: ${error.message}`);

      // Trigger error hooks if available
      if (context.triggerErrorHooks) {
        await this.execute(HookType.ON_ERROR, {
          ...context,
          error,
          hookError: true
        });
      }
    }
  }

  /**
   * Remove a hook or all hooks for a type
   * @param {string} hookType - The type of hook to clear
   * @param {Function} hookFn - Optional: specific hook function to remove
   */
  unregister(hookType, hookFn = null) {
    if (!this.hooks.has(hookType)) {
      return;
    }

    if (hookFn) {
      const hooks = this.hooks.get(hookType);
      const index = hooks.findIndex(h => h.fn === hookFn);
      if (index !== -1) {
        hooks.splice(index, 1);
      }
    } else {
      this.hooks.set(hookType, []);
    }
  }
}

/**
 * Global hook registry instance
 */
const hookRegistry = new HookRegistry();

/**
 * Initialize skill lifecycle hooks with default behaviors
 */
function initializeDefaultHooks() {
  // BEFORE_INIT hook: Validate environment and dependencies
  hookRegistry.register(HookType.BEFORE_INIT, async (context) => {
    // Validate required configuration
    if (!context.config) {
      throw new Error('Configuration is required for skill initialization');
    }

    // Initialize logging system
    if (context.config.logging) {
      context.logger = initializeLogger(context.config.logging);
    }

    // Set up error tracking
    if (context.config.errorTracking) {
      context.errorTracker = initializeErrorTracker(context.config.errorTracking);
    }
  }, { priority: 100 });

  // AFTER_INIT hook: Post-initialization setup
  hookRegistry.register(HookType.AFTER_INIT, async (context) => {
    // Load reference materials
    if (context.config.referencePath) {
      context.references = await loadReferences(context.config.referencePath);
    }

    // Initialize tool cache
    context.toolCache = new Map();

    // Set up performance monitoring
    if (context.config.performanceMonitoring) {
      context.performanceMetrics = {
        analysisCount: 0,
        strategyCount: 0,
        totalProcessingTime: 0,
        averageProcessingTime: 0
      };
    }
  }, { priority: 50 });

  // BEFORE_ANALYSIS hook: Prepare analysis context
  hookRegistry.register(HookType.BEFORE_ANALYSIS, async (context) => {
    // Validate required parameters
    if (!context.species && !context.query) {
      throw new Error('Either species or query is required for analysis');
    }

    // Initialize analysis metadata
    context.analysisMetadata = {
      startTime: Date.now(),
      analysisType: context.analysisType || 'comprehensive',
      frameworks: context.frameworks || []
    };
  }, { priority: 100 });

  // AFTER_ANALYSIS hook: Process analysis results
  hookRegistry.register(HookType.AFTER_ANALYSIS, async (context) => {
    if (!context.analysisResults) {
      return;
    }

    // Update performance metrics
    if (context.performanceMetrics) {
      const analysisTime = Date.now() - context.analysisMetadata.startTime;
      context.performanceMetrics.analysisCount++;
      context.performanceMetrics.totalProcessingTime += analysisTime;
      context.performanceMetrics.averageProcessingTime =
        context.performanceMetrics.totalProcessingTime /
        context.performanceMetrics.analysisCount;
    }

    // Validate results against schema
    if (context.resultValidation) {
      await validateAnalysisResults(context.analysisResults);
    }
  }, { priority: 50 });

  // BEFORE_STRATEGY hook: Prepare strategy generation
  hookRegistry.register(HookType.BEFORE_STRATEGY, async (context) => {
    // Validate strategy inputs
    if (!context.diagnosis) {
      throw new Error('Diagnosis is required for strategy generation');
    }

    // Initialize strategy metadata
    context.strategyMetadata = {
      startTime: Date.now(),
      strategyType: context.strategyType || 'integrated',
      threatFocus: context.diagnosis.primaryThreats
    };
  }, { priority: 100 });

  // AFTER_STRATEGY hook: Process strategy results
  hookRegistry.register(HookType.AFTER_STRATEGY, async (context) => {
    if (!context.strategy) {
      return;
    }

    // Update performance metrics
    if (context.performanceMetrics) {
      const strategyTime = Date.now() - context.strategyMetadata.startTime;
      context.performanceMetrics.strategyCount++;
      context.performanceMetrics.totalProcessingTime += strategyTime;
    }

    // Validate strategy components
    await validateStrategyComponents(context.strategy);
  }, { priority: 50 });

  // ON_ERROR hook: Centralized error handling
  hookRegistry.register(HookType.ON_ERROR, async (context) => {
    const { error, hookError = false } = context;

    // Log error with context
    if (context.logger) {
      const errorType = hookError ? 'Hook Execution Error' : 'Analysis Error';
      context.logger.error(errorType, {
        message: error.message,
        stack: error.stack,
        context: {
          species: context.species,
          query: context.query,
          analysisType: context.analysisType
        }
      });
    }

    // Track error for monitoring
    if (context.errorTracker) {
      await context.errorTracker.trackError(error, context);
    }

    // Provide graceful fallback or graceful degradation
    if (context.gracefulFallback) {
      context.fallbackResult = await executeGracefulFallback(context);
    }
  }, { priority: 100 });

  // ON_CLEANUP hook: Resource cleanup
  hookRegistry.register(HookType.ON_CLEANUP, async (context) => {
    // Clear tool cache
    if (context.toolCache) {
      context.toolCache.clear();
    }

    // Flush logs
    if (context.logger && context.logger.flush) {
      await context.logger.flush();
    }

    // Cleanup performance metrics
    if (context.performanceMetrics) {
      await logPerformanceMetrics(context.performanceMetrics, context.logger);
    }
  }, { priority: 50 });
}

/**
 * Helper function to initialize logger
 */
function initializeLogger(config) {
  return {
    info: (message, data) => console.log(`[INFO] ${message}`, data || ''),
    warn: (message, data) => console.warn(`[WARN] ${message}`, data || ''),
    error: (message, data) => console.error(`[ERROR] ${message}`, data || ''),
    debug: (message, data) => {
      if (config.debug) {
        console.log(`[DEBUG] ${message}`, data || '');
      }
    },
    flush: async () => Promise.resolve()
  };
}

/**
 * Helper function to initialize error tracker
 */
function initializeErrorTracker(config) {
  const errorLog = [];

  return {
    trackError: async (error, context) => {
      errorLog.push({
        timestamp: new Date().toISOString(),
        message: error.message,
        context: {
          species: context.species,
          query: context.query,
          analysisType: context.analysisType
        }
      });

      // Send to monitoring service if configured
      if (config.monitoringService) {
        // Implementation would depend on monitoring service
      }
    },
    getErrors: () => errorLog,
    clearErrors: () => errorLog.length = 0
  };
}

/**
 * Helper function to load references
 */
async function loadReferences(referencePath) {
  // Implementation would load reference materials from filesystem
  return {
    iucnCriteria: true,
    pvaFramework: true,
    rootCauseDiagnostics: true,
    conservationStrategies: true,
    conservationTriage: true
  };
}

/**
 * Helper function to validate analysis results
 */
async function validateAnalysisResults(results) {
  // Implementation would validate results against schema
  return true;
}

/**
 * Helper function to validate strategy components
 */
async function validateStrategyComponents(strategy) {
  // Implementation would validate strategy components
  return true;
}

/**
 * Helper function to log performance metrics
 */
async function logPerformanceMetrics(metrics, logger) {
  if (logger) {
    logger.info('Performance Metrics', {
      analysisCount: metrics.analysisCount,
      strategyCount: metrics.strategyCount,
      totalProcessingTime: metrics.totalProcessingTime,
      averageProcessingTime: metrics.averageProcessingTime
    });
  }
}

/**
 * Helper function to execute graceful fallback
 */
async function executeGracefulFallback(context) {
  // Implementation would provide fallback results based on context
  return {
    status: 'partial',
    message: 'Analysis could not be completed due to an error',
    partialResults: context.partialResults || null
  };
}

/**
 * Export the hook system
 */
module.exports = {
  HookType,
  HookRegistry,
  hookRegistry,
  initializeDefaultHooks
};

var H5PUpgrades = H5PUpgrades || {};

H5PUpgrades['H5P.BranchingScenario'] = (function () {
  return {
    1: {
      /**
       * Asynchronous content upgrade hook.
       *
       * Add new default parameters.
       *
       * @param {Object} parameters
       * @param {function} finished
       */
      1: function (parameters, finished, extras) {
        // Sanitization
        parameters.branchingScenario = parameters.branchingScenario || {};
        parameters.branchingScenario.content = parameters.branchingScenario.content || [];

        // Individual require finished override value
        parameters.branchingScenario.content.forEach( function (contentNode) {
          // Mind the one-item behavior of semantics groups
          contentNode.contentBehaviour = false;
        });

        // Global backwards navigation default value, mind the one-item behavior of semantics groups
        parameters.branchingScenario.behaviour = 'individual';

        if (parameters.branchingScenario.l10n) {
          parameters.branchingScenario.l10n.backButtonText = 'Back';
        }

        finished(null, parameters, extras);
      }
    }
  };
})();

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
        parameters.branchingScenario.behaviour = parameters.branchingScenario.behaviour || {};

        // Individual require finished override value
        parameters.branchingScenario.content.forEach( function (contentNode) {
          contentNode.contentBehaviour = contentNode.contentBehaviour || {};
          contentNode.contentBehaviour.enableBackwardsNavigation = false;

          // No finishing required setting required for Branching Question
          if (!contentNode.type || !contentNode.type.library || contentNode.type.library.split(' ')[0] === 'H5P.BranchingQuestion') {
            return;
          }
          contentNode.contentBehaviour.requiresFinishing = false;
        });

        // Global backwards navigation default value, mind the one-item behavior of semantics groups
        parameters.branchingScenario.behaviour.overrideBackwardsNavigation = 'individual';

        // Global require finished default value, mind the one-item behavior of semantics groups
        parameters.branchingScenario.behaviour.overrideFinishing = 'individual';

        if (parameters.branchingScenario.l10n) {
          parameters.branchingScenario.l10n.backButtonText = 'Back';
        }

        finished(null, parameters, extras);
      }
    }
  };
})();

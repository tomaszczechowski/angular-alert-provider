 (function () {
  "use strict";

  var app = angular.module('AlertProvider', ['ui.bootstrap.modal']);

  app.controller('AlertProviderController', ['$uibModalInstance', 'options', function ($uibModalInstance, options) {
    var vm = this;

    vm.text = options.text;

    vm.yes = function () {
      $uibModalInstance.close('yes');
    };

    vm.no = function () {
      $uibModalInstance.close('no');
    };

  }]);

	app.provider('$alertProvider', function () {

    var $confirmAlertProvider = {
      options: {
        backdrop: true, //can be also false or 'static'
        keyboard: true,
        templateUrl: 'alertProvider.html',
        controller: 'AlertProviderController as confirmAlertVM',
        backdropClass: 'backdrop',
        windowClass: 'modal-window'
      },
      $get: ['$q', '$uibModal', function ($q, $uibModal) {

        var $alert = {};

				$alert.open = function (alertOptions) {

          var alertOpenedDeferred = $q.defer();
          var alertResultDeferred = $q.defer();
          var alertRenderedDeferred = $q.defer();

          var alertInstance = {
            result: alertResultDeferred.promise,
            opened: alertOpenedDeferred.promise,
            rendered: alertRenderedDeferred.promise,
            close: function (result) {
              $uibModal.close(alertInstance, result);
            },
            dismiss: function (reason) {
              $uibModal.dismiss(alertInstance, reason);
            }
          };

          //merge and clean up options
          alertOptions = angular.extend({}, $confirmAlertProvider.options, alertOptions);
          alertOptions.resolve = alertOptions.resolve || {};

					//verify options
          if (!alertOptions.text) {
            throw new Error('Text option is required.');
          }

          if (!alertOptions.actions) {
            throw new Error('Actions option is required.');
          }

          alertOptions.resolve.options = function () {
          	return {
	          	text: alertOptions.text
	          };
          };

          var modalInstance = $uibModal.open(alertOptions);

		     	modalInstance.result.then(function (response) {
		        if (alertOptions.actions.hasOwnProperty(response)) {
		        	alertOptions.actions[response]();
		        };
		      });

					modalInstance.result.then(function () {
            alertResultDeferred.resolve(true);
          }, function () {
            alertResultDeferred.reject(false);
          });

		      modalInstance.opened.then(function () {
            alertOpenedDeferred.resolve(true);
          }, function () {
            alertOpenedDeferred.reject(false);
          });

          return alertInstance;
        };

        return $alert;
      }]
    };

    return $confirmAlertProvider;
  });

  app.run(function($templateCache) {
    $templateCache.put('alertProvider.html',
      '<div class="modal-header">'+
        '<h3 class="modal-title">I\'m a modal!</h3>'+
      '</div>'+
      '<div class="modal-body">{{confirmAlertVM.text}}</div>' +
      '<div class="modal-footer">'+
        '<button type="submit" class="btn btn-primary" ng-click="confirmAlertVM.yes()">Yes</button>' +
        '<button class="btn btn-default" ng-click="confirmAlertVM.no()">No</button>' +
      '</div>'
    );
  });

})();
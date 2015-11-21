 /**
  * @author Tomasz Czechowski
  * @version 0.1.0
  * @name AlertProvider
  * @license MIT
  * @description Module shows modal window based on boostrap modal provider.
  */

 (function () {
  "use strict";

  var app = angular.module('AlertProvider', ['ui.bootstrap.modal']);

  app.controller('AlertProviderController', ['$scope', '$uibModalInstance', 'options', function ($scope, $uibModalInstance, options) {

    $scope.options = options;

    $scope.buttonClicked = function (button) {
      $uibModalInstance.close(button);
    };
  }]);

  app.provider('$alertProvider', function () {
    var $alertProvider = {
      options: {
        templateUrl: 'alertProvider.html',
        controller: 'AlertProviderController'
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
          alertOptions = angular.extend({}, $alertProvider.options, alertOptions);
          alertOptions.resolve = alertOptions.resolve || {};

          var requiredParams = ['title', 'body', 'buttons'];

          for (var i = 0; i < requiredParams.length; i++) {
            var param = requiredParams[i];

            if (!alertOptions.hasOwnProperty(param)) {
              throw new Error('Parameter "' + param + '" is required.');
            }
          }

          alertOptions.resolve.options = function () {
            return {
              title: alertOptions.title,
              body: alertOptions.body,
              buttons: alertOptions.buttons
            };
          };

          var modalInstance = $uibModal.open(alertOptions);

          modalInstance.result.then(function (button) {
            button.action.call(button.action);
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

          modalInstance.rendered.then(function () {
            alertRenderedDeferred.resolve(true);
          }, function () {
            alertRenderedDeferred.reject(false);
          });

          return alertInstance;
        };

        return $alert;
      }]
    };

    return $alertProvider;
  });

  app.run(function($templateCache) {
    $templateCache.put('alertProvider.html',
      '<div class="alertProvider">' +
        '<div class="modal-header">' +
          '<h3 class="modal-title">{{options.title}}</h3>' +
        '</div>' +
        '<div class="modal-body">{{options.body}}</div>' +
        '<div class="modal-footer">' +
          '<button ng-repeat="button in options.buttons" class="{{button.cssClass}}" ng-click="buttonClicked(button)">{{button.label}}</button>' +
        '</div>' +
      '</div>'
    );
  });

})();
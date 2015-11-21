(function () {
  'use strict';

  var app = angular.module('App', [
    'ui.bootstrap',
    'AlertProvider'
  ]);

  app.controller('mainCtrl', ['$scope', '$alertProvider', function ($scope, $alertProvider) {
    $scope.openModal = function () {

      var actionYes = function () {
        console.log('clicked yes');
      };

      var actionNo = function () {
        console.log('clicked no');
      };

      var alert = $alertProvider.open({
        title: 'Modal title',
        body: 'Do you confirm deleting element ?',
        buttons: [
          {
            label: 'Yes',
            cssClass: 'btn btn-primary',
            action: actionYes
          },
          {
            label: 'No',
            cssClass: 'btn btn-danger',
            action: actionNo
          }
        ]
      });
    };
  }]);

  app.run(function () {
    console.log('Lets rock!');
  });
})();
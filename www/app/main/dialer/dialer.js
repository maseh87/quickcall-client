angular.module('app.main.dialer', [
])
.config(function($stateProvider){
  $stateProvider
    .state('app.main.dialer', {
      url: '/dialer',
      views: {
        'dialer': {
          templateUrl: 'app/main/dialer/dialer.html',
          controller: 'DialerCtrl'
        }
      }
    });
})
.controller('DialerCtrl', function($scope, DialerFactory){
  $scope.phoneNumber = '';

  $scope.addInput = function(num) {
    $scope.phoneNumber += num;
  };
  $scope.makeCall = function() {
    DialerFactory.call($scope.phoneNumber);
  };
})

.directive('dialer', function(){
  return {
    restrict: 'E',
    templateUrl: 'app/main/dialer/dialer-directive.html'
  };
});

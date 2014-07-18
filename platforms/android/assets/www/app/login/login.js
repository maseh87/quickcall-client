angular.module('app.login', [
])
//currently Login is set up as a substate of app.main, will eventually make it its own state.
.config(function($stateProvider){
  $stateProvider
    .state('app.login', {
      url: '/login',
      templateUrl: 'app/login/login.html',
      controller: 'LoginCtrl'
    });
})

.controller('LoginCtrl', function($scope, DialerFactory, $state, $window, $http, $ionicPopup){
  var user = $scope.currentUser;
  $scope.submit = function(){
    $http({
      method: 'GET', 
      url: 'http://quickcall-server.herokuapp.com/account',
      params:{
        authId:user.ID,
        authToken:user.token
      }
    })
    .success(function(data, status, headers, config) {
      var tokens = parseInt(data.cash_credits);
      if(data.auth_id === user.ID && tokens > 1){
        $window.localStorage.setItem('com.quickCall.auth',
          JSON.stringify({
            id:data.auth_id,
            token:user.token,
            number:user.number,
            name: data.name,
            cash_credits: data.cash_credits,
            city: data.city || "Unknown"
          })
        );
        $state.go('app.main.dialer')
      }
    })
    .error(function(data, status, headers, config) {
      console.error(data);
       $ionicPopup.alert({
         title: 'Invalid Plivo credentials',
         content: 'Sorry it seems that either your Plivo credentials are invalid or were entered incorrectly please try again.'
       })
    });
   
  };  
  //Login establishes the currentUser property of DialerFactory, that is injected into other views
  $scope.currentUser = DialerFactory.currentUser;
});

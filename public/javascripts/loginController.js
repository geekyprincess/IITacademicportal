'use strict';
angular.module('sampleApp').controller('loginCtrl', ['$scope', '$http','$location',
    function($scope, $http, $location) {
        $scope.user_list = ['faculty','student','admin'];       
       // if(angular.equals($scope.data.type, "admin")){
         //  $location.path('/admin');
        ///}
        var login_id;
               var user_type = 'none';

        $scope.login_user = function(data){
         user_type = data.type;
         if(data.type === 'student'){
            console.log("It's Student");
            login_id = data.userid;
            $location.path('/student/'+ login_id);
        }
        if(data.type === 'faculty'){
            console.log("It's faculty");
            login_id = data.userid;
            $location.path('/faculty/'+ login_id);
        }
         if(data.type === 'admin'){
            console.log("Its admin");
            $location.path('/admin');
      }
  }
}]);

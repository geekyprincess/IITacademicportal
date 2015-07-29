    'use strict';
            //displays all records
    var show_record = function($scope, $http){
        var req_url;
        req_url = $http.get('/showrecord');
        req_url.success(function(response){
            $scope.full_list = response;
            console.log($scope.full_list);
        })
    }

    angular.module('sampleApp').controller('ShowCtrl', ['$scope', '$http','$routeParams',
      function($scope, $http) {
        console.log("Wea r showing :) ");
        show_record($scope, $http);
    }]);
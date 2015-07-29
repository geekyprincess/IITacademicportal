'use strict';
angular.module('sampleApp').controller('FacultyHomeCtrl', ['$scope','$http','$routeParams','$window',
    function($scope, $http, $routeParams, $window) {
      $scope.facultyid= $routeParams.facID
      console.log($scope.facultyid);
      var id = $scope.facultyid;

     $scope.sem_list = ["1501", "1502"];

        var display_profile = function($scope, $http){
            var req_url;
            req_url = $http.get('/faculty/'+ $scope.facultyid);
            req_url.success(function(response){
              console.log("Done")
                console.log(response);
                $scope.data = response;
            })
        }

       // display_profile();
        var show_record = function($scope, $http) {
            var req_url;
            if (angular.equals($scope.selectedItem.name, "Departments")) {
                req_url = $http.get('/deptmaster');
            } else if (angular.equals($scope.selectedItem.name, "Courses")) {
                req_url = $http.get('/coursemaster/all');
            } else if (angular.equals($scope.selectedItem.name, "Faculty")) {
                req_url = $http.get('/faculty/all');
            } else if (angular.equals($scope.selectedItem.name, "Students")) {
                req_url = $http.get('/students/all');
            } else if (angular.equals($scope.selectedItem.name, "Courses offered")) {
                req_url = $http.get('/coursesoffered/all');
            } else if (angular.equals($scope.selectedItem.name, "Courses Registration")) {
                req_url = $http.get('/coursesregistered/all');
            }
            req_url.success(function(response) {
                $scope.full_list = response;
                console.log("The output");
                console.log($scope.full_list);
            })
        }


        // update record with id sent as parameter
        var update = function($scope, $http, data) {
            var req_url;
            //  console.log($scope.data.id);
            req_url = $http.put('/faculty/' + $scope.facultyid, data);
            req_url.success(function(response) {
           //     $scope.data = {};
            });
        }


        //query
        var query = function($scope, $http, querykey) {
            var req_url;
            console.log("We aree sending route req for query");
            // console.log($scope.querykey);
            if (angular.equals($scope.selectedItem.name, "Departments")) {
                req_url = $http.put('/deptmaster/query', querykey);
            } else if (angular.equals($scope.selectedItem.name, "Faculty")) {
                req_url = $http.put('/faculty/query', querykey);
            } else if (angular.equals($scope.selectedItem.name, "Courses")) {
                req_url = $http.put('/coursemaster/query', querykey);
            } else if (angular.equals($scope.selectedItem.name, "Students")) {
                req_url = $http.put('/students/query', querykey);
            } else if (angular.equals($scope.selectedItem.name, "Courses offered")) {
                req_url = $http.put('/coursesoffered/query', querykey);
            } 
            req_url.success(function(response) {
                $scope.full_list = response;
                console.log($scope.full_list);
            });
        }


        //Array to show table options to admin 
        $scope.listOfOptions = [{
            name: 'Departments',
            url: 'partials/faculty/view_info.html'
        }, {
            name: 'Courses',
            url: 'partials/faculty/view_info.html'
        }, {
            name: 'Students',
            url: 'partials/faculty/view_info.html'
        }, {
            name: 'Faculty',
            url: 'partials/faculty/view_info.html'
        }, {
            name: 'Courses offered',
            url: 'partials/faculty/view_info.html'
        }, {
            name: 'Faculty Home',
            url: 'partials/faculty/profile.html'
        }];

        display_profile($scope,$http);
        $scope.selectedItem = $scope.listOfOptions[5];

        $scope.selectedItemChanged = function() {
            $scope.show_all = true;
            $scope.show_AddRecord = false;
            $scope.show_EditProfile = false;
        //    $scope.data = {};
            if(angular.equals($scope.selectedItem.name, "Departments")){
              $scope.show_value="Departments";
              show_record($scope, $http);
            }
            else if(angular.equals($scope.selectedItem.name, "Courses")){
              $scope.show_value="Courses";
            show_record($scope, $http);
            }
            else if(angular.equals($scope.selectedItem.name, "Students")){
              $scope.show_value="Students";
            show_record($scope, $http);
            }
            else if(angular.equals($scope.selectedItem.name, "Courses offered")){
              $scope.show_value="Courses offered";
            show_record($scope, $http);
            }
            else if(angular.equals($scope.selectedItem.name, "Faculty")){
              $scope.show_value="Faculty";
            show_record($scope, $http);
            }
            else if(angular.equals($scope.selectedItem.name, "Faculty Home")){
              display_profile($scope,$http);
            }
        }


        //update record
        $scope.updaterecord = function(data) {
            update($scope, $http, data);
        }

    $scope.querysearch = function(querykey){
        if(angular.equals($scope.selectedItem.name, "Courses")){
                if(angular.isUndefined(querykey.crid))
                   querykey.crid="" ;
                if(angular.isUndefined(querykey.dpid))
                   querykey.dpid="" ;
                if(angular.isUndefined(querykey.coursename))
                   querykey.coursename="" ;
                if(angular.isUndefined(querykey.credits))
                   querykey.credits= -1 ;

        }
        else if(angular.equals($scope.selectedItem.name, "Faculty")){
                if(angular.isUndefined(querykey.name))
                   querykey.name="" ;
                if(angular.isUndefined(querykey.title))
                   querykey.title="" ;
                if(angular.isUndefined(querykey.fcid))
                   querykey.fcid="" ;
               if(angular.isUndefined(querykey.dpid))
                   querykey.dpid="" ;
               if(angular.isUndefined(querykey.emailid))
                   querykey.emailid="" ;
               if(angular.isUndefined(querykey.contactno))
                   querykey.contactno="" ;
                if(angular.isUndefined(querykey.areas))
                   querykey.areas="" ;
        }
        else if(angular.equals($scope.selectedItem.name, "Departments")){

                if(angular.isUndefined(querykey.id))
                   querykey.id="" ;
                if(angular.isUndefined(querykey.name))
                   querykey.name="" ;
        }
      else  if(angular.equals($scope.selectedItem.name, "Courses Registration")){
                if(angular.isUndefined(querykey.crid))
                   querykey.crid="" ;
                if(angular.isUndefined(querykey.stid))
                   querykey.stid="" ;
                if(angular.isUndefined(querykey.semid))
                   querykey.semid="" ;

        }
      else  if(angular.equals($scope.selectedItem.name, "Courses offered")){
                if(angular.isUndefined(querykey.crid))
                   querykey.crid="" ;
                if(angular.isUndefined(querykey.facid))
                   querykey.facid="" ;
                if(angular.isUndefined(querykey.semid))
                   querykey.semid="" ;
                if(angular.isUndefined(querykey.slotid))
                   querykey.slotid= "" ;
                if(angular.isUndefined(querykey.numseats))
                   querykey.numseats= -1 ;
                if(angular.isUndefined(querykey.totalapplicants))
                   querykey.totalapplicants= -1 ;
                if(angular.isUndefined(querykey.statuscode))
                   querykey.statuscode="" ;
        }

        else {
            if(angular.isUndefined(querykey.stid))
                   querykey.stid="" ;
                if(angular.isUndefined(querykey.name))
                   querykey.name="" ;
                if(angular.isUndefined(querykey.dpid))
                   querykey.dpid="" ;
                if(angular.isUndefined(querykey.year))
                   querykey.year= -1 ;
                if(angular.isUndefined(querykey.degree))
                   querykey.degree="" ;
        }
        query($scope, $http, querykey);
    }

        $scope.back = function() {
            $scope.show_all = true;
            $scope.show_AddRecord = false;
            $scope.show_EditProfile = false;
            show_record($scope, $http); //call the display function
        }
    }]);

'use strict';
angular.module('sampleApp').controller('AdminHomeCtrl', ['$scope', '$http', '$window',
    function($scope, $http, $window) {


        //function to add -->sends query to the model 
        var add_record = function($scope, $http) {
            var req_url;
            console.log($scope.formData);
            if (angular.equals($scope.selectedItem.name, "Departments")) {
                req_url = $http.post('/deptmaster/addrecord', $scope.formData);
            } else if (angular.equals($scope.selectedItem.name, "Courses")) {
                req_url = $http.post('/coursemaster/addrecord', $scope.formData);
            } else if (angular.equals($scope.selectedItem.name, "Faculty")) {
                req_url = $http.post('/faculty/addrecord', $scope.formData);
            } else if (angular.equals($scope.selectedItem.name, "Students")) {
                req_url = $http.post('/students/addrecord', $scope.formData);
            } else if (angular.equals($scope.selectedItem.name, "Courses offered")) {
                $scope.formData.totalapplicants = 0;
                $scope.formData.statuscode = "Open";
                req_url = $http.post('/coursesoffered/addrecord', $scope.formData);
            }
            req_url.success(function(response) {
                $scope.formData = {};
                console.log("Data Added to Database");
            })
        }


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

        //get information to edit the form 
        var edit = function($scope, $http, id) {
            var req_url;
            console.log(id);
            if (angular.equals($scope.selectedItem.name, "Departments")) {
                req_url = $http.get('/deptmaster/' + id.id);
            } else if (angular.equals($scope.selectedItem.name, "Courses")) {
                req_url = $http.get('/coursemaster/' + id.id);
            } else if (angular.equals($scope.selectedItem.name, "Faculty")) {
                req_url = $http.get('/faculty/' + id.id);
            } else if (angular.equals($scope.selectedItem.name, "Students")) {
                req_url = $http.get('/students/' + id.id);
            } else if (angular.equals($scope.selectedItem.name, "Courses offered")) {
                req_url = $http.get('/coursesoffered/' + id.crid + '/' + id.facid + '/' + id.semid);
            } else if (angular.equals($scope.selectedItem.name, "Courses Registration")) {
                req_url = $http.get('/coursesregistered/' + id.crid + '/' + id.stid + '/' + id.semid);
            }
            req_url.success(function(response) {
                console.log("Edit information");
                console.log(response);
                $scope.data = response;
            });
        }


        // update record with id sent as parameter
        var update = function($scope, $http, id) {
            var req_url;
            //  console.log($scope.data.id);
            if (angular.equals($scope.selectedItem.name, "Departments")) {
                req_url = $http.put('/deptmaster/' + id.id, $scope.data)
            } else if (angular.equals($scope.selectedItem.name, "Faculty")) {
                req_url = $http.put('/faculty/' + id.id, $scope.data)
            } else if (angular.equals($scope.selectedItem.name, "Courses")) {
                req_url = $http.put('/coursemaster/' + id.id, $scope.data)
            } else if (angular.equals($scope.selectedItem.name, "Students")) {
                req_url = $http.put('/students/' + id.id, $scope.data);
            } else if (angular.equals($scope.selectedItem.name, "Courses offered")) {
                req_url = $http.put('/coursesoffered/' + id.crid + '/' + id.facid + '/' + id.semid, $scope.data);
            } else if (angular.equals($scope.selectedItem.name, "Courses Registration")) {
                req_url = $http.put('/coursesregistered/' + id.crid + '/' + id.stid + '/' + id.semid, $scope.data);
            }

            req_url.success(function(response) {
                $scope.data = {};
                //$scope.searchkey = {};
            });
        }

        //delete record --> deleted the record with id passed as parameter
        var delete_record = function($scope, $http, id) {
            var req_url;
            console.log("This is the delete functon");
            console.log(id);

            if (angular.equals($scope.selectedItem.name, "Departments")) {
                console.log(id);

                req_url = $http.delete('/deptmaster/' + id.id);
            } else if (angular.equals($scope.selectedItem.name, "Faculty")) {
                req_url = $http.delete('/faculty/' + id.id);
            } else if (angular.equals($scope.selectedItem.name, "Courses")) {
                req_url = $http.delete('/coursemaster/' + id.id);
            } else if (angular.equals($scope.selectedItem.name, "Students")) {
                req_url = $http.delete('/students/' + id.id)
            } else if (angular.equals($scope.selectedItem.name, "Courses offered")) {
                req_url = $http.delete('/coursesoffered/' + id.crid + '/' + id.facid + '/' + id.semid)
            } else if (angular.equals($scope.selectedItem.name, "Courses Registration")) {
                req_url = $http.delete('/coursesregistered/' + id.crid + '/' + id.stid + '/' + id.semid)
            }
            req_url.success(function(response) {
                $scope.data = {};
                //$scope.searchkey.id = {};
            })
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
            } else if (angular.equals($scope.selectedItem.name, "Courses Registration")) {
                req_url = $http.put('/coursesregistered/query', querykey);
            }

            req_url.success(function(response) {
                $scope.full_list = response;
                console.log($scope.full_list);
            });
        }


        //Array to show table options to admin 
        $scope.listOfOptions = [{
            name: 'Departments',
            url: 'partials/admin/departments.html'
        }, {
            name: 'Courses',
            url: 'partials/admin/courses.html'
        }, {
            name: 'Students',
            url: 'partials/admin/students.html'
        }, {
            name: 'Faculty',
            url: 'partials/admin/faculty.html'
        }, {
            name: 'Courses offered',
            url: 'partials/admin/coursesoffered.html'
        }, {
            name: 'Courses Registration',
            url: 'partials/admin/coursesregistered.html'
        }];

        //array to store credit list
        $scope.credit_list = [0, 1, 2, 3, 4, 5];

        //array to store year list 
        var year_list = new Date().getFullYear();
        var range = [];
        range.push(year_list);
        for (var i = 1; i < 100; i++) {
            range.push(year_list - i);
        }
        $scope.years_list = range;

        //list of degrees offered
        $scope.degree_list = ["B.Tech", "M.Tech", "PhD", "Research Assistant", "B.Arch"];
        $scope.status_list = ["Open", "Close"];
        $scope.sem_list = ["1501", "1502"];
        //department list
        var getDeptList = function() {
            $scope.dpid_list = [];
            var req_url = $http.get('/deptmaster');
            req_url.success(function(response) {
                $scope.dpid_list = response;
                console.log($scope.dpid_list);
            });
        }
        var getCourseList = function() {
            $scope.crid_list = [];
            var req_url = $http.get('/coursemaster/all');
            req_url.success(function(response) {
                $scope.crid_list = response;
                console.log($scope.crid_list);
            });
        }

        var getFacultyList = function() {
            $scope.fcid_list = [];
            var req_url = $http.get('/faculty/all');
            req_url.success(function(response) {
                $scope.fcid_list = response;
                console.log($scope.fcid_list);
            });
        }

        getFacultyList(); //to create the list first time
        getDeptList(); //to create the list first time
        getCourseList(); //to create the list first time

        $scope.selectedItemChanged = function() {
            $scope.show_all = true;
            $scope.show_AddRecord = false;
            $scope.show_EditProfile = false;
            show_record($scope, $http);
            $scope.data = {};
        }

        //called when the button to add new record is clicked to open the add form
        $scope.new_record = function() {
            $scope.show_AddRecord = true;
            $scope.show_all = false;
            $scope.show_EditProfile = false;
            $scope.formData = {};
        }

        //when add operation is to be performed. Executed to POST data entered in add record form
        $scope.add = function() {
            add_record($scope, $http);
            if (angular.equals($scope.selectedItem.name, "Departments")) {
                getDeptList();
            }
            //to update the list of department
            if (angular.equals($scope.selectedItem.name, "Faculty")) {
                getFacultyList();
            }
            if (angular.equals($scope.selectedItem.name, "Courses")) {
                getCourseList();
            }

        }

        // to display information of the record with id, on an editable form 
        $scope.displayedit = function() {

            $scope.show_all = false;
            $scope.show_AddRecord = false;
            $scope.show_EditProfile = true;

            if (angular.equals($scope.selectedItem.name, "Courses offered"))
                edit($scope, $http, {
                    crid: arguments[0],
                    facid: arguments[1],
                    semid: arguments[2]
                });
            else if ($scope.is_courses_registered)
                edit($scope, $http, {
                    crid: arguments[0],
                    stid: arguments[1],
                    semid: arguments[2]
                });
            else
                edit($scope, $http, {
                    id: arguments[0]
                });
        }

        //update record
        $scope.updaterecord = function() {
            var id = {};
            if (angular.equals($scope.selectedItem.name, "Courses offered")) {
                id.crid = arguments[0];
                id.stid = arguments[1];
                id.semid = arguments[2];
            } else
                id.id = arguments[0];
            update($scope, $http, id);
            show_record($scope, $http); //call the display function
            if (angular.equals($scope.selectedItem.name, "Departments")) {
                getDeptList();
            } //to update the list of department
        }

        //delete a record
        $scope.delete = function() {
            //delete confirmation
            console.log("Function called after delete button clicked");

            var deleteUser = $window.confirm('Are you sure you want to delete?');
            if (deleteUser) {

                if (angular.equals($scope.selectedItem.name, "Courses offered"))
                    delete_record($scope, $http, {
                        crid: arguments[0],
                        facid: arguments[1],
                        semid: arguments[2]
                    });
                else if (angular.equals($scope.selectedItem.name, "Courses Registration"))
                    delete_record($scope, $http, {
                        crid: arguments[0],
                        stid: arguments[1],
                        semid: arguments[2]
                    });
                else
                    delete_record($scope, $http, {
                        id: arguments[0]
                    });
                show_record($scope, $http); //call the display function  
                if (angular.equals($scope.selectedItem.name, "Departments")) {
                    getDeptList();
                } //to update the list of department
                if (angular.equals($scope.selectedItem.name, "Faculty")) {
                    getFacultyList();
                }
                if (angular.equals($scope.selectedItem.name, "Courses")) {
                    getCourseList();
                }

            }
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

 /*       
            } else if (angular.equals($scope.selectedItem.name, "Courses offered")) {
                if (angular.isUndefined(querykey.crid))
                    querykey.crid = "";
                if (angular.isUndefined(querykey.facid))
                    querykey.facid = "";
                if (angular.isUndefined(querykey.semid))
                    querykey.semid = "";
                if (angular.isUndefined(querykey.slotid))
                    querykey.slotid = "";
                if (angular.isUndefined(querykey.numseats))
                    querykey.numseats = "0";
                if (angular.isUndefined(querykey.totalapplicants))
                    querykey.totalapplicants = "0";
                if (angular.isUndefined(querykey.statuscode))
                    querykey.statuscode = "";
                query($scope, $http, querykey);
            } else if (angular.equals($scope.selectedItem.name, "Courses Registration")) {
                if (angular.isUndefined(querykey.crid))
                    querykey.crid = "";
                if (angular.isUndefined(querykey.stid))
                    querykey.stid = "";
                if (angular.isUndefined(querykey.semid))
                    querykey.semid = "";
                query($scope, $http);
            }
        }
*/

        $scope.back = function() {
            $scope.show_all = true;
            $scope.show_AddRecord = false;
            $scope.show_EditProfile = false;
            show_record($scope, $http); //call the display function
        }

    }
]);
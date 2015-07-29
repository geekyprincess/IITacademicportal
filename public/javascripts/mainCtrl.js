'use strict';

/* App Module */

var sampleApp = angular.module('sampleApp', [
  'ngRoute']);

sampleApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/',{
      templateUrl: 'partials/login.html',
      controller: 'loginCtrl'
    }).
    when('/student/:stdID',{
      templateUrl: 'partials/student/home.html',
      controller: 'StudentHomeCtrl'
    }).
    when('/admin', {
      templateUrl: 'partials/admin/home.html',
      controller: 'AdminHomeCtrl'
    }).
    when('/faculty/:facID',{
      templateUrl: 'partials/faculty/home.html',
      controller: 'FacultyHomeCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });
}]);
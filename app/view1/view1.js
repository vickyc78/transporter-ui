"use strict";

angular
  .module("myApp.login", ["ngRoute"])

  .config([
    "$routeProvider",
    function($routeProvider, $stateProvider) {
      $routeProvider.when("/login", {
        templateUrl: "view1/login.html",
        controller: "loginCtrl"
      });
    }
  ])

  .controller("loginCtrl", function($scope, $http, toastr) {
    $scope.adminUrl = "http://localhost:5000";
    $scope.name = "Login Page";
    $scope.formData = {};
    $scope.formSubmit = async function(data) {
      console.log("formSubmit formSubmit", data);
      $scope.loginData = await $http
        .post($scope.adminUrl + "/User/loginUser", data)
        .then(function(data) {
          console.log("HHHHHHHHHHHH", data);
          return data;
        })
        .catch(function(err) {
          console.log("ERRRRRRRRRRR", err);
          return err;
        });
      console.log("$scope.loginData $scope.loginData", $scope.loginData);
      if (
        $scope.loginData &&
        $scope.loginData.data &&
        $scope.loginData.status == 200
      ) {
        localStorage.setItem("accessToken", $scope.loginData.data.tokenCreated);
        window.open("#!/dashboard", "_self");
        toastr.success("Login Successfully");
      } else if ($scope.loginData.status == 400) {
        toastr.error($scope.loginData.data.error);
      } else if ($scope.loginData.status == 401) {
        toastr.error($scope.loginData.data.error);
      }
    };
  });

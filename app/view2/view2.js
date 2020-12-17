"use strict";

angular
  .module("myApp.dashboard", ["ngRoute"])

  .config([
    "$routeProvider",
    function($routeProvider) {
      $routeProvider.when("/dashboard", {
        templateUrl: "view2/dashboard.html",
        controller: "dashboardCtrl"
      });
    }
  ])
  .controller("dashboardCtrl", function($scope, $http, toastr, $route) {
    console.log("dashboardCtrl dashboardCtrl");
    $scope.adminUrl = "http://localhost:5000";
    $scope.accessToken = localStorage.getItem("accessToken");
    $scope.dispatches = [];
    $scope.formData = {};
    console.log("$scope.accessToken  $scope.accessToken ", $scope.accessToken);
    $scope.createDispatch = function() {
      console.log("inside createDispatch function");
      window.open("#!/createdispatch/yguhi", "_self");
    };
    $scope.editDispatch = function(data) {
      console.log("inside createDispatch function", data);
      window.open(`#!/createdispatch/${data}`, "_self");
    };

    $scope.getAllDispatch = async function(data) {
      console.log("EZDXCFGVHBJN");
      $scope.dispatchData = await $http
        .post($scope.adminUrl + "/Dispatch/getAllDispatch", data, {
          headers: {
            accessToken: $scope.accessToken
          }
        })
        .then(function(data) {
          console.log("HHHHHHHHHHHH", data);
          return (
            ($scope.dispatches = data.data.results),
            ($scope.totalCount = data.data.total)
          );
        })
        .catch(function(err) {
          console.log("ERRRRRRRRRRR", err);
          toastr.error(err.data.error);
          localStorage.clear();
          window.open("#!/login", "_self");
          return err;
        });
      console.log("$scope.loginData $scope.loginData", $scope.dispatchData);
    };
    $scope.generateExcel = async function(data) {
      console.log("EZDXCFGVHBJN");
      $scope.excelData = await $http
        .post($scope.adminUrl + "/Dispatch/generateDispatchExcel", data, {
          headers: {
            accessToken: $scope.accessToken
          },
          responseType: "blob"
        })
        .then(function(data) {
          console.log("HHHHHHHHHHHH", data);
          var path = "Dispatch-" + new Date().toISOString() + ".xlsx";
          // callback(null, data)
          var blob = new Blob([data.data]);
          var objectUrl = (window.URL || window.webkitURL).createObjectURL(
            blob
          );
          const link = document.createElement("a");
          link.href = objectUrl;
          // let fileName = data.data.fileName
          link.setAttribute("download", path);
          document.body.appendChild(link);
          link.click();
          $scope.getAllDispatch($scope.formData);
          return 0;
        })
        .catch(function(err) {
          console.log("ERRRRRRRRRRR", err);
          toastr.error("Internal server error!");
          return 0;
        });
      console.log("$scope.loginData $scope.loginData", $scope.excelData);
    };
    $scope.getAllDispatch($scope.formData);
    $scope.deleteBonusList = async function(data) {
      $scope.deleteData = await $http
        .post(
          $scope.adminUrl + "/Dispatch/deleteDispatch",
          { dispatchId: data },
          {
            headers: {
              accessToken: $scope.accessToken
            }
          }
        )
        .then(function(data) {
          console.log("HHHHHHHHHHHH", data);
          if (data && data.status == 200 && data.data.nModified) {
            toastr.success("Data Disable Successfully");
            $scope.getAllDispatch($scope.formData);
          }
          return 0;
        })
        .catch(function(err) {
          console.log("ERRRRRRRRRRR", err);
          toastr.error(err.data.error);
          return err;
        });
    };
  });

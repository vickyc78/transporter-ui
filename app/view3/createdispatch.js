"use strict";

angular
  .module("myApp.createdispatch", ["ngRoute"])

  .config([
    "$routeProvider",
    function($routeProvider) {
      $routeProvider.when("/createdispatch/:id", {
        templateUrl: "view3/createdispatch.html",
        controller: "createDispatchCtrl"
      });
    }
  ])

  .controller("createDispatchCtrl", function($scope, $http, toastr, $route) {
    $scope.adminUrl = "http://localhost:5000";
    $scope.formData = {};
    $scope.accessToken = localStorage.getItem("accessToken");
    $scope.name = "Create Dispatch";
    var str = "MP 09 AB 1234";
    var pattern = "^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$";
    var result = str.match(pattern);
    console.log(result);

    $scope.getAllSourceCode = async function() {
      console.log("EZDXCFGVHBJN");
      $scope.sourceCodeData = await $http
        .post(
          $scope.adminUrl + "/Source/getAllSource",
          {},
          {
            headers: {
              accessToken: $scope.accessToken
            }
          }
        )
        .then(function(data) {
          console.log("HHHHHHHHHHHH", data);
          return ($scope.sourceCodes = data.data);
        })
        .catch(function(err) {
          console.log("ERRRRRRRRRRR", err);
          toastr.error(err.data.error);
          localStorage.clear();
          window.open("#!/login", "_self");
          return err;
        });
      console.log(
        "$scope.sourceCodeData $scope.sourceCodeData",
        $scope.sourceCodeData
      );
    };
    $scope.getAllSourceCode();

    $scope.getAllDestinationCode = async function() {
      console.log("EZDXCFGVHBJN");
      $scope.destinationCodeData = await $http
        .post(
          $scope.adminUrl + "/Destination/getAllDestination",
          {},
          {
            headers: {
              accessToken: $scope.accessToken
            }
          }
        )
        .then(function(data) {
          console.log("HHHHHHHHHHHH", data);
          return ($scope.destinationCodes = data.data);
        })
        .catch(function(err) {
          console.log("ERRRRRRRRRRR", err);
          // toastr.error(err.data.error);
          // localStorage.clear();
          // window.open("#!/login", "_self");
          return err;
        });
      console.log(
        "$scope.destinationCodeData $scope.destinationCodeData",
        $scope.destinationCodeData
      );
    };
    $scope.getAllDestinationCode();

    $scope.getAllTransporterCode = async function() {
      console.log("EZDXCFGVHBJN");
      $scope.transporterCodeData = await $http
        .post(
          $scope.adminUrl + "/Transporter/getAllTransporter",
          {},
          {
            headers: {
              accessToken: $scope.accessToken
            }
          }
        )
        .then(function(data) {
          console.log("HHHHHHHHHHHH", data);
          return ($scope.transporterCodes = data.data);
        })
        .catch(function(err) {
          console.log("ERRRRRRRRRRR", err);
          // toastr.error(err.data.error);
          // localStorage.clear();
          // window.open("#!/login", "_self");
          return err;
        });
      console.log(
        "$scope.transporterCodeData $scope.transporterCodeData",
        $scope.transporterCodeData
      );
    };
    $scope.getAllTransporterCode();

    $scope.saveDispatch = async function(data) {
      if (data && data.vehicleNumber) {
        var pattern =
          "^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$";
        var result = data.vehicleNumber.match(pattern);
        if (!result) {
          toastr.error("Please Provide Vehicle Number as per text");
          return;
        }
        $scope.loginData = await $http
          .post($scope.adminUrl + "/Dispatch/saveDispatch", data, {
            headers: {
              accessToken: $scope.accessToken
            }
          })
          .then(function(data) {
            console.log("HHHHHHHHHHHH", data);
            window.open("#!/dashboard", "_self");
            toastr.success("Dispatch Save Successfully");
          })
          .catch(function(err) {
            console.log("ERRRRRRRRRRR", err);
            toastr.error("Internal Server Error");
            return;
          });
      }
    };
    $scope.editPage = false;
    console.log("routeProvider routeProvider", $route.current.params.id);
    if ($route.current.params.id != "yguhi") {
      $scope.editPage = true;
      console.log("inside if");
      $scope.getOneDispatch = async function() {
        $scope.getOneDispatch = await $http
          .get(
            $scope.adminUrl +
              `/Dispatch/getOneDispatch/${$route.current.params.id}`,
            {
              headers: {
                accessToken: $scope.accessToken
              }
            }
          )
          .then(function(data) {
            console.log("HHHHHHHHHHHH", data);
            $scope.formData = data.data;
            $scope.formData.startDate = new Date(data.data.startDate);
            $scope.formData.endDate = new Date(data.data.endDate);
          })
          .catch(function(err) {
            console.log("ERRRRRRRRRRR", err);
            toastr.error("Internal Server Error");
            return;
          });
      };
      $scope.getOneDispatch();
      $scope.updateDispatch = async function(data) {
        var pattern =
          "^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$";
        var result = data.vehicleNumber.match(pattern);
        if (!result) {
          toastr.error("Please Provide Vehicle Number as per text");
          return;
        }
        $scope.updateDispatch = await $http
          .post($scope.adminUrl + `/Dispatch/updateDispatch`, data, {
            headers: {
              accessToken: $scope.accessToken
            }
          })
          .then(function(data) {
            console.log("HHHHHHHHHHHH", data);
            if (data && data.status == 200 && data.data.nModified) {
              toastr.success("Dispatch Updated SuccessFully");
              window.open("#!/dashboard", "_self");
              return;
            }
          })
          .catch(function(err) {
            console.log("ERRRRRRRRRRR", err);
            toastr.error("Internal Server Error");
            return;
          });
      };
    }
    $scope.cancel = function() {
      window.open("#!/dashboard", "_self");
    };
  });

"use strict";

// Declare app level module which depends on views, and core components
angular
  .module("myApp", [
    "ngRoute",
    "myApp.login",
    "myApp.dashboard",
    "myApp.createdispatch",
    "myApp.version",
    "toastr"
  ])
  .config([
    "$locationProvider",
    "$routeProvider",
    function($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix("!");

      $routeProvider.otherwise({ redirectTo: "/login" });
    }
  ])
  .directive("directiveWhenScrolled", function() {
    return function(scope, elm, attr) {
      var raw = elm[0];
      console.log("raw raw", raw);

      elm.bind("scroll", function() {
        if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
          scope.$apply(attr.directiveWhenScrolled);
        }
      });
    };
  });

'use strict';

var cartodbApp = angular.module('cartodbApp', ['ui.router']);

cartodbApp.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/example1");
  //
  // Now set up the states
  $stateProvider
    .state('example1', {
      url: "/example1",
      templateUrl: "partials/example1.html"
    })
      .state('example2', {
      url: "/example2",
      templateUrl: "partials/example2.html"
    })
      .state('example_viz_layers', {
      url: "/example_viz_layers",
      templateUrl: "partials/example_viz_layers.html"
    })
      .state('example_cartocss_sql', {
      url: "/example_cartocss_sql",
      templateUrl: "partials/example_cartocss_sql.html"
    })
       .state('example_sql_selector', {
      url: "/example_sql_selector",
      templateUrl: "partials/example_sql_selector.html"
    })
      .state('example_query_by_distance', {
      url: "/example_query_by_distance",
      templateUrl: "partials/example_query_by_distance.html"
    })
      .state('example_sql_selector_schools', {
      url: "/example_sql_selector_schools",
      templateUrl: "partials/example_sql_selector_schools.html"
    })
    .state('example_sql_selector_villages', {
      url: "/example_sql_selector_villages",
      templateUrl: "partials/example_sql_selector_villages.html"
    })
    .state('example_torque', {
      url: "/example_torque",
      templateUrl: "partials/example_torque.html"
    })
    .state('example_driving_directions', {
      url: "/example_driving_directions",
      templateUrl: "partials/example_driving_directions.html"
    })
    .state('example_forward_geocoding', {
      url: "/example_forward_geocoding",
      templateUrl: "partials/forward_geocoding.html"
    });



});

cartodbApp.run(['$rootScope',function($rootScope) {

    $rootScope.toggleMenu = function() {
            $("#wrapper").toggleClass("toggled");
    };

}]);

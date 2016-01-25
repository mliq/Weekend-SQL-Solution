var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/addresses', {
            templateUrl: "assets/views/routes/addresses.html",
            controller: "AddressController"
        })
        .when('/orders', {
            templateUrl: "assets/views/routes/orders.html",
            controller: "OrderController"
        })
        .otherwise({
            redirectTo: 'addresses'
        });

}]);
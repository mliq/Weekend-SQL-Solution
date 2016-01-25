myApp.controller('AddressController', ["$scope", "$http", function($scope, $http) {
    console.log('AddressController running');
    $scope.users = [];
    $scope.addresses = [];
    $scope.selectedUser = {};

    $scope.getAddresses = function() {
        console.log($scope.users);

        $http({
            url: '/addresses/',
            method: 'GET',
            params: {
                userID: $scope.selectedUser.id,
            }
        }).then(
            function(response) {
                console.log(response);
                $scope.addresses = response.data;
            });
    };

    var getUsers = function() {
        $http.get('/users/').then(
            function(response) {
                console.log(response.data);
                $scope.users = response.data;
            });
    };

    getUsers();

}]);

myApp.controller('OrderController', ["$scope", "$http", function($scope, $http) {
        console.log('OrderController running');
        $scope.orders = [];
        $scope.users = [];
        $scope.ordersTotal = 0;

        $scope.getOrders = function() {
            $http({
                url: '/orders/',
                method: 'GET',
                params: {
                    userID: $scope.selectedUser.id,
                    startDate: $scope.selectedUser.startDate,
                    endDate: $scope.selectedUser.endDate
                }
            }).then(
                function(response) {
                    updateTotal(response.data);
                    $scope.orders = response.data;
                });
        };

        function updateTotal(data) {
            $scope.ordersTotal = 0;
            for (var i = 0; i < data.length; i++) {
                $scope.ordersTotal += parseFloat(data[i].amount);
            }
        }

        var getUsers = function() {
            $http.get('/users/').then(
                function(response) {
                    console.log(response.data);
                    $scope.users = response.data;
                });
        };

    getUsers();

}]);
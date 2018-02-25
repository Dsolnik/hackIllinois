myApp.controller('UserCtrl', [
    '$scope',
    '$resource',
    function ($scope, $resource) {

        $scope.user= {
            "name" : "Aditya Jadhav",
            "phone" : +13475072312,
            "coordinates" : "0° 41′ 21.4” N 74° 02′ 40.2” W"
        };

        $scope.save = function(){
            console.log("Saving");
            angular.user = $scope.user;
        }

        angular.user = $scope.user;
    }
]);
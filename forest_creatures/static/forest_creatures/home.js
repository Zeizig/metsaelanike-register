var app = angular.module('animalsApp', []).config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
});

app.controller('OneSpeciesController', function ($scope, $http) {

    $scope.species = null;
    $scope.activeAnimal = null;
    $scope.speciesAnimals = [];

    $scope.init = function () {
        console.log(window.species_id);

        $http({
            method: 'GET',
            url: '/api/animals/species/' + window.species_id + '/animals'
        }).then(function (data) {
            console.log(data.data);
            $scope.speciesAnimals = data.data;
        });
    };

    $scope.selectSpecies = function (index) {
        $scope.activeAnimal = $scope.species[index];
        $http({
            method: 'GET',
            url: '/api/animals/species/' + $scope.activeAnimal.id + '/animals'
        }).then(function (data) {
            $scope.activeSpeciesAnimals = data.data;
        });
    };

    $scope.init();
});

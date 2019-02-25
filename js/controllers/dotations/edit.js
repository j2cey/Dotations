"use strict";
(function () {
	angular.module("dotationApp")
		.controller("editDotationCtrl", ["$scope", "dotationService", "$routeParams","$location", 
			function ($scope, dotationService, $routeParams,$location) { 
			
			$scope.categoriesemployes = dotationService.getCategoriesemployes();
			$scope.statutsdotations = dotationService.getStatutsdotation();	
					
			dotationService.getById($routeParams.dotationId)
			.then(function (response) {
			$scope.dotation = {
				dotationId : response.d.ID,
				libelle: response.d.Libelle,
				valeur: response.d.Valeur,
				categorie: response.d.Categorie,
				statut: response.d.Statut
			};
			$scope.editDotation = function(dotation){
				dotationService.update(dotation)
				.then(function(response){
					$location.path("/");
				});
			};
		});
	}]);
})();
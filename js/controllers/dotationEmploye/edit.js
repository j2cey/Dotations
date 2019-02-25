"use strict";
(function () {
	angular.module("dotationApp")
		.controller("editDotationEmployeCtrl", ["$scope", "dotationService","dotationEmployeService", "$routeParams","$location","$filter", 
			function ($scope,dotationService,dotationEmployeService,$routeParams,$location,$filter) { 
			
			$scope.categoriesemployes = dotationService.getCategoriesemployes();
			$scope.statutsdotations = dotationService.getStatutsdotation();	
			
			dotationService.getAll()
				.then(function (response) {
            		var dotationstmp = response.d.results;
            		$scope.dotations = dotationstmp;
            		//console.log($scope.dotations);
            	}
        	);
					
			dotationEmployeService.getById($routeParams.dotationEmployeId)
				.then(function (response) {
				$scope.dotationEmploye = {
					dotationEmployeId : response.d.ID,
					email: response.d.Email,
					nom: response.d.Nom,
					categorie: response.d.Categorie,
					idDotation: response.d.IdDotation,
					dotation: response.d.Dotation,
					valeur: response.d.Valeur,
					statut: response.d.Statut
				};
				
				console.log($scope.dotationEmploye);
				
				$scope.editDotationEmploye = function(dotationEmploye ){
					dotationEmployeService.update(dotationEmploye)
					.then(function(response){
						$location.path("/");
					});
				};
			
				$scope.dotationChange = function () {
					/*$scope.dotationemploye.dotationId = parseInt($scope.dotationemploye.dotationId);*/
					var selectedDotation = $filter('filter')($scope.dotations, function (d) {return d.Id == $scope.dotationEmploye.idDotation;})[0];
					
					$scope.dotationEmploye.valeur = selectedDotation.Valeur;
					$scope.dotationEmploye.dotation = selectedDotation.Libelle;
				};
		});
	}]);
})();
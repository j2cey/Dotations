"use strict";
(function () {
	angular.module("dotationApp")
		.controller("editDotationDemandeCtrl", ["$scope", "dotationService","dotationEmployeService","dotationDemandeService", "$routeParams","$location","$filter", 
			function ($scope,dotationService,dotationEmployeService,dotationDemandeService,$routeParams,$location,$filter) { 
			
			$scope.categoriesemployes = dotationService.getCategoriesemployes();
			$scope.statutsdotations = dotationService.getStatutsdotation();	
			
			console.log("categories employes: " + $scope.categoriesemployes);
			
			dotationDemandeService.getById($routeParams.dotationDemandeId)
				.then(function (response) {
				$scope.dotationDemande = {
					dotationDemandeId : response.d.ID,
					email: response.d.Email,
					nom: response.d.Nom,
					categorie: response.d.Categorie,
					details: response.d.Details,
					statut: response.d.Statut,
					etat: response.d.Etat,
					picked: response.d.Picked,
					parent: response.d.Parent,
					traitement: response.d.Traitement
				};
				
				console.log("dotation demande: " + $scope.dotationDemande);
				
				dotationEmployeService.getAllByEmail($scope.dotationDemande.email)
					.then(function (response) {
                	$scope.dotationsEmployes = response.d.results;
				});
				
				console.log("dotation Employe: " + $scope.dotationEmploye);
				
				$scope.editDotationDemande = function(dotationDemande){
					dotationDemande.statut = 'Termine';
					dotationDemandeService.update(dotationDemande)
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
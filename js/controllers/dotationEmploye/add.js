"use strict";
(function () {
	angular.module("dotationApp")
		.controller("addDotationEmployeCtrl", ["$scope","dotationService","dotationEmployeService","dotationDemandeService","$routeParams","$location","$filter", function ($scope,dotationService,dotationEmployeService,dotationDemandeService,$routeParams,$location,$filter) {
		
		$scope.categoriesemployes = dotationService.getCategoriesemployes();
		$scope.statutsdotations = dotationService.getStatutsdotation();
		
		$scope.currusers = dotationService.getAllUsers();
		
		var userEmail = $().SPServices.SPGetCurrentUser({fieldName: "Email"});
		var single_object = $filter('filter')($scope.currusers, function (d) {return d.email === userEmail;})[0];
		
		/*
		$scope.specifiedUser = $filter('filter')($scope.currusers, function (d) {return d.email === $routeParams.employeEmail;})[0];
		
		console.log("specified user: " + $scope.specifiedUser.email);
		
		if ($scope.specifiedUser != undefined){
			$scope.dotationemploye = {
				email: $scope.specifiedUser.email,
				nom: $scope.specifiedUser.name,
				categorie: $scope.specifiedUser.categorie
			};
			
			console.log("dotationemploye: " + $scope.dotationemploye.nom);
		}
		*/
		
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
				$scope.dotationemploye = {
					email: $scope.dotationDemande.email,
					nom: $scope.dotationDemande.name,
					categorie: $scope.dotationDemande.categorie
				};
		
		dotationService.getAll()
			.then(function (response) {
            	var dotationstmp = response.d.results;
            	$scope.dotations = dotationstmp;
            	//console.log($scope.dotations);
            }
        );
		
		$scope.addDotationEmploye = function (dotationemploye) {
			dotationEmployeService.addNew(dotationemploye)
			.then(function(response){
				console.log(response);
				$location.path("/editDotationDemande/" + $scope.dotationDemande.dotationDemandeId);
			});
		};
		
		$scope.dotationChange = function () {
			/*$scope.dotationemploye.idDotation = parseInt($scope.dotationemploye.idDotation);*/
			var selectedDotation = $filter('filter')($scope.dotations, function (d) {return d.Id == $scope.dotationemploye.idDotation;})[0];
			
			$scope.dotationemploye.valeur = selectedDotation.Valeur;
			$scope.dotationemploye.dotation = selectedDotation.Libelle;
			
			console.log($scope.dotationemploye);
		};
		
		$scope.employeChange = function () {
			if ($scope.specifiedUser == undefined){
				var selectedEmploye = $filter('filter')($scope.currusers, function (d) {return d.email == $scope.dotationemploye.email;})[0];
				
				$scope.dotationemploye.nom = selectedEmploye.name;
				$scope.dotationemploye.categorie = selectedEmploye.categorie;
				
				console.log("Employe changed: " + $scope.dotationemploye);
			}
		};

		});
	}]);
})();
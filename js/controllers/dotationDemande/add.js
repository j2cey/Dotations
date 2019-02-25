"use strict";
(function () {
	angular.module("dotationApp")
		.controller("addDotationDemandeCtrl", ["$scope","dotationService","dotationEmployeService","dotationDemandeService","$location","$filter", function ($scope,dotationService,dotationEmployeService,dotationDemandeService,$location,$filter) {
		
		$scope.categoriesemployes = dotationService.getCategoriesemployes();
		$scope.statutsdotations = dotationService.getStatutsdotation();
		
		$scope.statutsDemande = dotationService.getStatutsDemande();
		$scope.etatsDemande = dotationService.getEtatsDemande();
		
		$scope.statutdemande = $scope.statutsDemande[1];
		$scope.etatdemande = $scope.etatsDemande[1];
		
		$scope.currusers = dotationService.getAllUsers();
		
		var userEmail = $().SPServices.SPGetCurrentUser({fieldName: "Email"});
		$scope.curruser = $filter('filter')($scope.currusers, function (d) {return d.email === userEmail;})[0];
		
		console.log($scope.curruser);
		
		$scope.addDotationDemande = function (dotationDemande) {
			
			dotationDemande.email = $scope.curruser.email;
			dotationDemande.nom = $scope.curruser.name;
			dotationDemande.categorie = $scope.curruser.categorie;
			dotationDemande.statut = $scope.statutdemande.name;
			dotationDemande.etat = $scope.etatdemande.name;
			dotationDemande.picked = "0";
			dotationDemande.parent = "0";
			dotationDemande.traitement = "";
			
			dotationDemandeService.addNew(dotationDemande)
			.then(function(response){
				console.log(response);
				$location.path("/");
			});
		};
		
	}]);
})();
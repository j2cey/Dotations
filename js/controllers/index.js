"use strict";
(function () {
	angular.module("dotationApp")
		.controller("indexCtrl", ["$scope", "dotationService", "dotationEmployeService","dotationDemandeService","$filter",
		function ($scope, dotationService, dotationEmployeService,dotationDemandeService, $filter) {
						
			$scope.categoriesemployes = dotationService.getCategoriesemployes();
			$scope.statutsdotations = dotationService.getStatutsdotation();
			
			$scope.statutsDemande = dotationService.getStatutsDemande();
			$scope.etatsDemande = dotationService.getEtatsDemande();
			
			$scope.statutdemande = $scope.statutsDemande[1].name;
			$scope.etatdemande = $scope.etatsDemande[1].name;
			
			console.log($scope.etatdemande);
			
			$scope.currusers = dotationService.getAllUsers();
			
			var userEmail = $().SPServices.SPGetCurrentUser({fieldName: "Email",debug: false});
			$scope.curruser = $filter('filter')($scope.currusers, function (d) {return d.email === userEmail;})[0];
			
			if ($scope.curruser.dprofil === 'admin') {
				$scope.canadmin = 'true';
			} else {
				$scope.canadmin = 'false';
			}
			
			console.log($scope.canadmin);
			
			dotationService.getAll()
				.then(function (response) {
                $scope.dotations = response.d.results;
			});
			dotationEmployeService.getAllByEmail()
				.then(function (response) {
                $scope.dotationsEmployes = response.d.results;
			});
			dotationDemandeService.getAllByEmailStatutEtat($scope.statutdemande,$scope.etatdemande)
				.then(function (response) {
                $scope.dotationsDemandes = response.d.results;
			});
			
			$scope.removeDotation = function(dotation){
				dotationService.remove(dotation.ID)
				.then(function(response){
					var dotationIndex = $scope.dotations.indexOf(dotation);
					$scope.dotations.splice(dotationIndex,1);
				});
			};
			$scope.removeDotationEmploye = function(dotationemploye){
				dotationEmployeService.remove(dotationemploye.ID)
				.then(function(response){
					var dotationIndex = $scope.dotationsEmployes.indexOf(dotationemploye);
					$scope.dotationsEmployes.splice(dotationIndex,1);
				});
			};
			
			$scope.refreshDemandes = function () {
				dotationDemandeService.getAllByEmailStatutEtat($scope.statutdemande,$scope.etatdemande)
					.then(function (response) {
            	    $scope.dotationsDemandes = response.d.results;
				});
			};
		}]);
})();
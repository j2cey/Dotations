"use strict";
(function () {
	angular.module("dotationApp")
		.controller("addDotationCtrl", ["$scope", "dotationService","$location","$filter", function ($scope, dotationService,$location,$filter) {
		
		$scope.categoriesemployes = dotationService.getCategoriesemployes();
		$scope.statutsdotations = dotationService.getStatutsdotation();
		
		$scope.currusers = dotationService.getAllUsers();
		
		var userEmail = $().SPServices.SPGetCurrentUser({fieldName: "Email"});
		var single_object = $filter('filter')($scope.currusers, function (d) {return d.email === userEmail;})[0];
		
		console.log(single_object.email);
		
		$scope.addDotation = function (dotation) {
			dotationService.addNew(dotation)
			.then(function(response){
				console.log(response);
				$location.path("/");
			});
			
		};
	}]);
})();
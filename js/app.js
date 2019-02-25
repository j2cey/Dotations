"use strict";
(function () {
	angular.module("dotationApp", ["ngRoute"])
		.config(["$routeProvider", function ($routeProvider) {
		$routeProvider.when("/", {
			templateUrl: "/SiteAssets/Dotations/templates/index.html",
			controller: "indexCtrl"
		}).when("/addDotation", {
			templateUrl: "/SiteAssets/Dotations/templates/dotations/add.html",
			controller: "addDotationCtrl"
		}).when("/addDotationEmploye/:dotationDemandeId", {
			templateUrl: "/SiteAssets/Dotations/templates/dotationEmploye/add.html",
			controller: "addDotationEmployeCtrl"
		}).when("/editDotation/:dotationId", {
			templateUrl: "/SiteAssets/Dotations/templates/dotations/edit.html",
			controller: "editDotationCtrl"
		}).when("/editDotationEmploye/:dotationEmployeId", {
			templateUrl: "/SiteAssets/Dotations/templates/dotationEmploye/edit.html",
			controller: "editDotationEmployeCtrl"
		}).when("/addDotationDemande", {
			templateUrl: "/SiteAssets/Dotations/templates/dotationDemande/add.html",
			controller: "addDotationDemandeCtrl"
		}).when("/editDotationDemande/:dotationDemandeId", {
			templateUrl: "/SiteAssets/Dotations/templates/dotationDemande/edit.html",
			controller: "editDotationDemandeCtrl"
		});
	}]);
})();
"use strict";
(function(){
	angular.module("dotationApp")
	.factory("dotationEmployeService",["baseSvc",function(baseService){
		var listEndPoint = '/_api/web/lists';
		
		var getAll = function(){
			var query = listEndPoint + "/GetByTitle('DotationEmploye')/Items?$select=ID,Email,Nom,Categorie,IdDotation,Dotation,Valeur,Statut";
			return baseService.getRequest(query);
		};
		var getAllByEmail = function(){
		    var userEmail = $().SPServices.SPGetCurrentUser({fieldName: "Email"});
		    console.log(userEmail);
			var query = listEndPoint + "/GetByTitle('DotationEmploye')/Items?$select=ID,Email,Nom,Categorie,IdDotation,Dotation,Valeur,Statut&$filter=Email eq '"+userEmail+"'";
			return baseService.getRequest(query);
		};
		var addNew = function(dotationEmploye){
			var data = {
				__metadata: { 'type': 'SP.Data.DotationEmployeListItem' },
				Email : dotationEmploye.email,
				Nom : dotationEmploye.nom,
				Categorie : dotationEmploye.categorie,
				IdDotation : dotationEmploye.idDotation,
				Dotation : dotationEmploye.dotation,
				Valeur : dotationEmploye.valeur,
				Statut : dotationEmploye.statut
			};
			console.log("Data to Add: " + data);
			var url = listEndPoint + "/GetByTitle('DotationEmploye')/Items";
			
			return baseService.postRequest(data,url);
			alert("Saved");
		};
		var getById = function(dotationEmployeId){
			var query = listEndPoint + "/GetByTitle('DotationEmploye')/GetItemById("+dotationEmployeId+")?$select=ID,Email,Nom,Categorie,IdDotation,Dotation,Valeur,Statut";
			return baseService.getRequest(query);
		};
		var update = function (dotationEmploye){
			var data = {
				__metadata: { 'type': 'SP.Data.DotationEmployeListItem' },				
				Email : dotationEmploye.email,
				Nom : dotationEmploye.nom,
				Categorie : dotationEmploye.categorie,
				IdDotation : dotationEmploye.idDotation,
				Dotation : dotationEmploye.dotation,
				Valeur : dotationEmploye.valeur,
				Statut : dotationEmploye.statut
			};
			var url = listEndPoint + "/GetByTitle('DotationEmploye')/GetItemById("+dotationEmploye.dotationEmployeId+")";
			return baseService.updateRequest(data,url);
			alert("Updated");
		};
		var remove = function(dotationEmployeId){
			var url = listEndPoint + "/GetByTitle('DotationEmploye')/GetItemById("+dotationEmployeId+")";
			return baseService.deleteRequest(url);
		};
		return{
			getAll:getAll,
			getAllByEmail:getAllByEmail,
			addNew:addNew,
			getById:getById,
			update:update,
			remove:remove
		};				
	}]);
})();
"use strict";
(function(){
	angular.module("dotationApp")
	.factory("dotationDemandeService",["baseSvc",function(baseService){
		var listEndPoint = '/_api/web/lists';
		
		var getAll = function(){
			var query = listEndPoint + "/GetByTitle('DotationDemande')/Items?$select=ID,Email,Nom,Categorie,Details,Statut,Etat,Picked,Parent,Traitement";
			return baseService.getRequest(query);
		};
		var getAllByEmail = function(userEmail){
		    //var userEmail = $().SPServices.SPGetCurrentUser({fieldName: "Email"});
		    console.log(userEmail);
			var query = listEndPoint + "/GetByTitle('DotationDemande')/Items?$select=ID,Email,Nom,Categorie,Details,Statut,Etat,Picked,Parent,Traitement&$filter=Email eq '"+userEmail+"'";
			return baseService.getRequest(query);
		};
		var getAllByEmailStatutEtat = function(statut,etat){
		    var userEmail = $().SPServices.SPGetCurrentUser({fieldName: "Email"});
		    var statutf = statut;
		    var etatf = etat;
		    
		    //console.log("demande statut: " + statutf);
		    //console.log("demande etat: " + etatf);
			var query = listEndPoint + "/GetByTitle('DotationDemande')/Items?$select=ID,Email,Nom,Categorie,Details,Statut,Etat,Picked,Parent,Traitement&$filter=Email eq '"+userEmail+"' and Statut eq '"+statutf+"' and Etat eq '"+etatf+"'";
			return baseService.getRequest(query);
		};
		var addNew = function(dotationDemande){
			var data = {
				__metadata: { 'type': 'SP.Data.DotationDemandeListItem' },
				Email : dotationDemande.email,
				Nom : dotationDemande.nom,
				Categorie : dotationDemande.categorie,
				Details : dotationDemande.details,
				Statut : dotationDemande.statut,
				Etat : dotationDemande.etat,
				Picked : dotationDemande.picked,
				Parent : dotationDemande.parent,
				Traitement : dotationDemande.traitement	
			};
			console.log("Data to Add: " + data);
			var url = listEndPoint + "/GetByTitle('DotationDemande')/Items";
			
			return baseService.postRequest(data,url);
			alert("Saved");
		};
		var getById = function(dotationDemandeId){
			console.log("dotation Demande Id: " + dotationDemandeId);
			var query = listEndPoint + "/GetByTitle('DotationDemande')/GetItemById("+dotationDemandeId+")?$select=ID,Email,Nom,Categorie,Details,Statut,Etat,Picked,Parent,Traitement";
			return baseService.getRequest(query);
		};
		var update = function (dotationDemande){
			var data = {
				__metadata: { 'type': 'SP.Data.DotationDemandeListItem' },				
				Email : dotationDemande.email,
				Nom : dotationDemande.nom,
				Categorie : dotationDemande.categorie,
				Details : dotationDemande.details,
				Statut : dotationDemande.statut,
				Etat : dotationDemande.etat,
				Picked : dotationDemande.picked,
				Parent : dotationDemande.parent,
				Traitement : dotationDemande.traitement	
			};
			var url = listEndPoint + "/GetByTitle('DotationDemande')/GetItemById("+dotationDemande.dotationDemandeId+")";
			return baseService.updateRequest(data,url);
			alert("Updated");
		};
		var remove = function(dotationDemandeId){
			var url = listEndPoint + "/GetByTitle('DotationDemande')/GetItemById("+dotationDemandeId+")";
			return baseService.deleteRequest(url);
		};
		return{
			getAll:getAll,
			getAllByEmail:getAllByEmail,
			getAllByEmailStatutEtat:getAllByEmailStatutEtat,
			addNew:addNew,
			getById:getById,
			update:update,
			remove:remove
		};				
	}]);
})();
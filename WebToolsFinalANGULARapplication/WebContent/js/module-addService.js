var addServiceModule = angular.module('addServiceModule');
addServiceModule.controller('addServiceController', function($scope,$rootScope,addServiceService,$location) {
	var addServiceCtrl = this;
	//$scope.message = $rootScope.project;
	
	addServiceCtrl.service = {
			returnId:'',
			from :'',
			to:'',
			gift:''
			
	}
	
	
	
	addServiceCtrl.init = function(){
			
			console.log('addService init called');
			addServiceService.listService($rootScope.userSession.id,$rootScope.addproject.projectId,callbackSuccess,callbackError);
	}		
			var callbackSuccess = function(reponseData) {
				console.log("list came back");
				$scope.message = "Success";
	    		$scope.error = false;
				console.log(reponseData);
				addServiceCtrl.projects = reponseData;
			};
			var callbackError = function(reponseData) {
				$scope.message = "Failed to load data";
	    		$scope.error = true;   
			};

	addServiceCtrl.addProject = function(){
		addServiceService.addProjects($rootScope.userSession.id,$rootScope.addproject.projectId,
										addServiceCtrl.service,callbackSuccess1, callbackError1);
		//addServiceService.listProject($rootScope.userSession.id,$rootScope.addproject.projectId,callbackSuccess,callbackError);
		}
			var callbackSuccess1 = function(data) {
	    		
				console.log(data);
				addServiceCtrl.Projects = data;
				$rootScope.addedProject = data;
				addServiceCtrl.message="Project Added";
				$location.path('/project/add');
			};
			
			var callbackError1 = function(data) {
				$scope.message = "Failed to load data";
	    		$scope.error = true;   
			};
			
	addServiceCtrl.viewProject = function(row){
		console.log(row)
		$rootScope.project = row;
		console.log($rootScope.project);
		$location.path('/project/creator');
	}
			
			
//	addServiceCtrl.deleteProject = function(){
//		addServiceService.deleteProjects(addServiceCtrl.project,callbackSuccess2, callbackError2);
//	}
//     var callbackSuccess2 = function(data) {
//	    		
//				console.log(data);
//				//addServiceCtrl.projects = data;
//				addServiceCtrl.message="project Deleted";
//	     };
//				
//      var callbackError2 = function(data) {
//				$scope.message = "Failed to load data";
//		   		$scope.error = true;   
//		 };
});

addServiceModule.factory('addServiceService', function($http,$timeout,APP_CONSTANT) {
	var addServiceService = {};
	
	addServiceService.listService = function (userId, projectId, callbackSuccess,callbackError) {
		console.log('projectService called')
	if(APP_CONSTANT.DEMO){
		$timeout(function(){
         	
     		var response;
     		
     			response = [
     						{
     							"projectName": "Project1",
     							"projectDescription": "My 1st project"
     						},
     						{
     							"projectName": "Project2",
     							"projectDescription": "My second project"
     						}
     					];
     	

         callback(response);
     }, 1000);
	}else{
		
		 $http.get(
     			APP_CONSTANT.REMOTE_HOST+'/user/service/getAllServices/'+projectId
     			).success(function (data, status, headers, config) {
     				callbackSuccess(data,headers);
    			})
    			.error(function (data, status, headers, config) { // IF STATUS CODE NOT 200
    					if(status== 422){
    						callbackError(data);
    					}
    			});
	}
};


addServiceService.addProjects = function(userId,projectId, data, callbackSuccess1,callbackError1){
	
	if(APP_CONSTANT.DEMO){
		$timeout(function(){
	     		var response;
	     			response = 
	     						{
	     							"projectName": "Project reached rest",
	     							"projectDescription": null
	     						},
	     						
	     					
	         callbackSucces1(response);
	     }, 1000);
		}else{
			 $http.post(APP_CONSTANT.REMOTE_HOST+'/user/service/add/'+projectId, data
         			).success(function (id,data, status, headers, config) {
         				callbackSuccess1(data);
        			})
        			.error(function (data, status, headers, config) { // IF STATUS CODE NOT 200
        					if(status== 422){
        						callbackError1(data);
        					}
        			});
		}
	};
//	addServiceService.deleteProjects = function(data, callbackSuccess2,callbackError2){
//		console.log("Reached delete service")
//		if(APP_CONSTANT.DEMO){
//			$timeout(function(){
//		         	
//		     		var response;
//		     		
//		     			response = {message:data.projectName+' Deleted'};
//		         callbackSuccess2(response);
//		     }, 1000);
//			}else{
//				 $http.delete(APP_CONSTANT.REMOTE_HOST+'/user/project/delete',{
//					 	"projectName":data.projectName,
//				 		"projectDescription":data.projectDescription
//				 }
//	         			).success(function (id,data, status, headers, config) {
//	         				callbackSuccess2(data);
//	        			})
//	        			.error(function (data, status, headers, config) { // IF STATUS CODE NOT 200
//	        					if(status== 422){
//	        						callbackError2(data);
//	        					}
//	        			});
//			}
//		};

return addServiceService;
});

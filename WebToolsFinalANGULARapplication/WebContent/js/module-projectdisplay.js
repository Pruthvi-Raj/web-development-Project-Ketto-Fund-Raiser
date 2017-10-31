/**
 * 
 */
 
var projectdisplayModule = angular.module('projectdisplayModule');
projectdisplayModule.controller('projectdisplayController', function($scope, $rootScope,$location,projectdisplayService) {
	var projectdisplayCtrl = this;
	projectdisplayCtrl.messageDash = "Welcome " + $rootScope.userSession.name;
	
	projectdisplayCtrl.project = {
			projectId : '',
			projectName : '',
			projectDescription : ''
	}
	

	
	projectdisplayCtrl.init = function(){
		
		console.log('project display init called')
		projectdisplayService.listProject($rootScope.userSession.id,$rootScope.category.categoryId,
				
		function(reponseData) {
			$scope.message = "Success";
    		$scope.error = false;
			console.log(reponseData);
			projectdisplayCtrl.projects = reponseData;
		},
		function(reponseData) {
			$scope.message = "Failed to load data";
    		$scope.error = true;   
		}
		);
	}
	
	projectdisplayCtrl.likeProject = function (row) {
		console.log(row);
		$rootScope.project = row;
		console.log($rootScope.project);
		console.log($rootScope.userSession);
		projectdisplayService.likeProject($rootScope.userSession.cfId,$rootScope.project.projectId,callbackSuccess1,callbackError1)
	};
	
	 var callbackSuccess1 = function(data1) {
			console.log(data1);
			//categoryCtrl.categories = data;
			//categoryCtrl.openComponentModal('Registration Successful');
			projectdisplayCtrl.message="project liked";
			//projectdisplayCtrl.openComponentModal('project liked');
	 };
			
  	var callbackError1 = function(data1) {
			$scope.message = "Failed to Disable, as it has projects";
			projectdisplayCtrl.message = "Failed to Delete, as it has projects";
	   		$scope.error = true;   
	 };
	
	
	
	
	projectdisplayCtrl.viewProject = function (row) {
		console.log(row);
		$rootScope.project = row;
		console.log($rootScope.project);
		$location.path('/project/funder');

	};
	


});

projectdisplayModule.factory('projectdisplayService', function($http,$timeout,APP_CONSTANT) {
	var projectdisplayService = {};
	
	projectdisplayService.listProject = function (id,catId, callback,callbackError) {
	console.log("project service called");
	if(APP_CONSTANT.DEMO){
		$timeout(function(){
	         	
	     		var response;
	     		
	     			response = [
	     						{
	     							"projectName": "C",
	     							"projectDescription": null
	     						},
	     						{
	     							"projectName": "C++",
	     							"projectDescription": null
	     						}
	     					];
	     	
	
	         callback(response);
	     }, 1000);
		}else{
			
			 $http.get(
         			APP_CONSTANT.REMOTE_HOST+'/user/project/getAllProjects/'+catId
         			).success(function (data, status, headers, config) {
    					callback(data);
        			})
        			.error(function (data, status, headers, config) { // IF STATUS CODE NOT 200
        					if(status== 422){
        						callbackError(data);
        					}
        			});
			
		}
	};
	
	
	projectdisplayService.likeProject = function (funderId, projectId, callbackSuccess1,callbackError1) {
		console.log("project service called");
		if(APP_CONSTANT.DEMO){
			$timeout(function(){
		         	
		     		var response;
		     		
		     			response = [
		     						{
		     							"projectName": "C",
		     							"projectDescription": null
		     						},
		     						{
		     							"projectName": "C++",
		     							"projectDescription": null
		     						}
		     					];
		     	
		
		         callback(response);
		     }, 1000);
			}else{
				
				 $http.post(
	         			APP_CONSTANT.REMOTE_HOST+'/user/project/like/'+projectId+'/'+funderId
	         			).success(function (data, status, headers, config) {
	    					callbackSuccess1(data);
	        			})
	        			.error(function (data, status, headers, config) { // IF STATUS CODE NOT 200
	        					if(status== 422){
	        						callbackError1(data);
	        					}
	        			});
				
			}
		};
	
	
	
	return projectdisplayService;
});

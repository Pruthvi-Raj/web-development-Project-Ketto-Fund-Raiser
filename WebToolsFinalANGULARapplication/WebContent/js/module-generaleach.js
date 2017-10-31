/**
 * 
 */
 
var generaleachModule = angular.module('generaleachModule');
generaleachModule.controller('generaleachController', function($scope, $rootScope,$location,generalprojectService) {
	var generaleachCtrl = this;
	//generaleachCtrl.messageDash = "Welcome " + $rootScope.userSession.name;
	
	generaleachCtrl.project = {
			projectName : '',
			projectDescription : '',
			projectTime : ''
	}
	

	
	generaleachCtrl.init = function(){
		
		console.log('each display init called')
		generaleachService.listProject($rootScope.project.projectId,
				
		function(reponseData) {
			$scope.message = "Success";
    		$scope.error = false;
			console.log(reponseData);
			generaleachCtrl.projects = reponseData;
		},
		function(reponseData) {
			$scope.message = "Failed to load data";
    		$scope.error = true;   
		}
		);
	}
	
	generaleachCtrl.payProject = function (row) {
		if($rootScope.userSession!= null){
			$rootScope.project = row;
			$location.path('/credit/card');
		}else{
			$location.path('/login');
		}
		
		//generaleachService.getDetails(generaleachCtrl.project,callbackSuccess, callbackError);
	}
		var callbackSuccess = function(data) {
			
			console.log(data);
			generaleachCtrl = data;
			//categoryCtrl.message="Category Added";
			$location.path('/project/each');
		};
		
		var callbackError = function(data) {
			$scope.message = "Failed to load data";
			$scope.error = true;   
		};
	generaleachCtrl.serviceProject = function (row) {
		
			$rootScope.project = row;
			$location.path('/service');
		
		//generaleachService.getDetails(generaleachCtrl.project,callbackSuccess, callbackError);
		}
		
		

});

generaleachModule.factory('generaleachService', function($http,$timeout,APP_CONSTANT) {
	var generaleachService = {};
	
	generaleachService.getDetails = function (data, callbackSuccess,callbackError) {
	
	if(APP_CONSTANT.DEMO){
		$timeout(function(){
	         	
	     		var response;
	     		
	     			response = 
	     						{
	     							"projectName": "C",
	     							"projectDescription": null,
	     							"projectTime":"24 days"
	     						},
	     						
	
	         callbackSuccess(response);
	     }, 1000);
		}else{
			
			 $http.get(
         			APP_CONSTANT.REMOTE_HOST+'/user/project'
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
	
	
	return generalprojectService;
});

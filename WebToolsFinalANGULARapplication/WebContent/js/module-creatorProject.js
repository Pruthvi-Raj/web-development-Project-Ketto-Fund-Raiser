var projectCreatorModule = angular.module('projectCreatorModule');
projectCreatorModule.controller('projectCreatorController', function($scope, $rootScope,$location,projectCreatorService) {
	var projectCreatorCtrl = this;
	console.log($rootScope.project);
	projectCreatorCtrl.messageDash = "Welcome " + $rootScope.userSession.name;
	

	
	projectCreatorCtrl.init = function(){
		
		console.log('init called')
		projectCreatorService.listProject($rootScope.userSession.id,null,
				
		function(reponseData) {
			$scope.message = "Success";
    		$scope.error = false;
			console.log(reponseData);
			projectCreatorCtrl.projects = reponseData;
		},
		function(reponseData) {
			$scope.message = "Failed to load data";
    		$scope.error = true;   
		}
		);
	}
	
	projectCreatorCtrl.viewProject = function (row) {
		console.log(row);
		$rootScope.project = row;
		console.log($rootScope.project);
		$location.path('/project/creator');

	};
	


});

projectCreatorModule.factory('projectCreatorService', function($http,$timeout,APP_CONSTANT) {
	var projectCreatorService = {};
	
	projectCreatorService.listProject = function (id,data, callback,callbackError) {
	
	if(APP_CONSTANT.DEMO){
		$timeout(function(){
	         	
	     		var response;
	     		
	     			response = [
	     						{
	     							"name": "C",
	     							"desc": null
	     						},
	     						{
	     							"name": "C++",
	     							"desc": null
	     						}
	     					];
	     	
	
	         callback(response);
	     }, 1000);
		}else{
			
			 $http.get(
         			APP_CONSTANT.REMOTE_HOST+'/user/'+id+'/project'
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
	
	
	return projectCreatorService;
});

var projectModule = angular.module('projectModule');
projectModule.controller('projectController', function($scope, $rootScope,$location,projectService) {
	var projectCtrl = this;
	projectCtrl.messageDash = "Welcome " + $rootScope.userSession.name;
	

	
	projectCtrl.init = function(){
		
		console.log('init called')
		projectService.listProject($rootScope.userSession.id,null,
				
		function(reponseData) {
			$scope.message = "Success";
    		$scope.error = false;
			console.log(reponseData);
			projectCtrl.projects = reponseData;
		},
		function(reponseData) {
			$scope.message = "Failed to load data";
    		$scope.error = true;   
		}
		);
	}
	
//	projectCtrl.viewProject = function (row) {
//		console.log(row);
//		$rootScope.project = row;
//		console.log($rootScope.project);
//		$location.path('/project/view');
//
//	};
	


});

projectModule.factory('projectService', function($http,$timeout,APP_CONSTANT) {
	var projectService = {};
	
	projectService.listProject = function (id,data, callback,callbackError) {
	
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
	
	
	return projectService;
});

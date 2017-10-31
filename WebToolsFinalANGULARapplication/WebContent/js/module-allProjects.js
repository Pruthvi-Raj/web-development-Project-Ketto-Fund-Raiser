/**
 * 
 */
 
var allProjectsModule = angular.module('allProjectsModule');
allProjectsModule.controller('allProjectController', function($scope, $rootScope,$location,allprojectdisplayService) {
	var allProjCtrl = this;
	//allProjCtrl.messageDash = "Welcome " + $rootScope.userSession.name;
	
	allProjCtrl.project = {
			projectName : '',
			projectDescription : ''
	}
	

	
	allProjCtrl.init = function(){
		
		console.log('project display init called')
		allprojectdisplayService.listProject(null,
				
		function(reponseData) {
			$scope.message = "Success";
    		$scope.error = false;
			console.log(reponseData);
			allProjCtrl.projects = reponseData;
		},
		function(reponseData) {
			$scope.message = "Failed to load data";
    		$scope.error = true;   
		}
		);
	}
	
	allProjCtrl.viewProject = function (row) {
		console.log(row);
		$rootScope.project = row;
		console.log($rootScope.project);
		$location.path('/project/each');

	};
	


});

projectdisplayModule.factory('allprojectdisplayService', function($http,$timeout,APP_CONSTANT) {
	var allprojectdisplayService = {};
	
	allprojectdisplayService.listProject = function (id, callback,callbackError) {
	console.log("all project service called");
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
         			APP_CONSTANT.REMOTE_HOST+'/user/project/getAllProjects'
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
	
	
	return allprojectdisplayService;
});

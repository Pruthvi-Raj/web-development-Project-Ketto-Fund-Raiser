/**
 * 
 */
 
var generalprojectModule = angular.module('generalprojectModule');
generalprojectModule.controller('generalprojectController', function($scope, $rootScope,$location,generalprojectService) {
	var generalprojectCtrl = this;
	//generalprojectCtrl.messageDash = "Welcome " + $rootScope.userSession.name;
	
	generalprojectCtrl.project = {
			projectName : '',
			projectDescription : ''
	}
	

	
	generalprojectCtrl.init = function(){
		
		console.log('project display init called');
		console.log($rootScope.category);
		generalprojectService.listProject($rootScope.category.categoryId,
				
		function(reponseData) {
			$scope.message = "Success";
    		$scope.error = false;
			console.log(reponseData);
			generalprojectCtrl.projects = reponseData;
		},
		function(reponseData) {
			$scope.message = "Failed to load data";
    		$scope.error = true;   
		}
		);
	}
	
	generalprojectCtrl.viewProject = function (row) {
		console.log(row);
		$rootScope.project = row;
		console.log($rootScope.project);
		$location.path('/project/each');

	};
	


});

generalprojectModule.factory('generalprojectService', function($http,$timeout,APP_CONSTANT) {
	var generalprojectService = {};
	
	generalprojectService.listProject = function (data, callback,callbackError) {
	
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
         			APP_CONSTANT.REMOTE_HOST+'/user/project/getAllProjects/'+data
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

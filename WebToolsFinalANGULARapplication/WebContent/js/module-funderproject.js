var projectfunderModule = angular.module('projectfunderModule');
projectfunderModule.controller('projectFunderController', function($scope, $rootScope,$location,projectFunderService) {
	var projectFunderCtrl = this;
	projectFunderCtrl.messageDash = "Welcome " + $rootScope.userSession.name;
	

	
	projectFunderCtrl.init = function(){
		
		console.log('init called')
		projectFunderService.listProject($rootScope.userSession.id,null,
				
		function(reponseData) {
			$scope.message = "Success";
    		$scope.error = false;
			console.log(reponseData);
			projectFunderCtrl.projects = reponseData;
		},
		function(reponseData) {
			$scope.message = "Failed to load data";
    		$scope.error = true;   
		}
		);
	}
	
	projectFunderCtrl.viewProject = function (row) {
		console.log(row);
		$rootScope.projectFunder = row;
		console.log($rootScope.projectFunder);
		$location.path('/project/funder');

	};
	
	projectFunderCtrl.payProject =function (row){
		if($rootScope.userSession!= null){
			$rootScope.project = row;
			console.log($rootScope.project)
			console.log("payement in progress");
			$location.path('/cred/card');
		}else{
			$location.path('/login');
		}
	}
	


});

projectfunderModule.factory('projectFunderService', function($http,$timeout,APP_CONSTANT) {
	var projectFunderService = {};
	
	projectFunderService.listProject = function (id,data, callback,callbackError) {
	
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
	
	
	return projectFunderService;
});

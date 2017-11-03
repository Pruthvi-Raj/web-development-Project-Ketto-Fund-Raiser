/**
 * 
 */
var dashboardModule = angular.module('dashboardModule');
dashboardModule.controller('dashboardController', function($scope, $rootScope,$location,dashboardService) {
	var dashboardCtrl = this;
	dashboardCtrl.messageDash = "Welcome " + $rootScope.userSession.name;
	
	dashboardCtrl.project = {
			projectId:'',
			projectName :'',
			projectDescription:'',
			ProjectFundingExpectation:''
	}

	
	dashboardCtrl.init = function(){
		
		console.log('init called');
		console.log($rootScope.category);
		dashboardService.listProject($rootScope.category,
				
		function(reponseData) {
			$scope.message = "Success";
    		$scope.error = false;
			console.log(reponseData);
			//console.log(reponseData.project.projectName);
			dashboardCtrl.projects = reponseData;
		},
		function(reponseData) {
			$scope.message = "Failed to load data";
    		$scope.error = true;   
		}
		);
	}
	
	
	
	dashboardCtrl.deleteProject = function(row){
	 	console.log(row);
	 	dashboardService.deleteProjects($rootScope.userSession.id,row,callbackSuccess3, callbackError3);
	}
     var callbackSuccess3 = function(data1) {
				console.log(data1);
				//categoryCtrl.categories = data;
				//categoryCtrl.openComponentModal('Registration Successful');
				dashboardCtrl.message="Project Deleted";
	     };
				
      var callbackError3 = function(data1) {
				$scope.message = "Failed to Deleted, as it has projects";
				dashboardCtrl.message = "Failed to Delete, as it has projects";
		   		$scope.error = true;   
		 };
		 
		 
		 
	 dashboardCtrl.payProject = function(row){
		 	console.log(row);
		 	dashboardService.payProjects($rootScope.userSession.id,row,callbackSuccess4, callbackError4);
		}
	     var callbackSuccess4 = function(data) {
					console.log(data);
					$rootScope.payements = data;
					//categoryCtrl.openComponentModal('Registration Successful');
					//dashboardCtrl.message="Project Deleted";
					$location.path('/allPayement');
		     };
					
	      var callbackError4 = function(data1) {
					$scope.message = "Failed to Deleted, as it has projects";
					dashboardCtrl.message = "Failed to Delete, as it has projects";
			   		$scope.error = true;   
			 };

	dashboardCtrl.viewProject = function (row) {
		console.log(row);
		$rootScope.project = row;
		console.log($rootScope.project);
		$location.path('/project/view');

	};
	
	dashboardCtrl.cityProject = function (row) {
		console.log(row);
		$rootScope.project = row;
		console.log($rootScope.project);
		$location.path('/allCity');

	};
	
	dashboardCtrl.viewFunder = function (row) {
		console.log(row);
		$rootScope.project = row;
		console.log($rootScope.project);
		$location.path('/allFunder');

	};


});

dashboardModule.factory('dashboardService', function($http,$timeout,APP_CONSTANT) {
	var dashboardService = {};
	
	dashboardService.listProject = function (data, callback,callbackError) {
	
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
         			APP_CONSTANT.REMOTE_HOST+'/user/project/getAllProjects/'+data.categoryId
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
	
	
	dashboardService.payProjects = function (id,data1, callbackSuccess4,callbackError4) {
		
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
		     	
		
		     			callbackSuccess4(response);
		     }, 1000);
			}else{
				
				 $http.get(
	         			APP_CONSTANT.REMOTE_HOST+'/payement/getAllPayements/'+data1.projectId
	         			).success(function (data, status, headers, config) {
	         				callbackSuccess4(data);
	        			})
	        			.error(function (data, status, headers, config) { // IF STATUS CODE NOT 200
	        					if(status== 422){
	        						callbackError4(data);
	        					}
	        			});
				
			}
		};
	
	dashboardService.deleteProjects = function(id,data1, callbackSuccess3,callbackError3){
   	 console.log("Reached delete service")
			if(APP_CONSTANT.DEMO){
				$timeout(function(){
			         	
			     		var response;
			     		
			     			response = {message:'Category Deleted'};
			        callbackSuccess3(response);
			     }, 1000);
				}else{
					 $http.put(APP_CONSTANT.REMOTE_HOST+'/user/project/delete/'+data1.projectId
		         			).success(function (data1, status, headers, config) {
		         				callbackSuccess3(data1);
		        			})
		        			.error(function (data1, status, headers, config) { // IF STATUS CODE NOT 200
		        					if(status== 422){
		        						console.log(data1);
		        						callbackError3(data1);
		        					}
		        			});
				}
			};
	
	
	return dashboardService;
});

var projectaddModule = angular.module('projectaddModule');
projectaddModule.controller('projectaddController', function($scope,$rootScope,projectaddService,$location) {
	var projectaddCtrl = this;
	$scope.message = $rootScope.project;
	
	projectaddCtrl.project = {
			projectId:'',
			projectName :'',
			projectDescription:'',
			projectFundingAmount:'',
			projectStartDate:'',
			projectDeadLine:''
	}
	
	
	
	projectaddCtrl.init = function(){
			
			console.log('projectadd init called');
			projectaddService.listProject($rootScope.userSession.id,$rootScope.creatorcategory.categoryId,callbackSuccess,callbackError);
	}		
			var callbackSuccess = function(reponseData) {
				console.log("list came back");
				$scope.message = "Success";
	    		$scope.error = false;
				console.log(reponseData);
				projectaddCtrl.projects = reponseData;
			};
			var callbackError = function(reponseData) {
				$scope.message = "Failed to load data";
	    		$scope.error = true;   
			};

	projectaddCtrl.addProject = function(){
		projectaddService.addProjects($rootScope.userSession.id,$rootScope.creatorcategory.categoryId,projectaddCtrl.project,callbackSuccess1, callbackError1);
		projectaddService.listProject($rootScope.userSession.id,$rootScope.creatorcategory.categoryId,callbackSuccess,callbackError);
		}
			var callbackSuccess1 = function(data) {
	    		
				console.log(data);
				projectaddCtrl.Projects = data;
				//added project stored in root scope and then used in next module to add service
				//$rootScope.addedProject = data;
				//console.log($rootScope.addedProject);
				projectaddCtrl.message="Project Added";
				//$location.path('/add/service');
			};
			
			var callbackError1 = function(data) {
				$scope.message = "Failed to load data";
	    		$scope.error = true;   
			};
			
	projectaddCtrl.viewProject = function(row){
		console.log(row)
		$rootScope.project = row;
		console.log($rootScope.project);
		$location.path('/project/creator');
	}
	
	projectaddCtrl.addService= function(row){
		console.log(row)
		$rootScope.addproject = row;
		console.log($rootScope.addproject);
		$location.path('/add/service');
	}
			
			
//	projectaddCtrl.deleteProject = function(){
//		projectaddService.deleteProjects(projectaddCtrl.project,callbackSuccess2, callbackError2);
//	}
//     var callbackSuccess2 = function(data) {
//	    		
//				console.log(data);
//				//projectaddCtrl.projects = data;
//				projectaddCtrl.message="project Deleted";
//	     };
//				
//      var callbackError2 = function(data) {
//				$scope.message = "Failed to load data";
//		   		$scope.error = true;   
//		 };
});

projectaddModule.factory('projectaddService', function($http,$timeout,APP_CONSTANT) {
	var projectaddService = {};
	
	projectaddService.listProject = function (userId,catId, callbackSuccess,callbackError) {
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
     			APP_CONSTANT.REMOTE_HOST+'/user/project/getAllProjects/'+catId
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


projectaddService.addProjects = function(userId,catId,data, callbackSuccess1,callbackError1){
	
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
			 $http.post(APP_CONSTANT.REMOTE_HOST+'/user/project/add/'+userId, {
				 		
				 		"categoryId":catId,
				 		"projectName":data.projectName,
				 		"projectDescription":data.projectDescription,
				 		"projectFundingExpectation":data.projectFundingAmount,
						"projectStartDate":data.projectStartDate,
						"projectDeadLine":data.projectDeadLine
			 		}
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
	projectaddService.deleteProjects = function(data, callbackSuccess2,callbackError2){
		console.log("Reached delete service")
		if(APP_CONSTANT.DEMO){
			$timeout(function(){
		         	
		     		var response;
		     		
		     			response = {message:data.projectName+' Deleted'};
		         callbackSuccess2(response);
		     }, 1000);
			}else{
				 $http.delete(APP_CONSTANT.REMOTE_HOST+'/user/project/delete',{
					 	"projectName":data.projectName,
				 		"projectDescription":data.projectDescription
				 }
	         			).success(function (id,data, status, headers, config) {
	         				callbackSuccess2(data);
	        			})
	        			.error(function (data, status, headers, config) { // IF STATUS CODE NOT 200
	        					if(status== 422){
	        						callbackError2(data);
	        					}
	        			});
			}
		};

return projectaddService;
});

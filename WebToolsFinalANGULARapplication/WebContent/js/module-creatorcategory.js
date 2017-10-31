var creatorcategoryModule = angular.module('creatorcategoryModule');
creatorcategoryModule.controller('creatorcategoryController', function($scope, $rootScope,$location,creatorcategoryService) {
	var creatorcategoryCtrl = this;
	creatorcategoryCtrl.messageDash = "Welcome " + $rootScope.userSession.name;
	

	
	creatorcategoryCtrl.init = function(){
		
		console.log('init called')
		creatorcategoryService.listCategory($rootScope.userSession.id,null,callbackSuccess,callbackError);
	}		
		var callbackSuccess = function(reponseData) {
			$scope.message = "Success";
    		$scope.error = false;
			console.log(reponseData);
			creatorcategoryCtrl.categories = reponseData;
		};
		var callbackError = function(reponseData) {
			$scope.message = "Failed to load data";
    		$scope.error = true;   
		}
		
	
	
	creatorcategoryCtrl.viewCategory = function (row) {
		console.log(row);
		$rootScope.creatorcategory = row;
		console.log($rootScope.creatorcategory);
		$location.path('/project/add');

	};
	


});

creatorcategoryModule.factory('creatorcategoryService', function($http,$timeout,APP_CONSTANT) {
	var creatorcategoryService = {};
	
	creatorcategoryService.listCategory = function (id,data, callbackSuccess,callbackError) {
	console.log("Service for lilst called");
	if(APP_CONSTANT.DEMO){
		$timeout(function(){
	         	
	     		var response;
	     		
	     			response = [
	     						{
	     							"name": "Category1",
	     							"desc": "This is my first category"
	     						},
	     						{
	     							"name": "Category2",
	     							"desc": "This is my second"
	     						}
	     					];
	     	
	
	         callback(response);
	     }, 1000);
		}else{
			
			 $http.get(
         			APP_CONSTANT.REMOTE_HOST+'/admin/category/creator'
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
	
	
	return creatorcategoryService;
});

var fundercategoryModule = angular.module('fundercategoryModule');
fundercategoryModule.controller('fundercategoryController', function($scope, $rootScope,$location,fundercategoryService) {
	var fundercategoryCtrl = this;
	//fundercategoryCtrl.messageDash = "Welcome " + $rootScope.userSession.name;
	
	
	fundercategoryCtrl.category = {
			categoryName :'',
			categoryDescription:''
	}

	
	fundercategoryCtrl.init = function(){
		
		console.log('init called')
		fundercategoryService.listCategory(null,
				
		function(reponseData) {
			$scope.message = "Success";
    		$scope.error = false;
			console.log(reponseData);
			fundercategoryCtrl.categories = reponseData;
		},
		function(reponseData) {
			$scope.message = "Failed to load data";
    		$scope.error = true;   
		}
		);
	}
	
	fundercategoryCtrl.viewCategory = function (row) {
		console.log(row);
		$rootScope.category = row;
		console.log($rootScope.category);
		$location.path('/project/display');

	};
	


});

fundercategoryModule.factory('fundercategoryService', function($http,$timeout,APP_CONSTANT) {
	var fundercategoryService = {};
	
	fundercategoryService.listCategory = function (data, callback,callbackError) {
	
	if(APP_CONSTANT.DEMO){
		$timeout(function(){
	         	
	     		var response;
	     		
	     			response = [
	     						{
	     							"categoryName": "Category1",
	     							"categoryDescription": "This is my first category"
	     						},
	     						{
	     							"categoryName": "Category2",
	     							"categoryDescription": "This is my second"
	     						}
	     					];
	     	
	
	         callback(response);
	     }, 1000);
		}else{
			
			 $http.get(
         			APP_CONSTANT.REMOTE_HOST+'/admin/category/filter'
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
	
	
	return fundercategoryService;
});

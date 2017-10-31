var generalcategoryModule = angular.module('generalcategoryModule');
generalcategoryModule.controller('generalcategoryController', function($scope, $rootScope,$location,generalcategoryService) {
	var generalcategoryCtrl = this;
	//generalcategoryCtrl.messageDash = "Welcome " + $rootScope.userSession.name;
	
	
	generalcategoryCtrl.category = {
			categoryName :'',
			categoryDescription:''
	}

	
	generalcategoryCtrl.init = function(){
		
		console.log('init called')
		generalcategoryService.listCategory(null,
				
		function(reponseData) {
			$scope.message = "Success";
    		$scope.error = false;
			console.log(reponseData);
			generalcategoryCtrl.categories = reponseData;
		},
		function(reponseData) {
			$scope.message = "Failed to load data";
    		$scope.error = true;   
		}
		);
	}
	
	generalcategoryCtrl.viewCategory = function (row) {
		console.log(row);
		$rootScope.category = row;
		console.log($rootScope.category);
		$location.path('/project/general');

	};
	


});

generalcategoryModule.factory('generalcategoryService', function($http,$timeout,APP_CONSTANT) {
	var generalcategoryService = {};
	
	generalcategoryService.listCategory = function (data, callback,callbackError) {
	
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
	
	
	return generalcategoryService;
});

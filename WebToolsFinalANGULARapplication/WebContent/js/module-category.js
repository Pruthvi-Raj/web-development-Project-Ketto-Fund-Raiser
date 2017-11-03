/**
 * 
 */
var categoryModule = angular.module('categoryModule');
categoryModule.controller('categoryContoller', function($scope,$rootScope,$location,categoryService,AUTH_EVENTS) {
	var categoryCtrl = this;
	$scope.message = "This is skill";
	
	
	categoryCtrl.category = {
			categoryId:'',
			categoryName :'',
			categoryDescription:'',
			isEnabled: '',
			isDeleted: ''
	}
	
		categoryCtrl.init = function(){
				
				console.log('category init called')
				categoryService.listCategories(null,callbackSuccess,callbackError);
			}
			var callbackSuccess = function(response) {
				console.log("succes thing is called");
				$scope.message = "Success";
	    		$scope.error = false;
				console.log(response);
				categoryCtrl.categories = response;
				
			};
			var callbackError = function(reponseData) {
				$scope.message = "Failed to load data";
	    		$scope.error = true;   
			}
			
	
	categoryCtrl.addCategory = function(){
		categoryService.addCategories($rootScope.userSession.id,categoryCtrl.category,callbackSuccess1, callbackError1);
		categoryService.listCategories(null,callbackSuccess,callbackError);

	}
			var callbackSuccess1 = function(data) {
	    		
				console.log(data);
				//console.log(categoryCtrl.categories);

				categoryCtrl.categories = data;
				categoryCtrl.message="Category Added";
				 //Location.reload();
				 //$state.reload();
				//$location.path('/category');
			};
			
			var callbackError1 = function(data) {
				$scope.message = "Failed to load data";
				categoryCtrl.message="Failed to load data";
				console.log(data);
	    		$scope.error = true;   
			};
	
	 categoryCtrl.disableCategory = function(row){
		 	console.log(row);
			categoryService.disableCategories($rootScope.userSession.id,row,callbackSuccess2, callbackError2);
		}
	     var callbackSuccess2 = function(data1) {
					console.log(data1);
					//categoryCtrl.categories = data;
					//categoryCtrl.openComponentModal('Registration Successful');
					categoryCtrl.message="Category Disabled";
		     };
					
	      var callbackError2 = function(data1) {
					$scope.message = "Failed to Disable, as it has projects";
					categoryCtrl.message = "Failed to Disable, as it has projects";
			   		$scope.error = true;   
			 };
			 
	 categoryCtrl.enableCategory = function(row){
		 	console.log(row);
			categoryService.enableCategories($rootScope.userSession.id,row,callbackSuccessenable, callbackErrorenable);
		}
	     var callbackSuccessenable = function(data1) {
					console.log(data1);
					//categoryCtrl.categories = data;
					//categoryCtrl.openComponentModal('Registration Successful');
					categoryCtrl.message="Category Enabled";
		     };
					
	      var callbackErrorenable = function(data1) {
					$scope.message = "Failed to Enabled, as it has projects";
					categoryCtrl.message = "Failed to Enabled";
			   		$scope.error = true;   
			 };
			 
	 categoryCtrl.deleteCategory = function(row){
		 	console.log(row);
			categoryService.deleteCategories($rootScope.userSession.id,row,callbackSuccess3, callbackError3);
		}
	     var callbackSuccess3 = function(data1) {
					console.log(data1);
					//categoryCtrl.categories = data;
					//categoryCtrl.openComponentModal('Registration Successful');
					categoryCtrl.message="Category Deleted";
		     };
					
	      var callbackError3 = function(data1) {
					$scope.message = "Failed to Disable, as it has projects";
					categoryCtrl.message = "Failed to Delete, as it has projects";
			   		$scope.error = true;   
			 };
			 
	 categoryCtrl.viewCategory = function (row) {
			console.log(row);
			$rootScope.category = row;
			console.log($rootScope.category);
			$location.path('/dashboard');

		};
});



categoryModule.factory('categoryService', function($http,$timeout,APP_CONSTANT) {
	var categoryService = {};
	
	categoryService.listCategories = function(data, callbackSuccess,callbackError){
	console.log("service for list category is called");
	if(APP_CONSTANT.DEMO){
		$timeout(function(){
	         	
	     		var response;
	     		
	     			response = [
	     						{
	     							"categoryName": "Fresh",
	     							"categoryDescription": null
	     						},
	     						{
	     							"categoryName": "Special",
	     							"categoryDescription": null
	     						}
	     					];
	     	
	
	         callbackSuccess(response);
	     }, 1000);
		}else{
			 $http.get(APP_CONSTANT.REMOTE_HOST+'/admin/category'
         			).success(function (data, status, headers, config) {
         				callbackSuccess(data,headers);
         				console.log("success is called");
        			})
        			.error(function (data, status, headers, config) { // IF STATUS CODE NOT 200
        					if(status== 422){
        						callbackError(data);
        					}
        			});
			
		}
	};
	
	categoryService.addCategories = function(id,data, callbackSuccess1,callbackError1){
		console.log("service for add category is called");
		if(APP_CONSTANT.DEMO){
			$timeout(function(){
		     		var response;
		     			response = [
		     						{
		     							"categoryName": "Category1",
		     							"desc": null
		     						},
		     						{
		     							"categoryName": "Category2",
		     							"desc": null
		     						}
		     					];
		         callbackSuccess1(response);
		     }, 1000);
			}else{
				 $http.post(APP_CONSTANT.REMOTE_HOST+'/admin/category/add', {
					 		"categoryName":data.categoryName,
					 		"categoryDescription":data.categoryDescription
				 		}
	         			).success(function (data, status, headers, config) {
	         				callbackSuccess1(data);
	        			})
	        			.error(function (data, status, headers, config) { // IF STATUS CODE NOT 200
	        					if(status== 422){
	        						callbackError1(data);
	        					}
	        			});
			}
		};
	
     categoryService.disableCategories = function(id,data1, callbackSuccess2,callbackError2){
    	 console.log("Reached disable service")
			if(APP_CONSTANT.DEMO){
				$timeout(function(){
			         	
			     		var response;
			     		
			     			response = {message:'Category Disabled'};
			        callbackSuccess2(response);
			     }, 1000);
				}else{
					 $http.put(APP_CONSTANT.REMOTE_HOST+'/admin/category/disable/'+data1.categoryId
		         			).success(function (data1, status, headers, config) {
		         				callbackSuccess2(data1);
		        			})
		        			.error(function (data1, status, headers, config) { // IF STATUS CODE NOT 200
		        					if(status== 422){
		        						console.log(data1);
		        						callbackError2(data1);
		        					}
		        			});
				}
			};
			
	 categoryService.enableCategories = function(id,data1, callbackSuccessenable,callbackErrorenable){
    	 console.log("Reached enable service")
			if(APP_CONSTANT.DEMO){
				$timeout(function(){
			         	
			     		var response;
			     		
			     			response = {message:'Category enabled'};
			     			callbackSuccessenable(response);
			     }, 1000);
				}else{
					 $http.put(APP_CONSTANT.REMOTE_HOST+'/admin/category/enable/'+data1.categoryId
		         			).success(function (data1, status, headers, config) {
		         				callbackSuccess4(data1);
		        			})
		        			.error(function (data1, status, headers, config) { // IF STATUS CODE NOT 200
		        					if(status== 422){
		        						console.log(data1);
		        						callbackErrorenable(data1);
		        					}
		        			});
				}
			};
			
			
	categoryService.deleteCategories = function(id,data1, callbackSuccess3,callbackError3){
    	 console.log("Reached delete service")
			if(APP_CONSTANT.DEMO){
				$timeout(function(){
			         	
			     		var response;
			     		
			     			response = {message:'Category Deleted'};
			        callbackSuccess3(response);
			     }, 1000);
				}else{
					 $http.put(APP_CONSTANT.REMOTE_HOST+'/admin/category/delete/'+data1.categoryId
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
	return categoryService;
});
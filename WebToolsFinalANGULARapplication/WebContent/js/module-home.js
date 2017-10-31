/**
 * 
 */

var homeModule = angular.module('homeModule'); // Please dont not use [],
// dependency

homeModule.controller("homeController", function($rootScope, $scope,$window,homeService) {
	
	var homeCtrl = this;
	
	homeCtrl.payement = {
			payementId:'',
			name :'',
			city :'',
			amount :'',
			projectId :'',
			funderId : ''
	}
	
	
	homeCtrl.init = function(){
			
			console.log('init called');
			console.log($rootScope.payements);
			homeCtrl.payements = $rootScope.payements;
		}
	
	});

homeModule.factory('homeService', function($http,$timeout,APP_CONSTANT) {
	var homeService = {};
	
	homeService.listProject = function (data, callback,callbackError) {
	
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
	
	return homeService;
});


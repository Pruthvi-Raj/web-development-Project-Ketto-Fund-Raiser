/**
 * 
 */
var funderKpiModule = angular.module("funderKpiModule", []);
funderKpiModule.controller('kpiFunderController', function($location,$rootScope,
		$scope, funderKpiService) {

	var kpiFunderCtrl = this;

	kpiFunderCtrl.registration = {
		
		Name : "",
		City : ""
		
	};

	
	
	kpiFunderCtrl.init = function(){
			
			console.log('init called');
			console.log($rootScope.category);
			funderKpiService.listFunder($rootScope.project.projectId,
					
			function(reponseData) {
				$scope.message = "Success";
	    		$scope.error = false;
				console.log(reponseData);
				//console.log(reponseData.project.projectName);
				kpiFunderCtrl.funders = reponseData;
			},
			function(reponseData) {
				$scope.message = "Failed to load data";
	    		$scope.error = true;   
			}
			);
		}
		
	
	
	
	
	
	




});

funderKpiModule.factory('funderKpiService', function($rootScope, $http,
		$timeout, $cookieStore, $window, APP_CONSTANT, AUTH_EVENTS) {
	var funderKpiService = {};
	console.log("Reached payement registration service");
	funderKpiService.listFunder = function( projectId, callbackSuccess, callbackError) {
		if (APP_CONSTANT.DEMO) {

			/*
			 * Dummy authentication for testing, uses $timeout to simulate api
			 * call ----------------------------------------------
			 */
			$timeout(function() {

				var response;
					response = [{
						"Name" : "PRM",
						"City" : "Hyderabad"
					},
					{
						"Name" : "MURAMO GROUP",
						"City"  : "Boston"
					}];
					callbackSuccess(response);
			}, 1000);
		} else {

			/*
			 * Use this for real authentication
			 * ----------------------------------------------
			 */
			$http.get(APP_CONSTANT.REMOTE_HOST + '/user/demand/funder/'+projectId
			)
			// On Success of $http call
			.success(function(data, status, headers, config) {
				callbackSuccess(data, headers);
			}).error(function(data, status, headers, config) { // IF
				// STATUS
				// CODE
				// NOT
				// 200
				callbackError(data, headers);
			});
		}

	};
	
	return funderKpiService;

});
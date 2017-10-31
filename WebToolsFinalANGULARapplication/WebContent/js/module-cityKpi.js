/**
 * 
 */
var cityKpiModule = angular.module("cityKpiModule", []);
cityKpiModule.controller('kpiController', function($location,$rootScope,
		$scope, kpiService) {

	var kpiCtrl = this;

	kpiCtrl.registration = {
		amount : "",
		name : "",
		city : ""
		
	};

	
	
	kpiCtrl.init = function(){
			
			console.log('init called');
			console.log($rootScope.category);
			kpiService.listCity($rootScope.project.projectId,
					
			function(reponseData) {
				$scope.message = "Success";
	    		$scope.error = false;
				console.log(reponseData);
				//console.log(reponseData.project.projectName);
				kpiCtrl.payements = reponseData;
			},
			function(reponseData) {
				$scope.message = "Failed to load data";
	    		$scope.error = true;   
			}
			);
		}
		
	
	
	
	
	
	


//	payementCtrl.cancel = function() {
//		$location.path('/cred/card');
//	}
//
//	payementCtrl.payement = function() {
//		console.log(payementCtrl.registration);
//		$rootScope.card = payementCtrl.registration;
//		payementService.register($rootScope.userSession.cfId, $rootScope.project.projectId,
//									 payementCtrl.registration, callbackSuccess,callbackError);
//		$location.path('/funder/service');
//	}
//
//	payementCtrl.error = false;
//	payementCtrl.message = "";
//
//	var callbackSuccess = function(data, headers) { // Status
//		// Code:200
//		if (data.success) {
//			payementCtrl.openComponentModal('Payement Successful');
//			payementCtrl.message = data;
//			
//
//		} else {
//			payementCtrl.message = data.message;
//			payementCtrl.error = true;
//		}
//
//	};
//
//	var callbackError = function(data, headers) {
//		console.log(data);
//		payementCtrl.message = data.message;
//		payementCtrl.error = true;
//
//	};



});

cityKpiModule.factory('kpiService', function($rootScope, $http,
		$timeout, $cookieStore, $window, APP_CONSTANT, AUTH_EVENTS) {
	var kpiService = {};
	console.log("Reached payement registration service");
	kpiService.listCity = function( projectId, callbackSuccess, callbackError) {
		if (APP_CONSTANT.DEMO) {

			/*
			 * Dummy authentication for testing, uses $timeout to simulate api
			 * call ----------------------------------------------
			 */
			$timeout(function() {

				var response;
				if (data.username === 'test' && data.password === 'test') {
					response = {
						success : true,
					};
					callbackSuccess(response);
				} else {
					response = {
						success: false,
						message : 'Registration was not successful'
					};
					callbackError(response);
				}

			}, 1000);
		} else {

			/*
			 * Use this for real authentication
			 * ----------------------------------------------
			 */
			$http.get(APP_CONSTANT.REMOTE_HOST + '/user/demand/city/'+projectId
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
	
	return kpiService;

});
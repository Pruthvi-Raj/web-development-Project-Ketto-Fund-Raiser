/**
 * 
 */
var payementModule = angular.module("payementModule", []);
payementModule.controller('payementController', function($location,$rootScope,
		$scope, payementService) {

	var payementCtrl = this;

	payementCtrl.registration = {
		amount : "",
		name : "",
		city : ""
		
	};




	payementCtrl.cancel = function() {
		$location.path('/cred/card');
	}

	payementCtrl.payement = function() {
		console.log(payementCtrl.registration);
		$rootScope.card = payementCtrl.registration;
		payementService.register($rootScope.userSession.cfId, $rootScope.project.projectId,
									 payementCtrl.registration, callbackSuccess,callbackError);
		$location.path('/funder/service');
	}

	payementCtrl.error = false;
	payementCtrl.message = "";

	var callbackSuccess = function(data, headers) { // Status
		// Code:200
		if (data.success) {
			payementCtrl.openComponentModal('Payement Successful');
			payementCtrl.message = data;
			

		} else {
			payementCtrl.message = data.message;
			payementCtrl.error = true;
		}

	};

	var callbackError = function(data, headers) {
		console.log(data);
		payementCtrl.message = data.message;
		payementCtrl.error = true;

	};



});

registrationModule.factory('payementService', function($rootScope, $http,
		$timeout, $cookieStore, $window, APP_CONSTANT, AUTH_EVENTS) {
	var payementService = {};
	console.log("Reached payement registration service");
	payementService.register = function(cfId, projectId, data, callbackSuccess, callbackError) {
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
			$http.post(APP_CONSTANT.REMOTE_HOST + '/payement/proj/'+cfId+'/'+projectId, data

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
	
	return payementService;

});
/**
 * 
 */
var credCardModule = angular.module("credCardModule", []);
credCardModule.controller('credCardController', function($location,$rootScope,
		$scope, cardregistrationService) {

	var credCardCtrl = this;

	credCardCtrl.registration = {
		type : "",
		firstName : "",
		lastName : "",
		cardNumber: "",
		cvv: "",
		dox: ""
		
	};




	credCardCtrl.cancel = function() {
		$location.path('/fundercategory');
	}

	credCardCtrl.register = function() {
		console.log(credCardCtrl.registration);
		$rootScope.card = credCardCtrl.registration;
		cardregistrationService.register($rootScope.userSession.cfId, credCardCtrl.registration, callbackSuccess,callbackError);
		$location.path('/pay/amount');
	}

	credCardCtrl.error = false;
	credCardCtrl.message = "";

	var callbackSuccess = function(data, headers) { // Status
		// Code:200
		if (data.success) {
			credCardCtrl.openComponentModal('Registration Successful');
			credCardCtrl.message = data;
			$location.path('/login');

		} else {
			credCardCtrl.message = data.message;
			credCardCtrl.error = true;
		}

	};

	var callbackError = function(data, headers) {
		console.log(data);
		credCardCtrl.message = data.message;
		credCardCtrl.error = true;

	};



});

registrationModule.factory('cardregistrationService', function($rootScope, $http,
		$timeout, $cookieStore, $window, APP_CONSTANT, AUTH_EVENTS) {
	var cardregistrationService = {};
	console.log("Reached card registration service");
	cardregistrationService.register = function(cfId,data, callbackSuccess, callbackError) {
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
						message : 'Card Registration was not successful'
					};
					callbackError(response);
				}

			}, 1000);
		} else {

			/*
			 * Use this for real authentication
			 * ----------------------------------------------
			 */
			$http.post(APP_CONSTANT.REMOTE_HOST + '/register/card/'+cfId, data

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
	
	return cardregistrationService;

});
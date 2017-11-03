/**
 * 
 */
var registrationModule = angular.module("registrationModule", []);
registrationModule.controller('registrationController', function($location,
		$scope, registrationService) {

	var regCtrl = this;

	regCtrl.registration = {
		title : "",
		firstName : "",
		lastName : "",
		username : "",
		password : "",
		email : "",
		phone : "",
		dob	: "",
		role  : ""
	};




	regCtrl.cancel = function() {
		$location.path('/');
	}

	regCtrl.register = function() {
		console.log(regCtrl.registration);
		
		if(regCtrl.registration.title==null||regCtrl.registration.firstName==null||regCtrl.registration.lastName==null||regCtrl.registration.username==null||regCtrl.registration.password==null||regCtrl.registration.email==null||regCtrl.registration.phone==null||regCtrl.registration.dob==null||regCtrl.registration.role==null)
		{
			regCtrl.message = 'Enter all details';
		}
		registrationService.register(regCtrl.registration, callbackSuccess,
				callbackError);

	}

	regCtrl.error = false;
	regCtrl.message = "";

	var callbackSuccess = function(data,headers) { // Status
		// Code:200
		console.log(data)
		if (data.success) {
			//regCtrl.openComponentModal('Registration Successful');
			
			//regService
			
			//$rootScope.message = data;
			
			$location.path('/login');

		} else {
			regCtrl.message = data.message;
			regCtrl.error = true;
		}

	};

	var callbackError = function(data, headers) {
		console.log(data);
		regCtrl.message = data.message;
		regCtrl.error = true;

	};



});

registrationModule.factory('registrationService', function($rootScope, $http,
		$timeout, $cookieStore, $window, APP_CONSTANT, AUTH_EVENTS) {
	var registrationService = {};

	registrationService.register = function(data, callbackSuccess, callbackError) {
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
			$http.post(APP_CONSTANT.REMOTE_HOST + '/register/user', data

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
	
	return registrationService;

});
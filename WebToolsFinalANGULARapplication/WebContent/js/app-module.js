/**
 * 
 */
var configModule = angular.module('app'); // Please dont not use [],
											// dependency

//configModule.controller("logoutController", function($scope,$rootScope,authService,AUTH_EVENTS) {
//		console.log('..logoutController..');
//	  $rootScope.globals = {};
//	  $cookieStore.remove('globals');
//	  $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
//});

configModule.controller("applicationContoller", function($rootScope, $scope,$window) {

	

	$scope.init = function () {
		$scope.parentmethod();
	}
	
	$rootScope.$on("CallParentMethod", function() {
		$scope.parentmethod();
	});

	$scope.parentmethod = function() {
		console.log('..parent..');
		var globals = JSON.parse($window.localStorage.getItem("globals"));
		console.log(globals);

	
		
	 	if(globals){
	 		console.log('globals exits');
	 		
	 	
	 		
	 		
	 		console.log(globals);
	 		console.log(globals.userSession);
	 		if(globals.userSession.role === 'Admin'){
	 			$scope.username = "Welcome "+globals.userSession.name;
	 			$('div#admin').show();
	 			$('div#creator').hide();
	 			$('div#Funder').hide();

	 		}else if(globals.userSession.role === 'creator'){
	 			$scope.username = "Welcome "+globals.userSession.name;
	 			$('div#creator').show();
	 			$('div#admin').hide();
	 			$('div#Funder').hide();


	 		}else if(globals.userSession.role === 'Funder'){
	 			$scope.username = "Welcome "+globals.userSession.name;
	 			$('div#Funder').show();
	 			$('div#admin').hide();
	 			$('div#creator').hide();

	 		}
	 		
	 		$('div#guest').hide();
	 		$('div#logout').hide();
	 	}
	 	else{
	 		console.log('globals does not exits');
	 		$('div#guest').show();
	 		$('div#admin').hide();
	 		$('div#creator').hide();
	 		$('div#Funder').hide();
	 	}

	};
});



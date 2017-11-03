/**
 * 
 */
var configModule = angular.module('app'); // Please dont not use [], dependency 


configModule.config(function($routeProvider) {	
//    $urlRouterProvider.otherwise('/login');
	$routeProvider
    // route for the home page
	.when('/', {
		 templateUrl : 'partial/generalcategory.html',
	     controller  : 'generalcategoryController',
	     controllerAs: 'generalcategoryCtrl'
	})
	
	
	
	
	.when('/project/general', {
		 templateUrl : 'partial/generalproject.html',
	     controller  : 'generalprojectController',
	     controllerAs: 'generalprojectCtrl'
	})
	
	.when('/allPayement', {
		 templateUrl : 'partial/allPayement.html',
	     controller  : 'homeController',
	     controllerAs: 'homeCtrl'
	})
	
	
	.when('/add/service', {
		 templateUrl : 'partial/addService.html',
	     controller  : 'addServiceController',
	     controllerAs: 'addServiceCtrl'
	})
	
	.when('/project/each', {
		 templateUrl : 'partial/generaleach.html',
	     controller  : 'generaleachController',
	     controllerAs: 'generaleachCtrl'
	})
	
	.when('/allCity', {
		 templateUrl : 'partial/allCity.html',
	     controller  : 'kpiController',
	     controllerAs: 'kpiCtrl'
	})
	
	
	.when('/allFunder', {
		 templateUrl : 'partial/allFunder.html',
	     controller  : 'kpiFunderController',
	     controllerAs: 'kpiFunderCtrl'
	})
	
	
	
	
	.when('/service', {
		 templateUrl : 'partial/generaleach.html',
	     controller  : 'generaleachController',
	     controllerAs: 'generaleachCtrl'
	})
	
	
	.when('/cred/card', {
		 templateUrl : 'partial/creditCard.html',
	     controller  : 'credCardController',
	     controllerAs: 'credCardCtrl'
	})
	
	.when('/pay/amount', {
		 templateUrl : 'partial/payement.html',
	     controller  : 'payementController',
	     controllerAs: 'payementCtrl'
	})
	
	
	.when('/funder/service', {
		 templateUrl : 'partial/funderService.html',
	     template : "Congrats you have donated"
	})
	
	
	
	.when('/fundercategory', {
		 templateUrl : 'partial/fundercategory.html',
	     controller  : 'fundercategoryController',
	     controllerAs: 'fundercategoryCtrl'
	})
	
	
	
	
	
	
	.when('/login', {
		 templateUrl : 'partial/login.html',
	     controller  : 'authController',
	     controllerAs: 'authCtrl'
	})
	
	.when('/registration', {
		 templateUrl : 'partial/registration.html',
	     controller  : 'registrationController',
	     controllerAs: 'regCtrl'
	})
	
	
	.when('/logout', {
		template :"",
		controller  : 'logoutController',
		redirectTo: '/' 
	})
	
	.when('/allProjects', {
		templateUrl : 'partial/allProjects.html',
		controller 	: 'allProjectController',
		controllerAs: 'allProjCtrl'
	})

	.when('/dashboard', {
        templateUrl : 'partial/dashboard.html',
        controller  : 'dashboardController',
        controllerAs: 'dashboardCtrl'
    })
    
    
    
    .when('/project/view', {
        templateUrl : 'partial/project.html',
        controller  : 'projectController',
        controllerAs: 'projectCtrl'
    })
    
    
    
    
    .when('/project/creator', {
        templateUrl : 'partial/projectCreator.html',
        controller  : 'projectCreatorController',
        controllerAs: 'projectCreatorCtrl'
    })
    
    
    .when('/project/funder', {
        templateUrl : 'partial/projectfunder.html',
        controller  : 'projectFunderController',
        controllerAs: 'projectFunderCtrl'
    })
    
    
    .when('/project/add', {
        templateUrl : 'partial/projectadd.html',
        controller  : 'projectaddController',
        controllerAs: 'projectaddCtrl'
    })
    .when('/project/display', {
        templateUrl : 'partial/projectdisplay.html',
        controller  : 'projectdisplayController',
        controllerAs: 'projectdisplayCtrl'
    })
    
    
    .when('/category', {
        templateUrl : 'partial/category.html',
        controller  : 'categoryContoller',
        controllerAs: 'categoryCtrl'
    })
     .when('/creatorcategory', {
        templateUrl : 'partial/creatorcategory.html',
        controller  : 'creatorcategoryController',
        controllerAs: 'creatorcategoryCtrl'
    })
    .when('/personal', {
        templateUrl : 'partial/personal.html',
        controller  : 'personalContoller',
        controllerAs: 'personalCtrl'
    })
    .otherwise({ redirectTo: '/' });
});


configModule.run(
	    function ($rootScope, $location, $cookieStore,$window, $http,AUTH_EVENTS) {
	    	//Management 
	    	$rootScope.$on('$locationChangeStart', function (event, next, current) {
	            // redirect to login page if not logged in
	    		console.log(' Requested path '+$location.path());
	            if ( 
	            		!(
	            				$location.path() == '/allProjects' || 
	            				$location.path() == '/dashboard' ||
	            				$location.path() == '/registration'|| 
	            				$location.path() == '/login' ||
	            				$location.path() == '/mymission'||
	            				$location.path() == '/project/display'||
	            				//$location.path() == '/project/display'||
	            				$location.path() == '/project/general'||
	            				$location.path() == '/project/each'
	            		 ) && 
	            		 !$rootScope.globals.userSession) {
	            	console.log('view failed');
	                $location.path('/');
	            }
	        });
	    	
			$rootScope.$on(AUTH_EVENTS.loginFailed, function(event, next){
		    		console.log('Login failed');
		        	 //$scope.message = "Login failed";
		    });
		
			$rootScope.$on(AUTH_EVENTS.logoutSuccess, function(event, next){
				console.log('Logout Success');
				$window.localStorage.removeItem("globals");
				$rootScope.userSession=null;
				$rootScope.$emit("CallParentMethod", {});
				
			});
			
			$rootScope.$on(AUTH_EVENTS.notAuthorized, function(event, next){
				console.log('notAuthorized');
				$window.localStorage.removeItem("globals");
				$rootScope.userSession=null;
				$rootScope.$emit("CallParentMethod", {});
				
			});
	    
		    $rootScope.$on(AUTH_EVENTS.loginSuccess, function(event, next){
				//$scope.message = "Login Success";
				console.log('Login success');
			    $window.localStorage.setItem("globals", angular.toJson($rootScope.globals));
			    //$rootScope.userSession=angular.toJson($rootScope.globals.userSession)
			    $rootScope.userSession = JSON.parse($window.localStorage.getItem("globals")).userSession;
			  
			    $rootScope.$emit("CallParentMethod", {});
			    if($rootScope.globals.userSession.role== 'Admin'){
			    	$location.path('/category');
			    }else if($rootScope.globals.userSession.role== 'Creator'){
			    	$location.path('/creatorcategory');
			    }else if($rootScope.globals.userSession.role== 'Funder'){
			    	$location.path('/fundercategory');
			    }
			    else{
			    	$location.path('/dashboard');
			    }
		    });
	    
		    // keep user logged in after page refresh
		    $rootScope.globals = $cookieStore.get('globals') || {};
		    if ($rootScope.globals.userSession) {
			    $window.localStorage.setItem("globals", angular.toJson($rootScope.globals));
			    $rootScope.userSession = JSON.parse($window.localStorage.getItem("globals")).userSession;
		    }

	})
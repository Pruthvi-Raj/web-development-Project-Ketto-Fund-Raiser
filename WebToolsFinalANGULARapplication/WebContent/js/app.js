
/**
 * 
 */
'use strict';
// Step 1: declare modules
 angular.module("authModule",[]);
 angular.module("dashboardModule",[]);
 angular.module("personalModule",[]);
 angular.module("generalcategoryModule",[]);
 angular.module("generalprojectModule",[]);
 angular.module("generaleachModule",[]);
 angular.module("categoryModule",[]);
 angular.module("creatorcategoryModule",[]);
 angular.module("fundercategoryModule",[]);
 angular.module("projectModule",[]);
 angular.module("projectaddModule",[]);
 angular.module("projectdisplayModule",[]);
 angular.module("projectfunderModule",[]);
 angular.module("projectCreatorModule",[]);
 angular.module("homeModule",[]);
 angular.module("registrationModule",[]);
 angular.module("credCardModule",[]);
 angular.module("payementModule",[]);
 angular.module("allProjectsModule",[]);
 angular.module("addServiceModule",[]);
 angular.module("cityKpiModule",[]);
 angular.module("funderKpiModule",[]);
 


 



 angular.module('appCoreModule', [
	 'ngRoute',
     'ngCookies'
 ]);
//Step 2: Register App
var app = angular.module("app", 
		[
		'appCoreModule',
		 'homeModule',
		 'authModule',
		 'generalcategoryModule',
		 'generalprojectModule',
		 'generaleachModule',
		 'categoryModule',
		 'creatorcategoryModule',
		 'fundercategoryModule',
		 'personalModule',
		 'dashboardModule',
		 'projectModule',
		 'projectaddModule',
		 'projectdisplayModule',
		 'projectfunderModule',
		 'projectCreatorModule',
		 'registrationModule',
		 'credCardModule',
		 'payementModule',
		 'allProjectsModule',
		 'addServiceModule',
		 'cityKpiModule',
		 'funderKpiModule'
		 ]);
(function() {
  'use strict';

  angular.module('app').config(config)

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider']

  function config($stateProvider, $urlRouterProvider, $locationProvider){

    // this line is optional
    $locationProvider.html5Mode(true)

    $stateProvider
      .state({
        name: 'home',
        url: '/',
        component: 'classifieds'
      })
     .state({
        name: 'edit',
        url: '/edit/:id',
        component: 'classifiedsedit'
     })
     .state({
        name: 'new',
        url: '/new',
        component: 'classifiedsnew'
     })

  }

}());

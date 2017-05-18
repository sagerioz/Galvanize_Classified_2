(function() {
  'use strict'
  //services only describe the http methods
  angular.module('app')
    .service('ClassifiedsService', service)
  service.$inject = ['$http']

  function service($http) {
    this.getList = function() {
      return $http.get('/api/classifieds').then(function(response) {
       //console.log("JUST A GET REQUEST: ", response);
        return response.data
      })
    }
    this.getAd = function(id){
      return $http.get(`/api/classifieds/${id}`).then(function(response){
        return response.data
      })
    }
    this.sendForm = function(tempObj) {
      console.log("THIS HAPPENED in services");
      return $http.post('/api/classifieds', tempObj).then(function(response) {
       console.log("SUBMITTED FORM RESPONSE: ", response);
        return response.data
      })
    }
    this.deleteSingleAd = function(ads) {
      console.log("THE DELETED ID U NEED", ads.id);
      return $http.delete(`/api/classifieds/${ads.id}`, ads).then(function() {
      console.log("DELETED AD OBJ");
      })
    }
    this.editPostService = function(ads) {
      return $http.patch(`/api/classifieds/${ads.id}`, ads).then(function(response) {
       console.log("ADDED an EDIt UPDATe", response);
        return response.data
      })
    }
  }



}());

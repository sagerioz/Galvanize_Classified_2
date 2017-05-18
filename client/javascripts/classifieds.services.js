(function() {
  'use strict'
  //services only describe the http methods
  angular.module('app')
    .service('ClassifiedsService', service)
  service.$inject = ['$http']

  function service($http) {
    this.getList = function() {
      return $http.get('/api/classifieds').then(function(response) {
        return response.data
      })
    }
    this.getAd = function(id){
      return $http.get(`/api/classifieds/${id}`).then(function(response){
        return response.data
      })
    }
    this.sendForm = function(tempObj) {
      return $http.post('/api/classifieds', tempObj).then(function(response) {
        return response.data
      })
    }
    this.deleteSingleAd = function(ads) {
      return $http.delete(`/api/classifieds/${ads.id}`, ads).then(function() {
      })
    }
    this.editPostService = function(ads) {
      return $http.patch(`/api/classifieds/${ads.id}`, ads).then(function(response) {
        return response.data
      })
    }
  }
}());

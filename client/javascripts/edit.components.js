(function() {
  'use strict'

  angular.module('app')
    .component('classifiedsedit', {
      controller: controller,
      templateUrl: '../views/classifieds/edit.html'
    })

  controller.$inject = ['ClassifiedsService', '$stateParams', '$state']

  function controller(ClassifiedsService, $stateParams, $state) {
    const vm = this

    vm.editAd = editAd

    vm.$onInit = function() {
      // console.log("STATEPARAMS", $stateParams.id);
      ClassifiedsService.getAd($stateParams.id).then(function(data) {
        vm.editObj = data

      });
    }

    function editAd() {
      ClassifiedsService.editPostService(vm.editObj).then(function(data) {
      $state.go('home')
      })
    }
  }
}());

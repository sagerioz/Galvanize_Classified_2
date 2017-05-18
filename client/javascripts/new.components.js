(function() {
  'use strict'

  angular.module('app')
    .component('classifiedsnew', {
      controller: controller,
      templateUrl: '../views/classifieds/new.html'
    })

  controller.$inject = ['ClassifiedsService', '$stateParams', '$state']

  function controller(ClassifiedsService, $stateParams, $state) {
    const vm = this

    vm.createAd = createAd

    vm.$onInit = function() {
      console.log("hi from the NEW controller onInit()");
    }

    function createAd() {
      let tempObj = {
        title: vm.postObj.title,
        description: vm.postObj.description,
        price: vm.postObj.price,
        item_image: vm.postObj.item_image
      }
      ClassifiedsService.sendForm(tempObj).then(function(data) {
        delete vm.postObj;
        $state.go('home')
      })
    }
  }
}());

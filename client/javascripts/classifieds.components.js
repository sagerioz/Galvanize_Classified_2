(function() {
  'use strict'

  angular.module('app')
    .component('classifieds', {
      controller: controller,
      templateUrl: '../views/classifieds/index.html'
    })

  controller.$inject = ['ClassifiedsService', '$state']

  function controller(ClassifiedsService, $state) {
    const vm = this;

    vm.deleteAd = deleteAd
    vm.createPost = createPost

    vm.$onInit = function() {
      ClassifiedsService.getList().then(function(data) {
        vm.ClassifiedsDb = data
      });
    }

    function createPost() {
      let tempObj = {
        title: vm.postObj.title,
        body: vm.postObj.body,
        author: vm.postObj.author,
        image_url: vm.postObj.image_url,
        vote_count: 0,
        created_at: moment().calendar()
      }
      blogService.sendForm(tempObj).then(function(data) {
        //  console.log("DATA after new Form", data);
        data.comments = []
        vm.blogDb.push(data)
        //  console.log("COMMENTS in DATA?", data);
        delete vm.postObj;
        vm.toggleForm()
      })
    }
    function deleteAd(ads) {
      if (confirm("are you sure you want to delete this ad?") === true) {
        ClassifiedsService.deleteSingleAd(ads).then(function() {
          vm.$onInit()
        });
      } else {
        return;
      }
    }
  }
}());

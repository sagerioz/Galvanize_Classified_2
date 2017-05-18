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
      console.log("hi from createAD()");
      let tempObj = {
        title: vm.postObj.title,
        description: vm.postObj.description,
        price: vm.postObj.price,
        item_image: vm.postObj.item_image
      }
      console.log("TEMP OBJ", tempObj);
      ClassifiedsService.sendForm(tempObj).then(function(data) {
         console.log("DATA after new ad is created", data);

        //vm.ClassifiedsDb.push(data)
         console.log("new ad in DATA?", data);
        delete vm.postObj;
        $state.go('home')
      })
    }
    //
    //console.log("LINE 57");
    // vm.toggleComments = function(posts) {
    //   posts.commentsVisible = !posts.commentsVisible
    // };
    //
    // vm.countVotesUp = function(posts) {
    //   blogService.countVotesUp(posts).then(function(data) {
    //     console.log(data);
    //     //  data.vote_count += 1
    //     posts.vote_count = data.vote_count
    //     console.log("UP COUNT DATA(DB)", data);
    //     console.log("UP COUNT VOTE_COUNT (CLIENT)", posts.vote_count);

        //  console.log("POST COUNT IN COMPONENT FUNCTION VOTE_COUNT plus one", posts.vote_count, data.vote_count);

    //   })
    // }
    //
    // vm.countVotesDown = function(posts) {
    //   blogService.countVotesDown(posts).then(function(data) {
    //     console.log(data);
    //     //data.vote_count -= 1
    //     posts.vote_count = data.vote_count
    //     console.log("UP COUNT DATA(DB)", data);
    //     console.log("UP COUNT VOTE_COUNT (CLIENT)", posts.vote_count);
    //   })
    // }

    // vm.createComment = function(posts, comment) {
    //
    //   blogService.createCommentService(posts, comment).then(function(data) {
    //     console.log("COMMENT DATA", data);
    //     posts.comments.push(data)
    //     delete posts.newComment
    //   })
    // }
    //
    // console.log("you made it here on your journey line 88");

    // vm.editPost = function (posts) {
    //   console.log("state", $state)
    //   //console.log("you made it here on your journey")
    //   $state.go('edit')
    // }
  }
}());

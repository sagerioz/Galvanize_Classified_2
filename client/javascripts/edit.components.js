(function() {
  'use strict'

  angular.module('app')
    .component('classifiedsedit', {
      controller: controller,
      templateUrl: '../views/classifieds/edit.html'
    })

  controller.$inject = ['ClassifiedsService', '$stateParams', '$state']

  function controller(ClassifiedsService, $stateParams, $state) {
    const vm = this;
    vm.editAd = editAd

    vm.$onInit = function() {
      console.log("STATEPARAMS", $stateParams.id);

      ClassifiedsService.getAd($stateParams.id).then(function(data) {
        vm.editObj = data

      });
    }

    function editAd() {
      ClassifiedsService.editPostService(vm.editObj).then(function(data) {
      //  console.log("DATA after new Form", data);
      //  console.log("COMMENTS in DATA?", data);
      $state.go('home')
      })
    }






    vm.createPost = function() {
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
    vm.deletePosts = function(posts) {
      if (confirm("are you sure you want to delete this post?") === true) {
        blogService.deletePost(posts).then(function() {
          console.log("you deleted me");
          vm.$onInit()
        });
      } else {
        return;
      }
    }
    //console.log("LINE 57");
    vm.toggleComments = function(posts) {
      posts.commentsVisible = !posts.commentsVisible
    };

    vm.countVotesUp = function(posts) {
      blogService.countVotesUp(posts).then(function(data) {
        console.log(data);
        //  data.vote_count += 1
        posts.vote_count = data.vote_count
        console.log("UP COUNT DATA(DB)", data);
        console.log("UP COUNT VOTE_COUNT (CLIENT)", posts.vote_count);

        //  console.log("POST COUNT IN COMPONENT FUNCTION VOTE_COUNT plus one", posts.vote_count, data.vote_count);

      })
    }

    vm.countVotesDown = function(posts) {
      blogService.countVotesDown(posts).then(function(data) {
        console.log(data);
        //data.vote_count -= 1
        posts.vote_count = data.vote_count
        console.log("UP COUNT DATA(DB)", data);
        console.log("UP COUNT VOTE_COUNT (CLIENT)", posts.vote_count);
      })
    }

    vm.createComment = function(posts, comment) {

      blogService.createCommentService(posts, comment).then(function(data) {
        console.log("COMMENT DATA", data);
        posts.comments.push(data)
        delete posts.newComment
      })
    }

    console.log("you made it here on your journey line 88");

    // vm.editPost = function (posts) {
    //   console.log("state", $state)
    //   //console.log("you made it here on your journey")
    //   $state.go('edit')
    // }
  }
}());

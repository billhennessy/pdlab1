/**
 * Created by billh_000 on 9/17/2014.
 */
'use strict';

app.controller('PostsCtrl', function ($scope, $location, Post) {
    if ($location.path() === '/') {
        $scope.posts = Post.all;
    }
     $scope.post = {url: 'http://', title: ''};

    $scope.submitPost = function () {
        Post.create($scope.post).then(function (ref) {
            //$scope.post = {url: 'http://', 'title': ''};
            $location.path('/posts/' + ref.name());
        });
    };

    $scope.deletePost = function (post) {
        Post.delete(post);
    };

    $scope.removeComment = function (comment) {
        Post.deleteComment($scope.post, comment);
    };

});
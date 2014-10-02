/**
 * Created by billh_000 on 9/18/2014.
 */
'use strict';

app.controller('NavCtrl', function ($scope, $location, Auth, Post, User) {
    $scope.post = {url: 'http://', title: ''};
    //$scope.currentUser = User.currentUser;
    $scope.submitPost = function () {
        Post.create($scope.post).then(function (postId) {
            $scope.post = {url: 'http://', title: ''};
            $location.path('/posts/' + postId);
        });
    };
    $scope.logout = function () {
        Auth.logout();
    };

});
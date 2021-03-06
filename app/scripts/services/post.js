/**
 * Created by billh_000 on 9/17/2014.
 */
'use strict';

app.factory('Post',
    function ($firebase, FIREBASE_URL, User) {
        var ref = new Firebase(FIREBASE_URL + posts);

        var posts = $firebase(ref).$asArray();

        var Post = {
            all: posts,
            create: function (post) {
                if (User.signedIn()) {
                    var user = User.getCurrent();

                    post.owner = user.username;

                    return posts.$add(post).then(function (ref) {
                        var postId = ref.name();

                        User.posts(user.username).$set(postId, '');

                        return postId;
                    });
                }
            },

            find: function (postId) {
                return $firebase(ref.child(postId)).$asObject();
            },
            delete: function (post) {
                if (User.signedIn()){
                    var user = User.getCurrent();
                    if (user.username === post.owner) {
                        posts.$remove(post).then(function () {

                            User.posts(user.username).$remove(post.$id);
                        });
                    }
                }
            },

comments: function (postId) {
  return $firebase(new Firebase(FIREBASE_URL + 'comments/' + postId));
},
            addComment: function (postId, comment) {
  if (User.signedIn()) {
    var user = User.getCurrent();

    comment.username = user.username;

    Post.comments(postId).$push(comment);
  }
},

            deleteComment: function (post, comment) {
  if (User.signedIn()) {
    var user = User.findByUsername(comment.username);
    var commentId = comment.$id;

    Post.comments(post.$id).$remove(commentId).then(function () {
      User.comments(user.username).$remove(commentId);
    });
  }
}
        };

        return Post;
    }
);
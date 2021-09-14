const express = require("express");
const router = express.Router();
const PostController = require('../controllers/post.controller');

router.post('/addpost',PostController.addPost);
router.patch('/updatepost',PostController.updatePost);
router.get('/deletepost/:id',PostController.deletePost);
router.get('/post/:id',PostController.getPost);
router.post('/upvote',PostController.upvotePost);
router.post('/downvote',PostController.downvotePost);
router.post('/answer',PostController.addAnswerToPost);
// Create routes for product here
module.exports = router;
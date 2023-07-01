const express = require("express");
const router = express.Router();
const post = require("../controllers/post");
const news = require("../controllers/news");
const comment = require("../controllers/comments");
const user = require("../controllers/users");
const tag = require("../controllers/tags");
const validate = require("../validator");

router.post("/api/post/create", validate.validation(validate.createPost), post.create);
router.get("/api/post/allPost", post.getAllPosts);
router.post("/api/post/info", validate.validation(validate.postInfo), post.info);

router.post("/api/news/create", validate.validation(validate.createNews), news.create);
router.get("/api/news/all",news.getAllNews);
router.post("/api/news/info", validate.validation(validate.newsInfo), news.info);

router.post("/api/comment/create", validate.validation(validate.createComment), comment.create);
router.post("/api/comment/delete", validate.validation(validate.deleteComment), comment.delete);
router.post("/api/comment/restore", validate.validation(validate.restoreComment), comment.restore);
router.get("/api/comment/all",comment.getAllComments);



router.post("/api/tag/create", validate.validation(validate.createTag), tag.create);
router.post("/api/tag/assign", validate.validation(validate.assignTag), tag.assignTags);
router.get("/api/tag/all", tag.getAllTags);


router.post("/api/user/create", validate.validation(validate.createUser), user.create);
router.post("/api/user/update", validate.validation(validate.updateUser), user.update);
router.post("/api/user/list", validate.validation(validate.userList), user.list);
router.post("/api/user/info", validate.validation(validate.userInfo), user.info);
router.post("/api/user/delete", validate.validation(validate.deleteUser), user.delete);
router.post("/api/user/userWithPost", validate.validation(validate.userList), user.userWithPost);




module.exports = router;

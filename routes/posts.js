import {Router} from "express";
import {checkAuth} from "../utils/checkAuth.js";
import {createPost, getAll, getById, getMyPosts, removePost, updatePost, getPostComments} from "../controllers/posts.js";
const router = new Router();

// CREATE POST
// http://localhost:3001/api/posts
router.post("/", checkAuth, createPost)


// GET ALL
router.get("/", getAll)

// GET BY ID
router.get("/:id", getById)

// GET MY POSTS
router.get('/user/me', checkAuth, getMyPosts)


// UPDATE POST

router.put("/:id", checkAuth, updatePost)

// REMOVE
router.delete('/:id', checkAuth, removePost)


// Comments
router.get("/comments/:id", getPostComments)
export default router
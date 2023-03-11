import Comment from "../models/comment.js";
import Post from "../models/post.js";

export const createComment = async (req, res) => {
    try {
        const {postId, comment} = req.body;
        if (!comment) {
            return res.json({message: "Комментарий не может быть пустым"})
        }
        const newComment = await new Comment({comment})
        await newComment.save()
        try {
            await Post.findByIdAndUpdate(postId, {
                $push: {comments: newComment._id}
            })
        } catch (e) {
            console.log(e)
        }
        res.json(newComment)
    } catch (e) {
        res.json({message: e.message})
    }
}
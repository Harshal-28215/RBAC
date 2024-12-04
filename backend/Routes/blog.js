import express from 'express';
import Blog from '../schema/Blog.js';
import authenticate from '../Middleware/authenticate.js';
import authorize from '../Middleware/authorize.js';

const router = express.Router();

router.post('/blog',authenticate, async (req, res) => {
    const { title, content } = req.body;
    const {id} = req.user;
    

    const blog = new Blog({ title, content, userId: id });
    await blog.save();
    res.json(blog);
});

router.get('/blog', async (req, res) => {
    const blogs = await Blog.find();
    res.json(blogs);
});

router.put('/blog/:id',authenticate,authorize(['admin','moderator']), async (req, res) => {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.json(blog);
});

router.delete('/blog/:id',authenticate,authorize(['admin']), async (req, res) => {
    const blog = await Blog.findByIdAndDelete(req.params.id, req.body, { new: true });

    res.json(blog);
});
export default router;
import Blog from "../schema/Blog.js";

const authorize = (roles) => async (req, res, next) => {
   const { role } = req.user;

   if (role == 'user') {
    const getBlog = await Blog.findById(req.params.id);
    const blog = await JSON.parse(JSON.stringify(getBlog));

    if (blog.userId != req.user.id) {
      return res.status(403).send('Access denied');
    }
   }else if (!roles.includes(req.user.role)) {
      return res.status(403).send('Access denied');
    }
    next();
  };
  
  export default authorize;
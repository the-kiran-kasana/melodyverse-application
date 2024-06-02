const asyncHandler = require('express-async-handler');
const Post = require('../models/Post');

const getPosts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const count = await Post.countDocuments();
  const posts = await Post.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .populate('user', 'username name profilePicture');


  res.json({ posts, page, pages: Math.ceil(count / pageSize) });
});

module.exports = { getPosts };

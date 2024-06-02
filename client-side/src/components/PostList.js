import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get(`/api/posts?page=${page}&limit=${pageSize}`);
      setPosts((prevPosts) => [...prevPosts, ...data.posts]);
      setPage(page + 1);
      if (data.posts.length < pageSize) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Posts</h2>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchPosts}
        hasMore={hasMore}
        loader={<h4 className="text-center">Loading...</h4>}
        endMessage={
          <p className="text-center">
            <b>No more posts to show</b>
          </p>
        }
      >
        <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div key={post._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-700 mb-4">{post.content}</p>
              <div className="text-right">
                <button className="text-blue-500 hover:underline">Read more</button>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default PostList;



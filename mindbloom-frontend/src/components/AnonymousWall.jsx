import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HeartIcon, SparklesIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/solid';
import FeatureLayout from "../components/feature";

const AnonymousWall = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [commentInputs, setCommentInputs] = useState({});
  const userLang = navigator.language?.split('-')[0] || 'en';  // e.g., "fr", "hi", "es"


  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('https://mindbloom-pg24.onrender.com/api/anon-posts');
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  const handleCreatePost = async () => {
    if (!newPost.trim()) return;
    const res = await axios.post('https://mindbloom-pg24.onrender.com/api/anon-posts', {
      text: newPost 
      lang: userLang,
    });
    setPosts([res.data, ...posts]);
    setNewPost('');
  };

  const handleAddComment = async (postId) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    const res = await axios.post(`https://mindbloom-pg24.onrender.com/api/anon-posts/${postId}/comments`, { 
      text 
      lang: userLang,
    });
    setPosts(posts.map(p => p._id === postId ? res.data : p));
    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

 

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-indigo-100 to-blue-50 py-10 px-4 sm:px-8">
      <FeatureLayout />
      <div className="text-center mb-10">
        <h1 className="mt-14 text-4xl font-bold text-pink-600">💗 Cozy Corner</h1>

        <p className="mt-2 text-indigo-600 text-lg italic">Your safe emotional space — you’re not alone 🌷</p>
      </div>

      <div className="bg-white bg-opacity-80 backdrop-blur-md p-6 rounded-3xl shadow-xl max-w-2xl mx-auto mb-10">
        <textarea
          className="w-full border-2 border-pink-200 bg-white p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
          rows={4}
          placeholder="How are you feeling today? Share from your heart 💬"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <button
          onClick={handleCreatePost}
          className="mt-4 w-full px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white text-lg font-semibold rounded-xl shadow-lg transition-all"
        >
          Share with Love 💌
        </button>
      </div>

      {posts.map(post => (
        <div key={post._id} className="bg-white bg-opacity-90 backdrop-blur-md p-6 rounded-3xl shadow-xl max-w-2xl mx-auto mb-8 border-l-4 border-pink-400">
          <p className="text-gray-800 text-lg mb-2 leading-relaxed">📝 {post.text}</p>
         

          <div className="mt-4 space-y-2">
            {post.comments.map((c, idx) => (
              <div key={idx} className="text-sm bg-rose-50 px-3 py-2 rounded-xl">
                <span className={`font-semibold ${c.author === 'AI' ? 'text-indigo-700' : 'text-gray-700'}`}>
                  {c.author === 'AI' ? '🤖 AI' : 'Anonymous'}:
                </span>{" "}
                {c.text}
              </div>
            ))}

            <input
              className="w-full mt-3 border border-indigo-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-400 transition"
              placeholder="Send a kind word... 💞"
              value={commentInputs[post._id] || ''}
              onChange={(e) => setCommentInputs({ ...commentInputs, [post._id]: e.target.value })}
            />
            <button
              onClick={() => handleAddComment(post._id)}
              className="mt-2 text-sm text-pink-600 font-medium hover:underline"
            >
              Send Love 💖
            </button>
          </div>

          
        </div>
      ))}
    </div>
  );
};

export default AnonymousWall;

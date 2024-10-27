import React from 'react';
import { usePostStore } from '../store/postStore';
import { Trash2, Edit2 } from 'lucide-react';

export default function PostList() {
  const posts = usePostStore((state) => state.posts);
  const deletePost = usePostStore((state) => state.deletePost);

  return (
    <div className="mt-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-white">Your Posts</h2>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-neutral-800 border border-neutral-700 rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-neutral-400">
                {post.platform.charAt(0).toUpperCase() + post.platform.slice(1)}
              </span>
              <span className="text-sm text-neutral-500">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-neutral-200 mb-3">{post.content}</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => deletePost(post.id)}
                className="p-2 text-red-400 hover:bg-neutral-700 rounded-full"
              >
                <Trash2 size={18} />
              </button>
              <button className="p-2 text-emerald-400 hover:bg-neutral-700 rounded-full">
                <Edit2 size={18} />
              </button>
            </div>
          </div>
        ))}
        {posts.length === 0 && (
          <div className="text-center text-neutral-400 py-8">
            No posts yet. Start creating some content!
          </div>
        )}
      </div>
    </div>
  );
}
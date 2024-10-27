import { create } from 'zustand';
import { Post } from '../types';

interface PostStore {
  posts: Post[];
  addPost: (post: Post) => void;
  updatePost: (id: string, content: string) => void;
  deletePost: (id: string) => void;
}

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
  updatePost: (id, content) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === id ? { ...post, content } : post
      ),
    })),
  deletePost: (id) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== id),
    })),
}));
import { create } from 'zustand';
import axios from 'axios';
import { message } from 'antd';

const usePostStore = create((set) => ({
  posts: [],
  createdPosts: [],
  savedPosts: [],
  loading: false,
  error: null,

  // Fetch posts from the API
  fetchPosts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('http://localhost:3000/posts');
      set({ posts: response.data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch posts', loading: false });
    }
  },
  fetchCreatedPosts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('http://localhost:3000/createdposts');
      set({ createdPosts: response.data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch createdPosts', loading: false });
    }
  },
  fetchSavedPosts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('http://localhost:3000/savedposts');
      set({ savedPosts: response.data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch savedPosts', loading: false });
    }
  },

  // Save post to savedposts
  savePost: async (post) => {
    set({ loading: true, error: null });
    try {
      await axios.post('http://localhost:3000/savedposts', post);
      message.success('Post saved successfully');
    } catch (error) {
      set({ error: 'Failed to save post', loading: false });
      message.error('Failed to save post');
    } finally {
      set({ loading: false });
    }
  },

  // Create a new post
  createPost: async (postData) => {
    set({ loading: true, error: null });
    try {
      await axios.post('http://localhost:3000/posts', postData);
      await axios.post('http://localhost:3000/createdposts', postData);
      set((state) => ({
        posts: [...state.posts, postData],
        createdPosts: [...state.createdPosts, postData],
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to create post', loading: false });
    }
  },

  // Delete post
  deletePost: async (postId) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`http://localhost:3000/posts/${postId}`);
      await axios.delete(`http://localhost:3000/createdposts/${postId}`);
      set((state) => ({
        posts: state.posts.filter((post) => post.id !== postId),
        createdPosts: state.createdPosts.filter((post) => post.id !== postId),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to delete post', loading: false });
    }
  },

  // Delete a saved post
  deleteSavedPost: async (postId) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`http://localhost:3000/savedposts/${postId}`);
      set((state) => ({
        savedPosts: state.savedPosts.filter((post) => post.id !== postId),
        loading: false,
      }));
      message.success('Post deleted from saved successfully');
    } catch (error) {
      set({ error: 'Failed to delete post from saved', loading: false });
      message.error('Failed to delete post from saved');
    }
  },

  toggleLike: async (postId, currentLikes, liked) => {
    const updatedLikes = liked ? currentLikes - 1 : currentLikes + 1;
    try {
      await axios.patch(`http://localhost:3000/posts/${postId}`, {
        likes: updatedLikes,
        liked: !liked,
      });
      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === postId
            ? { ...post, likes: updatedLikes, liked: !liked }
            : post
        ),
      }));
    } catch (error) {
      console.error('Failed to update like count', error);
    }
  },
}));

export default usePostStore;

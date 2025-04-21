import { useDispatch, useSelector } from "react-redux";
import { useCreatePostMutation } from "@/redux/apiServices/postApiSlice";
import { setNewPost } from "@/redux/slices/posts-slice";

export const PostInput = () => {
  const dispatch = useDispatch();
  const { newPost } = useSelector((state) => state.posts);
  const [createPost] = useCreatePostMutation();

  // Function to create a new post
  const addPosts = () => {
    if (newPost.trim()) {
      const timestamp = new Date().toISOString();
      createPost({ post: newPost, createdAt: timestamp });
      dispatch(setNewPost(""));
    }
  };

  return (
    // Add Post Section
    <div className="w-full flex flex-col md:flex-row gap-2">
      <input
        type="text"
        value={newPost}
        onChange={(e) => dispatch(setNewPost(e.target.value))}
        placeholder="Enter post title"
        className="border p-2 mr-2 md:w-95 lg:w-xl"
      />
      <button
        onClick={addPosts}
        className="cursor-pointer bg-blue-900 text-white p-2"
      >
        Add Post
      </button>
    </div>
  );
};

import { useDispatch, useSelector } from "react-redux";
import { useDeletePostMutation } from "@/redux/apiServices/deleteApiSlice";
import { useUpdatePostMutation } from "@/redux/apiServices/putApiSlice";
import { setCurrentPage, setEditId, setEditPost, startEdit, } from "@/redux/slices/posts-slice";
import { formatDate, getTimeTaken } from "@/utils";

export const PostItems = ({post,posts,index,startIndex,filteredPosts,postsPerPage,}) => {
  const dispatch = useDispatch();

  const { editId, editPost, currentPage } = useSelector((state) => state.posts);
  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();

  // Function to save edited post
  const saveEdit = async () => {
    if (editPost.trim()) {
      const existingPost = posts.find((p) => p.id === editId);
      await updatePost({
        id: editId,
        post: editPost,
        createdAt: existingPost.createdAt, // Preserve original creation time
      });
      dispatch(setEditId(null)); // Exit edit mode
      dispatch(setEditPost(""));
    }
  };

  const handleDeletePost = async (postId) => {
    await deletePost(postId);

    // Check if the current page has no posts after deletion
    const remainingPosts = filteredPosts.length - 1; // Post is already deleted, so reduce count
    const totalRemainingPages = Math.ceil(remainingPosts / postsPerPage);

    if (remainingPosts > 0 && currentPage > totalRemainingPages) {
      dispatch(setCurrentPage(totalRemainingPages));
    }
  };

  return (
    <li className="border p-2 flex justify-between items-center flex-col lg:flex-row  mb-2">
      {/* Edit Mode */}
      {editId === post.id ? (
        <div className="w-full flex flex-col lg:flex-row items-center justify-between">
          <input type="text" value={editPost} onChange={(e) => dispatch(setEditPost(e.target.value))} className="border p-1"/>
          <div>
            <button onClick={saveEdit} className="cursor-pointer bg-green-900 text-white p-2 ml-2">Save</button>
            <button onClick={() => dispatch(setEditId(null))} className="cursor-pointer bg-gray-700 text-white p-2 ml-2" >Cancel</button>
          </div>
        </div>
      ) : (
        <>
          {/* Display Post */}
          <div className="w-full flex flex-col lg:flex-row mb-1 lg:mb-0 items-center justify-between me-3">
            <p className="me-2">
              <span className="font-bold me-3">{startIndex + index + 1}.</span>
              <span className={post.completed ? "line-through" : ""}>{post.post}</span>
            </p>
            <p className="flex flex-col md:flex-row md:gap-2 items-center">
              <span className="text-green-500">{formatDate(post.createdAt)}</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="w-full flex justify-center lg:justify-end sm:w-1/3">
            {!post.completed && (
              <>
                <button onClick={() => dispatch(startEdit(post))} className="cursor-pointer bg-yellow-900 text-white p-2 mr-2">Edit</button>
                <button onClick={() => handleDeletePost(post.id)} className="cursor-pointer bg-red-900 text-white p-2">Delete</button>
              </>
            )}
          </div>
        </>
      )}
    </li>
  );
};

"use client";

import { useSelector } from "react-redux";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useGetPostsQuery } from "@/redux/apiServices/apiSlice";
import { FilterPosts } from "./filter-posts";
import { PostInput } from "./post-input";
import { PostItems } from "./post-items";
import { PostPagination } from "./post-pagination";
import Button from "@/utils/lib/button";

export default function Posts() {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") || "all";

  // Retrieve necessary state from Redux store
  const { currentPage } = useSelector((state) => state.posts);
  const { data: posts, error, isLoading } = useGetPostsQuery();

  // Pagination
  const postsPerPage = 10;

  // Handle loading and error states
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts</p>;

  // Filter posts based on selected criteria
  const filteredPosts =
    filter === "completed"
      ? posts?.filter((post) => post.completed)
      : filter === "not-completed"
      ? posts?.filter((post) => !post.completed)
      : posts;

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts?.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts?.slice(
    startIndex,
    startIndex + postsPerPage
  );

  return (
    <div className="p-4">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <Button>Posts</Button>
        <Button><Link href="/">Go to Home Page</Link></Button>
      </div>

      {/* Post Input and Filter Section */}
      <div className="w-full flex-col md:flex-row flex items-center justify-between gap-3">
        <PostInput />
        <FilterPosts filter={filter} />
      </div>

      {/* List of Posts */}
      <ul className="mt-4">
        {paginatedPosts?.length > 0 ? (
          paginatedPosts?.map((post, index) => (
            <PostItems
              post={post}
              posts={posts}
              startIndex={startIndex}
              filteredPosts={filteredPosts}
              postsPerPage={postsPerPage}
              key={post.id}
              index={index}
            />
          ))
        ) : (
          <div>No Posts Added Yet</div>
        )}
      </ul>

      {/* Pagination Controls */}
      {totalPages > 1 && <PostPagination totalPages={totalPages} />}

      <p className="text-center mt-2 text-gray-500">{paginatedPosts?.length} out of {posts?.length}</p>
    </div>
  );
}

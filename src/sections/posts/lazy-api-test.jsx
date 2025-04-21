"use client";

import { useLazyGetPostsQuery } from "@/redux/apiServices/apiSlice";
import { formatDate, getTimeTaken } from "@/utils";
import Button from "@/utils/lib/button";
import React, { Fragment } from "react";

export const LazyApiTest = () => {
  const [trigger, result] = useLazyGetPostsQuery();

  const handleClick = () => {
    // You can pass any payload here as `newPost`
    trigger();
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center">
      <div className="flex items-center justify-between w-full">
        <Button onClick={handleClick}>Get Posts</Button>
        {result?.data?.length > 0 && `Total Posts:${result?.data?.length}`}
      </div>

      <div>
        <ul className="mt-4">
          {result?.data?.length > 0 &&
            result?.data?.map((post, index) => (
              <li
                key={index}
                className="border p-2 flex justify-between items-center flex-col lg:flex-row  mb-2"
              >
                <div className="w-full flex flex-col lg:flex-row mb-1 lg:mb-0 items-center justify-between me-3">
                  <p className="me-2">
                    <span className="font-bold me-3">{index + 1}.</span>
                    <span className={post.completed ? "line-through" : ""}>
                      {post.post}
                    </span>
                  </p>
                  <p className="flex flex-col md:flex-row md:gap-2 items-center">
                    <span className="text-green-500">
                      {formatDate(post.createdAt)}
                    </span>
                    {post.completed && (
                      <Fragment>
                        <span className="text-red-500">{`- ${formatDate(
                          post.completedAt
                        )}`}</span>
                        <span className="text-yellow-500 text-xs">{`(${getTimeTaken(
                          post.createdAt,
                          post.completedAt
                        )})`}</span>
                      </Fragment>
                    )}
                  </p>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

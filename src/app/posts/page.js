import Posts from "@/sections/posts";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <Posts />
    </Suspense>
  );
};

export default page;

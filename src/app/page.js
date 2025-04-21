import { LazyApiTest } from "@/sections/posts/lazy-api-test";
import Button from "@/utils/lib/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="m-5 flex flex-col items-center justify-center">
      <Button>
        <Link href="/posts">
          Go to Posts Page
        </Link>
      </Button>
      <LazyApiTest />
    </div>
  );
}

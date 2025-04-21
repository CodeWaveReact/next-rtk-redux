import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setCurrentPage } from "@/redux/slices/posts-slice";

export const FilterPosts = ({ filter }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Handle filter change (updates URL query parameters)
  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    router.push(`?filter=${selectedFilter}`);
    dispatch(setCurrentPage(1)); // Reset to first page on filter change
  };

  return (
    // Filter for completed or not completed
    <div className="md:w-[350px] flex items-center md:justify-end">
      <label className="me-2">Filter Posts</label>
      <select
        className="border p-2 bg-gray-900 text-white"
        value={filter}
        onChange={handleFilterChange}
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="not-completed">Not Completed</option>
      </select>
    </div>
  );
};

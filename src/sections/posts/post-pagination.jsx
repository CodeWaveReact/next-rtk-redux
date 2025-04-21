import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "@/redux/slices/posts-slice";

export const PostPagination = ({totalPages}) => {
  const { currentPage } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
  
  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      {/* Previous Button */}
      <button disabled={currentPage === 1} onClick={() => dispatch(setCurrentPage(currentPage - 1))} className="border px-2 bg-gray-800 text-white disabled:opacity-50 rounded-2xl cursor-pointer">{"<"}</button>

      {/* Dynamic Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1)
        .filter(
          (page) =>
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - 0 && page <= currentPage + 0)
        )
        .map((page, index, pages) => (
          <div key={page}>
            {index > 0 && pages[index - 1] !== page - 1 && (<span className="me-2">...</span>)}
            <button onClick={() => dispatch(setCurrentPage(page))} className={`border px-4 ${currentPage === page ? "bg-blue-900 text-white" : "bg-gray-800 text-white"} rounded-2xl cursor-pointer`}>{page}</button>
          </div>
        ))}

      {/* Next Button */}
      <button disabled={currentPage === totalPages} onClick={() => dispatch(setCurrentPage(currentPage + 1))} className="border px-2 bg-gray-800 text-white disabled:opacity-50 rounded-2xl cursor-pointer">{">"}</button>
    </div>
  );
};

import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
const Pagination = ({ tasksPerPage, totalTasks, paginate, currentPage }) => {
  const totalPages = Math.ceil(totalTasks / tasksPerPage);

  return (
    <div className="flex  items-center mt-6 space-x-2">
      {/* Previous Button */}
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-full transition-all duration-300 ${
          currentPage === 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-[#884dee] text-white hover:bg-[#6d39c2]"
        }`}
      >
<IoIosArrowBack />
      </button>

      {/* Page Numbers */}
      <div className="flex space-x-2">
        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num + 1}
            onClick={() => paginate(num + 1)}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              currentPage === num + 1
                ? "  border border-[#884dee] text-[#884dee] font-bold"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
          >
            {num + 1}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-full transition-all duration-300 ${
          currentPage === totalPages
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            :  "bg-[#884dee] text-white hover:bg-[#6d39c2]"
        }`}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default Pagination;

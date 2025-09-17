import React from "react";

const Pagination = ({totalPages, currentPage, onPageChange}) => {
//   console.log(totalPages);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
//   console.log(pages);
  return (
    <div>
      <button onClick={()=>onPageChange(currentPage - 1)} disabled={currentPage === 1} className="mx-1 px-3 py-1 rounded bg-orange-600 disabled:opacity-50">Prev</button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={page === currentPage ? "font-bold" : ""}
        >
          {page}
        </button>
      ))}
      <button  onClick={()=>onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="mx-1 px-3 py-1 rounded bg-orange-600 disabled:opacity-50">Next</button>
    </div>
  );
};

export default Pagination;

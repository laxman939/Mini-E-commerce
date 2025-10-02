'use client';

import { useCustomers } from "../context/CustomerContext";


export function Pagination() {
  const { filteredCustomers, pagination, setPagination } = useCustomers();
  const { currentPage, itemsPerPage } = pagination;
  
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  return (
    <>
      <div className="mb-4 text-sm text-gray-600">
        Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredCustomers.length)} of {filteredCustomers.length} customers
      </div>
      
      <div className="mt-4 flex justify-between items-center flex-wrap gap-4">
        <div className="flex gap-2">
          <button
            onClick={() => setPagination({ currentPage: 1 })}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            First
          </button>
          <button
            onClick={() => setPagination({ currentPage: currentPage - 1 })}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            Previous
          </button>
          <span className="px-3 py-1 flex items-center">
            Page {currentPage} of {totalPages || 1}
          </span>
          <button
            onClick={() => setPagination({ currentPage: currentPage + 1 })}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            Next
          </button>
          <button
            onClick={() => setPagination({ currentPage: totalPages })}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            Last
          </button>
        </div>
        
        <select
          value={itemsPerPage}
          onChange={(e) => setPagination({ itemsPerPage: parseInt(e.target.value) })}
          className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="10">10 per page</option>
          <option value="25">25 per page</option>
          <option value="50">50 per page</option>
          <option value="100">100 per page</option>
        </select>
      </div>
    </>
  );
}
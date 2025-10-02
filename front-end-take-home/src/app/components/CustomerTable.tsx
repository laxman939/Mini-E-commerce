"use client";

import { useCustomers } from "../context/CustomerContext";
import { Customer } from "../types/customer";

interface CustomerTableProps {
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
}

export function CustomerTable({ onEdit, onDelete }: CustomerTableProps) {
  const {
    filteredCustomers,
    loading: isLoading,
    pagination,
    selectedCustomers,
    selectAll,
    toggleSelectAll,
    toggleCustomerSelection,
  } = useCustomers();

  const { currentPage, itemsPerPage } = pagination;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomers = filteredCustomers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const getStatusColor = (status: Customer["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="border border-gray-200 p-3 text-left">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={toggleSelectAll}
                className="w-4 h-4 cursor-pointer"
                aria-label="Select all customers"
              />
            </th>
            <th className="border border-gray-200 p-3 text-left font-semibold">
              Name
            </th>
            <th className="border border-gray-200 p-3 text-left font-semibold">
              Email
            </th>
            <th className="border border-gray-200 p-3 text-left font-semibold">
              Company
            </th>
            <th className="border border-gray-200 p-3 text-left font-semibold">
              Position
            </th>
            <th className="border border-gray-200 p-3 text-left font-semibold">
              Status
            </th>
            <th className="border border-gray-200 p-3 text-left font-semibold">
              Revenue
            </th>
            <th className="border border-gray-200 p-3 text-left font-semibold">
              Location
            </th>
            <th className="border border-gray-200 p-3 text-left font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {currentCustomers.length > 0 ? (
            currentCustomers.map((customer: Customer) => (
              <tr
                key={customer.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="border border-gray-200 p-3">
                  <input
                    type="checkbox"
                    checked={selectedCustomers.includes(customer.id)}
                    onChange={() => toggleCustomerSelection(customer.id)}
                    className="w-4 h-4 cursor-pointer"
                    aria-label={`Select ${customer.firstName} ${customer.lastName}`}
                  />
                </td>
                <td className="border border-gray-200 p-3">
                  {customer.firstName} {customer.lastName}
                </td>
                <td className="border border-gray-200 p-3">{customer.email}</td>
                <td className="border border-gray-200 p-3">
                  {customer.company}
                </td>
                <td className="border border-gray-200 p-3">
                  {customer.position}
                </td>
                <td className="border border-gray-200 p-3 first-letter:uppercase">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}
                  >
                    {customer.status}
                  </span>
                </td>
                <td className="border border-gray-200 p-3">
                  ${customer.revenue.toLocaleString()}
                </td>
                <td className="border border-gray-200 p-3">
                  {customer.address.city}, {customer.address.state}
                </td>
                <td className="border border-gray-200 p-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(customer)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(customer)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              {isLoading ? (
                <td
                  colSpan={12}
                  className="border border-gray-200 text-center text-gray-500"
                >
                  <div className="h-auto px-3 py-6 bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                      <p className="mt-4 text-gray-600">Loading customers...</p>
                    </div>
                  </div>
                </td>
              ) : (
                <td
                  colSpan={12}
                  className="border border-gray-200 p-3 text-center py-8 text-gray-500"
                >
                  No customers found. Try adjusting your filters.
                </td>
              )}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

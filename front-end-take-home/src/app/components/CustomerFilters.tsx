'use client';

import { useCustomers } from "../context/CustomerContext";
import { SortField } from "../types/customer";

export function CustomerFilters() {
  const { filters, setFilters, sortField, sortOrder, setSorting, toggleSortOrder } = useCustomers();

  return (
    <div className="mb-6 flex flex-wrap gap-4">
      <input
        type="text"
        placeholder="Search by name or email..."
        value={filters.searchTerm}
        onChange={(e) => setFilters({ searchTerm: e.target.value })}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-80"
      />
      
      <select
        value={filters.statusFilter}
        onChange={(e) => setFilters({ statusFilter: e.target.value })}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="pending">Pending</option>
      </select>
      
      <input
        type="text"
        placeholder="Filter by company..."
        value={filters.companyFilter}
        onChange={(e) => setFilters({ companyFilter: e.target.value })}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <input
        type="date"
        value={filters.dateRange.start}
        onChange={(e) => setFilters({ dateRange: { ...filters.dateRange, start: e.target.value }})}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Start date"
      />
      
      <input
        type="date"
        value={filters.dateRange.end}
        onChange={(e) => setFilters({ dateRange: { ...filters.dateRange, end: e.target.value }})}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="End date"
      />
      
      <input
        type="number"
        placeholder="Min revenue"
        value={filters.revenueRange.min}
        onChange={(e) => setFilters({ revenueRange: { ...filters.revenueRange, min: e.target.value }})}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-36"
      />
      
      <input
        type="number"
        placeholder="Max revenue"
        value={filters.revenueRange.max}
        onChange={(e) => setFilters({ revenueRange: { ...filters.revenueRange, max: e.target.value }})}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-36"
      />
      
      <select
        value={sortField}
        onChange={(e) => setSorting(e.target.value as SortField)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Sort by...</option>
        <option value="firstName">First Name</option>
        <option value="lastName">Last Name</option>
        <option value="company">Company</option>
        <option value="revenue">Revenue</option>
        <option value="dateCreated">Date Created</option>
      </select>
      
      <button
        onClick={toggleSortOrder}
        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors font-medium"
        aria-label={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
      >
        {sortOrder === 'asc' ? '↑' : '↓'}
      </button>
    </div>
  );
}
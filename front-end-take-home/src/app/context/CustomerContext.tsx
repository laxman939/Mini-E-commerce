// contexts/CustomerContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

// Types
export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  status: 'active' | 'inactive' | 'pending';
  address: Address;
  revenue: number;
  tags: string[];
  dateCreated: string;
  lastUpdated: string;
}

export type SortField = keyof Customer | '';
export type SortOrder = 'asc' | 'desc';

export interface FilterState {
  searchTerm: string;
  statusFilter: string;
  companyFilter: string;
  dateRange: { start: string; end: string };
  revenueRange: { min: string; max: string };
  selectedTags: string[];
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
}

interface CustomerContextType {
  customers: Customer[];
  filteredCustomers: Customer[];
  loading: boolean;
  error: string;
  filters: FilterState;
  pagination: PaginationState;
  sortField: SortField;
  sortOrder: SortOrder;
  selectedCustomers: number[];
  selectAll: boolean;
  
  setFilters: (filters: Partial<FilterState>) => void;
  setPagination: (pagination: Partial<PaginationState>) => void;
  setSorting: (field: SortField, order?: SortOrder) => void;
  toggleSortOrder: () => void;
  setSelectedCustomers: (ids: number[]) => void;
  toggleSelectAll: () => void;
  toggleCustomerSelection: (id: number) => void;
  
  fetchCustomers: () => Promise<void>;
  addCustomer: (customer: Omit<Customer, 'id' | 'dateCreated' | 'lastUpdated'>) => Promise<void>;
  updateCustomer: (id: number, customer: Partial<Customer>) => Promise<void>;
  deleteCustomer: (id: number) => Promise<void>;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [filters, setFiltersState] = useState<FilterState>({
    searchTerm: '',
    statusFilter: 'all',
    companyFilter: '',
    dateRange: { start: '', end: '' },
    revenueRange: { min: '', max: '' },
    selectedTags: []
  });
  
  const [pagination, setPaginationState] = useState<PaginationState>({
    currentPage: 1,
    itemsPerPage: 10
  });
  
  const [sortField, setSortField] = useState<SortField>('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const fetchCustomers = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('/api/customers?_limit=100');
      
      
      if (!response.ok) throw new Error('Failed to fetch customers');
      
      const data = await response.json();
      setCustomers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching customers:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const filterAndSort = useCallback(() => {
    let filtered = [...customers];

    // Search filter
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(customer =>
        customer.firstName.toLowerCase().includes(term) ||
        customer.lastName.toLowerCase().includes(term) ||
        customer.email.toLowerCase().includes(term)
      );
    }

    // Status filter
    if (filters.statusFilter !== 'all') {
      filtered = filtered.filter(customer => customer.status === filters.statusFilter);
    }

    // Company filter
    if (filters.companyFilter) {
      filtered = filtered.filter(customer =>
        customer.company.toLowerCase().includes(filters.companyFilter.toLowerCase())
      );
    }

    // Date range filter
    if (filters.dateRange.start && filters.dateRange.end) {
      const start = new Date(filters.dateRange.start);
      const end = new Date(filters.dateRange.end);
      filtered = filtered.filter(customer => {
        const created = new Date(customer.dateCreated);
        return created >= start && created <= end;
      });
    }

    // Revenue filter
    if (filters.revenueRange.min || filters.revenueRange.max) {
      const min = filters.revenueRange.min ? parseFloat(filters.revenueRange.min) : 0;
      const max = filters.revenueRange.max ? parseFloat(filters.revenueRange.max) : Infinity;
      filtered = filtered.filter(customer => customer.revenue >= min && customer.revenue <= max);
    }

    // Tags filter
    if (filters.selectedTags.length > 0) {
      filtered = filtered.filter(customer =>
        filters.selectedTags.some(tag => customer.tags.includes(tag))
      );
    }

    // Sorting
    if (sortField) {
      filtered.sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];
        
        if (aVal === bVal) return 0;
        
        const comparison = aVal > bVal ? 1 : -1;
        return sortOrder === 'asc' ? comparison : -comparison;
      });
    }

    setFilteredCustomers(filtered);
    setPaginationState(prev => ({ ...prev, currentPage: 1 }));
  }, [customers, filters, sortField, sortOrder]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  useEffect(() => {
    filterAndSort();
  }, [filterAndSort]);

  useEffect(() => {
    if (selectAll) {
      setSelectedCustomers(filteredCustomers.map(c => c.id));
    } else {
      setSelectedCustomers([]);
    }
  }, [selectAll, filteredCustomers]);

  const setFilters = useCallback((newFilters: Partial<FilterState>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
  }, []);

  const setPagination = useCallback((newPagination: Partial<PaginationState>) => {
    setPaginationState(prev => ({ ...prev, ...newPagination }));
  }, []);

  const setSorting = useCallback((field: SortField, order?: SortOrder) => {
    setSortField(field);
    if (order) setSortOrder(order);
  }, []);

  const toggleSortOrder = useCallback(() => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  }, []);

  const toggleSelectAll = useCallback(() => {
    setSelectAll(prev => !prev);
  }, []);

  const toggleCustomerSelection = useCallback((id: number) => {
    setSelectedCustomers(prev =>
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  }, []);

  const addCustomer = useCallback(async (customerData: Omit<Customer, 'id' | 'dateCreated' | 'lastUpdated'>) => {
    try {
      const newCustomer = {
        ...customerData,
        dateCreated: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      };

      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCustomer)
      });

      if (!response.ok) throw new Error('Failed to add customer');
      
      await fetchCustomers();
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to add customer');
    }
  }, [fetchCustomers]);

  const updateCustomer = useCallback(async (id: number, updates: Partial<Customer>) => {
    try {
      const customer = customers.find(c => c.id === id);
      if (!customer) throw new Error('Customer not found');

      const updatedCustomer = {
        ...customer,
        ...updates,
        lastUpdated: new Date().toISOString()
      };

      const response = await fetch(`/api/customers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCustomer)
      });

      if (!response.ok) throw new Error('Failed to update customer');
      
      await fetchCustomers();
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update customer');
    }
  }, [customers, fetchCustomers]);

  const deleteCustomer = useCallback(async (id: number) => {
    try {
      const response = await fetch(`/api/customers/${id}`, { method: 'DELETE' });
      
      if (!response.ok) throw new Error('Failed to delete customer');
      
      await fetchCustomers();
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete customer');
    }
  }, [fetchCustomers]);

  const value: CustomerContextType = {
    customers,
    filteredCustomers,
    loading,
    error,
    filters,
    pagination,
    sortField,
    sortOrder,
    selectedCustomers,
    selectAll,
    setFilters,
    setPagination,
    setSorting,
    toggleSortOrder,
    setSelectedCustomers,
    toggleSelectAll,
    toggleCustomerSelection,
    fetchCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer
  };

  return <CustomerContext.Provider value={value}>{children}</CustomerContext.Provider>;
}

export function useCustomers() {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomers must be used within CustomerProvider');
  }
  return context;
}
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

export interface CustomerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  status: 'active' | 'inactive' | 'pending';
  street: string;
  city: string;
  state: string;
  zipCode: string;
  revenue: string;
}

export interface FormErrors {
  [key: string]: string;
}
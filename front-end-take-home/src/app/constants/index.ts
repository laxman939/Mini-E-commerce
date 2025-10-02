export const STATUS_OPTIONS = [
  { value: 'active', label: 'Active', color: 'green' },
  { value: 'inactive', label: 'Inactive', color: 'red' },
  { value: 'pending', label: 'Pending', color: 'yellow' }
] as const;

export const ITEMS_PER_PAGE_OPTIONS = [10, 25, 50, 100] as const;

export const SORT_FIELDS = [
  { value: '', label: 'Sort by...' },
  { value: 'firstName', label: 'First Name' },
  { value: 'lastName', label: 'Last Name' },
  { value: 'company', label: 'Company' },
  { value: 'revenue', label: 'Revenue' },
  { value: 'dateCreated', label: 'Date Created' }
] as const;

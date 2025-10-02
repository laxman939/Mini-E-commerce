import { Customer } from "../types/customer";


export const exportCustomersToCSV = (customers: Customer[]): void => {
  const headers = [
    'ID',
    'First Name',
    'Last Name',
    'Email',
    'Phone',
    'Company',
    'Position',
    'Status',
    'Revenue',
    'Street',
    'City',
    'State',
    'Zip Code',
    'Date Created',
    'Last Updated'
  ];

  const rows = customers.map(c => [
    c.id,
    c.firstName,
    c.lastName,
    c.email,
    c.phone,
    c.company,
    c.position,
    c.status,
    c.revenue,
    c.address.street,
    c.address.city,
    c.address.state,
    c.address.zipCode,
    c.dateCreated,
    c.lastUpdated
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `customers-export-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

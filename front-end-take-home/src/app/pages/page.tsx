// app/page.tsx or components/CustomerDashboard.tsx
"use client";

import { useState } from "react";
import { Customer, CustomerFormData } from "../types/customer";
import { useCustomers } from "../context/CustomerContext";
import { CustomerFilters } from "../components/CustomerFilters";
import { CustomerTable } from "../components/CustomerTable";
import { Pagination } from "../components/Pagination";
import { CustomerFormModal } from "../components/CustomerFormModal";
import { DeleteConfirmModal } from "../components/DeleteConfirmModal";

export default function CustomerDashboard() {
  const {
    error,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    filteredCustomers,
  } = useCustomers();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  const handleAddNew = () => {
    setSelectedCustomer(null);
    setShowAddModal(true);
  };

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowEditModal(true);
  };

  const handleDelete = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowDeleteModal(true);
  };

  const handleSaveNew = async (formData: CustomerFormData) => {
    await addCustomer({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      position: formData.position,
      status: formData.status,
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
      },
      revenue: parseFloat(formData.revenue),
      tags: [],
    });
  };

  const handleSaveEdit = async (formData: CustomerFormData) => {
    if (!selectedCustomer) return;

    await updateCustomer(selectedCustomer.id, {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      position: formData.position,
      status: formData.status,
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
      },
      revenue: parseFloat(formData.revenue),
    });
  };

  const handleConfirmDelete = async () => {
    if (!selectedCustomer) return;

    try {
      await deleteCustomer(selectedCustomer.id);
      setShowDeleteModal(false);
      setSelectedCustomer(null);
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Failed to delete customer"
      );
    }
  };

  const handleExportCSV = () => {
    try {
      const headers = [
        "First Name",
        "Last Name",
        "Email",
        "Phone",
        "Company",
        "Position",
        "Status",
        "Revenue",
        "City",
        "State",
      ];
      const csvContent = [
        headers.join(","),
        ...filteredCustomers.map((c) =>
          [
            c.firstName,
            c.lastName,
            c.email,
            c.phone,
            c.company,
            c.position,
            c.status,
            c.revenue,
            c.address.city,
            c.address.state,
          ].join(",")
        ),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `customers-${new Date().toISOString().split("T")[0]}.csv`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error, "Failed to export CSV");
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-red-800 font-semibold mb-2">Error</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Customer Dashboard
            </h1>

            <div className="flex gap-3">
              <button
                onClick={handleAddNew}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
              >
                Add Customer
              </button>

              <button
                onClick={handleExportCSV}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                Export CSV
              </button>
            </div>
          </div>

          <CustomerFilters />

          <CustomerTable onEdit={handleEdit} onDelete={handleDelete} />

          <Pagination />
        </div>
      </div>

      <CustomerFormModal
        isOpen={showAddModal}
        customer={null}
        onClose={() => setShowAddModal(false)}
        onSave={handleSaveNew}
        title="Add New Customer"
      />

      <CustomerFormModal
        isOpen={showEditModal}
        customer={selectedCustomer}
        onClose={() => {
          setShowEditModal(false);
          setSelectedCustomer(null);
        }}
        onSave={handleSaveEdit}
        title="Edit Customer"
      />

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        customer={selectedCustomer}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setShowDeleteModal(false);
          setSelectedCustomer(null);
        }}
      />
    </div>
  );
}

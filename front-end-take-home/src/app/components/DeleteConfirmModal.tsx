'use client'

import { Customer } from "../types/customer";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  customer: Customer | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmModal({ isOpen, customer, onConfirm, onCancel }: DeleteConfirmModalProps) {
  if (!isOpen || !customer) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Confirm Delete</h2>
        <p className="text-gray-700 mb-2">
          Are you sure you want to delete <strong>{customer.firstName} {customer.lastName}</strong>?
        </p>
        <p className="text-sm text-gray-500 mb-6">This action cannot be undone.</p>
        
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
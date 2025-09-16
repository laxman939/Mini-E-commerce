import React from 'react';

interface QuantitySelectorProps {
  qty: number;
  setQty: (qty: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ qty, setQty }) => (
  <div className="flex items-center mb-4">
    <button
      className="px-2 py-1 border rounded"
      onClick={() => setQty(Math.max(1, qty - 1))}
      aria-label="Decrease quantity"
    >
      -
    </button>
    <span className="mx-2">{qty}</span>
    <button
      className="px-2 py-1 border rounded"
      onClick={() => setQty(qty + 1)}
      aria-label="Increase quantity"
    >
      +
    </button>
  </div>
);

export default QuantitySelector;
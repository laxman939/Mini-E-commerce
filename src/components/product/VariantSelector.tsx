interface Variant {
  color: string
  size: string
}

export default function VariantSelector({ variants }: { variants: Variant[] }) {
  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Select Variant</h3>
      <div className="flex space-x-2">
        {variants.map((variant, idx) => (
          <button
            key={idx}
            className="border p-2 rounded hover:bg-indigo-100"
            type="button"
          >
            {variant.color} / {variant.size}
          </button>
        ))}
      </div>
    </div>
  )
}

// components/PaymentMethods.tsx
export default function PaymentMethods() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Methods</h2>
      <div className="text-center py-8">
        <p className="text-gray-500">No payment methods saved yet.</p>
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Add Payment Method
        </button>
      </div>
    </div>
  );
}
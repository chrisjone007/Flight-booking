// components/Preferences.tsx
export default function Preferences() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Preferences</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Language</label>
          <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
            <option>English</option>
            <option>French</option>
            <option>Spanish</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Currency</label>
          <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 md:text-gray-600">
            <option>USD - US Dollar</option>
            <option>EUR - Euro</option>
            <option>NGN - Nigerian Naira</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Seat Preference</label>
          <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
            <option>Window</option>
            <option>Aisle</option>
            <option>No Preference</option>
          </select>
        </div>
      </div>
    </div>
  );
}
// components/Notifications.tsx
export default function Notifications() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Notifications</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Email notifications</span>
          <input type="checkbox" className="rounded" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-700">SMS notifications</span>
          <input type="checkbox" className="rounded" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Promotional emails</span>
          <input type="checkbox" className="rounded" defaultChecked />
        </div>
      </div>
    </div>
  );
}
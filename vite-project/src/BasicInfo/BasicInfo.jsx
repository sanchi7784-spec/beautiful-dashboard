import React, { useState } from 'react';


const tabs = [
  { name: 'Profile', key: 'profile' },
  { name: 'Account', key: 'account' },
  { name: 'Preferences', key: 'preferences' },
  { name: 'Commission Details', key: 'commission' },
];

export default function BasicInfo() {
  const [activeTab, setActiveTab] = useState('profile');
  const [commission, setCommission] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    if (activeTab === 'commission') {
      setLoading(true);
      setError(null);
      fetch('https://api.mastrokart.com/dashboard/settings/commission', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo3MjM0MjAzLCJyb2xlX2lkIjoyLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImV4cCI6MTc3NDI2NzAxNH0.xFhISo5BTBItTCNGBZhbHar5SLGqA6ExHo4z-85EHCI'
        }
      })
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch commission details');
          return res.json();
        })
        .then(data => {
          setCommission(data.data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">Basic Info</h2>
        <div className="flex space-x-4 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-2 rounded-full font-semibold transition-colors duration-200 focus:outline-none ${
                activeTab === tab.key
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
        <div>
          {activeTab === 'profile' && (
            <div>
              <h3 className="text-xl font-semibold text-blue-600 mb-4">Profile Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-1">Full Name</label>
                  <input type="text" className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400" placeholder="Enter your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-1">Email</label>
                  <input type="email" className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400" placeholder="Enter your email" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-1">Phone</label>
                  <input type="tel" className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400" placeholder="Enter your phone" />
                </div>
              </div>
            </div>
          )}
          {activeTab === 'account' && (
            <div>
              <h3 className="text-xl font-semibold text-green-600 mb-4">Account Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-1">Username</label>
                  <input type="text" className="w-full border border-green-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400" placeholder="Enter username" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-1">Password</label>
                  <input type="password" className="w-full border border-green-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400" placeholder="Enter password" />
                </div>
              </div>
            </div>
          )}
          {activeTab === 'preferences' && (
            <div>
              <h3 className="text-xl font-semibold text-purple-600 mb-4">Preferences</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-purple-700 mb-1">Theme</label>
                  <select className="w-full border border-purple-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400">
                    <option>Light</option>
                    <option>Dark</option>
                    <option>System</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-purple-700 mb-1">Language</label>
                  <select className="w-full border border-purple-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'commission' && (
            <div>
              <h3 className="text-xl font-semibold text-pink-600 mb-4">Commission Details</h3>
              {loading && <div className="text-blue-500">Loading...</div>}
              {error && <div className="text-red-500">{error}</div>}
              {commission && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-pink-700 mb-1">Commission Status</label>
                      <input type="text" value={commission.commission_status} readOnly className="w-full border border-pink-300 rounded-lg px-4 py-2 bg-pink-50" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-pink-700 mb-1">Commission Value</label>
                      <input type="text" value={commission.commission_value} readOnly className="w-full border border-pink-300 rounded-lg px-4 py-2 bg-pink-50" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-pink-700 mb-1">Commission Type</label>
                      <input type="text" value={commission.commission_type} readOnly className="w-full border border-pink-300 rounded-lg px-4 py-2 bg-pink-50" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-pink-700 mb-1">Commission Charge</label>
                      <input type="text" value={commission.commission_charge} readOnly className="w-full border border-pink-300 rounded-lg px-4 py-2 bg-pink-50" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-pink-700 mb-1">Shop Registration Status</label>
                      <input type="text" value={commission.shop_registration_status} readOnly className="w-full border border-pink-300 rounded-lg px-4 py-2 bg-pink-50" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

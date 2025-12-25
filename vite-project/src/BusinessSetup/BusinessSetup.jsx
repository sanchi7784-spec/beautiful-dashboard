import React, { useState } from 'react';
import { Briefcase, CreditCard, Store, Package, Save, CheckCircle, Wallet } from 'lucide-react';

export default function BusinessSettings() {
  const [activeTab, setActiveTab] = useState('basic');
  const [businessModel, setBusinessModel] = useState('multi');
  const [currencyPosition, setCurrencyPosition] = useState('left');
  const [codEnabled, setCodEnabled] = useState(false);
  const [onlinePaymentEnabled, setOnlinePaymentEnabled] = useState(false);
  const [commissionEnabled, setCommissionEnabled] = useState(false);
  const [subscriptionEnabled, setSubscriptionEnabled] = useState(false);
  const [posEnabled, setPosEnabled] = useState(false);
  const [shopRegistration, setShopRegistration] = useState(false);
  const [needProductApproval, setNeedProductApproval] = useState(true);
  const [updateProductApproval, setUpdateProductApproval] = useState(true);
  
  // Form data states
  const [companyName, setCompanyName] = useState('ReadyGrocery');
  const [companyEmail, setCompanyEmail] = useState('support@razinsoft.com');
  const [companyPhone, setCompanyPhone] = useState('01711257498');
  const [timeZone, setTimeZone] = useState('UTC/GMT +06:00 - Asia/Dhaka');
  const [commission, setCommission] = useState('10');
  const [commissionType, setCommissionType] = useState('Percentage');
  const [commissionCharge, setCommissionCharge] = useState('Per Order');
  
  // Withdraw settings
  const [minWithdrawAmount, setMinWithdrawAmount] = useState('0');
  const [maxWithdrawAmount, setMaxWithdrawAmount] = useState('');
  const [minDayWithdrawRequest, setMinDayWithdrawRequest] = useState('');
  
  // Toast notification state
  const [showToast, setShowToast] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Save handler
  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      const settings = {
        basicInfo: {
          companyName,
          companyEmail,
          companyPhone,
          businessModel,
          currencyPosition,
          timeZone
        },
        payment: {
          codEnabled,
          onlinePaymentEnabled
        },
        shops: {
          commissionEnabled,
          subscriptionEnabled,
          commission,
          commissionType,
          commissionCharge,
          posEnabled,
          shopRegistration,
          needProductApproval,
          updateProductApproval
        },
        withdraw: {
          minWithdrawAmount,
          maxWithdrawAmount,
          minDayWithdrawRequest
        }
      };
      
      console.log('Saving settings:', settings);
      
      setIsSaving(false);
      setShowToast(true);
      
      // Hide toast after 3 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }, 1000);
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'shops', label: 'Shops' },
    { id: 'withdraw', label: 'Withdraw' }
  ];

  return (
    <div className="min-h-screen bg-black mt-20 text-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Briefcase className="w-7 h-7 text-gray-300" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-100">Business Settings</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Basic Info Tab */}
        {activeTab === 'basic' && (
          <div className="space-y-8">
            {/* Business Information */}
            <div className="bg-gray-900 rounded-xl p-6 md:p-8 border border-gray-800">
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="w-5 h-5 text-gray-400" />
                <h2 className="text-xl font-semibold text-gray-100">Business Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                {/* Company Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Company Email
                  </label>
                  <input
                    type="email"
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                {/* Company Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Company Phone
                  </label>
                  <input
                    type="tel"
                    value={companyPhone}
                    onChange={(e) => setCompanyPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {/* Business Model */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Business Model
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="businessModel"
                        checked={businessModel === 'single'}
                        onChange={() => setBusinessModel('single')}
                        className="w-4 h-4 text-red-500 focus:ring-red-500 focus:ring-2"
                      />
                      <span className="text-gray-300">Single Shop</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="businessModel"
                        checked={businessModel === 'multi'}
                        onChange={() => setBusinessModel('multi')}
                        className="w-4 h-4 text-red-500 focus:ring-red-500 focus:ring-2"
                      />
                      <span className="text-gray-300">Multi Shop</span>
                    </label>
                  </div>
                </div>

                {/* Currency Position */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Currency Position
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="currencyPosition"
                        checked={currencyPosition === 'left'}
                        onChange={() => setCurrencyPosition('left')}
                        className="w-4 h-4 text-red-500 focus:ring-red-500 focus:ring-2"
                      />
                      <span className="text-gray-300">($) Left</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="currencyPosition"
                        checked={currencyPosition === 'right'}
                        onChange={() => setCurrencyPosition('right')}
                        className="w-4 h-4 text-red-500 focus:ring-red-500 focus:ring-2"
                      />
                      <span className="text-gray-300">Right ($)</span>
                    </label>
                  </div>
                </div>

                {/* Time Zone */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Time Zone
                  </label>
                  <select 
                    value={timeZone}
                    onChange={(e) => setTimeZone(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option>UTC/GMT +06:00 - Asia/Dhaka</option>
                    <option>UTC/GMT +05:30 - Asia/Kolkata</option>
                    <option>UTC/GMT +00:00 - UTC</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Method Setup */}
            <div className="bg-gray-900 rounded-xl p-6 md:p-8 border border-gray-800">
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="w-5 h-5 text-gray-400" />
                <h2 className="text-xl font-semibold text-gray-100">Payment Method Setup</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Cash on Delivery */}
                <div className="relative bg-gray-800 border-2 border-green-500/30 rounded-xl p-6">
                  <div className="absolute top-4 right-4">
                    <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">💰</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-100">Cash on Delivery</h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Enable</span>
                    <button
                      onClick={() => setCodEnabled(!codEnabled)}
                      className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${
                        codEnabled ? 'bg-red-500' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                          codEnabled ? 'translate-x-8' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Online Payment */}
                <div className="relative bg-gray-800 border-2 border-green-500/30 rounded-xl p-6">
                  <div className="absolute top-4 right-4">
                    <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-100">Online Payment</h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Enable</span>
                    <button
                      onClick={() => setOnlinePaymentEnabled(!onlinePaymentEnabled)}
                      className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${
                        onlinePaymentEnabled ? 'bg-red-500' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                          onlinePaymentEnabled ? 'translate-x-8' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Shops Tab */}
        {activeTab === 'shops' && (
          <div className="space-y-8">
            {/* Shop Setup */}
            <div className="bg-gray-900 rounded-xl p-6 md:p-8 border border-gray-800">
              <div className="flex items-center gap-3 mb-6">
                <Store className="w-5 h-5 text-gray-400" />
                <h2 className="text-xl font-semibold text-gray-100">Shop Setup</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Commission */}
                <div className="relative bg-gray-800 border-2 border-green-500/30 rounded-xl p-6">
                  <div className="absolute top-4 right-4">
                    <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">💰</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-100">Commission</h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Enable</span>
                    <button
                      onClick={() => setCommissionEnabled(!commissionEnabled)}
                      className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${
                        commissionEnabled ? 'bg-red-500' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                          commissionEnabled ? 'translate-x-8' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Subscription */}
                <div className="relative bg-gray-800 border-2 border-gray-700 rounded-xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-100">Subscription</h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Disable</span>
                    <button
                      onClick={() => setSubscriptionEnabled(!subscriptionEnabled)}
                      className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${
                        subscriptionEnabled ? 'bg-red-500' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                          subscriptionEnabled ? 'translate-x-8' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Commission Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Commission
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={commission}
                      onChange={(e) => setCommission(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">%</span>
                  </div>
                </div>

                {/* Commission Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Commission Type
                  </label>
                  <select 
                    value={commissionType}
                    onChange={(e) => setCommissionType(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option>Percentage</option>
                    <option>Fixed</option>
                  </select>
                </div>

                {/* Commission Charge */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Commission Charge
                  </label>
                  <select 
                    value={commissionCharge}
                    onChange={(e) => setCommissionCharge(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option>Per Order</option>
                    <option>Per Item</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-300 font-medium">Enable POS in Shop Panel</span>
                  <button
                    onClick={() => setPosEnabled(!posEnabled)}
                    className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${
                      posEnabled ? 'bg-red-500' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                        posEnabled ? 'translate-x-8' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-300 font-medium">Shop Registration</span>
                  <button
                    onClick={() => setShopRegistration(!shopRegistration)}
                    className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${
                      shopRegistration ? 'bg-red-500' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                        shopRegistration ? 'translate-x-8' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Need Product Approval */}
            <div className="bg-gray-900 rounded-xl p-6 md:p-8 border border-gray-800">
              <div className="flex items-center gap-3 mb-6">
                <Package className="w-5 h-5 text-gray-400" />
                <h2 className="text-xl font-semibold text-gray-100">Need Product Approval</h2>
              </div>

              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={needProductApproval}
                    onChange={(e) => setNeedProductApproval(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-600 text-red-500 focus:ring-red-500 focus:ring-2 bg-gray-800"
                  />
                  <span className="text-gray-300">Need Product Approval</span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={updateProductApproval}
                    onChange={(e) => setUpdateProductApproval(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-600 text-red-500 focus:ring-red-500 focus:ring-2 bg-gray-800 mt-0.5"
                  />
                  <div>
                    <span className="text-gray-300">Update Product Approval </span>
                    <span className="text-cyan-400">
                      (when shop update any filed of product it will be needed to approve)
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Withdraw Tab */}
        {activeTab === 'withdraw' && (
          <div className="space-y-8">
            {/* Withdraw Setup */}
            <div className="bg-gray-900 rounded-xl p-6 md:p-8 border border-gray-800">
              <div className="flex items-center gap-3 mb-6">
                <Wallet className="w-5 h-5 text-gray-400" />
                <h2 className="text-xl font-semibold text-gray-100">Withdraw Setup</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Min Withdraw Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Min Withdraw Amount
                  </label>
                  <input
                    type="number"
                    value={minWithdrawAmount}
                    onChange={(e) => setMinWithdrawAmount(e.target.value)}
                    placeholder="0"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                {/* Max Withdraw Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Max Withdraw Amount
                  </label>
                  <input
                    type="number"
                    value={maxWithdrawAmount}
                    onChange={(e) => setMaxWithdrawAmount(e.target.value)}
                    placeholder="Enter max amount"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                {/* Min Day Withdraw Request */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Min Day Withdraw Request
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={minDayWithdrawRequest}
                      onChange={(e) => setMinDayWithdrawRequest(e.target.value)}
                      placeholder="Enter min day"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">Days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Withdrawal Notes */}
            <div className="bg-gray-900 rounded-xl p-6 md:p-8 border border-gray-800">
              <div className="flex items-center gap-3 mb-6">
                <Wallet className="w-5 h-5 text-gray-400" />
                <h2 className="text-xl font-semibold text-gray-100">Withdrawal Notes</h2>
              </div>

              <div className="space-y-6 text-gray-300">
                {/* Minimum Withdrawal Amount */}
                <div>
                  <h3 className="text-base font-semibold text-gray-100 mb-2">
                    Minimum Withdrawal Amount:
                  </h3>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li className="text-sm">
                      Enter the minimum amount that can be withdrawn. This value must be a numerical figure.
                    </li>
                    <li className="text-sm">
                      Example: If the minimum withdrawal amount is set to $10, users cannot withdraw any amount less than $10.
                    </li>
                  </ul>
                </div>

                {/* Maximum Withdrawal Amount */}
                <div>
                  <h3 className="text-base font-semibold text-gray-100 mb-2">
                    Maximum Withdrawal Amount:
                  </h3>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li className="text-sm">
                      Enter the maximum amount that can be withdrawn at a time. This value must be a numerical figure.
                    </li>
                    <li className="text-sm">
                      Example: If the maximum withdrawal amount is set to $1,000, users cannot withdraw more than $1,000 in a single transaction.
                    </li>
                  </ul>
                </div>

                {/* Minimum Days Between Withdrawal Requests */}
                <div>
                  <h3 className="text-base font-semibold text-gray-100 mb-2">
                    Minimum Days Between Withdrawal Requests:
                  </h3>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li className="text-sm">
                      Specify the minimum number of days required between withdrawal requests. This value should be an integer.
                    </li>
                    <li className="text-sm">
                      Example: If set to 7 days, after a seller sends a withdrawal request, they must wait at least 7 days before sending another request.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end mt-8">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-lg shadow-red-500/30 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <Save size={20} />
                Save And Update
              </>
            )}
          </button>
        </div>

        {/* Toast Notification */}
        {showToast && (
          <div className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 animate-slide-up z-50">
            <CheckCircle size={24} />
            <div>
              <p className="font-semibold">Settings Saved!</p>
              <p className="text-sm text-green-100">Your changes have been saved successfully.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
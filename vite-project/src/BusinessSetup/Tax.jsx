import React, { useState } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";

const TaxesUI = () => {
  const [taxes, setTaxes] = useState([
    { id: 1, name: "kjhgcfgx", percentage: 10, enabled: true }
  ]);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTax, setEditingTax] = useState(null);
  
  const [formData, setFormData] = useState({
    name: "",
    percentage: ""
  });

  // Handle Add Modal
  const handleOpenAddModal = () => {
    setFormData({ name: "", percentage: "" });
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setFormData({ name: "", percentage: "" });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newTax = {
      id: Date.now(),
      name: formData.name,
      percentage: parseFloat(formData.percentage),
      enabled: true
    };
    setTaxes([...taxes, newTax]);
    handleCloseAddModal();
  };

  // Handle Edit Modal
  const handleOpenEditModal = (tax) => {
    setEditingTax(tax);
    setFormData({
      name: tax.name,
      percentage: tax.percentage.toString()
    });
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingTax(null);
    setFormData({ name: "", percentage: "" });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    setTaxes(taxes.map(tax =>
      tax.id === editingTax.id
        ? { ...tax, name: formData.name, percentage: parseFloat(formData.percentage) }
        : tax
    ));
    handleCloseEditModal();
  };

  // Handle Delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this tax?")) {
      setTaxes(taxes.filter(tax => tax.id !== id));
    }
  };

  // Handle Toggle
  const handleToggle = (id) => {
    setTaxes(taxes.map(tax =>
      tax.id === id ? { ...tax, enabled: !tax.enabled } : tax
    ));
  };

  // Handle Form Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-black p-6 text-white mt-20">
      
      {/* Info Box */}
      <div className="mb-6 rounded-xl border border-blue-500/30 bg-blue-500/10 p-4">
        <div className="flex items-start gap-3">
          <span className="text-lg">🌟</span>
          <div>
            <h4 className="font-semibold text-blue-300">
              Important Information
            </h4>
            <p className="mt-1 text-sm text-blue-200/80">
              VAT and Taxes are calculated based on your order. If you have
              multiple VAT and Tax rates active, your total VAT and Tax amount
              will be clearly displayed on the checkout page.
            </p>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">All Taxes</h2>

        <button 
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium hover:bg-red-600 transition"
        >
          <Plus size={16} />
          Create New
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0f1620]">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-gray-300">
            <tr>
              <th className="px-6 py-4">SL</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Percentage</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {taxes.map((tax, index) => (
              <tr key={tax.id} className="border-t border-white/10 hover:bg-white/5 transition">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{tax.name}</td>
                <td className="px-6 py-4">{tax.percentage}%</td>

                {/* Status Toggle */}
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleToggle(tax.id)}
                    className={`relative h-6 w-11 rounded-full transition ${
                      tax.enabled ? "bg-red-500" : "bg-gray-600"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
                        tax.enabled ? "left-5" : "left-1"
                      }`}
                    />
                  </button>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-3">
                    <button 
                      onClick={() => handleOpenEditModal(tax)}
                      className="rounded-lg border border-blue-400/30 bg-blue-500/10 p-2 text-blue-400 hover:bg-blue-500/20"
                    >
                      <Pencil size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(tax.id)}
                      className="rounded-lg border border-red-400/30 bg-red-500/10 p-2 text-red-400 hover:bg-red-500/20"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Tax Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl p-6">
            {/* Close Button */}
            <button
              onClick={handleCloseAddModal}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Add New Tax</h2>

            {/* Form */}
            <form onSubmit={handleAddSubmit} className="space-y-5">
              {/* Tax Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Tax Name"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800"
                />
              </div>

              {/* Percentage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Percentage(%) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="percentage"
                  value={formData.percentage}
                  onChange={handleChange}
                  required
                  step="0.01"
                  placeholder="Percentage(%)"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseAddModal}
                  className="flex-1 px-4 py-2.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Tax Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl p-6">
            {/* Close Button */}
            <button
              onClick={handleCloseEditModal}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Update Tax</h2>

            {/* Form */}
            <form onSubmit={handleUpdateSubmit} className="space-y-5">
              {/* Tax Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800"
                />
              </div>

              {/* Percentage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Percentage(%) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="percentage"
                  value={formData.percentage}
                  onChange={handleChange}
                  required
                  step="0.01"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseEditModal}
                  className="flex-1 px-4 py-2.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaxesUI;

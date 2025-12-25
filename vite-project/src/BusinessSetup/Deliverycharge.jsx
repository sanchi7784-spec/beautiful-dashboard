import React, { useState } from "react";
import { Edit2, Trash2, Plus, X } from "lucide-react";

function Deliverycharge() {
  const [charges, setCharges] = useState([
    { id: 1, minQty: 1, maxQty: 5, charge: 200 }
  ]);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCharge, setEditingCharge] = useState(null);
  
  const [formData, setFormData] = useState({
    minQty: "",
    maxQty: "",
    charge: ""
  });

  // Handle Add Modal
  const handleOpenAddModal = () => {
    setFormData({ minQty: "", maxQty: "", charge: "" });
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setFormData({ minQty: "", maxQty: "", charge: "" });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newCharge = {
      id: Date.now(),
      minQty: parseInt(formData.minQty),
      maxQty: parseInt(formData.maxQty),
      charge: parseFloat(formData.charge)
    };
    setCharges([...charges, newCharge]);
    handleCloseAddModal();
  };

  // Handle Edit Modal
  const handleOpenEditModal = (charge) => {
    setEditingCharge(charge);
    setFormData({
      minQty: charge.minQty.toString(),
      maxQty: charge.maxQty.toString(),
      charge: charge.charge.toString()
    });
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingCharge(null);
    setFormData({ minQty: "", maxQty: "", charge: "" });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    setCharges(charges.map(charge =>
      charge.id === editingCharge.id
        ? { 
            ...charge, 
            minQty: parseInt(formData.minQty),
            maxQty: parseInt(formData.maxQty),
            charge: parseFloat(formData.charge)
          }
        : charge
    ));
    handleCloseEditModal();
  };

  // Handle Delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this delivery charge?")) {
      setCharges(charges.filter(charge => charge.id !== id));
    }
  };

  // Handle Form Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-black p-6 text-white mt-20">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Manage Delivery Charge</h2>

        <button 
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2.5 text-sm font-medium hover:bg-red-600 transition"
        >
          <Plus size={18} />
          Create New
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl bg-gray-900 shadow-lg">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-900 text-gray-200">
            <tr>
              <th className="px-6 py-4 font-medium">SL</th>
              <th className="px-6 py-4 font-medium">Min. Order QTY</th>
              <th className="px-6 py-4 font-medium">Max. Order QTY</th>
              <th className="px-6 py-4 font-medium">Charge</th>
              <th className="px-6 py-4 font-medium text-right">Action</th>
            </tr>
          </thead>

          <tbody className="text-gray-200">
            {charges.map((charge, index) => (
              <tr key={charge.id} className="border-t border-gray-200 hover:bg-gray-900 transition">
                <td className="px-6 py-4">{index + 1}.</td>
                <td className="px-6 py-4">{charge.minQty}</td>
                <td className="px-6 py-4">{charge.maxQty}</td>
                <td className="px-6 py-4">${charge.charge}</td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-3">
                    <button 
                      onClick={() => handleOpenEditModal(charge)}
                      className="rounded-lg p-2 text-blue-500 hover:bg-blue-50 transition"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(charge.id)}
                      className="rounded-lg p-2 text-red-500 hover:bg-red-50 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Delivery Charge Modal */}
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
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Add Delivery Charge</h2>

            {/* Form */}
            <form onSubmit={handleAddSubmit} className="space-y-5">
              {/* Min Order QTY */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Min. Order QTY <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="minQty"
                  value={formData.minQty}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="Enter minimum quantity"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800"
                />
              </div>

              {/* Max Order QTY */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max. Order QTY <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="maxQty"
                  value={formData.maxQty}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="Enter maximum quantity"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800"
                />
              </div>

              {/* Charge */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Charge <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="charge"
                  value={formData.charge}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  placeholder="Enter charge amount"
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

      {/* Edit Delivery Charge Modal */}
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
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Update Delivery Charge</h2>

            {/* Form */}
            <form onSubmit={handleUpdateSubmit} className="space-y-5">
              {/* Min Order QTY */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Min. Order QTY <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="minQty"
                  value={formData.minQty}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800"
                />
              </div>

              {/* Max Order QTY */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max. Order QTY <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="maxQty"
                  value={formData.maxQty}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800"
                />
              </div>

              {/* Charge */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Charge <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="charge"
                  value={formData.charge}
                  onChange={handleChange}
                  required
                  min="0"
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
}

export default Deliverycharge;
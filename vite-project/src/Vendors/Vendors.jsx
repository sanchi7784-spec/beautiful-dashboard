import { useState } from "react";
import { Plus, Eye, Edit2, Grid, List, X, Image as ImageIcon } from "lucide-react";

// Sample shops data
const initialShops = [
  {
    id: 1,
    name: "My Shop",
    logo: "",
    status: true,
    products: 5,
    orders: 2,
    owner: "John Doe",
    email: "john@myshop.com",
    phone: "+1 234 567 8900",
    address: "123 Main Street, City",
    description: "General store selling various items"
  },
  {
    id: 2,
    name: "Ready Mart",
    logo: "",
    status: true,
    products: 24,
    orders: 6,
    owner: "Jane Smith",
    email: "jane@readymart.com",
    phone: "+1 234 567 8901",
    address: "456 Market Road, City",
    description: "Quick shopping mart for daily essentials"
  },
  {
    id: 3,
    name: "Urban Harvest",
    logo: "",
    status: true,
    products: 21,
    orders: 6,
    owner: "Mike Johnson",
    email: "mike@urbanharvest.com",
    phone: "+1 234 567 8902",
    address: "789 Green Avenue, City",
    description: "Organic and fresh produce store"
  },
  {
    id: 4,
    name: "Farmhouse Market",
    logo: "",
    status: true,
    products: 40,
    orders: 16,
    owner: "Sarah Williams",
    email: "sarah@farmhouse.com",
    phone: "+1 234 567 8903",
    address: "321 Farm Lane, City",
    description: "Farm-fresh products and groceries"
  },
];

function Vendors() {
  const [shops, setShops] = useState(initialShops);
  const [viewMode, setViewMode] = useState("list"); // "list" or "grid"
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // "create", "edit", "view"
  const [selectedShop, setSelectedShop] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    owner: "",
    email: "",
    phone: "",
    address: "",
    description: "",
    status: true
  });

  // Open modal for creating new shop
  const handleCreateNew = () => {
    setModalMode("create");
    setSelectedShop(null);
    setFormData({
      name: "",
      logo: "",
      owner: "",
      email: "",
      phone: "",
      address: "",
      description: "",
      status: true
    });
    setIsModalOpen(true);
  };

  // Open modal for editing shop
  const handleEdit = (shop) => {
    setModalMode("edit");
    setSelectedShop(shop);
    setFormData({
      name: shop.name,
      logo: shop.logo,
      owner: shop.owner,
      email: shop.email,
      phone: shop.phone,
      address: shop.address,
      description: shop.description,
      status: shop.status
    });
    setIsModalOpen(true);
  };

  // Open modal for viewing shop details
  const handleView = (shop) => {
    setModalMode("view");
    setSelectedShop(shop);
    setFormData({
      name: shop.name,
      logo: shop.logo,
      owner: shop.owner,
      email: shop.email,
      phone: shop.phone,
      address: shop.address,
      description: shop.description,
      status: shop.status
    });
    setIsModalOpen(true);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (modalMode === "edit") {
      setShops(shops.map(shop =>
        shop.id === selectedShop.id
          ? { ...shop, ...formData }
          : shop
      ));
    } else if (modalMode === "create") {
      const newShop = {
        id: Date.now(),
        ...formData,
        products: 0,
        orders: 0
      };
      setShops([...shops, newShop]);
    }
    
    setIsModalOpen(false);
  };

  // Toggle shop status
  const toggleStatus = (id) => {
    setShops(shops.map(shop =>
      shop.id === id ? { ...shop, status: !shop.status } : shop
    ));
  };

  return (
    <div className="min-h-screen bg-black p-4 md:p-6 mt-20 text-slate-200">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Shops</h1>
          <p className="text-gray-400 text-sm">This is a shops list.</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex bg-gray-900 border border-white/10 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2.5 ${viewMode === "grid" ? "bg-gray-800" : ""}`}
            >
              <Grid size={20} className="text-gray-300" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2.5 border-l border-white/10 ${viewMode === "list" ? "bg-red-500/20" : ""}`}
            >
              <List size={20} className={viewMode === "list" ? "text-red-500" : "text-gray-300"} />
            </button>
          </div>

          {/* Create Button */}
          <button
            onClick={handleCreateNew}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2.5 rounded-lg transition-colors font-medium"
          >
            <Plus size={20} />
            Create New Shop
          </button>
        </div>
      </div>

      {/* Table View */}
      {viewMode === "list" && (
        <div className="bg-[#0f141c] rounded-lg border border-white/10 overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#151b24] border-b border-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">SL</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Logo</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Products</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Orders</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Action</th>
              </tr>
            </thead>
            <tbody>
              {shops.map((shop, index) => (
                <tr key={shop.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-6 py-4 text-gray-300">{index + 1}</td>
                  <td className="px-6 py-4">
                    <div className="w-12 h-12 rounded-full bg-gray-800 border-2 border-white/10 flex items-center justify-center overflow-hidden">
                      {shop.logo ? (
                        <img src={shop.logo} alt={shop.name} className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon size={24} className="text-gray-600" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-white">{shop.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleStatus(shop.id)}
                      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                        shop.status ? "bg-red-500" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                          shop.status ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center justify-center px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded-lg min-w-[3rem]">
                      {shop.products}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center justify-center px-3 py-1 bg-purple-600 text-white text-sm font-semibold rounded-lg min-w-[3rem]">
                      {shop.orders}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleView(shop)}
                        className="p-2 bg-red-100 text-red-500 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleEdit(shop)}
                        className="p-2 bg-red-100 text-red-500 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <Edit2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {shops.map((shop) => (
            <div
              key={shop.id}
              className="bg-[#0f141c] rounded-lg border border-white/10 p-4 hover:border-white/20 transition-all"
            >
              <div className="flex items-center justify-center w-full h-32 bg-gray-800/50 rounded-lg mb-4 overflow-hidden">
                {shop.logo ? (
                  <img src={shop.logo} alt={shop.name} className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon size={48} className="text-gray-600" />
                )}
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-2">{shop.name}</h3>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded">
                    {shop.products} Products
                  </span>
                  <span className="px-2 py-1 bg-purple-600 text-white text-xs font-semibold rounded">
                    {shop.orders} Orders
                  </span>
                </div>
                <button
                  onClick={() => toggleStatus(shop.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    shop.status ? "bg-red-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      shop.status ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleView(shop)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-100 text-red-500 rounded-lg hover:bg-red-200 transition-colors"
                >
                  <Eye size={16} />
                  View
                </button>
                <button
                  onClick={() => handleEdit(shop)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-100 text-red-500 rounded-lg hover:bg-red-200 transition-colors"
                >
                  <Edit2 size={16} />
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <ShopModal
          mode={modalMode}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

/* ---------- Shop Modal Component ---------- */

function ShopModal({ mode, formData, setFormData, onSubmit, onClose }) {
  const isViewMode = mode === "view";
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, logo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, logo: "" }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-3xl bg-[#0f141c] rounded-xl shadow-2xl border border-white/10">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-lg bg-gray-800 p-2 hover:bg-gray-700 transition-colors"
          >
            <X size={20} className="text-gray-300" />
          </button>

          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              {mode === "create" ? "Create New Shop" : mode === "edit" ? "Edit Shop" : "Shop Details"}
            </h2>

            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Shop Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Shop Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isViewMode}
                    placeholder="Enter shop name"
                    className="w-full px-4 py-2.5 bg-gray-900 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500 disabled:bg-gray-800"
                  />
                </div>

                {/* Owner Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Owner Name *
                  </label>
                  <input
                    type="text"
                    name="owner"
                    value={formData.owner}
                    onChange={handleChange}
                    required
                    disabled={isViewMode}
                    placeholder="Enter owner name"
                    className="w-full px-4 py-2.5 bg-gray-900 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500 disabled:bg-gray-800"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isViewMode}
                    placeholder="Enter email address"
                    className="w-full px-4 py-2.5 bg-gray-900 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500 disabled:bg-gray-800"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    disabled={isViewMode}
                    placeholder="Enter phone number"
                    className="w-full px-4 py-2.5 bg-gray-900 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500 disabled:bg-gray-800"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  disabled={isViewMode}
                  placeholder="Enter shop address"
                  className="w-full px-4 py-2.5 bg-gray-900 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500 disabled:bg-gray-800"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  disabled={isViewMode}
                  placeholder="Enter shop description"
                  className="w-full px-4 py-2.5 bg-gray-900 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500 resize-none disabled:bg-gray-800"
                />
              </div>

              {/* Logo Upload */}
              {!isViewMode && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Shop Logo
                  </label>
                  
                  {formData.logo && (
                    <div className="mb-3 relative inline-block">
                      <img 
                        src={formData.logo} 
                        alt="Logo Preview" 
                        className="w-24 h-24 object-cover rounded-full border-2 border-white/20"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}

                  <label className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 border border-white/10 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer w-fit">
                    <ImageIcon size={20} className="text-gray-300" />
                    <span className="text-sm font-medium text-gray-300">
                      {formData.logo ? "Change Logo" : "Upload Logo"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="mt-2 text-xs text-gray-500">
                    Recommended: Square image (200x200px). Max size: 5MB
                  </p>
                </div>
              )}

              {isViewMode && formData.logo && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Shop Logo
                  </label>
                  <img 
                    src={formData.logo} 
                    alt="Shop Logo" 
                    className="w-24 h-24 object-cover rounded-full border-2 border-white/20"
                  />
                </div>
              )}

              {/* Action Buttons */}
              {!isViewMode && (
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2.5 border border-white/10 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                  >
                    {mode === "create" ? "Create Shop" : "Update Shop"}
                  </button>
                </div>
              )}

              {isViewMode && (
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full px-4 py-2.5 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors font-medium"
                  >
                    Close
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vendors;
import { useState } from "react";
import { Plus, Edit2, Trash2, X, Image as ImageIcon, Search } from "lucide-react";

// Sample categories data
const initialCategories = [
  {
    id: 1,
    name: "Electronics",
    description: "Electronic devices and gadgets",
    image: "",
    productCount: 45,
    status: "Active",
    createdAt: "2025-01-15"
  },
  {
    id: 2,
    name: "Clothing",
    description: "Fashion and apparel",
    image: "",
    productCount: 128,
    status: "Active",
    createdAt: "2025-02-20"
  },
  {
    id: 3,
    name: "Food & Beverages",
    description: "Fresh food and drinks",
    image: "",
    productCount: 89,
    status: "Active",
    createdAt: "2025-03-10"
  },
  {
    id: 4,
    name: "Home & Garden",
    description: "Home decor and garden supplies",
    image: "",
    productCount: 56,
    status: "Active",
    createdAt: "2025-04-05"
  },
];

function Categories() {
  const [categories, setCategories] = useState(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    status: "Active"
  });

  // Filter categories based on search
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Open modal for creating new category
  const handleAddNew = () => {
    setEditingCategory(null);
    setFormData({
      name: "",
      description: "",
      image: "",
      status: "Active"
    });
    setIsModalOpen(true);
  };

  // Open modal for editing existing category
  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      image: category.image,
      status: category.status
    });
    setIsModalOpen(true);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingCategory) {
      // Update existing category
      setCategories(categories.map(cat =>
        cat.id === editingCategory.id
          ? { ...cat, ...formData }
          : cat
      ));
    } else {
      // Create new category
      const newCategory = {
        id: Date.now(),
        ...formData,
        productCount: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setCategories([...categories, newCategory]);
    }
    
    setIsModalOpen(false);
    setFormData({ name: "", description: "", image: "", status: "Active" });
  };

  // Handle delete category
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-black p-4 md:p-6 text-slate-200 mt-20">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Product Categories</h1>
          <p className="text-gray-400 text-sm">Manage your product categories</p>
        </div>
        
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2.5 rounded-lg transition-colors font-medium"
        >
          <Plus size={20} />
          Add New Category
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg bg-gray-900 border border-white/10 px-4 py-2.5 pr-10 text-sm outline-none focus:ring-2 focus:ring-blue-500/40"
          />
          <Search
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            className="bg-[#0f141c] rounded-xl border border-white/10 p-4 hover:border-white/20 transition-all"
          >
            {/* Category Image/Icon */}
            <div className="flex items-center justify-center w-full h-32 bg-gray-800/50 rounded-lg mb-4 overflow-hidden">
              {category.image ? (
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <ImageIcon size={48} className="text-gray-600" />
              )}
            </div>

            {/* Category Info */}
            <div className="mb-3">
              <h3 className="text-lg font-semibold mb-1">{category.name}</h3>
              <p className="text-sm text-gray-400 line-clamp-2">
                {category.description}
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between mb-4 text-sm">
              <span className="text-gray-400">Products: <span className="text-white font-medium">{category.productCount}</span></span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                category.status === "Active" 
                  ? "bg-green-500/20 text-green-400" 
                  : "bg-red-500/20 text-red-400"
              }`}>
                {category.status}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(category)}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
              >
                <Edit2 size={16} />
                Edit
              </button>
              <button
                onClick={() => handleDelete(category.id)}
                className="flex items-center justify-center bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-2 rounded-lg transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4">
            <ImageIcon size={32} className="text-gray-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No categories found</h3>
          <p className="text-gray-400 mb-4">
            {searchTerm ? "Try a different search term" : "Get started by creating your first category"}
          </p>
          {!searchTerm && (
            <button
              onClick={handleAddNew}
              className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus size={20} />
              Add New Category
            </button>
          )}
        </div>
      )}

      {/* Category Modal */}
      {isModalOpen && (
        <CategoryModal
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onClose={() => setIsModalOpen(false)}
          isEditing={!!editingCategory}
        />
      )}
    </div>
  );
}

/* ---------- Category Modal Component ---------- */

function CategoryModal({ formData, setFormData, onSubmit, onClose, isEditing }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, image: "" }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-lg bg-gray-100 p-2 hover:bg-gray-200 transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>

          {/* Modal Content */}
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {isEditing ? "Edit Category" : "Create New Category"}
            </h2>

            <form onSubmit={onSubmit} className="space-y-5">
              {/* Category Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter category name"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Enter category description"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 resize-none"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Image
                </label>
                
                {/* Image Preview */}
                {formData.image && (
                  <div className="mb-3 relative inline-block">
                    <img 
                      src={formData.image} 
                      alt="Preview" 
                      className="w-32 h-32 object-cover rounded-lg border-2 border-gray-300"
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

                {/* Upload Input */}
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
                    <ImageIcon size={20} className="text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">
                      {formData.image ? "Change Image" : "Upload Image"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Recommended: Square image (500x500px). Max size: 5MB
                </p>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                >
                  {isEditing ? "Update Category" : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
import React, { useState } from "react";

const productsData = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 2999,
    description: "Premium wireless headphones with noise cancellation",
    discount: 15,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 15999,
    description: "Fitness tracker with heart rate monitor",
    discount: 20,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop"
  },
  {
    id: 3,
    name: "Laptop Stand",
    price: 1499,
    description: "Ergonomic aluminum laptop stand",
    discount: 10,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop"
  },
  {
    id: 4,
    name: "Wireless Mouse",
    price: 799,
    description: "Ergonomic wireless mouse with silent clicks",
    discount: 5,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=200&h=200&fit=crop"
  },
  {
    id: 5,
    name: "Mechanical Keyboard",
    price: 4999,
    description: "RGB mechanical keyboard with blue switches",
    discount: 25,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200&h=200&fit=crop"
  },
];

const Products = () => {
  const [products, setProducts] = useState(productsData);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [discountFilter, setDiscountFilter] = useState("All");
  const [priceRange, setPriceRange] = useState("All");

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    discount: "",
    image: ""
  });

  const calculateFinalPrice = (price, discount) => {
    return price - (price * discount / 100);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase());

    const matchesDiscount =
      discountFilter === "All" ||
      (discountFilter === "High" && product.discount >= 20) ||
      (discountFilter === "Medium" && product.discount >= 10 && product.discount < 20) ||
      (discountFilter === "Low" && product.discount < 10);

    const matchesPrice =
      priceRange === "All" ||
      (priceRange === "Under 1000" && product.price < 1000) ||
      (priceRange === "1000-5000" && product.price >= 1000 && product.price <= 5000) ||
      (priceRange === "Above 5000" && product.price > 5000);

    return matchesSearch && matchesDiscount && matchesPrice;
  });

  const openView = (product) => {
    setSelectedProduct(product);
    setViewOpen(true);
  };

  const openEdit = (product) => {
    setSelectedProduct(product);
    setEditOpen(true);
  };

  const openAdd = () => {
    setNewProduct({
      name: "",
      price: "",
      description: "",
      discount: "",
      image: ""
    });
    setAddOpen(true);
  };

  const handleEditChange = (e) => {
    setSelectedProduct({ ...selectedProduct, [e.target.name]: e.target.value });
  };

  const handleAddChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const saveEdit = () => {
    setProducts(products.map(p => (p.id === selectedProduct.id ? selectedProduct : p)));
    setEditOpen(false);
  };

  const saveAdd = () => {
    const newId = Math.max(...products.map(p => p.id)) + 1;
    setProducts([...products, { 
      ...newProduct, 
      id: newId,
      price: parseFloat(newProduct.price),
      discount: parseFloat(newProduct.discount)
    }]);
    setAddOpen(false);
  };

  const deleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-black p-4 sm:p-6 lg:p-8 mt-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                Product Inventory
              </h1>
              <p className="text-slate-600 mt-1 text-sm">Manage your product catalog with ease</p>
            </div>
            <button
              onClick={openAdd}
              className="group relative px-6 py-3 rounded-xl bg-gradient-to-b from-black via-gray-900 to-black
                         text-white font-medium shadow-lg 
                         hover:scale-105 border border-white/15
                         transition-all duration-300 flex items-center gap-2"
            >
              <span className="text-xl">+</span>
              <span>Add Product</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 border  border-white/15 rounded-xl">
            <div className="bg-black rounded-2xl p-5 shadow-sm  ">
              <div className="flex items-center justify-between  border-white/15 border p-5 rounded-2xl">
                <div>
                  <p className="text-sm text-slate-200 font-medium">Total Products</p>
                  <p className="text-3xl font-bold text-white mt-1">{products.length}</p>
                </div>
                <div className="w-12 h-12 bg-red-200 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-black rounded-2xl p-5 shadow-sm  ">
              <div className="flex items-center justify-between border-white/15 border p-5 rounded-2xl">
                <div>
                  <p className="text-sm text-slate-200 font-medium">Active Filters</p>
                  <p className="text-3xl font-bold text-white mt-1">
                    {(search ? 1 : 0) + (discountFilter !== "All" ? 1 : 0) + (priceRange !== "All" ? 1 : 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-200 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-black rounded-2xl p-5 shadow-sm  ">
              <div className="flex items-center justify-between border-white/15 border p-5 rounded-2xl">
                <div>
                  <p className="text-sm text-slate-200 font-medium">Results Found</p>
                  <p className="text-3xl font-bold text-white mt-1">{filteredProducts.length}</p>
                </div>
                <div className="w-12 h-12 bg-red-200 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Filters Section */}
          <div className="bg-black to-black rounded-2xl p-5 shadow-sm border border-white/15 ">
            <div className="flex flex-col lg:flex-row gap-4">
              
              {/* Search */}
              <div className="relative flex-1">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-gradient-to-b from-black via-gray-900 to-black
                             text-slate-900 placeholder-slate-400 border border-white/15
                             focus:outline-none focus:ring-2 focus:ring-blue-100/50 focus:-transparent
                             transition-all text-white"
                />
              </div>

              {/* Discount Filter */}
              <div className="w-full lg:w-56">
                <select
                  value={discountFilter}
                  onChange={(e) => setDiscountFilter(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl  -slate-200 border border-white/15
                             text-slate-200 bg-gradient-to-b from-black via-gray-900 to-black
                             focus:outline-none focus:ring-2 focus:ring-blue-100/50 focus:-transparent
                             transition-all cursor-pointer"
                >
                  <option value="All " className="bg-black">All Discounts</option>
                  <option value="High " className="bg-black">High (20%+)</option>
                  <option value="Medium " className="bg-black">Medium (10-19%)</option>
                  <option value="Low " className="bg-black">Low (&lt;10%)</option>
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="w-full lg:w-56">
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl 
                             text-slate-900 bg-gradient-to-b from-black via-gray-900 to-black
                             focus:outline-none focus:ring-2 focus:ring-blue-100/20 border border-white/15 focus:-transparent
                             transition-all cursor-pointer text-white"
                >
                  <option value="All" className="bg-black">All Prices</option>
                  <option value="Under 1000" className="bg-black">Under ₹1,000</option>
                  <option value="1000-5000" className="bg-black">₹1,000 - ₹5,000</option>
                  <option value="Above 5000" className="bg-black">Above ₹5,000</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-black rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              
              {/* Table Head */}
              <thead>
                <tr className="bg-gradient-to-r from-slate-50 to-blue-50 -b -slate-200">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Discount</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Final Price</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                          <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                          </svg>
                        </div>
                        <p className="text-slate-600 font-medium">No products found</p>
                        <p className="text-slate-400 text-sm mt-1">Try adjusting your filters</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product, index) => (
                    <tr
                      key={product.id}
                      className="hover:bg-gray-900 transition-colors"
                    >
                      {/* ID */}
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-slate-200">#{product.id}</span>
                      </td>

                      {/* Product with Image */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-14 w-14 rounded-xl object-cover -2 -slate-100 shadow-sm"
                            />
                          </div>
                          <span className="text-sm font-semibold text-slate-200">
                            {product.name}
                          </span>
                        </div>
                      </td>

                      {/* Description */}
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-200 max-w-xs block truncate">
                          {product.description}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-slate-200">
                          ₹{product.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </span>
                      </td>

                      {/* Discount */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
                          ${product.discount >= 20 
                            ? "bg-emerald-100 text-emerald-700" 
                            : product.discount >= 10 
                            ? "bg-amber-100 text-amber-700" 
                            : "bg-blue-100 text-blue-700"}`}
                        >
                          {product.discount}% OFF
                        </span>
                      </td>

                      {/* Final Price */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-bold text-emerald-600">
                            ₹{calculateFinalPrice(product.price, product.discount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </span>
                          <span className="text-xs text-slate-400 line-through">
                            ₹{product.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openView(product)}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium
                                     bg-slate-100 text-slate-700 
                                     hover:bg-slate-200 transition-colors"
                          >
                            View
                          </button>
                          <button
                            onClick={() => openEdit(product)}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium
                                     bg-blue-100 text-blue-700 
                                     hover:bg-blue-200 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteProduct(product.id)}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium
                                     bg-red-100 text-red-700 
                                     hover:bg-red-200 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* VIEW MODAL */}
      {viewOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-3xl bg-gradient-to-b from-gray-900 via-black to-gray-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden">

            {/* Header */}
            <div className="bg-gray-900 border-b border-white/10 px-8 py-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">Product Details</h3>
                <button
                  onClick={() => setViewOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 
                           flex items-center justify-center text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Image */}
                <div>
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-80 object-cover rounded-2xl shadow-lg border border-white/10"
                  />
                </div>

                {/* Details */}
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Product ID</span>
                    <p className="text-lg text-white font-semibold mt-1">#{selectedProduct.id}</p>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Product Name</span>
                    <p className="text-lg text-white font-semibold mt-1">{selectedProduct.name}</p>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Description</span>
                    <p className="text-base text-gray-300 mt-1">{selectedProduct.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Original Price</span>
                      <p className="text-xl text-white font-bold mt-1">
                        ₹{selectedProduct.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </p>
                    </div>

                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                      <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">Discount</span>
                      <p className="text-xl text-emerald-400 font-bold mt-1">{selectedProduct.discount}% OFF</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-2xl p-6">
                    <span className="text-xs font-semibold text-blue-400 uppercase tracking-wide">Final Price</span>
                    <p className="text-4xl text-blue-400 font-bold mt-2">
                      ₹{calculateFinalPrice(selectedProduct.price, selectedProduct.discount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-sm text-gray-500 line-through mt-1">
                      ₹{selectedProduct.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-6 bg-gray-900 border-t border-white/10">
              <button
                onClick={() => setViewOpen(false)}
                className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium
                         hover:bg-white/10 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-3xl bg-gradient-to-b from-gray-900 via-black to-gray-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">

            {/* Header */}
            <div className="bg-gray-900 border-b border-white/10 px-8 py-6 sticky top-0 z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">Edit Product</h3>
                <button
                  onClick={() => setEditOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 
                           flex items-center justify-center text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-8 space-y-6">
              
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">
                  Product Name
                </label>
                <input
                  name="name"
                  value={selectedProduct.name}
                  onChange={handleEditChange}
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10
                             text-white placeholder-gray-500
                             focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={selectedProduct.description}
                  onChange={handleEditChange}
                  rows="3"
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10
                             text-white placeholder-gray-500
                             focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                  placeholder="Enter description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">
                    Price (₹)
                  </label>
                  <input
                    name="price"
                    type="number"
                    value={selectedProduct.price}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10
                               text-white placeholder-gray-500
                               focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">
                    Discount (%)
                  </label>
                  <input
                    name="discount"
                    type="number"
                    value={selectedProduct.discount}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10
                               text-white placeholder-gray-500
                               focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/20 rounded-2xl p-6">
                <span className="block text-sm font-semibold text-emerald-400 mb-2">
                  Final Price After Discount
                </span>
                <p className="text-4xl text-emerald-400 font-bold">
                  ₹{calculateFinalPrice(parseFloat(selectedProduct.price) || 0, parseFloat(selectedProduct.discount) || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">
                  Image URL
                </label>
                <input
                  name="image"
                  value={selectedProduct.image}
                  onChange={handleEditChange}
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10
                             text-white placeholder-gray-500
                             focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                  placeholder="Enter image URL"
                />
              </div>

              {selectedProduct.image && (
                <div>
                  <span className="block text-sm font-semibold text-gray-400 mb-2">Preview</span>
                  <img
                    src={selectedProduct.image}
                    alt="Preview"
                    className="w-40 h-40 object-cover rounded-2xl border border-white/10 shadow-lg"
                  />
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex gap-4 px-8 py-6 bg-gray-900 border-t border-white/10 sticky bottom-0">
              <button
                onClick={() => setEditOpen(false)}
                className="w-1/2 py-3 rounded-xl border border-white/10
                           text-gray-300 font-medium
                           hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={saveEdit}
                className="w-1/2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 
                           text-white font-medium shadow-lg shadow-blue-500/30
                           hover:shadow-xl hover:shadow-blue-500/40
                           transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD MODAL */}
      {addOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">

            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 sticky top-0 z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">Add New Product</h3>
                <button
                  onClick={() => setAddOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 
                           flex items-center justify-center text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-8 space-y-6">
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Product Name *
                </label>
                <input
                  name="name"
                  value={newProduct.name}
                  onChange={handleAddChange}
                  className="w-full px-4 py-3 rounded-xl  -slate-200 
                             text-slate-900 placeholder-slate-400
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:-transparent"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={newProduct.description}
                  onChange={handleAddChange}
                  rows="3"
                  className="w-full px-4 py-3 rounded-xl  -slate-200 
                             text-slate-900 placeholder-slate-400
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:-transparent"
                  placeholder="Enter product description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Price (₹) *
                  </label>
                  <input
                    name="price"
                    type="number"
                    value={newProduct.price}
                    onChange={handleAddChange}
                    className="w-full px-4 py-3 rounded-xl  -slate-200 
                               text-slate-900 placeholder-slate-400
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:-transparent"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Discount (%) *
                  </label>
                  <input
                    name="discount"
                    type="number"
                    value={newProduct.discount}
                    onChange={handleAddChange}
                    className="w-full px-4 py-3 rounded-xl  -slate-200 
                               text-slate-900 placeholder-slate-400
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:-transparent"
                    placeholder="0"
                  />
                </div>
              </div>

              {newProduct.price && newProduct.discount && (
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 -2 -emerald-100">
                  <span className="block text-sm font-semibold text-emerald-700 mb-2">
                    Final Price After Discount
                  </span>
                  <p className="text-4xl text-emerald-700 font-bold">
                    ₹{calculateFinalPrice(parseFloat(newProduct.price) || 0, parseFloat(newProduct.discount) || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Image URL *
                </label>
                <input
                  name="image"
                  value={newProduct.image}
                  onChange={handleAddChange}
                  className="w-full px-4 py-3 rounded-xl  -slate-200 
                             text-slate-900 placeholder-slate-400
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:-transparent"
                  placeholder="Enter image URL"
                />
              </div>

              {newProduct.image && (
                <div>
                  <span className="block text-sm font-semibold text-slate-700 mb-2">Preview</span>
                  <img
                    src={newProduct.image}
                    alt="Preview"
                    className="w-40 h-40 object-cover rounded-2xl -4 -slate-100 shadow-lg"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex gap-4 px-8 py-6 bg-slate-50 -t -slate-200 sticky bottom-0">
              <button
                onClick={() => setAddOpen(false)}
                className="w-1/2 py-3 rounded-xl -2 -slate-300 
                           text-slate-700 font-medium
                           hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={saveAdd}
                disabled={!newProduct.name || !newProduct.price || !newProduct.discount || !newProduct.image}
                className="w-1/2 py-3 rounded-xl bg-gradient-to-b from-black via-gray-900 to-black
                           text-white font-medium shadow-lg shadow-blue-500/30
                           hover:shadow-xl hover:shadow-blue-500/40
                           transition-all
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
import { Eye, Download, Filter, RefreshCcw, Search, X, Barcode, Receipt, ChevronDown } from "lucide-react";
import { useState } from "react";

const orders = [
  {
    id: "#RC000033",
    date: "25 Dec 2025",
    customer: "MD SHARIFUL HAQUE",
    phone: "01717562760",
    email: "sharif.haq009@gmail.com",
    shop: "Farmhouse Market",
    amount: "$12",
    delivery: "Pending",
    payment: "Cash Payment",
    paymentStatus: "Pending",
    deliveryDate: "-",
    products: [
      {
        sl: 1,
        name: "Pheasant",
        image: "🍖",
        shop: "Farmhouse Market",
        quantity: 1,
        unit: "1 KG",
        price: "$12",
        total: "$12"
      }
    ],
    subTotal: "$12",
    couponDiscount: "$0",
    deliveryCharge: "$0",
    vatTax: "$0",
    grandTotal: "$12",
    shippingAddress: {
      name: "MD SHARIFUL HAQUE",
      phone: "01717562760",
      addressType: "home",
      area: "",
      roadNo: "",
      flatNo: "",
      houseNo: "",
      postCode: "1230",
      addressLine: "HOUSE 39 ROAD 12 SECTOR 14",
      addressLine2: ""
    }
  },
  {
    id: "#RC-000032",
    date: "25 Dec 2025",
    customer: "Demo Customer",
    phone: "+1 234 567 8900",
    email: "demo@example.com",
    shop: "Farmhouse Market",
    amount: "$9",
    delivery: "Pending",
    payment: "Razorpay",
    paymentStatus: "Pending",
    deliveryDate: "-",
    products: [
      {
        sl: 1,
        name: "Product Sample",
        image: "📦",
        shop: "Farmhouse Market",
        quantity: 1,
        unit: "1 PC",
        price: "$9",
        total: "$9"
      }
    ],
    subTotal: "$9",
    couponDiscount: "$0",
    deliveryCharge: "$0",
    vatTax: "$0",
    grandTotal: "$9",
    shippingAddress: {
      name: "Demo Customer",
      phone: "+1 234 567 8900",
      addressType: "home",
      area: "",
      roadNo: "",
      flatNo: "",
      houseNo: "",
      postCode: "",
      addressLine: "Demo Address",
      addressLine2: ""
    }
  },
  {
    id: "#RC-000031",
    date: "25 Dec 2025",
    customer: "Demo Customer",
    phone: "+1 234 567 8901",
    email: "demo2@example.com",
    shop: "Ready Mart",
    amount: "$10",
    delivery: "Pending",
    payment: "Razorpay",
    paymentStatus: "Pending",
    deliveryDate: "-",
    products: [
      {
        sl: 1,
        name: "Product Sample",
        image: "📦",
        shop: "Ready Mart",
        quantity: 1,
        unit: "1 PC",
        price: "$10",
        total: "$10"
      }
    ],
    subTotal: "$10",
    couponDiscount: "$0",
    deliveryCharge: "$0",
    vatTax: "$0",
    grandTotal: "$10",
    shippingAddress: {
      name: "Demo Customer",
      phone: "+1 234 567 8901",
      addressType: "office",
      area: "",
      roadNo: "",
      flatNo: "",
      houseNo: "",
      postCode: "",
      addressLine: "Demo Address 2",
      addressLine2: ""
    }
  },
  {
    id: "#RC-000027",
    date: "01 Nov 2025",
    customer: "Demo Customer",
    phone: "+1 234 567 8902",
    email: "demo3@example.com",
    shop: "My Shop",
    amount: "$12",
    delivery: "Confirm",
    payment: "Cash Payment",
    paymentStatus: "Paid",
    deliveryDate: "05 Nov 2025",
    products: [
      {
        sl: 1,
        name: "Product Sample",
        image: "📦",
        shop: "My Shop",
        quantity: 1,
        unit: "1 PC",
        price: "$12",
        total: "$12"
      }
    ],
    subTotal: "$12",
    couponDiscount: "$0",
    deliveryCharge: "$0",
    vatTax: "$0",
    grandTotal: "$12",
    shippingAddress: {
      name: "Demo Customer",
      phone: "+1 234 567 8902",
      addressType: "home",
      area: "",
      roadNo: "",
      flatNo: "",
      houseNo: "",
      postCode: "",
      addressLine: "Demo Address 3",
      addressLine2: ""
    }
  },
];

export default function OrdersList() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="min-h-screen bg-black p-4 md:p-6 text-slate-200 mt-20">

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-3">
          <Select label="Delivery Status" />
          <Select label="Payment Status" />
          <Select label="Shop" />

          <button className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-400">
            <Filter size={16} /> Filter
          </button>

          <button className="rounded-lg bg-gray-800 p-2 hover:bg-gray-700">
            <RefreshCcw size={18} />
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full lg:w-80">
          <input
            placeholder="Search here"
            className="w-full rounded-lg bg-gray-900 border border-white/10 px-4 py-2.5 pr-10 text-sm outline-none focus:ring-2 focus:ring-blue-500/40"
          />
          <Search
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

      {/* Title */}
      <h2 className="mb-4 text-xl font-semibold">Orders List</h2>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#0f141c]">
        <table className="min-w-full text-sm">
          <thead className="bg-[#151b24] text-gray-400">
            <tr>
              <th className="px-4 py-3 text-left">Order ID</th>
              <th className="px-4 py-3 text-left">Order Date</th>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Shop</th>
              <th className="px-4 py-3 text-left">Total Amount</th>
              <th className="px-4 py-3 text-left">Delivery Status</th>
              <th className="px-4 py-3 text-left">Payment Method</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, i) => (
              <tr
                key={i}
                className="border-t border-white/5 hover:bg-white/5"
              >
                <td className="px-4 py-3">{order.id}</td>
                <td className="px-4 py-3">{order.date}</td>
                <td className="px-4 py-3">{order.customer}</td>
                <td className="px-4 py-3 text-gray-300">{order.phone}</td>
                <td className="px-4 py-3 text-gray-300">{order.email}</td>
                <td className="px-4 py-3">{order.shop}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-1">
                    {order.amount}
                    <span className="inline-block w-fit rounded-full bg-yellow-500 px-2 py-0.5 text-xs font-medium text-black">
                      Pending
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">{order.delivery}</td>
                <td className="px-4 py-3">{order.payment}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => openOrderDetails(order)}
                      className="rounded-lg bg-red-500/20 p-2 text-red-400 hover:bg-red-500/30"
                    >
                      <Eye size={16} />
                    </button>
                    <button className="rounded-lg bg-gray-800 p-2 hover:bg-gray-700">
                      <Download size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <OrderDetailsModal order={selectedOrder} onClose={closeModal} />
      )}
    </div>
  );
}

/* ---------- Small Select Component ---------- */

function Select({ label }) {
  return (
    <select className="rounded-lg bg-gray-900 border border-white/10 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40">
      <option>{label}</option>
      <option>Pending</option>
      <option>Confirm</option>
      <option>Cancelled</option>
    </select>
  );
}

/* ---------- Order Details Modal Component ---------- */

function OrderDetailsModal({ order, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-7xl bg-white rounded-xl shadow-2xl my-8">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-lg bg-gray-100 p-2 hover:bg-gray-200 transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 max-h-[90vh] overflow-y-auto">
          {/* Left Section - Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header with Action Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
              <div className="flex flex-wrap gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors text-sm font-medium">
                  <Barcode size={18} />
                  Attach Product Barcode
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                  <Receipt size={18} />
                  Payment Slip
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium">
                  <Download size={18} />
                  Download Invoice
                </button>
              </div>
            </div>

            {/* Order Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <p className="text-sm text-gray-500 mb-1">Order Id:</p>
                <p className="font-semibold text-gray-800">{order.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Order Status:</p>
                <span className="inline-block px-3 py-1 bg-yellow-400 text-black text-xs font-semibold rounded-full">
                  Pending
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Order Status:</p>
                <span className="inline-block px-3 py-1 bg-yellow-400 text-black text-xs font-semibold rounded-full">
                  Pending
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Payment Status:</p>
                <p className="font-semibold text-gray-800">{order.paymentStatus}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Order Date:</p>
                <p className="font-semibold text-gray-800">{order.date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Payment Method:</p>
                <p className="font-semibold text-gray-800">{order.payment}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Delivery Date:</p>
                <p className="font-semibold text-gray-800">{order.deliveryDate}</p>
              </div>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">SL</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Product</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Shop</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Quantity</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Unit</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Price</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((product) => (
                    <tr key={product.sl} className="border-b border-gray-100">
                      <td className="px-4 py-3 text-gray-700">{product.sl}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{product.image}</span>
                          <span className="text-gray-700">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{product.shop}</td>
                      <td className="px-4 py-3 text-gray-700">{product.quantity}</td>
                      <td className="px-4 py-3 text-gray-700">{product.unit}</td>
                      <td className="px-4 py-3 text-gray-700">{product.price}</td>
                      <td className="px-4 py-3 text-gray-700 font-semibold">{product.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Order Summary */}
            <div className="flex justify-end">
              <div className="w-full max-w-sm space-y-2 bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between text-gray-600">
                  <span>Sub Total</span>
                  <span className="font-semibold text-gray-800">{order.subTotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Coupon Discount</span>
                  <span className="font-semibold text-gray-800">{order.couponDiscount}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Charge</span>
                  <span className="font-semibold text-gray-800">{order.deliveryCharge}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>VAT & Tax</span>
                  <span className="font-semibold text-gray-800">{order.vatTax}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-800 pt-2 border-t border-gray-300">
                  <span>Grand Total</span>
                  <span>{order.grandTotal}</span>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Customer Info</h3>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <span className="text-gray-600 min-w-[80px]">Name:</span>
                  <span className="font-semibold text-gray-800">{order.customer}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-600 min-w-[80px]">Phone:</span>
                  <span className="font-semibold text-gray-800">{order.phone}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-600 min-w-[80px]">Email:</span>
                  <span className="font-semibold text-gray-800">{order.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Order & Shipping Info */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Order & Shipping Info</h3>

              {/* Change Order Status */}
              <div className="mb-4">
                <label className="text-sm text-gray-600 mb-2 block">Change Order Status</label>
                <div className="relative">
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={18} />
                </div>
              </div>

              {/* Payment Status Toggle */}
              <div className="mb-6 flex items-center justify-between">
                <span className="text-sm text-gray-600">Payment Status</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-800">{order.paymentStatus}</span>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 transition-colors">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
                  </button>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h4 className="text-base font-bold text-gray-800 mb-3">Shipping Address</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-semibold text-gray-800 text-right">{order.shippingAddress.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-semibold text-gray-800">{order.shippingAddress.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Address Type:</span>
                    <span className="font-semibold text-gray-800">{order.shippingAddress.addressType}</span>
                  </div>
                  {order.shippingAddress.area && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Area:</span>
                      <span className="font-semibold text-gray-800">{order.shippingAddress.area}</span>
                    </div>
                  )}
                  <div className="flex justify-between gap-4">
                    <div className="flex gap-2">
                      <span className="text-gray-600">Road No:</span>
                      <span className="font-semibold text-gray-800">{order.shippingAddress.roadNo || ","}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600">Flat No:</span>
                      <span className="font-semibold text-gray-800">{order.shippingAddress.flatNo || ","}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600">House No:</span>
                      <span className="font-semibold text-gray-800">{order.shippingAddress.houseNo || ""}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Post Code:</span>
                    <span className="font-semibold text-gray-800">{order.shippingAddress.postCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Address Line:</span>
                    <span className="font-semibold text-gray-800 text-right">{order.shippingAddress.addressLine}</span>
                  </div>
                  {order.shippingAddress.addressLine2 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Address Line 2:</span>
                      <span className="font-semibold text-gray-800">{order.shippingAddress.addressLine2}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}   

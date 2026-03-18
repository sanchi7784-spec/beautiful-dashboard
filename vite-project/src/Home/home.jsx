import {PieChart, Pie, Cell, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, ShoppingCart, DollarSign, Package, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function Home() {
  // Sample data for charts
  const revenueData = [
    { month: 'Jan', revenue: 4000, orders: 240 },
    { month: 'Feb', revenue: 3000, orders: 198 },
    { month: 'Mar', revenue: 5000, orders: 300 },
    { month: 'Apr', revenue: 4500, orders: 278 },
    { month: 'May', revenue: 6000, orders: 389 },
    { month: 'Jun', revenue: 5500, orders: 349 },
    { month: 'Jul', revenue: 7000, orders: 430 },
  ];

  const categoryData = [
    { name: 'Electronics', value: 400, color: '#8b5cf6' },
    { name: 'Clothing', value: 300, color: '#3b82f6' },
    { name: 'Food', value: 200, color: '#10b981' },
    { name: 'Books', value: 150, color: '#f59e0b' },
    { name: 'Others', value: 100, color: '#ef4444' },
  ];

  const statsCards = [
    { 
      title: 'Total Revenue', 
      value: '$45,231', 
      change: '+12.5%', 
      isPositive: true, 
      icon: DollarSign,
      color: 'from-purple-500/20 to-pink-500/20'
    },
    { 
      title: 'Total Orders', 
      value: '2,184', 
      change: '+8.2%', 
      isPositive: true, 
      icon: ShoppingCart,
      color: 'from-blue-500/20 to-cyan-500/20'
    },
    { 
      title: 'Total Users', 
      value: '1,426', 
      change: '+23.5%', 
      isPositive: true, 
      icon: Users,
      color: 'from-green-500/20 to-emerald-500/20'
    },
    { 
      title: 'Products', 
      value: '892', 
      change: '-4.3%', 
      isPositive: false, 
      icon: Package,
      color: 'from-orange-500/20 to-yellow-500/20'
    },
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <TrendingUp className="w-10 h-10 text-purple-400" />
            Dashboard Analytics
          </h1>
          <p className="text-gray-300 text-lg">Monitor your business performance in real-time</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <div 
              key={index}
              className={`backdrop-blur-xl bg-gradient-to-br ${stat.color} rounded-2xl p-6 shadow-2xl hover:scale-105 transition-transform duration-300`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-semibold ${stat.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <div>
                <p className="text-gray-300 text-sm font-medium mb-1">{stat.title}</p>
                <p className="text-white text-3xl font-bold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Revenue Chart */}
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              Revenue & Orders Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="#ffffff" style={{ fontSize: '12px' }} />
                <YAxis stroke="#ffffff" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    borderRadius: '8px',
                    backdropFilter: 'blur(10px)'
                  }} 
                />
                <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                <Area type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorOrders)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Package className="w-5 h-5 text-purple-400" />
              Sales by Category
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    borderRadius: '8px',
                    backdropFilter: 'blur(10px)'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart - Full Width */}
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 shadow-2xl">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-purple-400" />
            Monthly Performance Comparison
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="#ffffff" style={{ fontSize: '12px' }} />
              <YAxis stroke="#ffffff" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  borderRadius: '8px',
                  backdropFilter: 'blur(10px)'
                }} 
              />
              <Legend />
              <Bar dataKey="revenue" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              <Bar dataKey="orders" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Additional Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="backdrop-blur-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl p-6 shadow-2xl">
            <h4 className="text-gray-300 text-sm font-medium mb-2">Average Order Value</h4>
            <p className="text-white text-3xl font-bold mb-2">$124.50</p>
            <p className="text-green-400 text-sm font-semibold flex items-center gap-1">
              <ArrowUpRight className="w-4 h-4" /> +15.3% from last month
            </p>
          </div>
          <div className="backdrop-blur-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-2xl p-6 shadow-2xl">
            <h4 className="text-gray-300 text-sm font-medium mb-2">Conversion Rate</h4>
            <p className="text-white text-3xl font-bold mb-2">3.24%</p>
            <p className="text-green-400 text-sm font-semibold flex items-center gap-1">
              <ArrowUpRight className="w-4 h-4" /> +0.8% from last month
            </p>
          </div>
          <div className="backdrop-blur-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl p-6 shadow-2xl">
            <h4 className="text-gray-300 text-sm font-medium mb-2">Customer Satisfaction</h4>
            <p className="text-white text-3xl font-bold mb-2">4.8/5.0</p>
            <p className="text-green-400 text-sm font-semibold flex items-center gap-1">
              <ArrowUpRight className="w-4 h-4" /> +0.3 from last month
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


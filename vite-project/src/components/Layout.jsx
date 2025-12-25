'use client'
import { useState } from 'react'
import Header from './header'
import Sidebar from './sidebar'

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex h-[calc(100vh-1rem)]">
        <aside
          className={`
            fixed top-16 left-0 z-40 w-74 h-[calc(100vh-4rem)] bg-red-900 border-r border-gray-200
            overflow-y-auto
            transform transition-transform duration-300
            lg:translate-x-0
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </aside>
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          />
        )}
        <main className="flex-1 lg:ml-78 p-4 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

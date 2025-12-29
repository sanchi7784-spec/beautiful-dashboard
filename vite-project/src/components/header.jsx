'use client'
import { useState, useEffect } from 'react'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'

import {
  Bars3Icon,
  BellIcon,
  ChevronDownIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'

export default function Header({ onMenuClick }) {
  const [logoUrl, setLogoUrl] = useState('https://readygrocery.razinsoft.com/assets/logo.png')

  useEffect(() => {
    // Load logo from localStorage
    const savedLogo = localStorage.getItem('dashboardLogo')
    if (savedLogo) {
      setLogoUrl(savedLogo)
    }

    // Listen for logo updates
    const handleLogoUpdate = (event) => {
      setLogoUrl(event.detail)
    }

    window.addEventListener('logoUpdated', handleLogoUpdate)

    return () => {
      window.removeEventListener('logoUpdated', handleLogoUpdate)
    }
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-18 bg-red-900/20 backdrop-blur-md border-b border-gray-200/50">
      <div className="flex h-full items-center justify-between px-4 lg:px-6">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden text-gray-300 hover:text-white"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>

          <img
            src={logoUrl}
            className="h-15 w-30"
            alt="logo"
          />
        </div>

        {/* CENTER */}
        {/* <div className="hidden md:block w-full max-w-md">
          <input
            placeholder="Search..."
            className="w-full rounded-lg bg-red-800 border border-gray-200 px-4 py-2 text-sm text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div> */}

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          <button className="relative text-gray-300 hover:text-white">
            <BellIcon className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
          </button>

          <Menu as="div" className="relative">
            <MenuButton className="flex items-center gap-2 text-gray-300 hover:text-white">
              <UserCircleIcon className="h-7 w-7" />
              <ChevronDownIcon className="h-4 w-4" />
            </MenuButton>

            <MenuItems className="absolute right-0 mt-2 w-48 rounded-xl bg-gray-800 shadow-lg ring-1 ring-black/20">
              {['Profile', 'Settings'].map((item) => (
                <MenuItem key={item}>
                  {({ active }) => (
                    <a
                      href="#"
                      className={`block px-4 py-2 text-sm ${
                        active ? 'bg-gray-700 text-white' : 'text-gray-300'
                      }`}
                    >
                      {item}
                    </a>
                  )}
                </MenuItem>
              ))}
              <div className="my-1 h-px bg-gray-700" />
              <MenuItem>
                {({ active }) => (
                  <a
                    href="#"
                    className={`block px-4 py-2 text-sm text-red-400 ${
                      active ? 'bg-gray-700' : ''
                    }`}
                  >
                    Logout
                  </a>
                )}
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </header>
  )
}

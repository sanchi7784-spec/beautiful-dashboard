import {
  HomeIcon,
  UsersIcon,
  Cog6ToothIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
export default function Sidebar({ onClose }) {
  return (
    <nav className="h-full px-4 py-6 space-y-2">
      {/* Close button for mobile */}
      <button
        onClick={onClose}
        className="lg:hidden flex items-center gap-2 text-gray-400 hover:text-white mb-4 -mt-2"
      >
        <XMarkIcon className="h-5 w-5" />
        <span className="text-sm">Close</span>
      </button>
   <a
  href="/"
  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800"
>
  <HomeIcon className="h-5 w-5" />
  Dashboard
</a>

<a
  href="/users"
  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800"
>
  <UsersIcon className="h-5 w-5" />
  Users
</a>

<a
  href="/settings"
  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800"
>
  <Cog6ToothIcon className="h-5 w-5" />
  Settings
</a>

    </nav>
  )
}

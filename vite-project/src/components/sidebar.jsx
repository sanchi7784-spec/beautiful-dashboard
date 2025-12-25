import {
  HomeIcon,
  UsersIcon,
  Cog6ToothIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { PackageSearch } from 'lucide-react';
import { LayoutDashboard } from 'lucide-react';
import { Users } from 'lucide-react';
import { CalendarArrowUp } from 'lucide-react';
import { ChartBarStacked } from 'lucide-react';
import { HousePlus } from 'lucide-react';
import { UserRoundPen } from 'lucide-react';
import { Handshake } from 'lucide-react';
import { CirclePercent } from 'lucide-react';
import { TruckElectric } from 'lucide-react';
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
  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-red-800"
>
 <LayoutDashboard className='h-5 w-5' />
  Dashboard
</a>

<a
  href="/users"
  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-red-800"
>
  <Users  className='h-5 w-5'  />
  Users
</a>

<a
  href="/products"
  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-red-800"
>
   <PackageSearch  className='h-5 w-5' />
  Products
</a>
<a
  href="/orders"
  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-red-800"
>
   <CalendarArrowUp  className='h-5 w-5' />
 Orders
</a>
<a
  href="/categories"
  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-red-800"
>
   <ChartBarStacked  className='h-5 w-5' />
  Categories
</a>
<a
  href="/vendors"
  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-red-800"
>
   <HousePlus  className='h-5 w-5' />
  Vendors
</a>
<a
  href="/profile"
  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-red-800">
   <UserRoundPen   className='h-5 w-5' />
  Profile
</a>
<a
  href="/business"
  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-red-800">
   <Handshake    className='h-5 w-5' />
  Business Setup
</a>
<a
  href="/taxes"
  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-red-800">
   <CirclePercent    className='h-5 w-5' />
Vat & Tax
</a>
<a
  href="/deliverycharge"
  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-red-800">
   <TruckElectric    className='h-5 w-5' />
  Delivery Charge
</a>
{/* <a
  href="/profile"
  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-red-800">
   <UserRoundPen   className='h-5 w-5' />
  Currency
</a> */}
    </nav>
  )
}

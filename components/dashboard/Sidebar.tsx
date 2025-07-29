'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  HomeIcon,
  MagnifyingGlassIcon,
  ChartBarIcon,
  BellIcon,
  UserIcon,
  CreditCardIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Search Contracts', href: '/dashboard/search', icon: MagnifyingGlassIcon },
  { name: 'My Tracking', href: '/dashboard/tracking', icon: DocumentTextIcon },
  { name: 'Analytics', href: '/dashboard/analytics', icon: ChartBarIcon },
  { name: 'Notifications', href: '/dashboard/notifications', icon: BellIcon },
  { name: 'Profile', href: '/dashboard/profile', icon: UserIcon },
  { name: 'Subscription', href: '/dashboard/subscription', icon: CreditCardIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div className={`bg-white shadow-lg ${collapsed ? 'w-16' : 'w-64'} transition-all duration-300 h-screen fixed left-0 top-0 z-50`}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-secondary-200">
          {!collapsed && (
            <div className="flex items-center">
              <DocumentTextIcon className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-secondary-900">BidFlow</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-md hover:bg-secondary-100"
          >
            <svg className="h-5 w-5 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  isActive
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {!collapsed && item.name}
              </Link>
            )
          })}
        </nav>

        {/* Sign Out */}
        <div className="p-4 border-t border-secondary-200">
          <button
            onClick={handleSignOut}
            className="group flex items-center w-full px-2 py-2 text-sm font-medium text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900 rounded-md transition-colors duration-200"
          >
            <ArrowLeftOnRectangleIcon className="mr-3 h-5 w-5 flex-shrink-0" />
            {!collapsed && 'Sign Out'}
          </button>
        </div>
      </div>
    </div>
  )
} 
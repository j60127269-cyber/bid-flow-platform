'use client'

import { useEffect, useState } from 'react'
import { 
  MagnifyingGlassIcon, 
  DocumentTextIcon, 
  BellIcon, 
  ChartBarIcon,
  ClockIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'
import { supabase } from '@/lib/supabase'

interface DashboardStats {
  totalContracts: number
  trackedContracts: number
  unreadNotifications: number
  upcomingDeadlines: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalContracts: 0,
    trackedContracts: 0,
    unreadNotifications: 0,
    upcomingDeadlines: 0
  })
  const [recentContracts, setRecentContracts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch stats
        const [contractsResult, trackingResult, notificationsResult] = await Promise.all([
          supabase.from('contracts').select('*', { count: 'exact' }),
          supabase.from('user_tracking').select('*', { count: 'exact' }),
          supabase.from('notifications').select('*', { count: 'exact' }).eq('read', false)
        ])

        // Fetch recent contracts
        const { data: recent } = await supabase
          .from('contracts')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5)

        setStats({
          totalContracts: contractsResult.count || 0,
          trackedContracts: trackingResult.count || 0,
          unreadNotifications: notificationsResult.count || 0,
          upcomingDeadlines: 0 // TODO: Calculate based on tracked contracts
        })

        setRecentContracts(recent || [])
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const statCards = [
    {
      name: 'Total Contracts',
      value: stats.totalContracts.toLocaleString(),
      icon: DocumentTextIcon,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'positive'
    },
    {
      name: 'Tracked Contracts',
      value: stats.trackedContracts.toLocaleString(),
      icon: MagnifyingGlassIcon,
      color: 'bg-green-500',
      change: '+5%',
      changeType: 'positive'
    },
    {
      name: 'Unread Notifications',
      value: stats.unreadNotifications.toLocaleString(),
      icon: BellIcon,
      color: 'bg-yellow-500',
      change: '-2%',
      changeType: 'negative'
    },
    {
      name: 'Upcoming Deadlines',
      value: stats.upcomingDeadlines.toLocaleString(),
      icon: ClockIcon,
      color: 'bg-red-500',
      change: '+3',
      changeType: 'positive'
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-secondary-900">Dashboard</h1>
        <p className="text-secondary-600 mt-2">Welcome back! Here's what's happening with your contracts.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-secondary-600">{stat.name}</p>
                <p className="text-2xl font-bold text-secondary-900">{stat.value}</p>
              </div>
            </div>
            <div className="mt-4">
              <span className={`text-sm ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
              <span className="text-sm text-secondary-600 ml-1">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Contracts */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-secondary-900">Recent Contracts</h2>
          <a href="/dashboard/search" className="text-primary-600 hover:text-primary-500 text-sm font-medium">
            View all →
          </a>
        </div>
        
        {recentContracts.length === 0 ? (
          <div className="text-center py-8">
            <DocumentTextIcon className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
            <p className="text-secondary-600">No contracts found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentContracts.map((contract) => (
              <div key={contract.id} className="flex items-center justify-between p-4 border border-secondary-200 rounded-lg hover:bg-secondary-50 transition-colors">
                <div className="flex-1">
                  <h3 className="font-medium text-secondary-900">{contract.title}</h3>
                  <p className="text-sm text-secondary-600">{contract.client_name}</p>
                  <div className="flex items-center mt-2 space-x-4 text-sm text-secondary-500">
                    <span className="flex items-center">
                      <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                      {contract.estimated_value?.toLocaleString()} {contract.currency}
                    </span>
                    <span className="flex items-center">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      {new Date(contract.deadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`badge ${
                    contract.status === 'open' ? 'badge-success' :
                    contract.status === 'closed' ? 'badge-warning' :
                    'badge-danger'
                  }`}>
                    {contract.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center hover:shadow-lg transition-shadow cursor-pointer">
          <MagnifyingGlassIcon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-secondary-900 mb-2">Search Contracts</h3>
          <p className="text-secondary-600 mb-4">Find new opportunities that match your criteria</p>
          <a href="/dashboard/search" className="btn-primary inline-block">
            Start Searching
          </a>
        </div>

        <div className="card text-center hover:shadow-lg transition-shadow cursor-pointer">
          <ChartBarIcon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-secondary-900 mb-2">View Analytics</h3>
          <p className="text-secondary-600 mb-4">Analyze your bidding performance and trends</p>
          <a href="/dashboard/analytics" className="btn-primary inline-block">
            View Analytics
          </a>
        </div>

        <div className="card text-center hover:shadow-lg transition-shadow cursor-pointer">
          <BellIcon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-secondary-900 mb-2">Notifications</h3>
          <p className="text-secondary-600 mb-4">Check your latest alerts and updates</p>
          <a href="/dashboard/notifications" className="btn-primary inline-block">
            View Notifications
          </a>
        </div>
      </div>
    </div>
  )
} 
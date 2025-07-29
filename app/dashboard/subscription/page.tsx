'use client'

import { useState, useEffect } from 'react'
import { 
  CreditCardIcon, 
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'
import { supabase } from '@/lib/supabase'

interface Subscription {
  id: string
  status: string
  amount: number
  currency: string
  start_date: string
  end_date: string
  payment_method: string
  created_at: string
}

export default function SubscriptionPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    fetchSubscription()
  }, [])

  const fetchSubscription = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching subscription:', error)
      }

      setSubscription(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubscribe = async () => {
    setProcessing(true)
    try {
      // This would integrate with Flutterwave
      // For now, we'll simulate a successful payment
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { error } = await supabase
        .from('subscriptions')
        .insert([{
          user_id: user.id,
          amount: 30000,
          currency: 'UGX',
          status: 'successful',
          payment_method: 'mobile_money',
          subscription_period_months: 1,
          start_date: new Date().toISOString(),
          end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        }])

      if (error) throw error

      // Update user subscription status
      await supabase
        .from('users')
        .update({
          subscription_status: 'active',
          subscription_end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        })
        .eq('id', user.id)

      await fetchSubscription()
      alert('Subscription activated successfully!')
    } catch (error) {
      console.error('Error processing subscription:', error)
      alert('Failed to process subscription')
    } finally {
      setProcessing(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'successful':
        return 'text-green-600'
      case 'pending':
        return 'text-yellow-600'
      case 'cancelled':
      case 'failed':
        return 'text-red-600'
      default:
        return 'text-secondary-600'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'successful':
        return <CheckCircleIcon className="h-5 w-5 text-green-600" />
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-yellow-600" />
      case 'cancelled':
      case 'failed':
        return <XCircleIcon className="h-5 w-5 text-red-600" />
      default:
        return <ClockIcon className="h-5 w-5 text-secondary-600" />
    }
  }

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
        <h1 className="text-3xl font-bold text-secondary-900">Subscription</h1>
        <p className="text-secondary-600 mt-2">Manage your BidFlow subscription and billing.</p>
      </div>

      {/* Current Plan */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-secondary-900">Current Plan</h2>
          {subscription && (
            <div className="flex items-center gap-2">
              {getStatusIcon(subscription.status)}
              <span className={`font-medium ${getStatusColor(subscription.status)}`}>
                {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
              </span>
            </div>
          )}
        </div>

        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-secondary-900">Premium Plan</h3>
              <p className="text-secondary-600 mt-1">Full access to all BidFlow features</p>
              <div className="flex items-center mt-4">
                <CurrencyDollarIcon className="h-6 w-6 text-primary-600 mr-2" />
                <span className="text-3xl font-bold text-primary-600">30,000</span>
                <span className="text-secondary-600 ml-1">UGX/month</span>
              </div>
            </div>
            <div className="text-right">
              {subscription ? (
                <div className="space-y-2">
                  <p className="text-sm text-secondary-600">
                    Next billing: {new Date(subscription.end_date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-secondary-600">
                    Payment method: {subscription.payment_method.replace('_', ' ')}
                  </p>
                </div>
              ) : (
                <button
                  onClick={handleSubscribe}
                  disabled={processing}
                  className="btn-primary disabled:opacity-50"
                >
                  {processing ? 'Processing...' : 'Subscribe Now'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="card">
        <h2 className="text-xl font-semibold text-secondary-900 mb-6">What's Included</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start">
              <CheckCircleIcon className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
              <div>
                <h3 className="font-medium text-secondary-900">Unlimited Contract Search</h3>
                <p className="text-sm text-secondary-600">Search and filter through all available contracts</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircleIcon className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
              <div>
                <h3 className="font-medium text-secondary-900">Advanced Analytics</h3>
                <p className="text-sm text-secondary-600">Get detailed insights and win probability scores</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircleIcon className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
              <div>
                <h3 className="font-medium text-secondary-900">Smart Notifications</h3>
                <p className="text-sm text-secondary-600">Real-time alerts for new contracts and deadlines</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start">
              <CheckCircleIcon className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
              <div>
                <h3 className="font-medium text-secondary-900">Contract Tracking</h3>
                <p className="text-sm text-secondary-600">Track unlimited contracts with status updates</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircleIcon className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
              <div>
                <h3 className="font-medium text-secondary-900">Historical Data</h3>
                <p className="text-sm text-secondary-600">Access to historical bid data and trends</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircleIcon className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
              <div>
                <h3 className="font-medium text-secondary-900">Priority Support</h3>
                <p className="text-sm text-secondary-600">Get help when you need it most</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="card">
        <h2 className="text-xl font-semibold text-secondary-900 mb-6">Payment Methods</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-secondary-200 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <CreditCardIcon className="h-6 w-6 text-primary-600 mr-2" />
              <h3 className="font-medium text-secondary-900">Mobile Money</h3>
            </div>
            <p className="text-sm text-secondary-600 mb-3">
              Pay using mobile money (MTN, Airtel, etc.)
            </p>
            <div className="flex items-center text-sm text-secondary-500">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Default</span>
            </div>
          </div>
          <div className="border border-secondary-200 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <CreditCardIcon className="h-6 w-6 text-primary-600 mr-2" />
              <h3 className="font-medium text-secondary-900">Credit/Debit Card</h3>
            </div>
            <p className="text-sm text-secondary-600 mb-3">
              Pay using Visa, Mastercard, or other cards
            </p>
            <div className="flex items-center text-sm text-secondary-500">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Billing History */}
      {subscription && (
        <div className="card">
          <h2 className="text-xl font-semibold text-secondary-900 mb-6">Billing History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-secondary-200">
              <thead className="bg-secondary-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-secondary-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                    {new Date(subscription.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                    {subscription.amount.toLocaleString()} {subscription.currency}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                    {subscription.payment_method.replace('_', ' ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`badge ${
                      subscription.status === 'successful' ? 'badge-success' :
                      subscription.status === 'pending' ? 'badge-warning' :
                      'badge-danger'
                    }`}>
                      {subscription.status}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
} 
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  MagnifyingGlassIcon, 
  ChartBarIcon, 
  BellIcon, 
  ShieldCheckIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

export default function HomePage() {
  const [email, setEmail] = useState('')

  const features = [
    {
      icon: MagnifyingGlassIcon,
      title: 'Smart Contract Discovery',
      description: 'Find relevant contracts using advanced search filters and AI-powered recommendations.'
    },
    {
      icon: ChartBarIcon,
      title: 'Bid Analytics',
      description: 'Get historical bid data, competition analysis, and win probability scores.'
    },
    {
      icon: BellIcon,
      title: 'Smart Notifications',
      description: 'Never miss important deadlines with personalized alerts and recommendations.'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with real-time data updates and backup.'
    },
    {
      icon: CurrencyDollarIcon,
      title: 'ROI Tracking',
      description: 'Track your bidding performance and calculate return on investment.'
    },
    {
      icon: UserGroupIcon,
      title: 'Team Collaboration',
      description: 'Work together with your team to manage bids and share insights.'
    }
  ]

  const stats = [
    { label: 'Active Contracts', value: '2,500+' },
    { label: 'Successful Bids', value: '15,000+' },
    { label: 'Happy Users', value: '5,000+' },
    { label: 'Avg. Win Rate', value: '68%' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <DocumentTextIcon className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-secondary-900">BidFlow</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/login" className="text-secondary-600 hover:text-secondary-900">
                Sign In
              </Link>
              <Link href="/auth/register" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-900 mb-6">
            Find, Track, and{' '}
            <span className="text-primary-600">Win Contracts</span>
          </h1>
          <p className="text-xl text-secondary-600 mb-8 max-w-3xl mx-auto">
            BidFlow helps businesses and individuals discover relevant contracts, 
            analyze competition, and make data-driven bidding decisions with 
            intelligent analytics and smart notifications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <div className="flex items-center space-x-2 text-secondary-600">
              <ClockIcon className="h-5 w-5" />
              <span>30,000 UGX/month</span>
            </div>
            <div className="flex items-center space-x-2 text-secondary-600">
              <ShieldCheckIcon className="h-5 w-5" />
              <span>No free trial - Premium only</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register" className="btn-primary text-lg px-8 py-3">
              Start Your Free Trial
            </Link>
            <Link href="#features" className="btn-secondary text-lg px-8 py-3">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-secondary-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Everything You Need to Win Contracts
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools and insights 
              you need to make informed bidding decisions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card hover:shadow-lg transition-shadow duration-300">
                <feature.icon className="h-12 w-12 text-primary-600 mb-4" />
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-secondary-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Bidding Strategy?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful businesses using BidFlow to win more contracts 
            and grow their revenue.
          </p>
          <Link href="/auth/register" className="bg-white text-primary-600 font-semibold py-3 px-8 rounded-lg hover:bg-primary-50 transition-colors duration-200">
            Get Started Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <DocumentTextIcon className="h-8 w-8 text-primary-400" />
                <span className="ml-2 text-xl font-bold">BidFlow</span>
              </div>
              <p className="text-secondary-300">
                The intelligent contract management platform for modern businesses.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-secondary-300">
                <li><Link href="#" className="hover:text-white">Features</Link></li>
                <li><Link href="#" className="hover:text-white">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white">API</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-secondary-300">
                <li><Link href="#" className="hover:text-white">About</Link></li>
                <li><Link href="#" className="hover:text-white">Contact</Link></li>
                <li><Link href="#" className="hover:text-white">Support</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-secondary-300">
                <li><Link href="#" className="hover:text-white">Privacy</Link></li>
                <li><Link href="#" className="hover:text-white">Terms</Link></li>
                <li><Link href="#" className="hover:text-white">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-secondary-700 mt-8 pt-8 text-center text-secondary-300">
            <p>&copy; 2024 BidFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 
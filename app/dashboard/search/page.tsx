'use client'

import { useState, useEffect } from 'react'
import { 
  MagnifyingGlassIcon, 
  FunnelIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline'
import { supabase } from '@/lib/supabase'

interface Contract {
  id: string
  title: string
  description: string
  category: string
  subcategory: string
  location: string
  estimated_value: number
  currency: string
  deadline: string
  submission_deadline: string
  contract_type: string
  status: string
  client_name: string
  client_type: string
  created_at: string
}

export default function SearchPage() {
  const [contracts, setContracts] = useState<Contract[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    minValue: '',
    maxValue: '',
    contractType: '',
    clientType: '',
    status: ''
  })
  const [showFilters, setShowFilters] = useState(false)

  const categories = [
    'Construction', 'IT & Technology', 'Healthcare', 'Education', 
    'Transportation', 'Energy', 'Agriculture', 'Manufacturing'
  ]

  const locations = [
    'Kampala', 'Entebbe', 'Jinja', 'Mbarara', 'Gulu', 'Mbale', 'Arua', 'Soroti'
  ]

  const contractTypes = ['tender', 'rfp', 'rfq', 'auction']
  const clientTypes = ['government', 'private', 'ngo']
  const statuses = ['open', 'closed', 'awarded', 'cancelled']

  const searchContracts = async () => {
    setLoading(true)
    try {
      let query = supabase
        .from('contracts')
        .select('*')
        .order('created_at', { ascending: false })

      // Apply search term
      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,client_name.ilike.%${searchTerm}%`)
      }

      // Apply filters
      if (filters.category) {
        query = query.eq('category', filters.category)
      }
      if (filters.location) {
        query = query.eq('location', filters.location)
      }
      if (filters.minValue) {
        query = query.gte('estimated_value', parseFloat(filters.minValue))
      }
      if (filters.maxValue) {
        query = query.lte('estimated_value', parseFloat(filters.maxValue))
      }
      if (filters.contractType) {
        query = query.eq('contract_type', filters.contractType)
      }
      if (filters.clientType) {
        query = query.eq('client_type', filters.clientType)
      }
      if (filters.status) {
        query = query.eq('status', filters.status)
      }

      const { data, error } = await query

      if (error) throw error
      setContracts(data || [])
    } catch (error) {
      console.error('Error searching contracts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleTrackContract = async (contractId: string) => {
    try {
      const { error } = await supabase
        .from('user_tracking')
        .insert([{ contract_id: contractId, status: 'tracking' }])

      if (error) throw error
      alert('Contract added to tracking!')
    } catch (error) {
      console.error('Error tracking contract:', error)
      alert('Failed to track contract')
    }
  }

  useEffect(() => {
    searchContracts()
  }, [])

  const clearFilters = () => {
    setFilters({
      category: '',
      location: '',
      minValue: '',
      maxValue: '',
      contractType: '',
      clientType: '',
      status: ''
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-secondary-900">Search Contracts</h1>
        <p className="text-secondary-600 mt-2">Find contracts that match your criteria and interests.</p>
      </div>

      {/* Search Bar */}
      <div className="card">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
            <input
              type="text"
              placeholder="Search contracts by title, description, or client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary flex items-center gap-2"
          >
            <FunnelIcon className="h-5 w-5" />
            Filters
          </button>
          <button onClick={searchContracts} className="btn-primary">
            Search
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Category</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="input-field"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Location</label>
              <select
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="input-field"
              >
                <option value="">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Min Value (UGX)</label>
              <input
                type="number"
                value={filters.minValue}
                onChange={(e) => setFilters({ ...filters, minValue: e.target.value })}
                className="input-field"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Max Value (UGX)</label>
              <input
                type="number"
                value={filters.maxValue}
                onChange={(e) => setFilters({ ...filters, maxValue: e.target.value })}
                className="input-field"
                placeholder="1000000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Contract Type</label>
              <select
                value={filters.contractType}
                onChange={(e) => setFilters({ ...filters, contractType: e.target.value })}
                className="input-field"
              >
                <option value="">All Types</option>
                {contractTypes.map((type) => (
                  <option key={type} value={type}>{type.toUpperCase()}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Client Type</label>
              <select
                value={filters.clientType}
                onChange={(e) => setFilters({ ...filters, clientType: e.target.value })}
                className="input-field"
              >
                <option value="">All Clients</option>
                {clientTypes.map((type) => (
                  <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-2 items-end">
              <button onClick={clearFilters} className="btn-secondary">
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : contracts.length === 0 ? (
          <div className="card text-center py-12">
            <MagnifyingGlassIcon className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-secondary-900 mb-2">No contracts found</h3>
            <p className="text-secondary-600">Try adjusting your search criteria or filters.</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <p className="text-secondary-600">{contracts.length} contracts found</p>
            </div>
            
            <div className="space-y-4">
              {contracts.map((contract) => (
                <div key={contract.id} className="card hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                        {contract.title}
                      </h3>
                      <p className="text-secondary-600 mb-4 line-clamp-2">
                        {contract.description}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center text-secondary-600">
                          <BuildingOfficeIcon className="h-4 w-4 mr-2" />
                          {contract.client_name}
                        </div>
                        <div className="flex items-center text-secondary-600">
                          <MapPinIcon className="h-4 w-4 mr-2" />
                          {contract.location}
                        </div>
                        <div className="flex items-center text-secondary-600">
                          <CurrencyDollarIcon className="h-4 w-4 mr-2" />
                          {contract.estimated_value?.toLocaleString()} {contract.currency}
                        </div>
                        <div className="flex items-center text-secondary-600">
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          {new Date(contract.deadline).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-4">
                        <span className={`badge ${
                          contract.status === 'open' ? 'badge-success' :
                          contract.status === 'closed' ? 'badge-warning' :
                          'badge-danger'
                        }`}>
                          {contract.status}
                        </span>
                        <span className="badge badge-info">
                          {contract.contract_type.toUpperCase()}
                        </span>
                        <span className="badge badge-info">
                          {contract.client_type}
                        </span>
                      </div>
                    </div>

                    <div className="ml-4 flex flex-col gap-2">
                      <button
                        onClick={() => handleTrackContract(contract.id)}
                        className="btn-primary text-sm"
                      >
                        Track Contract
                      </button>
                      <button className="btn-secondary text-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
} 
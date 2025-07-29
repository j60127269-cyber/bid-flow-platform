'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { supabase } from '@/lib/supabase'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

interface AuthFormProps {
  mode: 'login' | 'register'
  onSuccess?: () => void
}

interface FormData {
  email: string
  password: string
  fullName?: string
  companyName?: string
  phone?: string
  userType?: 'individual' | 'business'
}

export default function AuthForm({ mode, onSuccess }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    
    try {
      if (mode === 'register') {
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
        })

        if (authError) throw authError

        if (authData.user) {
          // Create user profile
          const { error: profileError } = await supabase
            .from('users')
            .insert([
              {
                id: authData.user.id,
                email: data.email,
                full_name: data.fullName!,
                company_name: data.companyName,
                phone: data.phone,
                user_type: data.userType || 'individual',
              }
            ])

          if (profileError) throw profileError

          toast.success('Account created successfully! Please check your email to verify your account.')
          reset()
          onSuccess?.()
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        })

        if (error) throw error

        toast.success('Logged in successfully!')
        onSuccess?.()
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {mode === 'register' && (
          <>
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-secondary-700 mb-1">
                Full Name *
              </label>
              <input
                id="fullName"
                type="text"
                {...register('fullName', { required: 'Full name is required' })}
                className="input-field"
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="userType" className="block text-sm font-medium text-secondary-700 mb-1">
                Account Type *
              </label>
              <select
                id="userType"
                {...register('userType', { required: 'Account type is required' })}
                className="input-field"
              >
                <option value="">Select account type</option>
                <option value="individual">Individual</option>
                <option value="business">Business</option>
              </select>
              {errors.userType && (
                <p className="mt-1 text-sm text-red-600">{errors.userType.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-secondary-700 mb-1">
                Company Name
              </label>
              <input
                id="companyName"
                type="text"
                {...register('companyName')}
                className="input-field"
                placeholder="Enter company name (optional)"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-secondary-700 mb-1">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                {...register('phone')}
                className="input-field"
                placeholder="Enter phone number (optional)"
              />
            </div>
          </>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-1">
            Email Address *
          </label>
          <input
            id="email"
            type="email"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            className="input-field"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-secondary-700 mb-1">
            Password *
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...register('password', { 
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
              className="input-field pr-10"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-secondary-400" />
              ) : (
                <EyeIcon className="h-5 w-5 text-secondary-400" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
            </span>
          ) : (
            mode === 'login' ? 'Sign In' : 'Create Account'
          )}
        </button>
      </form>
    </div>
  )
} 
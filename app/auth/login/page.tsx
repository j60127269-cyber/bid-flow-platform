'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AuthForm from '@/components/auth/AuthForm'
import { DocumentTextIcon } from '@heroicons/react/24/outline'

export default function LoginPage() {
  const router = useRouter()

  const handleSuccess = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <DocumentTextIcon className="h-12 w-12 text-primary-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-secondary-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-secondary-600">
            Access your BidFlow dashboard and start winning contracts
          </p>
        </div>

        <AuthForm mode="login" onSuccess={handleSuccess} />

        <div className="text-center">
          <p className="text-sm text-secondary-600">
            Don't have an account?{' '}
            <Link href="/auth/register" className="font-medium text-primary-600 hover:text-primary-500">
              Sign up here
            </Link>
          </p>
        </div>

        <div className="text-center">
          <Link href="/" className="text-sm text-secondary-500 hover:text-secondary-400">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
} 
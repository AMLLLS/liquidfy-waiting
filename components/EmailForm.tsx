'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, ArrowRight, Loader2 } from 'lucide-react'

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

type EmailFormData = z.infer<typeof emailSchema>

interface EmailFormProps {
  onSuccess: () => void
}

export default function EmailForm({ onSuccess }: EmailFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  })

  const onSubmit = async (data: EmailFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Something went wrong')
      }

      const result = await response.json()
      
      // Force error display if email wasn't sent
      if (result.debug?.emailStatus !== 'sent') {
        console.error('❌ EMAIL NOT SENT - Status:', result.debug?.emailStatus)
        console.error('❌ DEBUG INFO:', result.debug)
        alert(`❌ Email Error: ${result.debug?.emailStatus}\nCheck console for details`)
      } else {
        console.log('✅ EMAIL SENT SUCCESSFULLY:', result.debug?.emailId)
        alert('✅ Email sent successfully! Check your inbox.')
      }

      reset()
      onSuccess()
    } catch (err) {
      console.error('❌ Email submission error:', err)
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto px-4" id="join-waitlist" data-section="email-form">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-effect rounded-2xl p-6 md:p-8"
      >
        <div className="text-center mb-6">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block text-3xl md:text-4xl mb-4"
          >
            📧
          </motion.div>
          <h3 className="text-xl md:text-2xl font-semibold gradient-text mb-2">
            Join the Waitlist
          </h3>
          <p className="text-gray-400 text-sm md:text-base">
            Be the first to know when we launch and get a chance to win a free subscription! If you don't win, you'll automatically get a free trial account.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              {...register('email')}
              type="email"
              placeholder="Enter your email address"
              className="w-full pl-12 pr-4 py-3 md:py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-sm md:text-base"
              disabled={isLoading}
            />
          </div>

          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm"
            >
              {errors.email.message}
            </motion.p>
          )}

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm text-center"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-liquify-gradient-alt text-white py-3 md:py-4 px-6 rounded-xl font-semibold text-base md:text-lg flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Joining...
              </>
            ) : (
              <>
                Join Waitlist
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs md:text-sm text-gray-500">
            🎁 Early subscribers get exclusive access and special bonuses
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-6 text-center text-xs md:text-sm text-gray-500"
      >
        We respect your privacy. Unsubscribe at any time.
      </motion.div>
    </div>
  )
} 
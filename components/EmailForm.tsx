'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, ArrowRight, Loader2, Gift, Zap, Crown } from 'lucide-react'
import { useMetaPixel } from '../hooks/useMetaPixel'
import CountdownTimer from './CountdownTimer'

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
  const [hasTrackedFormStart, setHasTrackedFormStart] = useState(false)
  const [showBenefits, setShowBenefits] = useState(false)
  const [subscriberCount, setSubscriberCount] = useState(847)
  const { trackLead, trackCompleteRegistration, trackEmailFormStart, trackEmailFormError } = useMetaPixel()

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        setSubscriberCount(prev => prev + 1)
      }
    }, 25000)
    return () => clearInterval(interval)
  }, [])

  // Launch countdown (7 days from now)
  const launchDate = new Date()
  launchDate.setDate(launchDate.getDate() + 7)

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
    
    // 📊 Meta Pixel: Lead event
    console.log('🎯 TRIGGERING LEAD EVENT:', data.email)
    trackLead(data.email)

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
      
      // COMPREHENSIVE EMAIL DEBUGGING
      console.log('📧 FULL EMAIL RESULT:', result)
      
      if (result.debug?.emailStatus !== 'sent') {
        console.error('❌ EMAIL FAILED!')
        console.error('- Status:', result.debug?.emailStatus)
        console.error('- Error:', result.debug?.emailError)
        console.error('- Resend Available:', result.debug?.hasResend)
        console.error('- API Key:', result.debug?.hasApiKey)
        console.error('- Email ID:', result.debug?.emailId)
        
        // Show detailed alert
        alert(`❌ EMAIL FAILED!\n\nStatus: ${result.debug?.emailStatus}\nError: ${result.debug?.emailError}\n\nCheck console for full details.`)
      } else {
        console.log('✅ EMAIL SENT SUCCESSFULLY!')
        console.log('- Email ID:', result.debug?.emailId)
        console.log('- Total Subscribers:', result.totalSubscribers)
        
        // Verify email was actually sent
        if (result.debug?.emailId) {
          setTimeout(async () => {
            try {
              const verifyResponse = await fetch('/api/verify-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ emailId: result.debug.emailId })
              })
              const verifyData = await verifyResponse.json()
              console.log('🔍 EMAIL VERIFICATION:', verifyData)
            } catch (e) {
              console.log('⚠️ Could not verify email:', e)
            }
          }, 3000)
        }
        
        // 📊 Meta Pixel: Complete Registration event
        console.log('🎯 TRIGGERING COMPLETE REGISTRATION EVENT:', data.email)
        trackCompleteRegistration(data.email)
      }

      reset()
      onSuccess()
    } catch (err) {
      console.error('❌ Email submission error:', err)
      setError(err instanceof Error ? err.message : 'Something went wrong')
      
      // 📊 Meta Pixel: Form error event
      console.log('🎯 TRIGGERING FORM ERROR EVENT:', err)
      trackEmailFormError(err instanceof Error ? err.message : 'unknown_error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-effect rounded-2xl p-6 md:p-8"
      >
        {/* Urgency header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-6"
        >
          <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-xl p-3 mb-4">
            <div className="flex items-center justify-center gap-2 text-orange-200 text-sm font-medium">
              <span className="animate-pulse">⏰</span>
              <span>Early Bird Launch Ends In:</span>
            </div>
            <CountdownTimer 
              targetDate={launchDate}
              className="mt-2 scale-75"
            />
          </div>
        </motion.div>

        <div className="text-center mb-6">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block text-3xl md:text-4xl mb-4"
          >
            🚀
          </motion.div>
          <h3 className="text-xl md:text-2xl font-semibold gradient-text mb-2">
            Join the Waitlist
          </h3>
          <p className="text-gray-400 text-sm md:text-base mb-4">
            Secure your spot among the first <span className="text-primary-400 font-semibold">1,000 entrepreneurs</span> to transform their stores
          </p>
          
          {/* Social proof */}
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mb-4">
            <div className="flex -space-x-1">
              <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border border-white/20 flex items-center justify-center">
                <span className="text-white text-xs font-bold" style={{ fontSize: '8px' }}>TK</span>
              </div>
              <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full border border-white/20 flex items-center justify-center">
                <span className="text-white text-xs font-bold" style={{ fontSize: '8px' }}>LM</span>
              </div>
              <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border border-white/20 flex items-center justify-center">
                <span className="text-white text-xs font-bold" style={{ fontSize: '8px' }}>RC</span>
              </div>
            </div>
            <span><span className="text-white font-medium">{subscriberCount}</span> already joined</span>
          </div>
        </div>

        {/* Micro-engagement: Show benefits on hover/focus */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: showBenefits ? 1 : 0, 
            height: showBenefits ? 'auto' : 0 
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden mb-4"
        >
          <div className="space-y-3 p-4 bg-gradient-to-r from-primary-500/10 to-purple-500/10 border border-primary-500/20 rounded-xl">
            <div className="flex items-center gap-3 text-sm">
              <Gift className="h-4 w-4 text-green-400" />
              <span className="text-green-300">FREE lifetime subscription draw entry</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Zap className="h-4 w-4 text-blue-400" />
              <span className="text-blue-300">Early access to all premium modules</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Crown className="h-4 w-4 text-purple-400" />
              <span className="text-purple-300">50% launch discount guaranteed</span>
            </div>
          </div>
        </motion.div>

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
              onFocus={() => {
                setShowBenefits(true)
                if (!hasTrackedFormStart) {
                  console.log('🎯 TRIGGERING EMAIL FORM START EVENT - FIRST TIME')
                  trackEmailFormStart()
                  setHasTrackedFormStart(true)
                } else {
                  console.log('🔇 EmailFormStart already tracked, skipping...')
                }
              }}
              onBlur={() => setShowBenefits(false)}
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
            className="w-full bg-liquidfy-gradient-alt text-white py-3 md:py-4 px-6 rounded-xl font-semibold text-base md:text-lg flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
          >
            {/* Animated background for urgency */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            
            <span className="relative z-10 flex items-center gap-2">
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Securing Your Spot...
                </>
              ) : (
                <>
                  Secure My Spot Now
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </span>
          </motion.button>
        </form>
        
        {/* Single privacy notice */}
        <div className="text-center text-xs text-gray-500 mt-4">
          <p>🔒 We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </motion.div>
    </div>
  )
} 
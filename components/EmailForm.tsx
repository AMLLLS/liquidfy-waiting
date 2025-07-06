'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, ArrowRight, Loader2, Gift, Zap, Crown } from 'lucide-react'
import { useMetaPixel } from '../hooks/useMetaPixel'
import CountdownTimer from './CountdownTimer'
import Image from 'next/image'

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

type EmailFormData = z.infer<typeof emailSchema>

interface EmailFormProps {
  onSuccess: () => void
  subscriberCount?: number
}

export default function EmailForm({ onSuccess, subscriberCount = 227 }: EmailFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasTrackedFormStart, setHasTrackedFormStart] = useState(false)
  const { trackLead, trackCompleteRegistration, trackEmailFormStart, trackEmailFormError, trackProspect } = useMetaPixel()

  // Launch countdown - FIXED DATE (realistic countdown)
  const launchDate = new Date('2025-07-10T10:00:00Z')

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
    
    // 📊 Meta Conversions API: Prospect event
    console.log('🎯 TRIGGERING PROSPECT EVENT:', data.email)
    trackProspect(data.email)

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
      
      if (result.debug?.emailStatus !== 'sent') {
        console.error('❌ EMAIL FAILED!')
        alert(`❌ EMAIL FAILED!\n\nStatus: ${result.debug?.emailStatus}\nError: ${result.debug?.emailError}`)
      } else {
        console.log('✅ EMAIL SENT SUCCESSFULLY!')
        
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
      trackEmailFormError(err instanceof Error ? err.message : 'unknown_error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Urgent Countdown Timer */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-red-900/40 to-orange-900/40 border border-red-700/50 rounded-xl p-3 md:p-4 mb-4"
      >
        <div className="text-center">
          <div className="text-red-300 text-xs md:text-sm font-medium mb-2">
            🔥 Early Bird Launch Ends In:
          </div>
          <CountdownTimer 
            targetDate={launchDate}
            className="scale-75 md:scale-90"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-900/95 rounded-xl p-4 md:p-6 lg:p-8 shadow-lg border border-gray-700"
      >
        <div className="text-center mb-4 md:mb-6">
          {/* Clean title */}
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-3">
            <span className="text-2xl md:text-3xl md:block">🚀</span>
            <h3 className="font-bold gradient-text" style={{ fontSize: '2rem' }}>
              Get Early Access
            </h3>
          </div>
          
          {/* Exclusive discount subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-base text-gray-300 mb-4"
          >
            Register now & get your <span className="text-green-400 font-semibold">exclusive discount</span><br className="hidden md:block" />
            <span className="hidden md:inline"> </span> at launch. We are not a Shopify App.
          </motion.p>
          
          {/* Value Statistics - MOVED UP */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-3 gap-2 md:gap-3 mb-4 text-center"
          >
            <div className="bg-blue-900/40 border border-blue-700/50 rounded-lg p-2 md:p-3">
              <div className="text-lg md:text-xl font-bold text-blue-400">130+</div>
              <div className="text-sm text-gray-300">Sections</div>
            </div>
            <div className="bg-purple-900/40 border border-purple-700/50 rounded-lg p-2 md:p-3">
              <div className="text-lg md:text-xl font-bold text-purple-400">100+</div>
              <div className="text-sm text-gray-300">Modules</div>
            </div>
            <div className="bg-green-900/40 border border-green-700/50 rounded-lg p-2 md:p-3">
              <div className="text-lg md:text-xl font-bold text-green-400">$2K+</div>
              <div className="text-sm text-gray-300">Net Worth</div>
            </div>
          </motion.div>
          
          {/* Single powerful value prop */}
          <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-700/50 rounded-lg p-3 md:p-4 mb-4">
            <p className="text-lg md:text-xl font-bold text-white mb-1">
              Save up to $100 on Launch Day
            </p>
            <p className="text-base text-gray-300">
              <span className="line-through text-gray-500">Regular: $199</span> → 
              <span className="text-green-400 font-bold"> Early Access: $99</span>
            </p>
          </div>
          
          {/* Social proof - Clean */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-300 mb-4">
            <div className="flex -space-x-1">
              <div className="w-5 h-5 md:w-6 md:h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border border-gray-800 flex items-center justify-center">
                <span className="text-white text-[8px] md:text-[10px] font-medium">KL</span>
              </div>
              <div className="w-5 h-5 md:w-6 md:h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-full border border-gray-800 flex items-center justify-center">
                <span className="text-white text-[8px] md:text-[10px] font-medium">GD</span>
              </div>
              <div className="w-5 h-5 md:w-6 md:h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border border-gray-800 flex items-center justify-center">
                <span className="text-white text-[8px] md:text-[10px] font-medium">MT</span>
              </div>
            </div>
            <span className="text-sm md:text-base">
              <span className="text-gray-100 font-medium">{subscriberCount}</span> store owners already joined
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 md:space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
              <Mail className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
            </div>
            <input
              {...register('email')}
              type="email"
              placeholder="Enter your email"
              className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-3 md:py-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-base md:text-lg"
              disabled={isLoading}
              onFocus={() => {
                if (!hasTrackedFormStart) {
                  trackEmailFormStart()
                  setHasTrackedFormStart(true)
                }
              }}
            />
          </div>

          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-base"
            >
              {errors.email.message}
            </motion.p>
          )}

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-base text-center"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-liquidfy-gradient-alt text-white py-3 md:py-4 px-4 md:px-6 rounded-xl font-bold text-lg md:text-xl flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            
            <span className="relative z-10 flex items-center gap-2">
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 md:h-5 md:w-5 animate-spin" />
                  Going to grow your store...
                </>
              ) : (
                <>
                  🎯 Secure My Early Access
                  <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                </>
              )}
            </span>
          </motion.button>
        </form>
        
        {/* Mini Module Preview Slider - MOVED AFTER BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-4"
        >
          <div className="relative overflow-hidden rounded-lg bg-gray-800 border border-gray-700 p-2">
            <motion.div
              className="flex gap-2"
              style={{
                width: '1120px', // 16 items total (8 duplicated)
                animation: "slideInfinite 20s linear infinite"
              }}
            >
              {/* First set of modules */}
              {[
                { name: 'Social Video', img: '/modules/customer-portal.jpg' },
                { name: 'Flash Sales', img: '/modules/daily-deals.jpg' },
                { name: 'Bundle Builder', img: '/modules/ultra-menu.jpg' },
                { name: 'Reviews', img: '/modules/social-share.jpg' },
                { name: 'Icons & Details', img: '/modules/gift-cards.jpg' },
                { name: 'Cart Timer', img: '/modules/stock-alert.jpg' },
                { name: 'Payment', img: '/modules/wishlist-pro.jpg' },
                { name: 'Trust', img: '/modules/bundle-builder.jpg' },
              ].map((module, index) => (
                <div key={`first-${index}`} className="flex-shrink-0 w-16 h-12 rounded border border-gray-600 overflow-hidden bg-gray-900 relative group shadow-sm">
                  <Image
                    src={module.img}
                    alt={module.name}
                    width={64}
                    height={48}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-1">
                    <div className="text-white text-[8px] font-medium leading-none truncate drop-shadow-sm">
                      {module.name}
                    </div>
                  </div>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {[
                { name: 'Social Video', img: '/modules/customer-portal.jpg' },
                { name: 'Flash Sales', img: '/modules/daily-deals.jpg' },
                { name: 'Bundle Builder', img: '/modules/ultra-menu.jpg' },
                { name: 'Reviews', img: '/modules/social-share.jpg' },
                { name: 'Icons & Details', img: '/modules/gift-cards.jpg' },
                { name: 'Cart Timer', img: '/modules/stock-alert.jpg' },
                { name: 'Payment', img: '/modules/wishlist-pro.jpg' },
                { name: 'Trust', img: '/modules/bundle-builder.jpg' },
              ].map((module, index) => (
                <div key={`second-${index}`} className="flex-shrink-0 w-16 h-12 rounded border border-gray-600 overflow-hidden bg-gray-900 relative group shadow-sm">
                  <Image
                    src={module.img}
                    alt={module.name}
                    width={64}
                    height={48}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-1">
                    <div className="text-white text-[8px] font-medium leading-none truncate drop-shadow-sm">
                      {module.name}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
        
        {/* Trust indicators - Minimal */}
        <div className="text-center text-sm text-gray-400 mt-3 md:mt-4">
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-2 md:mb-3">
            <span className="flex items-center gap-1">
              <span className="text-green-400">✓</span>
              No spam, no BS. Only good stuff & news.
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 
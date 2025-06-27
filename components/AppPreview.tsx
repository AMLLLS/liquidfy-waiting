'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'


// Secure Email Form Component
interface EmailFormProps {
  onSuccess: () => void
}

function SecureEmailForm({ onSuccess }: EmailFormProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [honeypot, setHoneypot] = useState('') // Bot trap

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Security checks
    if (honeypot) return // Bot detected
    if (!email.trim()) {
      setError('Please enter your email address')
      return
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    setIsLoading(true)
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email.trim()
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        setError('Something went wrong. Please try again.')
        return
      }

      // Success - call the success callback
      setEmail('')
      onSuccess()
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot field - hidden from users but visible to bots */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
        tabIndex={-1}
        autoComplete="off"
      />
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-400">
            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
          </svg>
        </div>
        <input 
          type="email" 
          placeholder="Enter your email address" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full pl-12 pr-4 py-3 md:py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-sm md:text-base" 
          disabled={isLoading}
          required
        />
      </div>
      
      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}
      
      <button 
        type="submit" 
        disabled={isLoading || !email.trim()}
        className="w-full bg-liquidfy-gradient-alt text-white py-3 md:py-4 px-6 rounded-xl font-semibold text-base md:text-lg flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Joining...
          </>
        ) : (
          <>
            Join Waitlist
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </>
        )}
      </button>
    </form>
  )
}

interface AppPreviewProps {
  onEmailSuccess: () => void
}

export default function AppPreview({ onEmailSuccess }: AppPreviewProps) {
  return (
    <div>
      {/* Innovative Liquidfy description section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-center mb-16"
        id="meet-liquidfy"
      >
        <h3 className="text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 lg:mb-8">
          Why Your Store Needs <span className="gradient-text">Liquidfy</span>
        </h3>
        <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
          Stop losing customers to boring, generic stores. Get the tools you need to <span className="text-primary-400 font-semibold">stand out</span> and <span className="text-purple-400 font-semibold">dominate your market</span>.
        </p>
        
        <div className="max-w-5xl mx-auto">
          {/* Key stats in a beautiful grid - 2 columns on mobile for first two items */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-effect rounded-xl p-4 md:p-6 border border-primary-500/20"
            >
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text mb-2">120+</div>
              <div className="text-xs md:text-sm lg:text-base text-gray-400">Ready-to-Use Shopify Sections</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-effect rounded-xl p-4 md:p-6 border border-purple-500/20"
            >
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text mb-2">100+</div>
              <div className="text-xs md:text-sm lg:text-base text-gray-400">Premium Conversion Modules</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass-effect rounded-xl p-4 md:p-6 border border-blue-500/20 col-span-2 md:col-span-1"
            >
              {/* Platform icons instead of "3" */}
              <div className="flex justify-center items-center gap-2 mb-2">
                <div className="relative w-8 h-8 md:w-10 md:h-10">
                  <Image
                    src="/icon-shopify.png"
                    alt="Shopify"
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                </div>
                <div className="relative w-8 h-8 md:w-10 md:h-10">
                  <Image
                    src="/icon-woocommerce.png"
                    alt="WooCommerce"
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                </div>
                <div className="relative w-8 h-8 md:w-10 md:h-10">
                  <Image
                    src="/icon-wordpress.png"
                    alt="WordPress"
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                </div>
              </div>
              <div className="text-xs md:text-sm lg:text-base text-gray-400">Platforms Supported</div>
            </motion.div>
          </div>
          
          <div className="bg-gray-900/50 rounded-2xl p-6 md:p-8 border border-gray-800 mb-8">
            <h4 className="text-xl md:text-3xl font-bold text-white mb-4">The Problem Every Shopify Store Owner Faces:</h4>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-red-400 text-xl">❌</span>
                  <p className="text-gray-300">Free themes make you look like everyone else</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 text-xl">❌</span>
                  <p className="text-gray-300">Premium themes cost $300+ and still look generic</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-red-400 text-xl">❌</span>
                  <p className="text-gray-300">Multiple plugins = Multiple subscriptions</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 text-xl">❌</span>
                  <p className="text-gray-300">Limited customization kills your brand identity</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-primary-500/10 to-purple-500/10 rounded-2xl p-6 md:p-8 border border-primary-500/20 mb-12">
            <h4 className="text-2xl md:text-3xl font-bold gradient-text mb-4">The Liquidfy Solution:</h4>
            <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed text-lg">
              One subscription gives you <span className="text-primary-400 font-semibold">unlimited access</span> to premium modules and sections. 
              Mix, match, and customize everything to create a store that's <span className="text-purple-400 font-semibold">uniquely yours</span> and 
              <span className="text-blue-400 font-semibold"> converts like crazy</span>.
            </p>
          </div>
          
          {/* Features grid - Desktop only, shown here after The Liquidfy Solution */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden md:grid grid-cols-4 gap-4"
          >
            <div className="glass-effect rounded-xl p-4 hover:scale-105 transition-all duration-300">
              <div className="text-2xl mb-2">⚡</div>
              <h4 className="text-sm font-semibold text-white mb-2">30-Second Setup</h4>
              <p className="text-xs text-gray-400">Copy, paste, done. No coding required.</p>
            </div>
            <div className="glass-effect rounded-xl p-4 hover:scale-105 transition-all duration-300">
              <div className="text-2xl mb-2">🎨</div>
              <h4 className="text-sm font-semibold text-white mb-2">Unlimited Customization</h4>
              <p className="text-xs text-gray-400">Make it yours. Every color, every text.</p>
            </div>
            <div className="glass-effect rounded-xl p-4 hover:scale-105 transition-all duration-300">
              <div className="text-2xl mb-2">📈</div>
              <h4 className="text-sm font-semibold text-white mb-2">Proven to Convert</h4>
              <p className="text-xs text-gray-400">Used by stores doing 7-figures</p>
            </div>
            <div className="glass-effect rounded-xl p-4 hover:scale-105 transition-all duration-300">
              <div className="text-2xl mb-2">💰</div>
              <h4 className="text-sm font-semibold text-white mb-2">One Price, Everything</h4>
              <p className="text-xs text-gray-400">No per-module fees. Ever.</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile: Get Early Access first */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="md:hidden flex flex-col mb-12"
        id="join-waitlist"
        data-section="email-form"
      >
        <div className="max-w-md mx-auto w-full">
          <div className="glass-effect rounded-2xl p-6 flex flex-col">
            <div className="text-center">
              {/* Mobile: Large rocket icon */}
              <div className="inline-block text-6xl mb-4">🚀</div>
              <h3 className="text-3xl font-semibold mb-2">
                <span className="gradient-text" style={{fontSize: '2.3rem'}}>Get Early Access</span>
              </h3>
              <p className="text-gray-400 text-s mb-4">
                Be the first to access the platform that's changing ecommerce forever.
              </p>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-4 text-left">
                <p className="text-green-300 text-xs font-medium">
                  💰 Exclusive launch discount<br/>+ 7-day early access guaranteed
                </p>
              </div>
            </div>
            <SecureEmailForm onSuccess={onEmailSuccess} />
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">⚡ No spam, no BS. Just the good stuff when we launch.</p>
            </div>
          </div>
          
          {/* Privacy notice */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500 bg-gray-900/50 rounded-lg px-3 py-2 border border-gray-800">
              🔒 We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Features grid - Mobile only, shown after Get Early Access */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="md:hidden grid grid-cols-2 gap-4 mb-12"
      >
        <div className="glass-effect rounded-xl p-4 hover:scale-105 transition-all duration-300">
          <div className="text-2xl mb-2">⚡</div>
          <h4 className="text-sm font-semibold text-white mb-2">30-Second Setup</h4>
          <p className="text-xs text-gray-400">Copy, paste, done. No coding required.</p>
        </div>
        <div className="glass-effect rounded-xl p-4 hover:scale-105 transition-all duration-300">
          <div className="text-2xl mb-2">🎨</div>
          <h4 className="text-sm font-semibold text-white mb-2">Unlimited Customization</h4>
          <p className="text-xs text-gray-400">Make it yours. Every color, every text.</p>
        </div>
        <div className="glass-effect rounded-xl p-4 hover:scale-105 transition-all duration-300">
          <div className="text-2xl mb-2">📈</div>
          <h4 className="text-sm font-semibold text-white mb-2">Proven to Convert</h4>
          <p className="text-xs text-gray-400">Used by stores doing 7-figures</p>
        </div>
        <div className="glass-effect rounded-xl p-4 hover:scale-105 transition-all duration-300">
          <div className="text-2xl mb-2">💰</div>
          <h4 className="text-sm font-semibold text-white mb-2">One Price, Everything</h4>
          <p className="text-xs text-gray-400">No per-module fees. Ever.</p>
        </div>
      </motion.div>

      {/* Mobile: App Preview at the end */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="md:hidden flex flex-col justify-center mb-12"
      >
                 {/* App Preview Window - Mockup outside of glass-effect */}
         <div className="bg-gray-800/50 rounded-lg p-6 relative">
           <div className="flex items-center gap-2 mb-6">
             <div className="w-3 h-3 bg-red-400 rounded-full"></div>
             <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
             <div className="w-3 h-3 bg-green-400 rounded-full"></div>
             <div className="ml-4 text-xs text-gray-400">liquidfy.app/dashboard</div>
           </div>
           
           {/* Dashboard content - Full size image */}
           <div className="relative w-full h-60 rounded-lg overflow-hidden">
             <Image
               src="/dashboard-liquidfy.png"
               alt="Liquidfy Dashboard Preview"
               fill
               className="object-contain"
             />
           </div>

           {/* Floating indicators */}
           <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
         </div>
      </motion.div>

      {/* Two-column layout for desktop with arrow */}
      <div className="relative hidden md:block">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6">
          
          {/* Left Column - Join Waitlist - Desktop only */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col"
            id="join-waitlist-desktop"
            data-section="email-form"
          >
            <div className="max-w-md mx-auto lg:mx-0 w-full">
              <div className="glass-effect rounded-2xl p-6 md:p-8 flex flex-col">
                <div className="text-center lg:text-left">
                  {/* Desktop: Small rocket inline */}
                  <h3 className="text-3xl md:text-4xl font-semibold mb-2">
                    <span className="text-4xl mr-3" style={{filter: 'none'}}>🚀</span>
                    <span className="gradient-text" style={{fontSize: '2.3rem'}}>Get Early Access</span>
                  </h3>
                  <p className="text-gray-400 text-xs md:text-sm mb-4">
                    Be the first to access the platform that's changing ecommerce forever.
                  </p>
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-4 text-left">
                    <p className="text-green-300 text-xs md:text-sm font-medium">
                      💰 Exclusive launch discount<br/>+ 7-day early access guaranteed
                    </p>
                  </div>
                </div>
                <SecureEmailForm onSuccess={onEmailSuccess} />
                <div className="mt-6 text-center lg:text-left">
                  <p className="text-xs md:text-sm text-gray-500">⚡ No spam, no BS. Just the good stuff when we launch.</p>
                </div>
              </div>
              
              {/* Privacy notice */}
              <div className="mt-4 text-center lg:text-left">
                <p className="text-xs text-gray-500 bg-gray-900/50 rounded-lg px-3 py-2 border border-gray-800">
                  🔒 We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - App Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col justify-center"
          >
            {/* App Preview Window - Mockup outside of glass-effect */}
            <div className="bg-gray-800/50 rounded-lg p-6 relative h-full min-h-80">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <div className="ml-4 text-xs text-gray-400">liquidfy.app/dashboard</div>
              </div>
              
              {/* Dashboard content - Full size image */}
              <div className="relative w-full h-full rounded-lg overflow-hidden" style={{ height: 'calc(100% - 3rem)' }}>
                <Image
                  src="/dashboard-liquidfy.png"
                  alt="Liquidfy Dashboard Preview"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Floating indicators */}
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </motion.div>
        </div>

        {/* Decorative arrow between columns - desktop only - positioned with higher z-index */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
        >
          <div className="glass-effect rounded-full p-3 border border-primary-500/40 bg-gray-900/80 backdrop-blur-sm shadow-xl">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="28" 
              height="28" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-primary-400"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </div>
        </motion.div>
      </div>



      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="pt-12 border-t border-white/10"
      >
        <div className="text-center">
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="relative w-8 h-8">
                <div className="w-8 h-8 bg-liquidfy-gradient rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">L</span>
                </div>
              </div>
              <span className="text-xl font-bold gradient-text">Liquidfy</span>
            </div>
            <p className="text-gray-400 text-sm max-w-md mx-auto">
              The ultimate ecommerce optimization platform. Transform your store with premium modules designed for maximum conversion.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 mb-8">
            <a href="#" className="hover:text-primary-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary-400 transition-colors">Contact</a>
            <a href="#" className="hover:text-primary-400 transition-colors">Support</a>
          </div>
          
          <div className="text-xs text-gray-600">
            © 2024 Liquidfy. All rights reserved.
          </div>
        </div>
      </motion.footer>


    </div>
  )
} 
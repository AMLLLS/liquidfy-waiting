'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AppPreview() {
  return (
    <div>
      {/* Innovative Liquify description section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-center mb-16"
      >
        <h3 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 lg:mb-12">
          Meet Liquidfy
        </h3>
        <div className="max-w-4xl mx-auto">
          {/* Key stats in a beautiful grid - 2 columns on mobile for first two items */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-effect rounded-xl p-4 md:p-6 border border-primary-500/20"
            >
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text mb-2">150+</div>
              <div className="text-xs md:text-sm lg:text-base text-gray-400">Premium Shopify Sections</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-effect rounded-xl p-4 md:p-6 border border-purple-500/20"
            >
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text mb-2">100+</div>
              <div className="text-xs md:text-sm lg:text-base text-gray-400">Universal Modules</div>
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
          
          <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
            From <span className="text-primary-400 font-medium">Shopify-exclusive sections</span> to <span className="text-purple-400 font-medium">universal modules</span> for WordPress & WooCommerce - 
            we've got everything you need to <span className="text-blue-400 font-medium">boost your conversion rates</span> and create stunning ecommerce experiences.
          </p>
        </div>
      </motion.div>

      {/* Two-column layout for desktop with arrow */}
      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6">
          
          {/* Left Column - Join Waitlist */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col justify-center"
          >
            <div className="max-w-md mx-auto lg:mx-0 w-full">
              <div className="glass-effect rounded-2xl p-6 md:p-8 h-full flex flex-col justify-center">
                <div className="text-center lg:text-left mb-6">
                  {/* Large envelope icon */}
                  <div className="inline-block text-6xl md:text-7xl lg:text-8xl mb-4">📧</div>
                  <h3 className="text-3xl md:text-4xl font-semibold gradient-text mb-2">Join the Waitlist</h3>
                  <p className="text-gray-400 text-sm md:text-base">
                    Be the first to know when we launch and get a chance to win a free subscription!
                  </p>
                </div>
                <form className="space-y-4">
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
                      className="w-full pl-12 pr-4 py-3 md:py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-sm md:text-base" 
                      name="email"
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-liquify-gradient-alt text-white py-3 md:py-4 px-6 rounded-xl font-semibold text-base md:text-lg flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Join Waitlist
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </button>
                </form>
                <div className="mt-6 text-center lg:text-left">
                  <p className="text-xs md:text-sm text-gray-500">🎁 Early subscribers get exclusive access and special bonuses</p>
                </div>
              </div>
              
              {/* Privacy notice - moved outside and better positioned */}
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
            {/* App Preview Window - mt-10 only on mobile */}
            <div className="glass-effect rounded-2xl p-6 md:p-8 relative overflow-hidden h-full flex flex-col justify-center mt-10 lg:mt-0">
              {/* Browser mockup */}
              <div className="bg-gray-800/50 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div className="ml-4 text-xs text-gray-400">liquidfy.app/dashboard</div>
                </div>
                
                {/* Dashboard content - Made bigger */}
                <div className="space-y-4">
                  <div className="h-8 bg-gradient-to-r from-primary-500/20 to-purple-500/20 rounded w-3/4"></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-20 bg-white/5 rounded border border-white/10 flex items-center justify-center">
                      <span className="text-2xl opacity-50">📦</span>
                    </div>
                    <div className="h-20 bg-white/5 rounded border border-white/10 flex items-center justify-center">
                      <span className="text-2xl opacity-50">📦</span>
                    </div>
                    <div className="h-20 bg-white/5 rounded border border-white/10 flex items-center justify-center">
                      <span className="text-2xl opacity-50">📦</span>
                    </div>
                    <div className="h-20 bg-white/5 rounded border border-white/10 flex items-center justify-center">
                      <span className="text-2xl opacity-50">📦</span>
                    </div>
                  </div>
                  <div className="h-4 bg-gray-700/50 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-700/50 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-700/50 rounded w-3/4"></div>
                </div>
              </div>

              {/* Floating indicators */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
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

      {/* Feature Grid - Below both columns with more spacing */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="mt-12 lg:mt-20"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          {[
            { icon: '🚀', title: '1-Click Install', desc: 'Copy-paste integration' },
            { icon: '🎨', title: 'Fully Customizable', desc: 'Match your brand perfectly' },
            { icon: '📈', title: '+27% CVR Boost', desc: 'Proven conversion results' },
            { icon: '🔄', title: 'Lifetime Updates', desc: 'Always stay current' }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              className="text-center"
            >
              <div className="glass-effect rounded-xl p-4 md:p-6 h-full hover:border-primary-500/30 transition-all duration-300">
                <div className="text-2xl md:text-3xl mb-3">{feature.icon}</div>
                <h4 className="font-semibold text-white mb-2 text-sm md:text-base">{feature.title}</h4>
                <p className="text-xs md:text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

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
                <div className="w-8 h-8 bg-liquify-gradient rounded-lg flex items-center justify-center">
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
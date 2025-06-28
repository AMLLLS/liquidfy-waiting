'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import EmailForm from './EmailForm'
import { useMetaPixel } from '../hooks/useMetaPixel'

interface AppPreviewProps {
  onEmailSuccess: () => void
  subscriberCount: number
}

export default function AppPreview({ onEmailSuccess, subscriberCount }: AppPreviewProps) {
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
        <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
          Stop losing customers to boring, generic stores. Get the tools you need to <span className="text-primary-400 font-semibold">stand out</span> and <span className="text-purple-400 font-semibold">dominate your market</span>.
        </p>

        {/* E-commerce reality and secrets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600/30 rounded-2xl p-6 mb-8 max-w-5xl mx-auto"
        >
          {/* Mobile: Vertical stack with visual separators */}
          <div className="md:hidden space-y-4">
            <div className="text-center">
              <div className="inline-flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-full px-4 py-2">
                <div className="text-xl">🤫</div>
                <div className="text-gray-300 text-sm">Most stores look identical</div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-px h-4 bg-gradient-to-b from-gray-600 to-transparent"></div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center gap-3 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-2">
                <div className="text-xl">💸</div>
                <div className="text-gray-300 text-sm">Expensive themes = same results</div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-px h-4 bg-gradient-to-b from-gray-600 to-transparent"></div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2">
                <div className="text-xl">🎯</div>
                <div className="text-gray-300 text-sm">Winners hide their secrets</div>
              </div>
            </div>
          </div>

          {/* Desktop: Original grid layout */}
          <div className="hidden md:grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl md:text-4xl mb-2">🤫</div>
              <div className="text-gray-300 text-sm">Most e-commerce stores look identical and blend into the background</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl mb-2">💸</div>
              <div className="text-gray-300 text-sm">Expensive themes and plugins give you the same results as everyone else</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl mb-2">🎯</div>
              <div className="text-gray-300 text-sm">Successful stores keep their conversion secrets to stay ahead</div>
            </div>
          </div>
        </motion.div>
        
        <div className="max-w-5xl mx-auto">
          {/* Key stats in a beautiful grid - Desktop only, shown before problems */}
          <div className="hidden md:grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
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
              className="glass-effect rounded-xl p-4 md:p-6 border border-green-500/20 col-span-2 md:col-span-1"
            >
              {/* Platform icons instead of "5 Min" */}
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
          
          <div className="bg-gradient-to-r from-primary-500/10 to-purple-500/10 rounded-2xl p-6 md:p-8 border border-primary-500/20 mb-8">
            <h4 className="text-2xl md:text-3xl font-bold gradient-text mb-4">The Liquidfy Solution:</h4>
            <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed text-lg">
              One subscription gives you <span className="text-primary-400 font-semibold">unlimited access</span> to premium modules and sections. 
              Mix, match, and customize everything to create a store that's <span className="text-purple-400 font-semibold">uniquely yours</span> and 
              <span className="text-blue-400 font-semibold"> converts like crazy</span>.
            </p>
          </div>

          {/* Key stats in a beautiful grid - Mobile only, shown after The Liquidfy Solution */}
          <div className="md:hidden grid grid-cols-2 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-effect rounded-xl p-4 border border-primary-500/20"
            >
              <div className="text-2xl font-bold gradient-text mb-2">120+</div>
              <div className="text-xs text-gray-400">Ready-to-Use Shopify Sections</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-effect rounded-xl p-4 border border-purple-500/20"
            >
              <div className="text-2xl font-bold gradient-text mb-2">100+</div>
              <div className="text-xs text-gray-400">Premium Conversion Modules</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass-effect rounded-xl p-4 border border-green-500/20 col-span-2"
            >
              {/* Platform icons */}
              <div className="flex justify-center items-center gap-2 mb-2">
                <div className="relative w-10 h-10">
                  <Image
                    src="/icon-shopify.png"
                    alt="Shopify"
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                </div>
                <div className="relative w-10 h-10">
                  <Image
                    src="/icon-woocommerce.png"
                    alt="WooCommerce"
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                </div>
                <div className="relative w-10 h-10">
                  <Image
                    src="/icon-wordpress.png"
                    alt="WordPress"
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                </div>
              </div>
              <div className="text-xs text-gray-400">Platforms Supported</div>
            </motion.div>
          </div>
          
          {/* Features grid - Desktop only, shown here after The Liquidfy Solution */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden md:grid grid-cols-4 gap-4 mb-12"
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
               priority
               sizes="(max-width: 768px) 100vw, 50vw"
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
              <EmailForm onSuccess={onEmailSuccess} subscriberCount={subscriberCount} />
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
            <div className="bg-gray-800/50 rounded-lg p-4 relative h-auto min-h-60">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <div className="ml-4 text-xs text-gray-400">liquidfy.app/dashboard</div>
              </div>
              
              {/* Dashboard content - Full size image */}
              <div className="relative w-full h-64 rounded-lg overflow-hidden">
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
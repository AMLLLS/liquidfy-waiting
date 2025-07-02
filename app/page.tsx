'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import SimpleBackground from '@/components/SimpleBackground'
import EmailForm from '@/components/EmailForm'
import Logo from '@/components/Logo'
import ModuleSlider from '@/components/ModuleSlider'
import AppPreview from '@/components/AppPreview'
import ConfettiEffect from '@/components/ConfettiEffect'
import StructuredData from '@/components/StructuredData'
import ScrollTracker from '@/components/ScrollTracker'
import CountdownTimer from '@/components/CountdownTimer'

import { useMetaPixel } from '@/hooks/useMetaPixel'

export default function Home() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [subscriberCount, setSubscriberCount] = useState(147) // Starting number for social proof
  const { trackViewContent, trackFeatureView, trackCompleteRegistration } = useMetaPixel()
  
  // Track view content on mount (PageView handled by pixel init)
  useEffect(() => {
    if (!isSubmitted) {
      trackViewContent('Liquidfy Landing Page')
    } else {
      // Track success page view
      trackViewContent('Liquidfy Success Page')
    }
  }, [trackViewContent, isSubmitted])

  // Simulate real-time subscriber updates for social proof
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every 30 seconds
        setSubscriberCount(prev => prev + 1)
      }
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-primary-950 to-purple-950 flex items-center justify-center relative overflow-hidden">
        <ConfettiEffect />
        <SimpleBackground />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center z-10 px-4 w-full max-w-md mx-auto"
        >
          <div className="glass-effect rounded-3xl p-8 md:p-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="text-5xl md:text-6xl mb-6"
            >
              🎉
            </motion.div>
            <h1 className="text-2xl md:text-3xl font-semibold gradient-text mb-4">
              You're In! Welcome to the Future!
            </h1>
            <p className="text-gray-300 mb-6 text-sm md:text-base">
              You're now subscriber #{142 + subscriberCount} on our exclusive waitlist. Get ready for something amazing!
            </p>
            

            
            {/* Social Media Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mb-6"
            >
              <p className="text-gray-400 text-sm mb-4">
                Follow us for exclusive updates and behind-the-scenes content:
              </p>
              <div className="flex justify-center items-center gap-6">
                <motion.a 
                  href="https://www.instagram.com/liquidfy.app/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300 rounded-full p-1"
                >
                  <Image
                    src="/instagram-liquidfy.png"
                    alt="Follow us on Instagram"
                    width={32}
                    height={32}
                    className="opacity-80 hover:opacity-100 transition-opacity rounded-lg"
                  />
                </motion.a>
                <motion.a 
                  href="https://www.facebook.com/people/Liquidfyapp/61578050750090/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 rounded-full p-1"
                >
                  <Image
                    src="/facebook-liquidfy.png"
                    alt="Follow us on Facebook"
                    width={32}
                    height={32}
                    className="opacity-80 hover:opacity-100 transition-opacity rounded-lg"
                  />
                </motion.a>
                <motion.a 
                  href="https://x.com/liquidfyapp" 
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="hover:shadow-lg hover:shadow-gray-500/25 transition-all duration-300 rounded-full p-1"
                >
                  <Image
                    src="/x-liquidfy.png"
                    alt="Follow us on X (Twitter)"
                    width={32}
                    height={32}
                    className="opacity-80 hover:opacity-100 transition-opacity rounded-lg"
                  />
                </motion.a>
              </div>
            </motion.div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSubmitted(false)}
              className="bg-gray-700/50 text-gray-300 px-6 md:px-8 py-3 rounded-full font-medium hover:bg-gray-600/50 transition-all duration-300 text-sm md:text-base border border-gray-600/30"
              data-fb-tracking="false"
            >
              ↺ Add Another Email
            </motion.button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
      <main className="min-h-screen bg-gray-950 relative overflow-hidden">
        <StructuredData />
        <SimpleBackground />
        <ScrollTracker />
        
        <div className="relative z-10">
        {/* Urgency Bar at the top */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border-b border-red-500/30 py-3"
        >
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 text-xs md:text-base">
              <span className="animate-pulse">🔥</span>
              <span className="text-orange-200 font-medium">
                Limited Early Access - Only <span className="text-white font-bold">{Math.max(400 - (142 + subscriberCount), 153)}</span> spots remaining
              </span>
              <span className="animate-pulse">🔥</span>
            </div>
          </div>
        </motion.div>

        {/* Header with Logo and Title */}
        <div className="container mx-auto px-2 md:px-6 pt-8 md:pt-12">
          <div className="text-center mb-8">
            <Logo />
            <div className="mt-4 md:mt-8">
              
              {/* Main title with clamp responsive sizing */}
              <h1 className="text-white font-bold px-1 pt-2 leading-tight md:mb-0 lg:mb-[-0.5rem]" 
                  style={{ fontSize: 'clamp(3.2rem, 12vw, 6rem)' }}>
                Coming soon.
              </h1>
              
              {/* Register now subtitle with clamp responsive sizing and animated arrows */}
              <div className="flex items-center justify-center gap-4 md:gap-8 mb-8 px-1 mt-[-0.5rem] md:mt-0">
                <motion.div
                  animate={{ 
                    x: [-10, 0, -10],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="gradient-text text-2xl md:text-4xl font-bold"
                >
                  →
                </motion.div>
                <motion.h2 
                  className="font-bold gradient-text leading-tight md:py-1 cursor-pointer group"
                  style={{ fontSize: 'clamp(2.25rem, 9vw, 4.5rem)' }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 5,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{
                    scale: 0.95,
                    rotateY: -2,
                    transition: { duration: 0.1 }
                  }}
                  onClick={() => {
                    // Scroll to email form section with proper detection for mobile/desktop
                    const isDesktop = window.innerWidth >= 768;
                    const emailFormSection = isDesktop 
                      ? document.getElementById('join-waitlist-desktop') || document.querySelector('[data-section="email-form"]')
                      : document.getElementById('join-waitlist') || document.querySelector('[data-section="email-form"]');
                    
                    if (emailFormSection) {
                      const offsetTop = emailFormSection.getBoundingClientRect().top + window.pageYOffset - 60;
                      window.scrollTo({ 
                        top: offsetTop, 
                        behavior: 'smooth' 
                      });
                    }
                  }}
                >
                  Register now
                </motion.h2>
                <motion.div
                  animate={{ 
                    x: [10, 0, 10],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="gradient-text text-2xl md:text-4xl font-bold"
                >
                  ←
                </motion.div>
              </div>
              
              {/* Tagline - Simplified and more powerful */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              >
                The only platform you need to transform your Shopify store from <span className="text-red-400 font-semibold">generic</span> to <span className="gradient-text font-semibold">game-changing</span>
              </motion.p>
              
              {/* Platform icons - cleaner presentation */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex justify-center items-center gap-6 mt-6"
              >
                <div className="text-xs text-gray-500 font-medium">Works with:</div>
                <div className="flex items-center gap-4">
                  <div className="relative w-8 h-8 md:w-10 md:h-10">
                    <Image
                      src="/icon-shopify.png"
                      alt="Shopify"
                      width={40}
                      height={40}
                      className="rounded-md opacity-80 hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <div className="relative w-8 h-8 md:w-10 md:h-10">
                    <Image
                      src="/icon-woocommerce.png"
                      alt="WooCommerce"
                      width={40}
                      height={40}
                      className="rounded-md opacity-80 hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <div className="relative w-8 h-8 md:w-10 md:h-10">
                    <Image
                      src="/icon-wordpress.png"
                      alt="WordPress"
                      width={40}
                      height={40}
                      className="rounded-md opacity-80 hover:opacity-100 transition-opacity"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* VISUAL TRANSITION - Animated Search/Module Explorer */}
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            {/* Floating module previews - MOVED ABOVE, LEFT ALIGNED */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0, duration: 0.6 }}
              className="flex flex-wrap gap-2 mb-2 md:mb-3"
            >
              {[
                { name: 'Bundle', color: 'bg-blue-500/20 border-blue-500/40' },
                { name: 'Reviews', color: 'bg-green-500/20 border-green-500/40' },
                { name: 'Timer', color: 'bg-purple-500/20 border-purple-500/40' },
                { name: 'Social', color: 'bg-orange-500/20 border-orange-500/40' },
                { name: 'Trust', color: 'bg-teal-500/20 border-teal-500/40' },
                { name: 'Offers', color: 'bg-pink-500/20 border-pink-500/40' },
              ].map((module, index) => (
                <motion.div
                  key={module.name}
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 2.0 + index * 0.15, duration: 0.4 }}
                  className={`${module.color} px-2 py-1 rounded text-xs text-white border`}
                >
                  {module.name}
                </motion.div>
              ))}
            </motion.div>

            {/* Search bar simulation */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="flex items-center bg-gray-800/50 border border-gray-700/50 rounded-t-xl p-4 md:p-5"
              >
                <div className="flex items-center gap-3 flex-1">
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1, rotate: 360 }}
                    transition={{ delay: 1.4, duration: 0.6 }}
                    className="text-gray-400"
                    style={{
                      animation: "spin 8s linear infinite"
                    }}
                  >
                    🔍
                  </motion.div>
                  <motion.div
                    className="flex-1"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, delay: 1.8, ease: "easeOut" }}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.2, duration: 0.5 }}
                      className="text-gray-300 text-sm md:text-base"
                    >
                      <span className="text-primary-400">220+ modules</span> found for your store...
                    </motion.div>
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 2.8, type: "spring", stiffness: 200 }}
                    className="text-green-400"
                  >
                    ✓
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Mini slider directly attached as search results */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ delay: 3.2, duration: 0.8, ease: "easeOut" }}
                className="bg-gray-800/30 border-l border-r border-b border-gray-700/50 rounded-b-xl p-3"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.5 }}
                  className="text-xs text-gray-400 mb-2"
                >
                  Search results:
                </motion.div>
                <div className="relative overflow-hidden">
                  <motion.div
                    initial={{ x: -200, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 3.8, duration: 0.6 }}
                    className="flex gap-2"
                    style={{
                      animation: "slideInfinite 20s linear infinite"
                    }}
                  >
                    {/* First set */}
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
                      <div key={`search-first-${index}`} className="flex-shrink-0 w-16 h-12 rounded border border-gray-600/50 overflow-hidden bg-gray-900/50 relative group">
                        <Image
                          src={module.img}
                          alt={module.name}
                          width={64}
                          height={48}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-1">
                          <div className="text-white text-[8px] font-medium leading-none truncate">
                            {module.name}
                          </div>
                        </div>
                      </div>
                    ))}
                    {/* Duplicate set for infinite scroll */}
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
                      <div key={`search-second-${index}`} className="flex-shrink-0 w-16 h-12 rounded border border-gray-600/50 overflow-hidden bg-gray-900/50 relative group">
                        <Image
                          src={module.img}
                          alt={module.name}
                          width={64}
                          height={48}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-1">
                          <div className="text-white text-[8px] font-medium leading-none truncate">
                            {module.name}
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Simplified Value Proposition - NEW */}
        <div className="container mx-auto px-4 md:px-6 py-4 md:py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6">
              Why 98% of Shopify Stores <span className="text-red-400">Fail</span>
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-6 md:mb-8 leading-relaxed px-2">
              They all use the same generic themes, boring layouts, and outdated modules. 
              <span className="text-primary-400 font-semibold"> Customers can't tell them apart.</span>
            </p>
            
            {/* Problem vs Solution */}
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8">
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 md:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-lg md:text-xl font-bold text-red-400">❌ Most Stores</h3>
                  <div className="relative group">
                    <button 
                      className="w-5 h-5 bg-red-500/20 border border-red-500/40 rounded-full flex items-center justify-center cursor-help hover:bg-red-500/30 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/50"
                      type="button"
                      aria-label="More information about common store problems"
                    >
                      <span className="text-red-400 text-xs font-bold leading-none">+</span>
                    </button>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 border border-red-500/30 rounded-lg text-xs text-gray-300 w-64 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity z-20 pointer-events-none">
                      <div className="font-semibold text-red-400 mb-1">The Hidden Testing Problem:</div>
                      Most e-commerce stores struggle with A/B testing, spending thousands on products they can't sell because they fail to stand out and communicate their product's true value to customers.
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-500/30"></div>
                    </div>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-300 text-left text-sm md:text-base">
                  <li>• Generic $300+ themes</li>
                  <li>• Multiple expensive plugins</li>
                  <li>• Look like everyone else</li>
                  <li>• Low conversion rates</li>
                </ul>
              </div>
              
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 md:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-lg md:text-xl font-bold text-green-400">✅ Liquidfy Stores</h3>
                  <div className="relative group">
                    <button 
                      className="w-5 h-5 bg-green-500/20 border border-green-500/40 rounded-full flex items-center justify-center cursor-help hover:bg-green-500/30 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500/50"
                      type="button"
                      aria-label="More information about Liquidfy solutions"
                    >
                      <span className="text-green-400 text-xs font-bold leading-none">+</span>
                    </button>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 border border-green-500/30 rounded-lg text-xs text-gray-300 w-64 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity z-20 pointer-events-none">
                      <div className="font-semibold text-green-400 mb-1">The Liquidfy Solution:</div>
                      Our pre-tested, conversion-optimized modules help you instantly differentiate your store and clearly communicate your product's value, eliminating guesswork and boosting sales from day one.
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-green-500/30"></div>
                    </div>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-300 text-left text-sm md:text-base">
                  <li>• 220+ unique modules</li>
                  <li>• One affordable subscription</li>
                  <li>• Stand out instantly</li>
                  <li>• 3x better conversions</li>
                </ul>
              </div>
            </div>
            
            {/* Transition to solution with value proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-primary-500/5 to-purple-500/5 border border-primary-500/20 rounded-xl p-6 md:p-8 mt-8"
            >
              <h3 className="text-xl md:text-2xl font-bold mb-6 text-center">
                That's Why We Built <span className="gradient-text">Liquidfy</span>
              </h3>
              
              {/* Integrated key stats with context */}
              <div className="grid grid-cols-3 gap-3 md:gap-6 mb-6">
                <div className="text-center bg-white/5 rounded-lg p-3 md:p-4">
                  <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">220+</div>
                  <div className="text-xs md:text-sm text-gray-400">Premium Modules</div>
                  <div className="text-xs text-gray-500 mt-1">Ready to copy-paste</div>
                </div>
                <div className="text-center bg-white/5 rounded-lg p-3 md:p-4">
                  <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">5min</div>
                  <div className="text-xs md:text-sm text-gray-400">Setup Time</div>
                  <div className="text-xs text-gray-500 mt-1">No coding required</div>
                </div>
                <div className="text-center bg-white/5 rounded-lg p-3 md:p-4">
                  <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">3x</div>
                  <div className="text-xs md:text-sm text-gray-400">More Sales</div>
                  <div className="text-xs text-gray-500 mt-1">Proven results</div>
                </div>
              </div>
              
              <p className="text-center text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
                Stop wasting money on expensive themes and plugins that don't convert. 
                <span className="text-green-400 font-semibold">Get everything you need in one platform.</span>
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Module Slider - MOVED UP to show solutions immediately */}
        <ModuleSlider />

        {/* Email Form Section - Prominent placement after seeing the solution */}
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
          {/* Mobile Email Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:hidden flex flex-col mb-8"
            id="join-waitlist"
            data-section="email-form"
          >
            <div className="max-w-sm mx-auto w-full">
              <EmailForm onSuccess={() => setIsSubmitted(true)} subscriberCount={subscriberCount} />
            </div>
          </motion.div>

          {/* Desktop Email Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden md:flex justify-center"
            id="join-waitlist-desktop"
            data-section="email-form"
          >
            <div className="max-w-md w-full">
              <EmailForm onSuccess={() => setIsSubmitted(true)} subscriberCount={subscriberCount} />
            </div>
          </motion.div>
        </div>

        {/* Final Push - Social Proof and Urgency */}
        <div className="container mx-auto px-4 md:px-6 pb-8 md:pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-center bg-gradient-to-r from-primary-500/10 to-purple-500/10 border border-primary-500/20 rounded-xl md:rounded-2xl p-4 md:p-8 mx-2 md:mx-0"
          >
            <h4 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4">
              Don't Build Another <span className="text-red-400">Generic Store</span>
            </h4>
            <p className="text-gray-300 mb-4 md:mb-6 max-w-2xl mx-auto text-sm md:text-base">
              Join <span className="text-white font-bold">{142 + subscriberCount}+ store owners</span> who are getting early access to everything they need for a store that actually converts. 
              <span className="text-green-400 font-semibold"> Save $300 on launch day.</span>
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 text-xs md:text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <span className="text-green-400">✓</span>
                <span>220+ modules ready to use</span>
              </div>
              <span className="hidden md:inline text-gray-600">•</span>
              <div className="flex items-center gap-1">
                <span className="text-green-400">✓</span>
                <span>No monthly fees ever</span>
              </div>
              <span className="hidden md:inline text-gray-600">•</span>
              <div className="flex items-center gap-1">
                <span className="text-green-400">✓</span>
                <span>$300 launch discount</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      

    </main>
  )
} 
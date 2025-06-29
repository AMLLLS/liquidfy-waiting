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
              {/* Platform logos above title */}
              <div className="flex justify-center items-center gap-4">
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
                  <span className="gradient-text">
                    Register now
                  </span>
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
              
              {/* Enhanced value proposition */}
              <p className="text-gray-400 max-w-3xl mx-auto leading-6 md:leading-relaxed mb-6 md:mb-8"
                 style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.25rem)' }}>
                Get <span className="text-primary-400 font-semibold">100+ conversion-tested modules</span> + <span className="text-purple-400 font-semibold">120+ premium Shopify sections</span> that increase sales by up to <span className="text-green-400 font-bold">347%</span> — without expensive themes or plugins.
              </p>

              {/* Key benefits with icons - Optimized mobile layout */}
              <div className="mb-8 max-w-4xl mx-auto">
                {/* Mobile: Horizontal scroll layout */}
                <div className="md:hidden flex gap-3 overflow-x-auto pb-4 px-2 scrollbar-hide">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex-shrink-0 flex items-center gap-2 glass-effect rounded-full px-4 py-3 border border-green-500/20 whitespace-nowrap"
                  >
                    <span className="text-xl">💰</span>
                    <span className="text-green-300 font-medium text-sm">Boost Revenue 3x</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex-shrink-0 flex items-center gap-2 glass-effect rounded-full px-4 py-3 border border-blue-500/20 whitespace-nowrap"
                  >
                    <span className="text-xl">⚡</span>
                    <span className="text-blue-300 font-medium text-sm">5-Min Setup</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex-shrink-0 flex items-center gap-2 glass-effect rounded-full px-4 py-3 border border-purple-500/20 whitespace-nowrap"
                  >
                    <span className="text-xl">🎯</span>
                    <span className="text-purple-300 font-medium text-sm">Zero Code Needed</span>
                  </motion.div>
                </div>

                {/* Desktop: Original grid layout */}
                <div className="hidden md:grid grid-cols-3 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center justify-center gap-3 glass-effect rounded-xl p-4 border border-green-500/20"
                  >
                    <span className="text-2xl">💰</span>
                    <span className="text-green-300 font-medium text-base">Boost Revenue 3x</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center justify-center gap-3 glass-effect rounded-xl p-4 border border-blue-500/20"
                  >
                    <span className="text-2xl">⚡</span>
                    <span className="text-blue-300 font-medium text-base">5-Min Setup</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center justify-center gap-3 glass-effect rounded-xl p-4 border border-purple-500/20"
                  >
                    <span className="text-2xl">🎯</span>
                    <span className="text-purple-300 font-medium text-base">Zero Code Needed</span>
                  </motion.div>
                </div>
              </div>

              {/* Social proof counter */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8"
              >
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-2 border-white/20 flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">AM</span>
                  </div>
                  <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-full border-2 border-white/20 flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">JL</span>
                  </div>
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-2 border-white/20 flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">SK</span>
                  </div>
                  <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full border-2 border-white/20 flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">MR</span>
                  </div>
                </div>
                <span className="text-gray-300 text-sm">
                  <span className="text-white font-semibold">{142 + subscriberCount}</span> store owners already joined
                </span>
              </motion.div>
              
              {/* Discover button with animated arrow */}
              <motion.button
                onClick={() => {
                  // Check if desktop (768px+) or mobile
                  const isDesktop = window.innerWidth >= 768;
                  
                  if (isDesktop) {
                    // On desktop, scroll to slider
                    const sliderElement = document.querySelector('.slider-fade-container');
                    if (sliderElement) {
                      const offsetTop = sliderElement.getBoundingClientRect().top + window.pageYOffset + 50;
                      window.scrollTo({ 
                        top: offsetTop, 
                        behavior: 'smooth' 
                      });
                    }
                  } else {
                    // On mobile, scroll to email form after slider
                    const emailFormSection = document.getElementById('join-waitlist');
                    if (emailFormSection) {
                      const offsetTop = emailFormSection.offsetTop - 80;
                      window.scrollTo({ 
                        top: offsetTop, 
                        behavior: 'smooth' 
                      });
                    }
                  }
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="group flex flex-col items-center gap-2 mx-auto hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                <span className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wider group-hover:text-primary-400 transition-colors duration-300">
                  Discover
                </span>
                <motion.div
                  animate={{ 
                    y: [0, -8, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:bg-primary-500/20 group-hover:border-primary-500/30 transition-all duration-300"
                >
                  <svg 
                    className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-primary-400 transition-colors duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Module Slider */}
        <ModuleSlider />

        {/* Mobile: Get Early Access - Moved after slider for better conversion */}
        <div className="container mx-auto px-4 md:px-6 mt-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="md:hidden flex flex-col mb-12"
            id="join-waitlist"
            data-section="email-form"
          >
            <div className="max-w-md mx-auto w-full">
              <EmailForm onSuccess={() => setIsSubmitted(true)} subscriberCount={subscriberCount} />
            </div>
          </motion.div>
        </div>

        {/* App Preview and Two-Column Layout */}
        <div className="container mx-auto px-4 md:px-6 mt-8">
          <AppPreview onEmailSuccess={() => setIsSubmitted(true)} subscriberCount={subscriberCount} />
        </div>
      </div>
      

    </main>
  )
} 
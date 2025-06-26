'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SimpleBackground from '@/components/SimpleBackground'
import EmailForm from '@/components/EmailForm'
import Logo from '@/components/Logo'
import ModuleSlider from '@/components/ModuleSlider'
import AppPreview from '@/components/AppPreview'
import ConfettiEffect from '@/components/ConfettiEffect'
import StructuredData from '@/components/StructuredData'


export default function Home() {
  const [isSubmitted, setIsSubmitted] = useState(false)

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
              Welcome to the Future!
            </h1>
            <p className="text-gray-300 mb-6 text-sm md:text-base">
              You're now on the exclusive waitlist for Liquidfy. Get ready for something amazing!
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-4 mb-6"
            >
              <p className="text-green-300 text-sm font-medium">
                🎁 You're entered to win a FREE lifetime subscription!
              </p>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSubmitted(false)}
              className="bg-liquidfy-gradient-alt text-white px-6 md:px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 text-sm md:text-base"
            >
              Join Another Email
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
        
        <div className="relative z-10">
        {/* Header with Logo and Title */}
        <div className="container mx-auto px-2 md:px-6 pt-8 md:pt-12">
          <div className="text-center mb-8">
            <Logo />
            <div className="mt-4 md:mt-8">
              {/* Main title with clamp responsive sizing */}
              <h1 className="text-white font-bold px-1 pt-2 leading-tight md:mb-0 lg:mb-[-0.5rem]" 
                  style={{ fontSize: 'clamp(3rem, 12vw, 6rem)' }}>
                Stop Looking Like Every Other Shopify Store
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
                    // Scroll directly to the email form section
                    const emailFormSection = document.querySelector('[data-section="email-form"]') || 
                                           document.querySelector('.glass-effect') ||
                                           document.getElementById('join-waitlist');
                    if (emailFormSection) {
                      const offsetTop = emailFormSection.getBoundingClientRect().top + window.pageYOffset - 80;
                      window.scrollTo({ 
                        top: offsetTop, 
                        behavior: 'smooth' 
                      });
                    }
                  }}
                >
                  <span className="gradient-text">
                    Join the Revolution
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
              
              <p className="text-gray-400 max-w-3xl mx-auto leading-6 md:leading-relaxed mb-8 md:mb-12"
                 style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.25rem)' }}>
                Get 100+ premium modules + 120+ Shopify sections that make your store <span className="text-primary-400 font-semibold">stand out</span> and <span className="text-purple-400 font-semibold">convert like crazy</span> — without expensive themes or plugins.
              </p>
              
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
                    // On mobile, scroll to Meet Liquidfy section
                    const meetSection = document.getElementById('meet-liquidfy');
                    if (meetSection) {
                      const offsetTop = meetSection.offsetTop - 80;
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

        {/* App Preview and Two-Column Layout */}
        <div className="container mx-auto px-4 md:px-6 mt-8">
          <AppPreview onEmailSuccess={() => setIsSubmitted(true)} />
        </div>
      </div>
    </main>
  )
} 
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SimpleBackground from '@/components/SimpleBackground'
import EmailForm from '@/components/EmailForm'
import Logo from '@/components/Logo'
import ModuleSlider from '@/components/ModuleSlider'
import AppPreview from '@/components/AppPreview'
import ConfettiEffect from '@/components/ConfettiEffect'

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
              You're now on the exclusive waitlist for Liquify. Get ready for something amazing!
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
              className="bg-liquify-gradient-alt text-white px-6 md:px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 text-sm md:text-base"
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
      <SimpleBackground />
      
      <div className="relative z-10">
        {/* Header with Logo and Title */}
        <div className="container mx-auto px-4 md:px-6 pt-8 md:pt-12">
          <div className="text-center mb-16">
            <Logo />
            <div className="mt-8">
              {/* Main title with proper padding to avoid clipping */}
              <h1 className="text-white text-5xl md:text-6xl gradient-text lg:text-7xl font-bold mb-8 px-2 pb-2">
                Coming soon.
              </h1>
              
              <p className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto leading-6 md:leading-relaxed">
                Forget themes & plugins : Liquidfy now revolutionize your high converting ecommerce experience with unlimited usage.
              </p>
            </div>
          </div>
        </div>

        {/* Module Slider */}
        <ModuleSlider />

        {/* App Preview and Two-Column Layout */}
        <div className="container mx-auto px-4 md:px-6 mt-16">
          <AppPreview />
        </div>
      </div>
    </main>
  )
} 
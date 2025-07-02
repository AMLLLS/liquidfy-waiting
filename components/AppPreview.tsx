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
      {/* Clean single section focused on conversion - Hidden on mobile, shown after email form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="hidden md:block text-center mb-16"
        id="meet-liquidfy"
      >
        <h3 className="text-4xl md:text-6xl font-bold mb-6">
          Meet <span className="gradient-text">Liquidfy</span>
        </h3>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
          The all-in-one platform that gives you <span className="text-primary-400 font-semibold">everything you need</span> to create a store that converts like crazy.
        </p>

        {/* Single powerful demo image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative max-w-4xl mx-auto mb-12 group"
        >
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary-500/20 to-purple-500/20 p-1">
            <div className="bg-gray-900 rounded-xl overflow-hidden">
              <Image
                src="/previewappm1.png"
                alt="Liquidfy Platform Preview"
                width={1200}
                height={675}
                className="w-full h-auto rounded-xl hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>
          </div>
          
          {/* Overlay CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-2">Ready to Transform Your Store?</div>
              <div className="text-primary-400 font-medium">Get early access for $99 instead of $199</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Simple feature highlights - Desktop only */}
        <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <div className="text-4xl mb-4">🎨</div>
            <h4 className="text-lg font-bold mb-2">220+ Modules</h4>
            <p className="text-gray-400 text-sm">Every type of section, popup, and element you'll ever need</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <div className="text-4xl mb-4">⚡</div>
            <h4 className="text-lg font-bold mb-2">No Code</h4>
            <p className="text-gray-400 text-sm">Copy, paste, and customize. Works with any theme</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <div className="text-4xl mb-4">💰</div>
            <h4 className="text-lg font-bold mb-2">Proven Results</h4>
            <p className="text-gray-400 text-sm">Used by 1000+ stores to increase sales by 300%+</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile-Optimized Section - Only shown on mobile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="md:hidden text-center mb-8 px-4"
      >
        <h3 className="text-2xl font-bold mb-4">
          What You'll Get with <span className="gradient-text">Liquidfy</span>
        </h3>
        
        {/* Mobile-friendly demo preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mb-6 rounded-xl overflow-hidden bg-gradient-to-r from-primary-500/20 to-purple-500/20 p-1"
        >
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <Image
              src="/previewappm1.png"
              alt="Liquidfy Platform Preview"
              width={600}
              height={338}
              className="w-full h-auto rounded-lg"
              priority
            />
          </div>
        </motion.div>

        {/* Mobile feature highlights - Stacked vertically */}
        <div className="space-y-4 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-4 bg-gray-800/30 rounded-lg p-3"
          >
            <div className="text-2xl">🎨</div>
            <div className="text-left">
              <h4 className="text-sm font-bold text-white">220+ Premium Modules</h4>
              <p className="text-xs text-gray-400">Every section and element you need</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-4 bg-gray-800/30 rounded-lg p-3"
          >
            <div className="text-2xl">⚡</div>
            <div className="text-left">
              <h4 className="text-sm font-bold text-white">Zero Code Required</h4>
              <p className="text-xs text-gray-400">Copy, paste, and customize instantly</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-4 bg-gray-800/30 rounded-lg p-3"
          >
            <div className="text-2xl">💰</div>
            <div className="text-left">
              <h4 className="text-sm font-bold text-white">Proven Results</h4>
              <p className="text-xs text-gray-400">300%+ sales increase guaranteed</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Desktop Email Form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="hidden md:flex justify-center mb-16"
        id="join-waitlist-desktop"
        data-section="email-form"
      >
        <div className="max-w-md w-full">
          <EmailForm onSuccess={onEmailSuccess} subscriberCount={subscriberCount} />
        </div>
      </motion.div>

      {/* Final CTA section - Mobile optimized */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="text-center bg-gradient-to-r from-primary-500/10 to-purple-500/10 border border-primary-500/20 rounded-xl md:rounded-2xl p-4 md:p-8 mb-8 md:mb-16 mx-2 md:mx-0"
      >
        <h4 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4">
          Don't Build Another <span className="text-red-400">Generic Store</span>
        </h4>
        <p className="text-gray-300 mb-4 md:mb-6 max-w-2xl mx-auto text-sm md:text-base">
          Join the early access list and get everything you need to create a store that actually converts. 
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
            <span>No monthly fees</span>
          </div>
          <span className="hidden md:inline text-gray-600">•</span>
          <div className="flex items-center gap-1">
            <span className="text-green-400">✓</span>
            <span>Launch day discount</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Logo() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="mb-8 md:mb-12"
    >
      <div className="flex items-center justify-center gap-4 md:gap-6 mb-8">
        <motion.div
          animate={{ 
            rotate: [0, 2, -2, 0],
            scale: [1, 1.02, 1]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative"
        >
          <div className="relative w-12 h-12 md:w-16 md:h-16">
            <Image
              src="/LOGO.png"
              alt="Liquidfy Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-tight"
        >
          Liquidfy.app
        </motion.h2>
      </div>
      
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: "100%" }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="h-0.5 bg-gray-800 rounded-full mx-auto max-w-32 md:max-w-40"
      />
    </motion.div>
  )
} 
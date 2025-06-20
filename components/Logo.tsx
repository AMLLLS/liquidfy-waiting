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
      <div className="flex items-center justify-center gap-4 md:gap-6 mb-4">
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
          <div className="relative w-16 h-16 md:w-20 md:h-20">
            <Image
              src="/LOGO.png"
              alt="Liquify Logo"
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
          className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text tracking-tight"
        >
          
        </motion.h2>
      </div>
      
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: "100%" }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="h-0.5 bg-liquify-gradient-alt rounded-full mx-auto max-w-32 md:max-w-40"
      />
    </motion.div>
  )
} 
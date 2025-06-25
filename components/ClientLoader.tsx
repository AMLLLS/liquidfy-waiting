'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LiquifyLoader from './LiquifyLoader'

interface ClientLoaderProps {
  children: React.ReactNode
}

export default function ClientLoader({ children }: ClientLoaderProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Show loader for 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              scale: 1.1,
              transition: { duration: 0.5, ease: "easeInOut" }
            }}
          >
            <LiquifyLoader />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.6, ease: "easeOut" }
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 
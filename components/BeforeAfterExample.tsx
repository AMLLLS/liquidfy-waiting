'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface BeforeAfterExampleProps {
  onViewExample?: () => void
}

export default function BeforeAfterExample({ onViewExample }: BeforeAfterExampleProps) {
  const [isImageVisible, setIsImageVisible] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const handleShowExample = () => {
    setIsImageVisible(!isImageVisible)
    if (!isImageVisible) {
      onViewExample?.()
    }
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-2 md:py-3">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-4xl mx-auto"
      >
        {/* Better delimited container */}
        <div className="bg-white/80 border border-gray-200 rounded-xl p-3 md:p-4 shadow-sm">
          <div className="text-center">
            <motion.button
              onClick={handleShowExample}
              className="group text-gray-600 hover:text-gray-900 text-sm md:text-base font-medium transition-colors duration-300 cursor-pointer border-b border-gray-300 hover:border-blue-500 pb-1"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              {isImageVisible ? 'Hide example ↑' : 'Show me an example →'}
            </motion.button>
          </div>

          {/* Inline Image Display */}
          <AnimatePresence>
            {isImageVisible && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="overflow-hidden mt-4"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="rounded-xl overflow-hidden bg-white border border-gray-200 relative max-w-2xl mx-auto p-3 md:p-4 shadow-lg"
                >
                  <div className="rounded-lg overflow-hidden bg-gray-100">
                    {/* Loading placeholder */}
                    {!isImageLoaded && (
                      <div className="w-full aspect-[1148/1193] bg-gray-200 flex items-center justify-center">
                        <div className="text-gray-600 text-sm">Loading example...</div>
                      </div>
                    )}
                    
                    <Image
                      src="/BEFORE-AFTER-LIQUIFY2.png"
                      alt="Before and After: Store transformation example"
                      width={1148}
                      height={1193}
                      className={`w-full h-auto transition-opacity duration-300 ${
                        isImageLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
                      }`}
                      loading="lazy"
                      quality={85}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkrHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSorjrdOzW8w=="
                      onLoad={() => setIsImageLoaded(true)}
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
} 
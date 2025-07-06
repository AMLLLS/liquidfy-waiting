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
        {/* Enhanced container with better visibility */}
        <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-gray-600/50 rounded-xl p-4 md:p-6 shadow-lg backdrop-blur-sm">
          <div className="text-center">
            <div className="mb-4">
              <div className="text-3xl md:text-4xl mb-3">✨</div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                Curious to See the <span className="text-yellow-400">Magic</span>?
              </h3>
              <p className="text-base md:text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
                Take a peek at how we transform boring stores into conversion machines. 
                <span className="text-yellow-400 font-semibold"> No commitment, just pure inspiration.</span>
              </p>
            </div>
            
            <motion.button
              onClick={handleShowExample}
              className="group relative bg-transparent border-2 border-yellow-500/60 hover:border-yellow-400 text-yellow-400 hover:text-yellow-300 font-semibold py-3 md:py-4 px-8 md:px-10 rounded-xl text-base md:text-lg transition-all duration-300 cursor-pointer overflow-hidden"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <span className="relative flex items-center gap-3">
                {isImageVisible ? (
                  <>
                    <span>Hide Preview</span>
                    <span className="text-xl transition-transform group-hover:-translate-y-1">↑</span>
                  </>
                ) : (
                  <>
                    <span>👁️ Take a Look</span>
                    <span className="text-xl transition-transform group-hover:translate-x-1">→</span>
                  </>
                )}
              </span>
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
                  className="rounded-xl overflow-hidden bg-gradient-to-r from-gray-900/90 to-gray-800/90 border border-yellow-500/30 relative max-w-3xl mx-auto p-4 md:p-6 shadow-2xl backdrop-blur-sm"
                >
                  <div className="text-center mb-4">
                    <div className="text-lg md:text-xl font-bold text-white mb-2">
                      <span className="text-red-400">Before</span> vs <span className="text-green-400">After</span>
                    </div>
                    <p className="text-sm text-gray-300">
                      See the dramatic transformation in action
                    </p>
                  </div>
                  
                  <div className="rounded-lg overflow-hidden bg-gray-900 border border-gray-700 shadow-lg">
                    {/* Loading placeholder */}
                    {!isImageLoaded && (
                      <div className="w-full aspect-[1148/1193] bg-gray-800 flex items-center justify-center">
                        <div className="text-gray-400 text-sm flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                          Loading transformation example...
                        </div>
                      </div>
                    )}
                    
                    <Image
                      src="/BEFORE-AFTER-LIQUIFY2.png"
                      alt="Before and After: Store transformation example"
                      width={1148}
                      height={1193}
                      className={`w-full h-auto transition-opacity duration-300 rounded-lg ${
                        isImageLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
                      }`}
                      loading="lazy"
                      quality={85}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkrHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSorjrdOzW8w=="
                      onLoad={() => setIsImageLoaded(true)}
                    />
                  </div>
                  
                  <div className="text-center mt-4">
                    <p className="text-sm text-gray-400">
                      <span className="text-yellow-400 font-semibold">This is what Liquidfy can do for your store</span>
                    </p>
                    <div className="mt-3">
                      <button 
                        onClick={() => document.getElementById('join-waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                        className="text-xs text-yellow-400 hover:text-yellow-300 underline transition-colors"
                      >
                        Ready to transform your store? →
                      </button>
                    </div>
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
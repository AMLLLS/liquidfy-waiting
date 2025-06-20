'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function ModuleSlider() {
  // Mock module images - replace with actual module screenshots
  const modules = [
    { id: 1, name: 'Customer Portal', image: '/modules/customer-portal.png' },
    { id: 2, name: 'Daily Deals', image: '/modules/daily-deals.png' },
    { id: 3, name: 'Ultra Menu', image: '/modules/ultra-menu.png' },
    { id: 4, name: 'Social Share', image: '/modules/social-share.png' },
    { id: 5, name: 'Gift Cards', image: '/modules/gift-cards.png' },
    { id: 6, name: 'Stock Alert', image: '/modules/stock-alert.png' },
    { id: 7, name: 'Wishlist Pro', image: '/modules/wishlist-pro.png' },
    { id: 8, name: 'Bundle Builder', image: '/modules/bundle-builder.png' },
  ]

  // Duplicate modules for seamless infinite scroll
  const duplicatedModules = [...modules, ...modules]

  return (
    <div className="relative w-screen -mx-4 md:-mx-6 lg:w-auto lg:mx-8 xl:mx-16 overflow-hidden py-8">
      {/* Slider container with CSS mask for true fade */}
      <div className="flex justify-center">
        <div 
          className="slider-fade-container"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            width: '100%',
            overflow: 'hidden'
          }}
        >
          <motion.div
            className="flex gap-6 md:gap-8"
            animate={{
              x: [0, -1600], // Fixed pixel values instead of percentage
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ width: `${duplicatedModules.length * 200}px` }}
          >
            {duplicatedModules.map((module, index) => (
              <motion.div
                key={`${module.id}-${index}`}
                className="flex-shrink-0 w-48 md:w-56 h-32 md:h-36 relative group"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {/* Module card */}
                <div className="w-full h-full glass-effect rounded-xl overflow-hidden border border-white/10 hover:border-primary-500/30 transition-all duration-300">
                  {/* Placeholder for module image */}
                  <div className="w-full h-full bg-gradient-to-br from-primary-500/20 to-purple-500/20 flex items-center justify-center relative">
                    {/* Module icon/preview */}
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-2 bg-white/10 rounded-lg flex items-center justify-center">
                        <span className="text-xl">📦</span>
                      </div>
                      <p className="text-xs text-gray-300 font-medium px-2 leading-tight">
                        {module.name}
                      </p>
                    </div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
} 
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function ModuleSlider() {
  // Modules with real module images
  const modules = [
    { 
      id: 1, 
      name: 'Customer Portal', 
      description: 'Complete customer dashboard',
      image: '/modules/customer-portal.jpg',
      gradient: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-500/30'
    },
    { 
      id: 2, 
      name: 'Daily Deals', 
      description: 'Flash sales & promotions',
      image: '/modules/daily-deals.jpg',
      gradient: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-500/30'
    },
    { 
      id: 3, 
      name: 'Ultra Menu', 
      description: 'Advanced navigation system',
      image: '/modules/ultra-menu.jpg',
      gradient: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-500/30'
    },
    { 
      id: 4, 
      name: 'Social Share', 
      description: 'Boost social engagement',
      image: '/modules/social-share.jpg',
      gradient: 'from-orange-500/20 to-red-500/20',
      borderColor: 'border-orange-500/30'
    },
    { 
      id: 5, 
      name: 'Gift Cards', 
      description: 'Digital gift card system',
      image: '/modules/gift-cards.jpg',
      gradient: 'from-yellow-500/20 to-amber-500/20',
      borderColor: 'border-yellow-500/30'
    },
    { 
      id: 6, 
      name: 'Stock Alert', 
      description: 'Inventory notifications',
      image: '/modules/stock-alert.jpg',
      gradient: 'from-indigo-500/20 to-blue-500/20',
      borderColor: 'border-indigo-500/30'
    },
    { 
      id: 7, 
      name: 'Wishlist Pro', 
      description: 'Advanced wishlist features',
      image: '/modules/wishlist-pro.jpg',
      gradient: 'from-pink-500/20 to-rose-500/20',
      borderColor: 'border-pink-500/30'
    },
    { 
      id: 8, 
      name: 'Bundle Builder', 
      description: 'Create product bundles',
      image: '/modules/bundle-builder.jpg',
      gradient: 'from-teal-500/20 to-cyan-500/20',
      borderColor: 'border-teal-500/30'
    },
  ]

  // Duplicate modules for seamless infinite scroll
  const duplicatedModules = [...modules, ...modules]

  return (
    <div className="relative w-screen -mx-4 md:-mx-6 lg:w-auto lg:mx-8 xl:mx-16 overflow-hidden pb-16">
      {/* Slider container with increased padding to prevent clipping */}
      <div className="flex justify-center">
        <div 
          className="slider-fade-container"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            width: '100%',
            overflow: 'hidden',
            paddingTop: '20px', // Extra padding to prevent clipping on hover
            paddingBottom: '20px'
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
                className="flex-shrink-0 w-48 md:w-56 relative group"
                {...(typeof window !== 'undefined' && window.innerWidth >= 1024 ? {
                  whileHover: { 
                    scale: 1.05,
                    y: -8
                  },
                  transition: { 
                    duration: 0.3,
                    type: "spring",
                    stiffness: 300
                  }
                } : {})}
              >
                {/* Module card with modern design */}
                <div className={`relative w-full h-40 md:h-44 glass-effect rounded-2xl overflow-hidden border ${module.borderColor} lg:hover:border-opacity-60 transition-all duration-300 lg:group-hover:shadow-2xl lg:group-hover:shadow-primary-500/10`}>
                  {/* Module image with 16:9 aspect ratio */}
                  <div className="relative w-full h-24 md:h-28 overflow-hidden">
                                          <Image
                        src={module.image}
                        alt={module.name}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          // Fallback to placeholder if image doesn't exist
                          const target = e.target as HTMLImageElement;
                          target.src = '/previewappm1.png';
                        }}
                      />
                  </div>
                  
                  {/* Content below image */}
                  <div className="relative z-10 p-4 h-16 md:h-16 flex flex-col justify-center">
                    <div className="text-center">
                      <h3 className="text-white font-semibold text-sm md:text-base mb-1 lg:group-hover:text-primary-200 transition-colors duration-300 leading-tight">
                        {module.name}
                      </h3>
                      <p className="text-gray-400 text-xs leading-tight lg:group-hover:text-gray-300 transition-colors duration-300">
                        {module.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Hover glow effect - desktop only */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Animated border - desktop only */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300" 
                       style={{
                         background: `linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)`,
                         backgroundSize: '200% 200%',
                         animation: 'shimmer 2s infinite'
                       }} 
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
} 
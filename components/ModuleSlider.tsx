'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function ModuleSlider() {
  // Modules with real module images
  const modules = [
    { 
      id: 1, 
      name: 'Social Media Video', 
      description: 'Viral Social Media video module',
      image: '/modules/customer-portal.jpg',
      gradient: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-500/30'
    },
    { 
      id: 2, 
      name: 'Mother Days Sale', 
      description: 'Flash sales & promotions',
      image: '/modules/daily-deals.jpg',
      gradient: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-500/30'
    },
    { 
      id: 3, 
      name: 'Bundle Explainer', 
      description: 'Advanced Bundle/Pack Explainer',
      image: '/modules/ultra-menu.jpg',
      gradient: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-500/30'
    },
    { 
      id: 4, 
      name: 'Trusted Reviews', 
      description: 'Reviews & ratings system',
      image: '/modules/social-share.jpg',
      gradient: 'from-orange-500/20 to-red-500/20',
      borderColor: 'border-orange-500/30'
    },
    { 
      id: 5, 
      name: 'Icon & Details with Title', 
      description: 'Catchy module with icon & details',
      image: '/modules/gift-cards.jpg',
      gradient: 'from-yellow-500/20 to-amber-500/20',
      borderColor: 'border-yellow-500/30'
    },
    { 
      id: 6, 
      name: 'Cart Countdown Timer', 
      description: 'Countdown timer for cart',
      image: '/modules/stock-alert.jpg',
      gradient: 'from-indigo-500/20 to-blue-500/20',
      borderColor: 'border-indigo-500/30'
    },
    { 
      id: 7, 
      name: 'Payment Gateway', 
      description: 'Klarna 4 parts payment module',
      image: '/modules/wishlist-pro.jpg',
      gradient: 'from-pink-500/20 to-rose-500/20',
      borderColor: 'border-pink-500/30'
    },
    { 
      id: 8, 
      name: 'Customer Satisfaction', 
      description: 'Satisfaction Trust module',
      image: '/modules/bundle-builder.jpg',
      gradient: 'from-teal-500/20 to-cyan-500/20',
      borderColor: 'border-teal-500/30'
    },
    { 
      id: 9, 
      name: 'Money Back Guarantee', 
      description: 'Usefull section for trust',
      image: '/modules/moneyback-guaranteed.jpg',
      gradient: 'from-teal-500/20 to-cyan-500/20',
      borderColor: 'border-teal-500/30'
    },
  ]

  // Triple the modules for truly seamless infinite scroll
  const duplicatedModules = [...modules, ...modules, ...modules]

  return (
    <div className="relative w-screen -mx-4 md:-mx-6 lg:w-auto lg:mx-8 xl:mx-16 overflow-hidden pb-8 -mt-2 md:-mt-4">
      {/* Slider container with increased padding to prevent clipping */}
      <div className="flex justify-center">
        <div 
          className="slider-fade-container"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            width: '100%',
            overflow: 'hidden', // Extra padding to prevent clipping on hover
            paddingBottom: '40px' // More padding at bottom for dropshadows
          }}
        >
          <motion.div
            className="flex gap-6 md:gap-8"
            style={{ 
              width: `${duplicatedModules.length * 200}px`,
              animation: "slideInfiniteLarge 30s linear infinite"
            }}
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
                <div className={`relative w-full h-40 md:h-44 bg-gray-800/90 rounded-2xl overflow-hidden border border-gray-700 lg:hover:border-opacity-60 transition-all duration-300 lg:group-hover:shadow-2xl lg:group-hover:shadow-blue-500/20`}>
                  {/* Module image with 16:9 aspect ratio */}
                  <div className="relative w-full h-24 md:h-28 overflow-hidden">
                                          <Image
                        src={module.image}
                        alt={module.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 192px, 224px"
                        priority={index < 8} // Priorité pour les 8 premières images
                      />
                  </div>
                  
                  {/* Content below image */}
                  <div className="relative z-10 p-4 h-16 md:h-16 flex flex-col justify-center">
                    <div className="text-center">
                      <h3 className="text-white font-semibold text-sm md:text-base mb-1 lg:group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                        {module.name}
                      </h3>
                      <p className="text-gray-300 text-xs leading-tight lg:group-hover:text-gray-200 transition-colors duration-300">
                        {module.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Hover glow effect - desktop only */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Animated border - desktop only */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300" 
                       style={{
                         background: `linear-gradient(45deg, transparent 30%, rgba(59, 130, 246, 0.1) 50%, transparent 70%)`,
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
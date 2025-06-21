'use client'

import { motion } from 'framer-motion'

export default function ModuleSlider() {
  // Modules with modern icons and descriptions
  const modules = [
    { 
      id: 1, 
      name: 'Customer Portal', 
      description: 'Complete customer dashboard',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      gradient: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-500/30'
    },
    { 
      id: 2, 
      name: 'Daily Deals', 
      description: 'Flash sales & promotions',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      gradient: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-500/30'
    },
    { 
      id: 3, 
      name: 'Ultra Menu', 
      description: 'Advanced navigation system',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      ),
      gradient: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-500/30'
    },
    { 
      id: 4, 
      name: 'Social Share', 
      description: 'Boost social engagement',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg>
      ),
      gradient: 'from-orange-500/20 to-red-500/20',
      borderColor: 'border-orange-500/30'
    },
    { 
      id: 5, 
      name: 'Gift Cards', 
      description: 'Digital gift card system',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
      gradient: 'from-yellow-500/20 to-amber-500/20',
      borderColor: 'border-yellow-500/30'
    },
    { 
      id: 6, 
      name: 'Stock Alert', 
      description: 'Inventory notifications',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 00-9.797 2.11l1.454 1.454a4 4 0 015.656 0l.707.707a1 1 0 001.414-1.414l-.707-.707a6 6 0 00-8.485 0 6 6 0 000 8.485 6 6 0 008.485 0l.707-.707a1 1 0 00-1.414-1.414l-.707.707a4 4 0 01-5.656 0z" />
        </svg>
      ),
      gradient: 'from-indigo-500/20 to-blue-500/20',
      borderColor: 'border-indigo-500/30'
    },
    { 
      id: 7, 
      name: 'Wishlist Pro', 
      description: 'Advanced wishlist features',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      gradient: 'from-pink-500/20 to-rose-500/20',
      borderColor: 'border-pink-500/30'
    },
    { 
      id: 8, 
      name: 'Bundle Builder', 
      description: 'Create product bundles',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      gradient: 'from-teal-500/20 to-cyan-500/20',
      borderColor: 'border-teal-500/30'
    },
  ]

  // Duplicate modules for seamless infinite scroll
  const duplicatedModules = [...modules, ...modules]

  return (
    <div className="relative w-screen -mx-4 md:-mx-6 lg:w-auto lg:mx-8 xl:mx-16 overflow-hidden py-12">
      {/* Slider container with increased height to prevent clipping */}
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
                className="flex-shrink-0 w-48 md:w-56 relative group"
                whileHover={{ 
                  scale: 1.05,
                  y: -8
                }}
                transition={{ 
                  duration: 0.3,
                  type: "spring",
                  stiffness: 300
                }}
              >
                {/* Module card with modern design */}
                <div className={`relative w-full h-40 md:h-44 glass-effect rounded-2xl overflow-hidden border ${module.borderColor} hover:border-opacity-60 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-primary-500/10`}>
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${module.gradient}`} />
                  
                  {/* Content */}
                  <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                    {/* Icon container */}
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-white group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                        {module.icon}
                      </div>
                    </div>
                    
                    {/* Text content */}
                    <div className="text-center">
                      <h3 className="text-white font-semibold text-sm md:text-base mb-1 group-hover:text-primary-200 transition-colors duration-300">
                        {module.name}
                      </h3>
                      <p className="text-gray-400 text-xs leading-tight group-hover:text-gray-300 transition-colors duration-300">
                        {module.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Animated border */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
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
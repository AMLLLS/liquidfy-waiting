'use client'

import { motion } from 'framer-motion'

export default function SimpleBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
      {/* Main animated gradient orbs */}
      <motion.div
        className="absolute -top-40 -left-40 w-80 h-80 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(147, 51, 234, 0.2) 50%, transparent 70%)'
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.3, 0.2],
          x: [0, 20, 0],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 70%)'
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.25, 0.15],
          x: [0, -25, 0],
          y: [0, 10, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Additional animated gradient layers */}
      <motion.div
        className="absolute top-1/3 left-1/2 w-64 h-64 rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 60%)',
          transform: 'translate(-50%, -50%)'
        }}
        animate={{
          scale: [0.8, 1.1, 0.8],
          opacity: [0.15, 0.25, 0.15],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/4 w-48 h-48 rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, rgba(79, 70, 229, 0.2) 50%, transparent 70%)'
        }}
        animate={{
          scale: [1, 0.7, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Subtle geometric shapes with enhanced animations */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-32 h-32 border border-blue-300/30 rounded-full"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
          borderColor: ['rgba(59, 130, 246, 0.3)', 'rgba(147, 51, 234, 0.4)', 'rgba(59, 130, 246, 0.3)'],
        }}
        transition={{
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          borderColor: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      <motion.div
        className="absolute bottom-1/3 left-1/5 w-24 h-24 border border-purple-300/30"
        style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
        animate={{
          rotate: [0, 360],
          y: [0, -20, 0],
          borderColor: ['rgba(147, 51, 234, 0.3)', 'rgba(59, 130, 246, 0.4)', 'rgba(147, 51, 234, 0.3)'],
        }}
        transition={{
          rotate: { duration: 15, repeat: Infinity, ease: "linear" },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          borderColor: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Enhanced floating dots with gradient colors */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full"
          style={{
            left: `${15 + (i % 4) * 25}%`,
            top: `${25 + Math.floor(i / 4) * 50}%`,
            background: i % 2 === 0 
              ? 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, transparent 70%)'
          }}
          animate={{
            y: [0, -25, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 5 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Animated mesh gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)
          `
        }}
        animate={{
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  )
} 
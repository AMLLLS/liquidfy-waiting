'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function FloatingElements() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const floatingElements = [
    { icon: '⚡', size: 'text-3xl', delay: 0 },
    { icon: '🚀', size: 'text-4xl', delay: 0.5 },
    { icon: '💎', size: 'text-2xl', delay: 1 },
    { icon: '🎯', size: 'text-3xl', delay: 1.5 },
    { icon: '✨', size: 'text-2xl', delay: 2 },
    { icon: '🔥', size: 'text-3xl', delay: 2.5 },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
      {/* Floating Icons */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute ${element.size} opacity-20 hover:opacity-40 transition-opacity duration-300`}
          style={{
            left: `${15 + (index % 3) * 30}%`,
            top: `${20 + Math.floor(index / 3) * 40}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 6 + index,
            repeat: Infinity,
            delay: element.delay,
            ease: "easeInOut"
          }}
        >
          {element.icon}
        </motion.div>
      ))}

      {/* Interactive Cursor Followers */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`cursor-${i}`}
          className="absolute w-4 h-4 bg-primary-500/20 rounded-full"
          animate={{
            x: mousePosition.x * (3 + i) + '%',
            y: mousePosition.y * (3 + i) + '%',
          }}
          transition={{
            type: "spring",
            stiffness: 50 - i * 10,
            damping: 20 + i * 5,
          }}
          style={{
            transform: `translate(-50%, -50%)`,
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)',
          }}
        />
      ))}

      {/* Geometric Shapes */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-32 h-32 border-2 border-purple-500/20 rounded-full"
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/4 w-24 h-24 border-2 border-primary-500/20"
        style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
        animate={{
          rotate: [0, 120, 240, 360],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-1/3 left-1/6 w-64 h-64 rounded-full blur-xl"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 100%)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-1/3 right-1/6 w-48 h-48 rounded-full blur-xl"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 100%)'
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.6, 0.3, 0.6],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  )
} 
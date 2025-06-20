'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function ConfettiEffect() {
  const [confetti, setConfetti] = useState<Array<{
    id: number
    x: number
    y: number
    color: string
    size: number
    rotation: number
    velocity: { x: number; y: number }
  }>>([])

  useEffect(() => {
    const colors = ['#4f46e5', '#7c3aed', '#a855f7', '#ec4899', '#f59e0b', '#10b981']
    const newConfetti = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: -10,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      rotation: Math.random() * 360,
      velocity: {
        x: (Math.random() - 0.5) * 4,
        y: Math.random() * 3 + 2,
      },
    }))

    setConfetti(newConfetti)

    const interval = setInterval(() => {
      setConfetti(prev => 
        prev.map(piece => ({
          ...piece,
          x: piece.x + piece.velocity.x,
          y: piece.y + piece.velocity.y,
          rotation: piece.rotation + 2,
        })).filter(piece => piece.y < window.innerHeight + 50)
      )
    }, 16)

    const timeout = setTimeout(() => {
      clearInterval(interval)
      setConfetti([])
    }, 5000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confetti.map(piece => (
        <motion.div
          key={piece.id}
          className="absolute"
          style={{
            left: piece.x,
            top: piece.y,
            backgroundColor: piece.color,
            width: piece.size,
            height: piece.size,
            borderRadius: '50%',
            transform: `rotate(${piece.rotation}deg)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.8, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
} 
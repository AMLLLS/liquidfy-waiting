'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function WireframeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const drawWireframe = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Set line style
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.1)'
      ctx.lineWidth = 1

      const time = Date.now() * 0.001
      const gridSize = 50

      // Draw animated grid
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const offset = Math.sin(time + x * 0.01 + y * 0.01) * 10
          
          ctx.beginPath()
          ctx.moveTo(x, y + offset)
          ctx.lineTo(x + gridSize, y + offset)
          ctx.moveTo(x + offset, y)
          ctx.lineTo(x + offset, y + gridSize)
          ctx.stroke()
        }
      }

      // Draw floating wireframe boxes
      const boxes = 8
      for (let i = 0; i < boxes; i++) {
        const x = (canvas.width / boxes) * i + Math.sin(time + i) * 50
        const y = canvas.height / 2 + Math.cos(time + i * 0.5) * 100
        const size = 30 + Math.sin(time * 2 + i) * 10

        ctx.strokeStyle = `rgba(99, 102, 241, ${0.2 + Math.sin(time + i) * 0.1})`
        ctx.strokeRect(x - size/2, y - size/2, size, size)
        
        // Draw connecting lines
        if (i > 0) {
          const prevX = (canvas.width / boxes) * (i-1) + Math.sin(time + (i-1)) * 50
          const prevY = canvas.height / 2 + Math.cos(time + (i-1) * 0.5) * 100
          
          ctx.beginPath()
          ctx.moveTo(prevX, prevY)
          ctx.lineTo(x, y)
          ctx.stroke()
        }
      }
    }

    const animate = () => {
      drawWireframe()
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />
      
      {/* Static wireframe elements for mobile fallback */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute wireframe-box rounded-lg"
            style={{
              left: `${10 + (i % 4) * 25}%`,
              top: `${10 + Math.floor(i / 4) * 30}%`,
              width: `${60 + (i % 3) * 20}px`,
              height: `${60 + (i % 3) * 20}px`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </>
  )
} 
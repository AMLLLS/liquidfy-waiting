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

    const drawModernPattern = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const time = Date.now() * 0.0005
      
      // Modern geometric grid with better spacing
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.08)'
      ctx.lineWidth = 1

      const gridSize = 80
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const opacity = 0.05 + Math.sin(time + x * 0.01 + y * 0.01) * 0.03
          ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`
          
          ctx.beginPath()
          ctx.rect(x, y, gridSize, gridSize)
          ctx.stroke()
        }
      }

      // Floating modern cards/modules representation
      const modules = 6
      for (let i = 0; i < modules; i++) {
        const centerX = canvas.width * (0.2 + (i % 3) * 0.3)
        const centerY = canvas.height * (0.3 + Math.floor(i / 3) * 0.4)
        const offsetX = Math.sin(time + i * 1.2) * 30
        const offsetY = Math.cos(time + i * 0.8) * 20
        
        const x = centerX + offsetX
        const y = centerY + offsetY
        const width = 120
        const height = 80
        
        // Card-like modules with modern design
        const opacity = 0.1 + Math.sin(time + i) * 0.05
        
        // Main module card
        ctx.fillStyle = `rgba(99, 102, 241, ${opacity})`
        ctx.fillRect(x - width/2, y - height/2, width, height)
        
        // Module border
        ctx.strokeStyle = `rgba(99, 102, 241, ${opacity + 0.1})`
        ctx.lineWidth = 1
        ctx.strokeRect(x - width/2, y - height/2, width, height)
        
        // Module content lines (representing text/content)
        ctx.strokeStyle = `rgba(167, 139, 250, ${opacity + 0.15})`
        ctx.lineWidth = 2
        const lineSpacing = 12
        for (let line = 0; line < 4; line++) {
          const lineY = y - height/2 + 15 + line * lineSpacing
          const lineWidth = line === 0 ? width * 0.6 : width * 0.8
          ctx.beginPath()
          ctx.moveTo(x - lineWidth/2, lineY)
          ctx.lineTo(x + lineWidth/2, lineY)
          ctx.stroke()
        }
        
        // Connection lines between modules
        if (i > 0 && i % 3 !== 0) {
          const prevCenterX = canvas.width * (0.2 + ((i-1) % 3) * 0.3)
          const prevCenterY = canvas.height * (0.3 + Math.floor((i-1) / 3) * 0.4)
          const prevOffsetX = Math.sin(time + (i-1) * 1.2) * 30
          const prevOffsetY = Math.cos(time + (i-1) * 0.8) * 20
          
          ctx.strokeStyle = `rgba(99, 102, 241, ${opacity * 0.5})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(prevCenterX + prevOffsetX, prevCenterY + prevOffsetY)
          ctx.lineTo(x, y)
          ctx.stroke()
        }
      }
      
      // Subtle particles for tech feel
      const particles = 25
      for (let i = 0; i < particles; i++) {
        const x = (canvas.width * Math.sin(time * 0.5 + i)) % canvas.width
        const y = (canvas.height * 0.3 + Math.cos(time * 0.3 + i * 2) * canvas.height * 0.4)
        const size = 1 + Math.sin(time * 2 + i) * 0.5
        const opacity = 0.3 + Math.sin(time + i) * 0.2
        
        ctx.fillStyle = `rgba(167, 139, 250, ${opacity})`
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const animate = () => {
      drawModernPattern()
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
      
      {/* Modern floating elements for mobile/fallback */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-r from-primary-500/10 to-purple-500/10 border border-primary-500/20 rounded-xl"
            style={{
              left: `${15 + (i % 3) * 30}%`,
              top: `${20 + Math.floor(i / 3) * 25}%`,
              width: `${100 + (i % 2) * 40}px`,
              height: `${60 + (i % 2) * 20}px`,
            }}
            animate={{
              y: [0, -15, 0],
              x: [0, 10, 0],
              rotateX: [0, 2, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 6 + (i % 3),
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          >
            {/* Module content representation */}
            <div className="p-3 h-full flex flex-col justify-center">
              <div className="h-1 bg-gradient-to-r from-primary-400/30 to-transparent rounded mb-2"></div>
              <div className="h-1 bg-gradient-to-r from-purple-400/20 to-transparent rounded mb-2"></div>
              <div className="h-1 bg-gradient-to-r from-primary-400/25 to-transparent rounded w-3/4"></div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  )
} 
'use client'

import { useEffect, useState } from 'react'
import { useMetaPixel } from '../hooks/useMetaPixel'

export const ScrollTracker = () => {
  const { trackScrollDepth } = useMetaPixel()
  const [scrollEvents, setScrollEvents] = useState<Set<number>>(new Set())

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      )

      // Tracker à 25%, 50%, 75% et 100%
      const milestones = [25, 50, 75, 100]
      
      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !scrollEvents.has(milestone)) {
          trackScrollDepth(milestone)
          setScrollEvents(prev => new Set(Array.from(prev).concat(milestone)))
        }
      })
    }

    // Débounce pour éviter trop d'événements
    let ticking = false
    const scrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', scrollHandler, { passive: true })
    
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [trackScrollDepth, scrollEvents])

  return null // Composant invisible
}

export default ScrollTracker 
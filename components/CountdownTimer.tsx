'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface CountdownTimerProps {
  targetDate?: Date
  onExpire?: () => void
  className?: string
}

export default function CountdownTimer({ 
  targetDate, 
  onExpire,
  className = ""
}: CountdownTimerProps) {
  // Default to 7 days from now if no target date provided
  const defaultTarget = new Date()
  defaultTarget.setDate(defaultTarget.getDate() + 7)
  
  const target = targetDate || defaultTarget
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const targetTime = target.getTime()
      const difference = targetTime - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        if (onExpire) onExpire()
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [target, onExpire])

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-white border border-gray-300 rounded-lg px-3 py-2 min-w-[3rem] text-center shadow-sm">
        <span className="text-xl md:text-2xl font-bold text-gray-900">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-xs md:text-sm text-gray-600 mt-1 uppercase tracking-wider">
        {label}
      </span>
    </div>
  )

  return (
    <div className={`flex items-center justify-center gap-2 md:gap-4 ${className}`}>
      <TimeUnit value={timeLeft.days} label="Days" />
      <span className="text-gray-600 text-xl md:text-2xl font-bold">:</span>
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <span className="text-gray-600 text-xl md:text-2xl font-bold">:</span>
      <TimeUnit value={timeLeft.minutes} label="Min" />
      <span className="text-gray-600 text-xl md:text-2xl font-bold">:</span>
      <TimeUnit value={timeLeft.seconds} label="Sec" />
    </div>
  )
} 
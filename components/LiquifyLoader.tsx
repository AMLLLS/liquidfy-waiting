'use client';

import { motion } from 'framer-motion';

export default function LiquifyLoader() {
  return (
    <div className="fixed inset-0 bg-gray-950 z-50 flex items-center justify-center">
      {/* Background gradient animation */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(circle at 20% 20%, #4f46e5 0%, transparent 50%)',
            'radial-gradient(circle at 80% 80%, #7c3aed 0%, transparent 50%)',
            'radial-gradient(circle at 20% 80%, #ec4899 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, #f59e0b 0%, transparent 50%)',
            'radial-gradient(circle at 20% 20%, #4f46e5 0%, transparent 50%)',
          ]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="relative z-10 text-center">
        {/* Main loader container */}
        <div className="relative mb-8">
          {/* Outer ring */}
          <motion.div
            className="w-24 h-24 rounded-full border-4"
            style={{
              borderColor: 'transparent',
              background: 'conic-gradient(from 0deg, #4f46e5, #7c3aed, #ec4899, #f59e0b, #10b981, #4f46e5)',
              borderRadius: '50%',
              padding: '4px',
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="w-full h-full bg-gray-950 rounded-full"></div>
          </motion.div>
          
          {/* Inner rotating dots */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background: `linear-gradient(45deg, ${
                    i === 0 ? '#4f46e5, #7c3aed' :
                    i === 1 ? '#7c3aed, #ec4899' :
                    i === 2 ? '#ec4899, #f59e0b' :
                    '#f59e0b, #10b981'
                  })`,
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) translate(${Math.cos((i * Math.PI) / 2) * 30}px, ${Math.sin((i * Math.PI) / 2) * 30}px)`,
                }}
                animate={{
                  rotate: -360,
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  rotate: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  },
                  scale: {
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2
                  }
                }}
              />
            ))}
          </div>
          
          {/* Center logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xl"
              style={{
                background: 'linear-gradient(135deg, #4f46e5, #7c3aed)'
              }}
              animate={{
                scale: [1, 1.1, 1],
                rotateY: [0, 180, 360],
              }}
              transition={{
                scale: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                rotateY: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              L
            </motion.div>
          </div>
        </div>
        
        {/* Loading text with typing effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-white"
        >
          <motion.h2
            className="text-2xl font-semibold mb-2"
            style={{
              background: 'linear-gradient(90deg, #4f46e5, #7c3aed, #ec4899, #f59e0b, #10b981)',
              backgroundSize: '300% 100%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            Liquify
          </motion.h2>
          
          <motion.div
            className="flex items-center justify-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span className="text-gray-400 text-sm">Loading</span>
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="text-gray-400 text-sm"
                animate={{
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2
                }}
              >
                .
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Progress bar */}
        <motion.div
          className="mt-8 w-64 h-1 bg-gray-800 rounded-full overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #4f46e5, #7c3aed, #ec4899, #f59e0b, #10b981)',
            }}
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            transition={{
              duration: 3,
              ease: "easeOut"
            }}
          />
        </motion.div>
      </div>
    </div>
  );
} 
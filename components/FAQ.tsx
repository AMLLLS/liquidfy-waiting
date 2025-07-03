'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  id: number
  question: string
  answer: string
}

export default function FAQ() {
  const [openItem, setOpenItem] = useState<number | null>(null)

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "How does Liquidfy work? Do I need coding skills?",
      answer: "Liquidfy is 100% no-code. Simply copy our optimized modules and paste them into your Shopify theme. Each module & sections comes with step-by-step instructions and can be installed in under 5 minutes. No developers needed!"
    },
    {
      id: 2,
      question: "What's included in the early access package?",
      answer: "You get 100+ conversion-tested modules + 120+ premium Shopify sections, lifetime updates, priority support, and exclusive launch discount (2K$ net worth Library). All modules are tested on 7-figure stores for maximum conversion rates."
    },
    {
      id: 3,
      question: "Will these modules work with my current theme?",
      answer: "Yes! Our modules are designed to work with any Shopify theme. They're built using standard Liquid code and modern CSS that integrates seamlessly. If you encounter any compatibility issues, our team provides free installation support."
    },
    {
      id: 4,
      question: "How is this different from expensive themes or plugins?",
      answer: "Instead of paying $300+ for a single theme or multiple plugin subscriptions, you get everything in one package. Our modules are modular - use only what you need, when you need it. Plus, you own them forever with no monthly fees."
    },
    {
      id: 5,
      question: "When will Liquidfy be available and how much will it cost?",
      answer: "Liquidfy launches in July 2025. Early access subscribers get exclusive pricing at $99 (regular price $199) and will be the first to access all modules and sections. Join the waitlist now to secure your early bird discount!"
    }
  ]

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id)
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Frequently Asked <span className="gradient-text">Questions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 text-base md:text-lg"
          >
            Everything you need to know about Liquidfy
          </motion.p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="glass-effect rounded-xl border border-gray-700/50 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full p-3 md:p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-300 group"
              >
                <h3 className="text-white font-medium text-sm md:text-lg pr-4 group-hover:text-primary-200 transition-colors">
                  {item.question}
                </h3>
                <motion.div
                  animate={{ rotate: openItem === item.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-primary-400 transition-colors" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openItem === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-3 md:px-6 pb-3 md:pb-6 pt-0">
                      <div className="border-t border-gray-700/30 pt-3 md:pt-4">
                        <p className="text-gray-300 leading-relaxed text-xs md:text-base">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Call-to-action at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-center mt-8 md:mt-12"
        >
          <div className="bg-gradient-to-r from-primary-500/10 to-purple-500/10 border border-primary-500/20 rounded-xl p-4 md:p-6">
            <h4 className="text-white font-semibold mb-2 text-lg">
              Still have questions?
            </h4>
            <p className="text-gray-300 text-sm md:text-base mb-4">
              Join our early access list and get direct access to our team for any questions.
            </p>
            <div className="text-center">
              <a 
                href="mailto:contact@liquidfy.app" 
                className="text-primary-400 hover:text-primary-300 transition-colors font-medium"
              >
                contact@liquidfy.app
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
} 
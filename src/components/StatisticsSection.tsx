'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Statistic {
  label: string
  value: number
  icon?: string
}

interface StatisticsSectionProps {
  statistics: Statistic[]
}

const CountUp = ({ end, duration = 2 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const increment = end / (duration * 60)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [end, duration])

  return <span>{count.toLocaleString()}</span>
}

const StatisticsSection = ({ statistics }: StatisticsSectionProps) => {
  if (!statistics || statistics.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-primary-dark text-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8"
        >
          {statistics.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              {stat.icon && (
                <div className="text-4xl mb-4">{stat.icon}</div>
              )}
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <CountUp end={stat.value} />
              </div>
              <div className="text-lg text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default StatisticsSection

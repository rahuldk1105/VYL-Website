'use client'

import SafeImage from '@/components/SafeImage'
import { motion } from 'framer-motion'

interface MissionSectionProps {
  missionText: string
  missionImages: string[]
}

const MissionSection = ({ missionText, missionImages }: MissionSectionProps) => {
  if (!missionText || !missionImages || missionImages.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-off-white">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-dark">
              Our Mission
            </h2>
            <div className="text-lg text-gray-text leading-relaxed space-y-4">
              {missionText.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {missionImages.slice(0, 3).map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative rounded-xl overflow-hidden shadow-lg ${
                    index === 0 ? 'col-span-2 h-64' : 'h-48'
                  }`}
                >
                  <SafeImage
                    src={image}
                    alt={`Mission image ${index + 1}`}
                    fill
                    className="w-full h-full object-cover"
                    fallback="/window.svg"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default MissionSection

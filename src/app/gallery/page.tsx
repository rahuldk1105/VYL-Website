'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Camera, Download, Zap } from 'lucide-react'

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black z-0" />
      <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500/10 via-transparent to-transparent opacity-30 animate-pulse-slow z-0" />

      <div className="container relative z-10 px-4 md:px-0 flex flex-col items-center text-center">
        {/* Animated Icon Container */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, duration: 1.5 }}
          className="relative mb-8"
        >
          <div className="absolute inset-0 bg-gold blur-2xl opacity-20" />
          <div className="relative bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm">
            <Camera className="w-16 h-16 md:w-24 md:h-24 text-gold drop-shadow-lg" />
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
              className="absolute top-4 right-4"
            >
              <Zap className="w-6 h-6 text-white fill-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-6 bg-gradient-to-br from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
            Coming Soon
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="space-y-6"
          >
            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
              Get ready for a <span className="text-gold font-bold">seamless</span> digital experience.
            </p>

            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              Soon, all players will be able to access and <span className="text-white border-b border-gold/50 pb-0.5">download all their high-quality match photos</span> instantly after every tournament.
            </p>
          </motion.div>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl"
        >
          {[
            { icon: Camera, text: "Professional Coverage" },
            { icon: Zap, text: "Instant Access" },
            { icon: Download, text: "Free Downloads" }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
              <item.icon className="w-8 h-8 text-gold mb-3" />
              <span className="text-sm font-medium uppercase tracking-wider text-gray-300">{item.text}</span>
            </div>
          ))}
        </motion.div>

        {/* Loading Indicator */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100px" }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
          className="mt-16 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50"
        />
      </div>
    </div>
  )
}

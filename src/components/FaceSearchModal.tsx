'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as faceapi from 'face-api.js'
import { loadModels, getFaceDescriptor } from '@/utils/faceRecognition'
import { supabase } from '@/lib/supabaseClient'
import { Camera, X, Upload, Search, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react'

interface FaceSearchModalProps {
    isOpen: boolean
    onClose: () => void
    eventSlug?: string // Optional: filter results to specific event
    r2Directory?: string // R2 directory to search in
}

type SearchPhase = 'idle' | 'loading-models' | 'scanning-face' | 'searching-database' | 'complete'

export default function FaceSearchModal({ isOpen, onClose, eventSlug, r2Directory }: FaceSearchModalProps) {
    const [isModelLoaded, setIsModelLoaded] = useState(false)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [searchPhase, setSearchPhase] = useState<SearchPhase>('idle')
    const [results, setResults] = useState<string[]>([])
    const [error, setError] = useState<string | null>(null)
    const [scanProgress, setScanProgress] = useState(0)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const imageRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        const initModels = async () => {
            if (isModelLoaded) return
            setSearchPhase('loading-models')
            try {
                await loadModels()
                setIsModelLoaded(true)
                setSearchPhase('idle')
            } catch (err) {
                console.error("Failed to load models", err)
                setError("Failed to load AI models. Please refresh and try again.")
                setSearchPhase('idle')
            }
        }
        if (isOpen) {
            initModels()
        }
    }, [isOpen, isModelLoaded])

    // Reset state when modal closes
    useEffect(() => {
        if (!isOpen) {
            setSelectedImage(null)
            setResults([])
            setError(null)
            setSearchPhase('idle')
            setScanProgress(0)
        }
    }, [isOpen])

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            const imageUrl = URL.createObjectURL(file)
            setSelectedImage(imageUrl)
            setResults([])
            setError(null)

            // Start scanning animation then search
            await handleSearch(imageUrl)
        }
    }

    const handleSearch = async (imageUrl: string) => {
        if (!isModelLoaded) return

        setError(null)
        setScanProgress(0)

        try {
            // Phase 1: Scanning face
            setSearchPhase('scanning-face')

            // Animate progress
            const progressInterval = setInterval(() => {
                setScanProgress(prev => Math.min(prev + 2, 95))
            }, 50)

            const descriptor = await getFaceDescriptor(imageUrl)

            clearInterval(progressInterval)
            setScanProgress(100)

            if (!descriptor) {
                setError("No face detected. Please try a clearer photo with good lighting.")
                setSearchPhase('idle')
                return
            }

            // Phase 2: Searching database
            setSearchPhase('searching-database')
            setScanProgress(0)

            // Fetch face embeddings from the face_embeddings table
            let query = supabase
                .from('face_embeddings')
                .select('id, face_embedding, r2_object_key, event_id')

            // If searching within a specific event
            if (eventSlug) {
                query = query.eq('event_id', eventSlug)
            }

            const { data: allFaces, error: dbError } = await query

            if (dbError) throw dbError

            if (!allFaces || allFaces.length === 0) {
                setError("No faces indexed yet for this gallery.")
                setSearchPhase('idle')
                return
            }

            // Compare faces and find matches
            const matches = allFaces
                .filter(face => face.face_embedding && Array.isArray(face.face_embedding))
                .map(face => ({
                    key: face.r2_object_key,
                    distance: faceapi.euclideanDistance(descriptor, new Float32Array(face.face_embedding))
                }))
                .filter(match => match.distance < 0.6) // Threshold for face match
                .sort((a, b) => a.distance - b.distance)

            if (matches.length === 0) {
                setError("No matches found. Try a different photo or angle.")
                setSearchPhase('idle')
                return
            }

            // Get signed URLs for matched images
            const keys = matches.map(m => m.key)
            const res = await fetch('/api/r2/sign-read', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ keys })
            })

            if (!res.ok) throw new Error('Failed to get image URLs')

            const { urls } = await res.json()
            setResults(urls.map((u: { url: string }) => u.url))
            setSearchPhase('complete')

        } catch (err) {
            console.error(err)
            setError("Something went wrong during the search. Please try again.")
            setSearchPhase('idle')
        }
    }

    if (!isOpen) return null

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-gradient-to-br from-gray-900 via-gray-900 to-black border border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-white/10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-gold to-yellow-600 rounded-xl flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-black" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Find My Photos</h3>
                                <p className="text-sm text-gray-400">AI-powered face recognition</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/10 rounded-full transition-all hover:rotate-90 duration-300"
                        >
                            <X className="w-6 h-6 text-gray-400" />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {searchPhase === 'loading-models' ? (
                            <div className="text-center py-16">
                                <div className="relative w-20 h-20 mx-auto mb-6">
                                    <div className="absolute inset-0 border-4 border-gold/30 rounded-full" />
                                    <div className="absolute inset-0 border-4 border-gold border-t-transparent rounded-full animate-spin" />
                                    <div className="absolute inset-2 border-4 border-gold/50 border-b-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                                </div>
                                <p className="text-white font-medium">Loading AI Models...</p>
                                <p className="text-gray-500 text-sm mt-2">This may take a moment on first load</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Upload Section */}
                                <div className="text-center">
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => fileInputRef.current?.click()}
                                        className={`relative border-2 border-dashed rounded-2xl p-8 cursor-pointer transition-all ${selectedImage
                                                ? 'border-gold/50 bg-gold/5'
                                                : 'border-white/20 hover:border-gold/50 hover:bg-white/5'
                                            }`}
                                    >
                                        {selectedImage ? (
                                            <div className="relative">
                                                {/* Uploaded Image with Scanning Effect */}
                                                <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden">
                                                    <img
                                                        ref={imageRef}
                                                        src={selectedImage}
                                                        alt="Selfie"
                                                        className="w-full h-full object-cover"
                                                    />

                                                    {/* Scanning Animation Overlay */}
                                                    {searchPhase === 'scanning-face' && (
                                                        <>
                                                            {/* Scanning Line */}
                                                            <motion.div
                                                                initial={{ top: 0 }}
                                                                animate={{ top: '100%' }}
                                                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                                                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent"
                                                                style={{ boxShadow: '0 0 20px 5px rgba(255, 215, 0, 0.5)' }}
                                                            />

                                                            {/* Pulsing Border */}
                                                            <div className="absolute inset-0 border-4 border-gold rounded-full animate-pulse" />

                                                            {/* Corner Brackets */}
                                                            <div className="absolute inset-0">
                                                                <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-gold" />
                                                                <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-gold" />
                                                                <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-gold" />
                                                                <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-gold" />
                                                            </div>
                                                        </>
                                                    )}

                                                    {/* Success Checkmark */}
                                                    {searchPhase === 'complete' && (
                                                        <motion.div
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            className="absolute inset-0 bg-green-500/20 flex items-center justify-center"
                                                        >
                                                            <CheckCircle2 className="w-12 h-12 text-green-400" />
                                                        </motion.div>
                                                    )}
                                                </div>

                                                {/* Progress Bar */}
                                                {(searchPhase === 'scanning-face' || searchPhase === 'searching-database') && (
                                                    <div className="mt-6">
                                                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                                            <motion.div
                                                                className="h-full bg-gradient-to-r from-gold to-yellow-400"
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${scanProgress}%` }}
                                                                transition={{ duration: 0.3 }}
                                                            />
                                                        </div>
                                                        <p className="text-sm text-gray-400 mt-2">
                                                            {searchPhase === 'scanning-face' ? 'Detecting face...' : 'Searching gallery...'}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="group">
                                                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-white/10 to-white/5 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                                    <Camera className="w-10 h-10 text-gray-400 group-hover:text-gold transition-colors" />
                                                </div>
                                                <p className="text-lg font-semibold text-white mb-2">Upload Your Selfie</p>
                                                <p className="text-sm text-gray-500">We'll scan the gallery to find your photos</p>
                                            </div>
                                        )}
                                    </motion.div>

                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        capture="user"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />

                                    {selectedImage && searchPhase === 'idle' && (
                                        <button
                                            onClick={() => handleSearch(selectedImage)}
                                            className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-gold text-black font-bold rounded-full hover:bg-yellow-400 transition-colors"
                                        >
                                            <Search className="w-5 h-5" />
                                            Search Again
                                        </button>
                                    )}
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3"
                                    >
                                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                                        <p className="text-red-400">{error}</p>
                                    </motion.div>
                                )}

                                {/* Results */}
                                {results.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="text-lg font-bold text-white flex items-center gap-2">
                                                <CheckCircle2 className="w-5 h-5 text-green-400" />
                                                Found {results.length} Photo{results.length > 1 ? 's' : ''}!
                                            </h4>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                            {results.map((url, idx) => (
                                                <motion.a
                                                    key={idx}
                                                    href={url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: idx * 0.1 }}
                                                    className="aspect-square rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-gold/50 transition-all group"
                                                >
                                                    <img
                                                        src={url}
                                                        alt={`Match ${idx + 1}`}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                </motion.a>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

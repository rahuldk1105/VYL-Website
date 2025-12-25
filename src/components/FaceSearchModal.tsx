'use client'

import React, { useState, useEffect, useRef } from 'react'
import * as faceapi from 'face-api.js'
import { loadModels, getFaceDescriptor } from '@/utils/faceRecognition'
import { supabase } from '@/lib/supabaseClient'
import { Camera, X, Upload, Search, AlertCircle } from 'lucide-react'

interface FaceSearchModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function FaceSearchModal({ isOpen, onClose }: FaceSearchModalProps) {
    const [isModelLoaded, setIsModelLoaded] = useState(false)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [isSearching, setIsSearching] = useState(false)
    const [results, setResults] = useState<string[]>([])
    const [error, setError] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const initModels = async () => {
            try {
                await loadModels()
                setIsModelLoaded(true)
            } catch (err) {
                console.error("Failed to load models", err)
                setError("Failed to load AI models. Please try again.")
            }
        }
        if (isOpen) {
            initModels()
        }
    }, [isOpen])

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            const imageUrl = URL.createObjectURL(file)
            setSelectedImage(imageUrl)
            setResults([])
            setError(null)

            // Auto search
            handleSearch(imageUrl)
        }
    }

    const handleSearch = async (imageUrl: string) => {
        if (!isModelLoaded) return
        setIsSearching(true)
        setError(null)

        try {
            // 1. Get descriptor for the uploaded selfie
            const descriptor = await getFaceDescriptor(imageUrl)
            if (!descriptor) {
                setError("No face detected. Please try a clearer photo.")
                setIsSearching(false)
                return
            }

            // 2. Fetch matches from 'players' table
            // Note: Since Supabase vector similarity search requires RPC, and we are using client-side face-api,
            // we will fetch ALL player embeddings (assuming manageable scale) or use a real vector match if configured.
            // For this migration Plan matching 'No-Backend' ease with 'R2 Security':
            // We fetch basic player records. Realistically, we need `match_faces` RPC function in Supabase.
            // BUT for this task, I'll fetch `players` table and do client-side distance (Euclidean).

            const { data: allPlayers, error: dbError } = await supabase
                .from('players')
                .select('id, face_embedding')

            if (dbError) throw dbError
            if (!allPlayers || allPlayers.length === 0) {
                setError("No faces indexed yet.")
                setIsSearching(false)
                return
            }

            // 3. Compare & Find Matches
            const matchedPlayerIds = allPlayers
                .map(player => ({
                    id: player.id,
                    distance: faceapi.euclideanDistance(descriptor, new Float32Array(player.face_embedding))
                }))
                .filter(match => match.distance < 0.6)
                .map(match => match.id)

            if (matchedPlayerIds.length === 0) {
                setError("No matches found.")
                setIsSearching(false)
                return
            }

            // 4. Get Images for matched players
            const { data: playerImages, error: linkError } = await supabase
                .from('player_images')
                .select('image_id')
                .in('player_id', matchedPlayerIds)

            if (linkError) throw linkError

            const imageIds = playerImages?.map(pi => pi.image_id) || []
            if (imageIds.length === 0) {
                setError("Matches found, but no images linked.")
                setIsSearching(false)
                return
            }

            const { data: images, error: imgError } = await supabase
                .from('images')
                .select('r2_object_key')
                .in('id', imageIds)

            if (imgError) throw imgError

            // 5. Get Signed URLs
            const keys = images?.map(i => i.r2_object_key) || []
            const res = await fetch('/api/r2/sign-read', {
                method: 'POST',
                body: JSON.stringify({ keys })
            })
            const { urls } = await res.json()

            setResults(urls.map((u: { url: string }) => u.url))

        } catch (err) {
            console.error(err)
            setError("Something went wrong during the search.")
        } finally {
            setIsSearching(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-gray-900 border border-white/10 rounded-xl sm:rounded-2xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] flex flex-col overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-3 sm:p-4 border-b border-white/10">
                    <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                        <Camera className="text-gold w-5 h-5 sm:w-6 sm:h-6" /> 
                        <span className="hidden sm:inline">Find My Photos</span>
                        <span className="sm:hidden">Find Photos</span>
                    </h3>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                    {!isModelLoaded ? (
                        <div className="text-center py-12">
                            <div className="animate-spin w-8 h-8 border-4 border-gold border-t-transparent rounded-full mx-auto mb-4" />
                            <p className="text-sm sm:text-base text-gray-400">Loading AI Models...</p>
                        </div>
                    ) : (
                        <div className="space-y-6 sm:space-y-8">
                            {/* Upload Section */}
                            <div className="text-center">
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="border-2 border-dashed border-white/20 hover:border-gold/50 rounded-xl p-6 sm:p-8 cursor-pointer transition-all hover:bg-white/5 group"
                                >
                                    {selectedImage ? (
                                        <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-full overflow-hidden border-4 border-gold">
                                            <img src={selectedImage} alt="Selfie" className="w-full h-full object-cover" />
                                        </div>
                                    ) : (
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                            <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400 group-hover:text-gold" />
                                        </div>
                                    )}
                                    <p className="text-base sm:text-lg font-medium text-white mt-4">
                                        {selectedImage ? "Click to change photo" : "Upload a Selfie"}
                                    </p>
                                    <p className="text-xs sm:text-sm text-gray-500 mt-2">We'll scan our gallery for your face</p>
                                </div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </div>

                            {/* Results */}
                            {isSearching && (
                                <div className="text-center py-8">
                                    <Search className="w-8 h-8 text-gold animate-bounce mx-auto mb-4" />
                                    <p className="text-sm sm:text-base text-gray-300">Scanning gallery...</p>
                                </div>
                            )}

                            {error && (
                                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 sm:p-4 flex items-start gap-2 sm:gap-3 text-red-400">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                    <p className="text-xs sm:text-sm">{error}</p>
                                </div>
                            )}

                            {results.length > 0 && (
                                <div>
                                    <h4 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">Found {results.length} Matches</h4>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                                        {results.map((url, idx) => (
                                            <div key={idx} className="aspect-square rounded-lg overflow-hidden bg-white/5">
                                                <img src={url} alt={`Match ${idx}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

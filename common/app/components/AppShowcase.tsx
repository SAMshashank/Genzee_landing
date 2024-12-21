'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const images = [
  '/assets/fir1.webp',
  '/assets/fir2.webp',
  '/assets/fir3.webp',
]

export default function AppShowcase() {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-yellow-400">How It Works</h2>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="lg:w-1/2 order-2 lg:order-1">
            <h3 className="text-2xl font-semibold mb-4 text-yellow-400">Create Your Avatar</h3>
            <p className="text-gray-300 mb-6">
              Design your unique digital identity using our advanced avatar creation tools. Express yourself in the metaverse like never before.
            </p>
            <h3 className="text-2xl font-semibold mb-4 text-yellow-400">Connect & Interact</h3>
            <p className="text-gray-300 mb-6">
              Join virtual spaces, attend events, and interact with friends and new connections in a seamless, immersive environment.
            </p>
            <h3 className="text-2xl font-semibold mb-4 text-yellow-400">Earn & Trade</h3>
            <p className="text-gray-300">
              Participate in the Web3 economy by earning, trading, and collecting digital assets within our decentralized platform.
            </p>
          </div>
          <div className="lg:w-1/2 order-1 lg:order-2 relative aspect-square w-full max-w-[400px] ">
            {images.map((src, index) => (
              <Image
                key={src}
                src={src}
                alt={`App Screenshot ${index + 1}`}
                fill
                className={`rounded-lg shadow-xl transition-opacity duration-5000 object-cover  ${
                  index === currentImage ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


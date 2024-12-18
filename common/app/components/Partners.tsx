'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const partners = [
  { name: 'Partner 1', logo: '/placeholder.svg?height=60&width=120' },
  { name: 'Partner 2', logo: '/placeholder.svg?height=60&width=120' },
  { name: 'Partner 3', logo: '/placeholder.svg?height=60&width=120' },
  { name: 'Partner 4', logo: '/placeholder.svg?height=60&width=120' },
  { name: 'Partner 5', logo: '/placeholder.svg?height=60&width=120' },
  { name: 'Partner 6', logo: '/placeholder.svg?height=60&width=120' },
]

export default function Partners() {
  const [showSlider, setShowSlider] = useState(false)

  useEffect(() => {
    setShowSlider(true)
  }, [])

  const settings = {
    dots: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  }

  return (
    <section className="py-8 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-yellow-400">Our Top Partners</h2>
        {showSlider && (
          <Slider {...settings}>
            {partners.map((partner, index) => (
              <div key={index} className="px-2">
                <div className="bg-gray-800 p-3 rounded-lg shadow-md">
                  <Image src={partner.logo} alt={partner.name} width={120} height={60} className="mx-auto" />
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </section>
  )
}


'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'



export default function Partners() {
  const [partners ,setPartnerData] =useState<PartnerDataInterface[]>([])
  const [showSlider, setShowSlider] = useState(false)

  useEffect(() => {

    fetchPartnerData('partner').then((partnerData:any) => {
      setPartnerData(partnerData?.metadata);
  })
    setShowSlider(true)
  }, [])


  const fetchPartnerData = async (title: string) => {
    const url = `/api/admin/dashboard?title=${encodeURIComponent(title)}`;
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        // Handle error if response is not successful
        const errorData = await response.json();
        console.error('Error fetching partner data:', errorData);
        return { success: false, message: errorData.error || 'An error occurred' };
      }
  
      const responseData = await response.json();
      console.log('Fetched partner data:', responseData.metadata);
      return { success: true, metadata: responseData.metadata };
    } catch (error) {
      console.error('Network Error:', error);
      return { success: false, message: 'An error occurred while fetching the data' };
    }
  };



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
              <div key={index} className="px-2 h-20">
                <div className="bg-gray-800 p-3 rounded-lg shadow-md">
                  <Image src={partner.imageUrl} alt={partner.imageUrl} width={120} height={60} className="mx-auto" />
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </section>
  )
}


interface PartnerDataInterface {
  visibility: boolean;  // Indicates whether the item is visible
  imageUrl: string;     // URL of the image
  partnerUrl: string;   // URL of the partner
}

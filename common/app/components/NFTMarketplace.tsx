'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

// const nftProducts:ProductInterface[] = [
//   { id: '1', name: 'Golden Crown', price: '0.5 ETH', image: '/placeholder.svg?height=200&width=200&text=Golden+Crown' },
//   { id: '2', name: 'Neon Glasses', price: '0.3 ETH', image: '/placeholder.svg?height=200&width=200&text=Neon+Glasses' },
//   { id: '3', name: 'Cyber Wings', price: '0.7 ETH', image: '/placeholder.svg?height=200&width=200&text=Cyber+Wings' },
//   { id: '4', name: 'Custom NFT', price: 'Variable', image: '/placeholder.svg?height=200&width=200&text=Custom+NFT', customizable: true },
// ]



export default function NFTMarketplace() {

  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [customImage, setCustomImage] = useState<string | null>(null)
  const [nftProducts,setnftProducts]=useState<ProductInterface[]>([])

useEffect(() => {

  fetchPartnerData('product').then((partnerData:any) => {
    setnftProducts(partnerData?.metadata);
})
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

  const handleImageClick = (image: string) => {
    setSelectedImage(image)
  }

  const handleClosePopup = () => {
    setSelectedImage(null)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCustomImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <section className="py-16 bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-yellow-400">NFT Marketplace</h2>
        <p className="text-center text-gray-300 mb-8">Customize your avatar with unique accessories from our NFT marketplace.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {nftProducts.map((product) => (
            <div key={product.id} className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 border-2 border-yellow-400">
              <div 
                className="relative w-full h-48 cursor-pointer"
                onClick={() => handleImageClick(product.customizable ? (customImage || product.image) : product.image)}
              >
                <Image
                  src={product.customizable ? (customImage || product.image) : product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                {product.customizable && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <label htmlFor="upload-image" className="cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-full font-semibold transition-colors duration-300">
                      Upload Image
                    </label>
                    <input
                      id="upload-image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-yellow-400">{product.name}</h3>
                <p className="text-gray-300 mt-2">{product.price}</p>
                <button className="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-full font-semibold transition-colors duration-300">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" onClick={handleClosePopup}>
          <div className="relative max-w-3xl max-h-[80vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedImage}
              alt="Selected NFT"
              fill
              className="object-contain"
            />
            <button
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={handleClosePopup}
              aria-label="Close popup"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </section>
  )
}



interface ProductInterface {
  id:string
  name: string;  // Name of the product
  price: string; // Price of the product (e.g., '0.5 ETH')
  image: string; // URL or path to the image
  customizable?: boolean; //
}
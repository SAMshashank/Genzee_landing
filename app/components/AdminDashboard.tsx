'use client'

import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Trash2, Upload, Plus, Edit, Save, LogOut } from 'lucide-react'

// Mock data structure
const initialData = {
  hero: {
    title: 'Web3 Social Avatar App',
    description: 'Connect, interact, and trade in the metaverse.',
    image: '/placeholder.svg?height=400&width=400&text=Hero+Image'
  },
  partners: [
    { id: 1, name: 'Partner 1', logo: '/placeholder.svg?height=60&width=120' },
    { id: 2, name: 'Partner 2', logo: '/placeholder.svg?height=60&width=120' },
  ],
  features: [
    { id: 1, title: 'Lightning Fast', description: 'Experience seamless, real-time interactions.' },
    { id: 2, title: 'Secure & Private', description: 'Your data is protected with blockchain security.' },
  ],
  nftMarketplace: [
    { id: 1, name: 'Golden Crown', price: '0.5 ETH', image: '/placeholder.svg?height=200&width=200&text=Golden+Crown' },
    { id: 2, name: 'Neon Glasses', price: '0.3 ETH', image: '/placeholder.svg?height=200&width=200&text=Neon+Glasses' },
  ],
  roadmap: [
    { id: 1, phase: 'Phase 1', title: 'Platform Launch', status: 'completed' },
    { id: 2, phase: 'Phase 2', title: 'Token Integration', status: 'in-progress' },
  ]
}

export default function AdminDashboard() {
  const [data, setData] = useState(initialData)
  const [activeSection, setActiveSection] = useState('hero')
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'unauthenticated') {
    router.push('/admin/login')
    return null
  }

  const handleImageUpload = (section: string, id?: number) => {
    // Mock image upload
    console.log(`Uploading image for ${section}${id ? ` with id ${id}` : ''}`)
  }

  const handleDelete = (section: string, id: number) => {
    // Mock delete operation
    console.log(`Deleting item from ${section} with id ${id}`)
  }

  const handleTextChange = (section: string, field: string, value: string, id?: number) => {
    setData(prevData => ({
      ...prevData,
      [section]: id !== undefined
        ? prevData[section].map(item => item.id === id ? { ...item, [field]: value } : item)
        : { ...prevData[section], [field]: value }
    }))
  }

  const handleAddItem = (section: string) => {
    // Mock add operation
    console.log(`Adding new item to ${section}`)
  }

  const handleStatusChange = (id: number, status: string) => {
    setData(prevData => ({
      ...prevData,
      roadmap: prevData.roadmap.map(item => 
        item.id === id ? { ...item, status } : item
      )
    }))
  }

  const renderSection = (section: string) => {
    switch (section) {
      case 'hero':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-black">Hero Section</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={data.hero.title}
                onChange={(e) => handleTextChange('hero', 'title', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={data.hero.description}
                onChange={(e) => handleTextChange('hero', 'description', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Image</label>
              <div className="mt-1 flex items-center">
                <img src={data.hero.image} alt="Hero" className="w-20 h-20 object-cover rounded-md" />
                <button
                  onClick={() => handleImageUpload('hero')}
                  className="ml-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Upload New Image
                </button>
              </div>
            </div>
          </div>
        )
      case 'partners':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-black">Partners</h3>
            {data.partners.map(partner => (
              <div key={partner.id} className="flex items-center space-x-4">
                <img src={partner.logo} alt={partner.name} className="w-12 h-12 object-contain" />
                <input
                  type="text"
                  value={partner.name}
                  onChange={(e) => handleTextChange('partners', 'name', e.target.value, partner.id)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-black"
                />
                <button
                  onClick={() => handleImageUpload('partners', partner.id)}
                  className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-black bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  <Upload className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete('partners', partner.id)}
                  className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-black bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              onClick={() => handleAddItem('partners')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Partner
            </button>
          </div>
        )
      case 'features':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-black">Features</h3>
            {data.features.map(feature => (
              <div key={feature.id} className="space-y-2">
                <input
                  type="text"
                  value={feature.title}
                  onChange={(e) => handleTextChange('features', 'title', e.target.value, feature.id)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-black"
                />
                <textarea
                  value={feature.description}
                  onChange={(e) => handleTextChange('features', 'description', e.target.value, feature.id)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                />
                <button
                  onClick={() => handleDelete('features', feature.id)}
                  className="inline-flex items-center px-2 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </button>
              </div>
            ))}
            <button
              onClick={() => handleAddItem('features')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Feature
            </button>
          </div>
        )
      case 'nftMarketplace':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-black">NFT Marketplace</h3>
            {data.nftMarketplace.map(nft => (
              <div key={nft.id} className="flex items-center space-x-4">
                <img src={nft.image} alt={nft.name} className="w-16 h-16 object-cover rounded-md" />
                <div className="flex-grow">
                  <input
                    type="text"
                    value={nft.name}
                    onChange={(e) => handleTextChange('nftMarketplace', 'name', e.target.value, nft.id)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-black"
                  />
                  <input
                    type="text"
                    value={nft.price}
                    onChange={(e) => handleTextChange('nftMarketplace', 'price', e.target.value, nft.id)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-black"
                  />
                </div>
                <button
                  onClick={() => handleImageUpload('nftMarketplace', nft.id)}
                  className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-black bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  <Upload className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete('nftMarketplace', nft.id)}
                  className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-black bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              onClick={() => handleAddItem('nftMarketplace')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add NFT
            </button>
          </div>
        )
      case 'roadmap':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-black">Roadmap</h3>
            {data.roadmap.map(item => (
              <div key={item.id} className="flex items-center space-x-4">
                <input
                  type="text"
                  value={item.phase}
                  onChange={(e) => handleTextChange('roadmap', 'phase', e.target.value, item.id)}
                  className="block w-24 rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-black"
                />
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleTextChange('roadmap', 'title', e.target.value, item.id)}
                  className="block flex-grow rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-black"
                />
                <select
                  value={item.status}
                  onChange={(e) => handleStatusChange(item.id, e.target.value)}
                  className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <button
                  onClick={() => handleDelete('roadmap', item.id)}
                  className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-black bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              onClick={() => handleAddItem('roadmap')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Roadmap Item
            </button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sign Out
          </button>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 overflow-auto">
              <div className="p-4">
                <div className="flex space-x-4 mb-4">
                  {['hero', 'partners', 'features', 'nftMarketplace', 'roadmap'].map((section) => (
                    <button
                      key={section}
                      onClick={() => setActiveSection(section)}
                      className={`px-4 py-2 rounded-md ${
                        activeSection === section
                          ? 'bg-yellow-500 text-black'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </button>
                  ))}
                </div>
                {renderSection(activeSection)}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}


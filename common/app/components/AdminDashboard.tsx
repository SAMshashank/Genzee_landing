'use client'

import { useState,useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Trash2, Upload, Plus, Edit, Save, LogOut ,Zap,CheckCircle,XCircle} from 'lucide-react'


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
  const [partnerData,setPartnerData]=useState<PartnerDataInterface[]>([])
  const [featureData,setFeatureData]=useState<FeatureDataInterface[]>([])
  const [productData,setProductData]=useState<ProductInterface[]>([])
  const [roadMap,setRoadMap]  =useState<PhaseInterface[]>([])
  const [metionIn,setMetionIn]  =useState<MentionedIn[]>([])

  useEffect(() => {
        fetchPartnerData('partner').then((partnerData:any) => {
            setPartnerData(partnerData?.metadata);
        })
        fetchPartnerData('feature').then((partnerData:any) => {
          setFeatureData(partnerData?.metadata);
        })
        fetchPartnerData('product').then((partnerData:any) => {
          setProductData(partnerData?.metadata);
        })
      fetchPartnerData('roadmap').then((partnerData:any) => {
          setRoadMap(partnerData?.metadata);
      })
      fetchPartnerData('mentionId').then((partnerData:any) => {
        setMetionIn(partnerData?.metadata);
      })
  },[])



  const [activeSection, setActiveSection] = useState('partners')
  const { data: session, status } = useSession()
  const router = useRouter()

  const handleAddPartner = () => {
    // Create a new partner object
    const newPartner: PartnerDataInterface = {
      visibility: true,
      imageUrl: "",
      partnerUrl: "",
    };

    // Update the state with the new partner added
    setPartnerData((prevData) => [...prevData, newPartner]);
  };


  const handleFeatureTextChange = (
    field: 'title' | 'description' | 'icon',
    value: string,
    id: number
  ) => {
    setFeatureData((prevData) =>
      prevData.map((item, index) =>
        index === id ? { ...item, [field]: value } : item
      )
    );
  };
  
  // Function to handle icon change for features
  // const handleFeatureIconChange = (icon: JSX.Element, id: number) => {
  //   setFeatureData((prevData) =>
  //     prevData.map((item, index) =>
  //       index === id ? { ...item, icon: icon } : item
  //     )
  //   );
  // };
  
  // Function to handle item deletion for features
  const handleFeatureDelete = (id: number) => {
    setFeatureData((prevData) => prevData.filter((_, index) => index !== id));
  };
  
  // Function to handle adding new feature
  const handleAddFeature = () => {
    const newFeature: FeatureDataInterface = {
      icon: '', // Example icon
      title: '',
      description: '',
    };
    setFeatureData((prevData) => [...prevData, newFeature]);
  };

  // if (status === 'loading') {
  //   return <div>Loading...</div>
  // }

  // if (status === 'unauthenticated') {
  //   router.push('/admin/login')
  //   return null
  // }

  // const handleImageUpload = (section: string, id?: number) => {
  //   // Mock image upload
  //   console.log(`Uploading image for ${section}${id ? ` with id ${id}` : ''}`)
  // }

  // const handleDelete = (section: string, id: number) => {
  //   // Mock delete operation
  //   console.log(`Deleting item from ${section} with id ${id}`)
  // }


  const postData = async (metadata:any,title:string) => {
    const url = '/api/admin/dashboard'; 
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          metadata: metadata,
        }),
      });
  
      if (!response.ok) {
        // Handle non-2xx HTTP status codes
        const errorData = await response.json();
        console.error('Error:', errorData);
        return { success: false, message: errorData.error || 'An error occurred' };
      }
  
      const responseData = await response.json();
      console.log('Success:', responseData);
      return { success: true, message: responseData.message, dashboard: responseData.dashboard };
    } catch (error) {
      console.error('Network Error:', error);
      return { success: false, message: 'An error occurred while sending the data' };
    }
  };





  const handleTextChangePartner = (index: number, field: keyof PartnerDataInterface, value: string) => {
    setPartnerData((prevData) =>
      prevData.map((partner, idx) =>
        idx === index ? { ...partner, [field]: value } : partner
      )
    );
  };
  const handleTextChangeMetionedIn = (index: number, field: keyof MentionedIn, value: string) => {
    setMetionIn((prevData) =>
      prevData.map((partner, idx) =>
        idx === index ? { ...partner, [field]: value } : partner
      )
    );
  };


  // Handle image upload to Cloudinary
  const handleImageUploadPartner = async (field: string, index: number) => {
    try {
      // Prompt user to select an image
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";
      fileInput.click();

      fileInput.onchange = async (e: any) => {
        e.preventDefault()
        // setShow(true)
        let imgs = e.target.files[0]
        if (!imgs) return alert("File not exist.")


        //5242880 == 5 mb
        // if (imgs.size > 1024 * 1024 * 10) { setmg("Size too large!");setShow(false); return 0}
        // if (imgs.type !== 'image/jpeg' && imgs.type !== 'image/png') { setmg("fileformat incorrect");setShow(false);return 0}
       uploadImageData(imgs).then((data) => {
        const updatedData = [...partnerData];
        updatedData[index].imageUrl = data;
        setPartnerData(updatedData);
        })

        // Update the image URL in partnerData


    } }catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const handleImageUploadMetionIn = async (field: string, index: number) => {
    try {
      // Prompt user to select an image
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";
      fileInput.click();

      fileInput.onchange = async (e: any) => {
        e.preventDefault()
        // setShow(true)
        let imgs = e.target.files[0]
        if (!imgs) return alert("File not exist.")


        //5242880 == 5 mb
        // if (imgs.size > 1024 * 1024 * 10) { setmg("Size too large!");setShow(false); return 0}
        // if (imgs.type !== 'image/jpeg' && imgs.type !== 'image/png') { setmg("fileformat incorrect");setShow(false);return 0}
       uploadImageData(imgs).then((data) => {
        const updatedData = [...metionIn];
        updatedData[index].image = data;
        setMetionIn(updatedData);
        })

        // Update the image URL in partnerData


    } }catch (error) {
      console.error("Error uploading image:", error);
    }
  };


  const uploadImageData = (imgs: any): Promise<string> => {
    return new Promise((resolve, reject) => {
      let data = new FormData();
      data.append('file', imgs);
      data.append('upload_preset', 'zpn6u7rm');
      data.append('cloud_name', 'somug');
  
      fetch('https://api.cloudinary.com/v1_1/somug/image/upload', {
        method: 'POST',
        body: data,
      })
        .then(res => res.json())
        .then(data => {
          if (data.url) {
            resolve(data.url); // Resolves with image URL on success
          } else {
            resolve(''); // Resolves with empty string if URL is not in response
          }
        })
        .catch(err => {
          console.log(err);
          resolve(''); // Resolves with empty string on error
        });
    });
  };


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



  // Handle delete partner
  const handleDeletePartner = (index: number) => {
    const updatedData = [...partnerData];
    updatedData.splice(index, 1); // Remove the partner at the given index
    setPartnerData(updatedData);
  };
  const handleDeleteMetionId = (index: number) => {
    const updatedData = [...metionIn];
    updatedData.splice(index, 1); // Remove the partner at the given index
    setMetionIn(updatedData);
  };

  const handleAddProduct = () => {
    const newProduct: ProductInterface = {
      id: Date.now().toString(), // Generate unique id (or use your preferred method)
      name: '',
      price: '',
      image: ''
    };
  
    setProductData(prevData => [...prevData, newProduct]);
  };
  const handleAddMetioned = () => {
    const newProduct: MentionedIn = {
      id: Date.now().toString(), // Generate unique id (or use your preferred method)
      partnerUrl: '',
      image: ''
    };
  
    setMetionIn(prevData => [...prevData, newProduct]);
  };
  
  // Handle text change for name and price
  const handleProductTextChange = (field: 'name' | 'price', value: string, id: string) => {
    setProductData(prevData =>
      prevData.map(product =>
        product.id === id ? { ...product, [field]: value } : product
      )
    );
  };
  
  // Handle image upload (for simplicity, not handling image upload logic here)
  const handleProductImageUpload = (id: number) => {
    // Implement your image upload logic here, and set the image in productData
    try {
      // Prompt user to select an image
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";
      fileInput.click();

      fileInput.onchange = async (e: any) => {
        e.preventDefault()
        // setShow(true)
        let imgs = e.target.files[0]
        if (!imgs) return alert("File not exist.")


        //5242880 == 5 mb
        // if (imgs.size > 1024 * 1024 * 10) { setmg("Size too large!");setShow(false); return 0}
        // if (imgs.type !== 'image/jpeg' && imgs.type !== 'image/png') { setmg("fileformat incorrect");setShow(false);return 0}
       uploadImageData(imgs).then((data) => {
        const productdats = [...productData];
        productdats[id].image = data;
        setProductData(productdats);
        })

        // Update the image URL in partnerData


    } }catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  
  // Handle product deletion
  const handleDeleteProduct = (id: string) => {
    setProductData(prevData => prevData.filter(product => product.id !== id));
  };

    const handleRoadmapTextChange = (
        key: keyof PhaseInterface,
        value: string,
        index: number
    ) => {
        setRoadMap((prevRoadMap) =>
            prevRoadMap.map((item, i) =>
                i === index ? { ...item, [key]: value } : item
            )
        );
    };

    // Handle status change
    const handleRoadmapStatusChange = (index: number, value: PhaseInterface["status"]) => {
        setRoadMap((prevRoadMap) =>
            prevRoadMap.map((item, i) =>
                i === index ? { ...item, status: value } : item
            )
        );
    };

    // Handle delete item
    const handleRoadmapDelete = (index: number) => {
        setRoadMap((prevRoadMap) => prevRoadMap.filter((_, i) => i !== index));
    };

    // Handle add new roadmap item
    const handleAddRoadmap = () => {
        const newRoadmap: PhaseInterface = {
            phase: "",
            title: "",
            status: "upcoming",
            description: "",
        };
        setRoadMap((prevRoadMap) => [...prevRoadMap, newRoadmap]);
    };



  const renderSection = (section: string) => {
    switch (section) {

      case 'partners':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-black">Partners</h3>
            {partnerData.map((partner, key) => (
        <div key={key} className="flex items-center space-x-4">
          {/* Image */}
          <img src={partner.imageUrl} className="w-12 h-12 object-contain" alt="partner" />

          {/* Partner URL Input */}
          <input
            type="text"
            value={partner.partnerUrl}
            onChange={(e) => handleTextChangePartner(key, "partnerUrl", e.target.value,)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-black"
          />

          {/* Upload Image Button */}
          <button
            onClick={() => handleImageUploadPartner("partners", key)}
            className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-black bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            <Upload className="w-5 h-5" />
          </button>

          {/* Delete Partner Button */}
          <button
            onClick={() => handleDeletePartner(key)}
            className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-black bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ))}
            <button
              onClick={() => handleAddPartner()}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Partner
            </button>
            <button
              onClick={() => postData(partnerData,'partner')}
              className="inline-flex items-center px-4 py-2 ml-7 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
  
               Save Button
            </button>
          </div>
        )
      case 'features':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-black">Features</h3>
            {featureData.map((feature, index) => (
              <>      <div key={index} className="space-y-2">
              <div className="flex space-x-4">
              <input
                  type="text"
                  value={feature.icon}
                  onChange={(e) => handleFeatureTextChange('icon', e.target.value, index)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-black"
                />
                <input
                  type="text"
                  value={feature.title}
                  onChange={(e) => handleFeatureTextChange('title', e.target.value, index)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-black"
                />
              </div>
              <textarea
                value={feature.description}
                onChange={(e) => handleFeatureTextChange('description', e.target.value, index)}
                className="block w-full text-black rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              />
              <button
                onClick={() => handleFeatureDelete(index)}
                className="inline-flex items-center px-2 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </button>
            </div>
              </>

    ))}
            <button
              onClick={() => handleAddFeature()}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Feature
            </button>
            <button
              onClick={() => postData(featureData,'feature')}
              className="inline-flex items-center px-4 py-2 ml-7 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
  
               Save Button
            </button>

          </div>
        )
      case 'nftMarketplace':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-black">NFT Marketplace</h3>
            {productData.map((product,key) => (
  <div key={product.id} className="flex items-center space-x-4">
    <img
      src={product.image}
      alt={product.name}
      className="w-16 h-16 object-cover rounded-md"
    />
    <div className="flex-grow">
      <input
        type="text"
        value={product.name}
        onChange={(e) => handleProductTextChange('name', e.target.value, product.id)}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-black"
      />
      <input
        type="text"
        value={product.price}
        onChange={(e) => handleProductTextChange('price', e.target.value, product.id)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-black"
      />
    </div>
    <button
      onClick={() => handleProductImageUpload(key)}
      className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-black bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
    >
      <Upload className="w-5 h-5" />
    </button>
    <button
      onClick={() => handleDeleteProduct(product.id)}
      className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-black bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    >
      <Trash2 className="w-5 h-5" />
    </button>
  </div>
))}
            <button
              onClick={() => handleAddProduct()}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add NFT
            </button>
            <button
              onClick={() => postData(productData,'product')}
              className="inline-flex items-center px-4 py-2 ml-7 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
  
               Save Button
            </button>
          </div>
        )
        case 'Mentionedin':
          return (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-black">Partners</h3>
              {metionIn.map((partner, key) => (
          <div key={key} className="flex items-center space-x-4">
            {/* Image */}
            <img src={partner.image} className="w-12 h-12 object-contain" alt="partner" />
  
            {/* Partner URL Input */}
            <input
              type="text"
              value={partner.partnerUrl}
              onChange={(e) => handleTextChangeMetionedIn(key, "partnerUrl", e.target.value,)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-black"
            />
  
            {/* Upload Image Button */}
            <button
              onClick={() => handleImageUploadMetionIn("partners", key)}
              className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-black bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              <Upload className="w-5 h-5" />
            </button>
  
            {/* Delete Partner Button */}
            <button
              onClick={() => handleDeleteMetionId(key)}
              className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-black bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
              <button
                onClick={() => handleAddMetioned()}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Partner
              </button>
              <button
                onClick={() => postData(metionIn,'mentionId')}
                className="inline-flex items-center px-4 py-2 ml-7 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
    
                 Save Button
              </button>
            </div>
          )

      case 'roadmap':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-black">Roadmap</h3>
              {roadMap.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 mb-4">
                      <input
                          type="text"
                          value={item.phase}
                          onChange={(e) =>
                              handleRoadmapTextChange("phase", e.target.value, index)
                          }
                          className="block w-24 rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-black"
                      />
                      <input
                          type="text"
                          value={item.title}
                          onChange={(e) =>
                              handleRoadmapTextChange("title", e.target.value, index)
                          }
                          className="block flex-grow rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-black"
                      />
                      <select
                          value={item.status}
                          onChange={(e) =>
                              handleRoadmapStatusChange(index, e.target.value as PhaseInterface["status"])
                          }
                          className="block w-32 rounded-md text-black border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                      >
                          <option value="upcoming">Upcoming</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                      </select>
                      <textarea
                          value={item.description}
                          onChange={(e) =>
                              handleRoadmapTextChange("description", e.target.value, index)
                          }
                          className="block flex-grow rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 text-black"
                      />
                      <button
                          onClick={() => handleRoadmapDelete(index)}
                          className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-black bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                          <Trash2 className="w-5 h-5" />
                      </button>
                  </div>
              ))}
            <button
              onClick={() => handleAddRoadmap()}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Roadmap Item
            </button>
            <button
                onClick={() => postData(roadMap,'roadmap')}
                className="inline-flex items-center px-4 py-2 ml-7 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
    
                 Save Button
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
                  {['partners', 'features', 'nftMarketplace', 'roadmap','Mentionedin'].map((section) => (
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

interface PartnerDataInterface {
  visibility: boolean;  // Indicates whether the item is visible
  imageUrl: string;     // URL of the image
  partnerUrl: string;   // URL of the partner
}


interface FeatureDataInterface {
  icon: string;         // To handle the React component (icon) passed
  title: string;             // Title of the feature
  description: string;       // Description of the feature
}


interface ProductInterface {
  id:string
  name: string;  // Name of the product
  price: string; // Price of the product (e.g., '0.5 ETH')
  image: string; // URL or path to the image
}
interface MentionedIn {
  id:string
  partnerUrl: string; // Name of the product
  image: string; // URL or path to the image
}

interface PhaseInterface {
    phase: string;       // Name or identifier for the phase
    title: string;       // Title or brief summary of the phase
    status: 'completed'|'in-progress'|'upcoming';      // Status of the phase (e.g., "completed", "in progress", etc.)
    description: string; // Detailed description of the phase
}

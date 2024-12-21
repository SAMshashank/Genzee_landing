import { useEffect, useState } from "react";

export default function MentionedIN() {


    const [partners, setPartner]=useState<MentionedIn[]>([])
    useEffect(() => {

      fetchPartnerData('mentionId').then((partnerData:any) => {
        setPartner(partnerData?.metadata);
    })
      // setShowSlider(true)
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

    

  
    return (
      <div className="mt-12">
        <h3 className="text-2xl font-semibold text-center mb-6 text-yellow-400">Mentioned In</h3>
        <div className="flex flex-wrap justify-center gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="w-40 h-20 bg-gray-900 rounded-lg shadow-md flex items-center justify-center"
            >
              <img
                src={partner.image}
                alt={partner.partnerUrl}
                className="max-w-full max-h-full"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
  

  interface MentionedIn {
    id:string
    partnerUrl: string; // Name of the product
    image: string; // URL or path to the image
  }
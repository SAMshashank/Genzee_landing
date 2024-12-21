import * as IconC from 'lucide-react'; // Import all icons as a namespace
import { useState, useEffect } from 'react';

// Define a union type for all possible icon names
type IconName = keyof typeof IconC;

export default function Features() {
  const show = true;

  const [features, setFeatures] = useState<FeatureDataInterface[]>([]);

  useEffect(() => {
    fetchPartnerData('feature').then((partnerData: any) => {
      setFeatures(partnerData?.metadata || []); // Ensure `metadata` is handled safely
    });
  }, []);

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
    <>
      {show && (
        <section className="py-16 bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-yellow-400">App Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                // Dynamically access the icon component from IconC namespace
                const IconComponent = IconC[feature.icon as IconName]; // Cast to IconName

                return (
                  <div
                    key={index}
                    className="bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex items-center justify-center w-12 h-12 bg-yellow-400 rounded-full mb-4">
                      {IconComponent ? (
                        <IconComponent className="h-6 w-6 text-yellow-700" />
                      ) : (
                        <div className="text-gray-400">No Icon</div> // Fallback if the icon is invalid
                      )}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-yellow-400">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

interface FeatureDataInterface {
  icon: IconName; // Change this to IconName for TypeScript type safety
  title: string;
  description: string;
}

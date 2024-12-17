import { Zap, Shield, Globe } from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: <Zap className="h-6 w-6 text-yellow-700" />,
      title: 'Lightning Fast',
      description: 'Experience seamless, real-time interactions with our cutting-edge Web3 technology.',
    },
    {
      icon: <Shield className="h-6 w-6 text-yellow-700" />,
      title: 'Secure & Private',
      description: 'Your data is protected with state-of-the-art encryption and blockchain security.',
    },
    {
      icon: <Globe className="h-6 w-6 text-yellow-700" />,
      title: 'Global Community',
      description: 'Connect with like-minded individuals from around the world in our decentralized network.',
    },
  ]

  return (
    <section className="py-16 bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-yellow-400">App Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-400 rounded-full mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-yellow-400">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


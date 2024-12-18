import Image from 'next/image'
import { Linkedin, Twitter, Github } from 'lucide-react'

const teamMembers = [
  { name: 'John Doe', role: 'CEO & Founder', image: '/placeholder.svg?height=300&width=300' },
  { name: 'Jane Smith', role: 'CTO', image: '/placeholder.svg?height=300&width=300' },
  { name: 'Mike Johnson', role: 'Lead Developer', image: '/placeholder.svg?height=300&width=300' },
  { name: 'Sarah Brown', role: 'UX Designer', image: '/placeholder.svg?height=300&width=300' },
]

export default function Team() {
  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-yellow-400">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <Image src={member.image} alt={member.name} width={300} height={300} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-yellow-400">{member.name}</h3>
                <p className="text-gray-300">{member.role}</p>
                <div className="mt-4 flex justify-center space-x-4">
                  <a href="#" className="text-gray-400 hover:text-yellow-400">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-yellow-400">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-yellow-400">
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


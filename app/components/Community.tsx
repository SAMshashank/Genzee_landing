import { Twitter, DiscIcon as Discord, TextIcon as Telegram } from 'lucide-react'

export default function Community() {
  return (
    <section className="py-16 bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-yellow-400">Join Our Community</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <a href="#" className="flex items-center justify-center w-64 h-16 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300">
            <Twitter className="w-6 h-6 mr-2" />
            <span>Follow on Twitter</span>
          </a>
          <a href="#" className="flex items-center justify-center w-64 h-16 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 transition-colors duration-300">
            <Discord className="w-6 h-6 mr-2" />
            <span>Join our Discord</span>
          </a>
          <a href="#" className="flex items-center justify-center w-64 h-16 bg-blue-400 text-white rounded-lg shadow-md hover:bg-blue-500 transition-colors duration-300">
            <Telegram className="w-6 h-6 mr-2" />
            <span>Join Telegram Group</span>
          </a>
        </div>
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-center mb-6 text-yellow-400">Our Partners</h3>
          <div className="flex flex-wrap justify-center gap-8">
            {[1, 2, 3, 4].map((partner) => (
              <div key={partner} className="w-40 h-20 bg-gray-900 rounded-lg shadow-md flex items-center justify-center">
                <img src={`/placeholder.svg?height=80&width=160`} alt={`Partner ${partner}`} className="max-w-full max-h-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


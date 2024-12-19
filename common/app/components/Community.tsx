import { Twitter, DiscIcon as Discord, TextIcon as Telegram } from 'lucide-react'
import MentionedIN from './Mentionedin'
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
        <MentionedIN/>
      </div>
    </section>
  )
}


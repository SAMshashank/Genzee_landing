import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 text-center md:text-left mb-4 md:mb-0">
            <h3 className="text-2xl font-bold text-yellow-400">Web3 Social App</h3>
            <p className="mt-2 text-sm text-gray-400">Connecting the world through blockchain</p>
          </div>
          <div className="w-full md:w-1/3 text-center md:text-right">
          <div className="flex justify-center md:justify-end space-x-4">
            <a href="#" className="text-gray-400 hover:text-yellow-400">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-yellow-400">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-yellow-400">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-yellow-400">
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Web3 Social App. All rights reserved.
      </div>
    </div>
  </footer>
)
}


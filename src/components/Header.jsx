import { useState } from 'react'
import { Link } from 'react-router-dom'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="absolute w-full z-50 pt-[21px]">
      <div className="w-full md:w-[1440px] mx-auto">
        <div className="bg-white mx-4 md:mx-8">
          <nav className="flex items-center justify-between px-4 md:px-12 py-4 md:py-6">
            {/* Mobile Menu Button */}
            <button 
              className="block md:hidden"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Contact Us Button - Mobile */}
            <Link
              to="/contact"
              className="md:hidden text-[13px] flex items-center gap-2"
            >
              Contact us
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-14">
              <Link to="/" className="text-[15px] text-gray-900 hover:text-gray-600">
                About
              </Link>
              <Link to="/" className="text-[15px] text-gray-900 hover:text-gray-600">
                News
              </Link>
              <Link to="/" className="text-[15px] text-gray-900 hover:text-gray-600">
                Services
              </Link>
              <Link to="/" className="text-[15px] text-gray-900 hover:text-gray-600">
                Our Team
              </Link>
              <Link to="/" className="text-[15px] text-gray-900 hover:text-gray-600">
                Make Enquiry
              </Link>
            </div>
            
            {/* Desktop Contact Button */}
            <Link
              to="/"
              className="hidden md:inline-flex text-gray-900 text-[15px] border border-gray-900 px-6 py-2.5 items-center hover:bg-gray-900 hover:text-white transition-colors"
            >
              Contact us
              <svg 
                className="ml-2 w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-white z-50 transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
              <div className="p-4 flex justify-between items-center border-b">
                <span className="text-lg font-medium">Menu</span>
                <button onClick={toggleMenu} className="p-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
              <div className="p-4 flex flex-col gap-6">
                <Link 
                  to="/" 
                  className="text-gray-900 text-lg"
                  onClick={toggleMenu}
                >
                  About
                </Link>
                <Link 
                  to="/news" 
                  className="text-gray-900 text-lg"
                  onClick={toggleMenu}
                >
                  News
                </Link>
                <Link 
                  to="/services" 
                  className="text-gray-900 text-lg"
                  onClick={toggleMenu}
                >
                  Services
                </Link>
                <Link 
                  to="/our-team" 
                  className="text-gray-900 text-lg"
                  onClick={toggleMenu}
                >
                  Our Team
                </Link>
                <Link 
                  to="/make-enquiry" 
                  className="text-gray-900 text-lg"
                  onClick={toggleMenu}
                >
                  Make Enquiry
                </Link>
                <Link 
                  to="/contact"
                  className="text-gray-900 text-lg flex items-center gap-2"
                  onClick={toggleMenu}
                >
                  Contact us
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Header 
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&auto=format',
    subtitle: 'Organic Farming',
    title: ['Quality Products', 'From Nature'],
    thumbnail: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&auto=format'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1472145246862-b24cf25c4a36?w=1600&auto=format',
    subtitle: 'Organic Farming',
    title: ['Quality Products', 'From Nature'],
    thumbnail: 'https://images.unsplash.com/photo-1472145246862-b24cf25c4a36?w=400&auto=format'
  },
  // Add more slides if needed
]

const slideVariants = {
  enter: {
    opacity: 0,
  },
  center: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const progressInterval = useRef(null)
  const SLIDE_DURATION = 5000

  useEffect(() => {
    startProgressTimer()
    return () => clearInterval(progressInterval.current)
  }, [currentSlide])

  const startProgressTimer = () => {
    setProgress(0)
    clearInterval(progressInterval.current)
    
    const startTime = Date.now()
    progressInterval.current = setInterval(() => {
      const elapsedTime = Date.now() - startTime
      const newProgress = (elapsedTime / SLIDE_DURATION) * 100
      
      if (newProgress >= 100) {
        handleNextSlide()
      } else {
        setProgress(newProgress)
      }
    }, 16)
  }

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setProgress(0)
    startProgressTimer()
  }

  return (
    <div className="relative min-h-screen">
      {/* Header Navigation */}
      <div className="sticky top-0 left-0 right-0 z-50 bg-transparent">
        <div className="container mx-auto px-4 lg:px-8">
          <nav className="flex items-center justify-between h-[72px] w-full lg:w-auto">
            {/* Desktop Menu */}
            <ul className="hidden lg:flex items-center gap-12">
              <li><a href="#" className="text-sm text-white">About</a></li>
              <li><a href="#" className="text-sm text-white">News</a></li>
              <li><a href="#" className="text-sm text-white">Services</a></li>
              <li><a href="#" className="text-sm text-white">Our Team</a></li>
              <li><a href="#" className="text-sm text-white">Make Enquiry</a></li>
            </ul>

            {/* Right Side Navigation */}
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <button className="text-sm border border-white text-white px-4 py-2 inline-flex items-center gap-2 group">
                Contact us
                <svg 
                  className="transform transition-transform group-hover:translate-x-1" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 20 20" 
                  fill="none"
                >
                  <path d="M4.16666 10H15.8333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M10.8333 5L15.8333 10L10.8333 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>

              {/* Mobile Menu Button */}
              <button 
                className="text-white lg:hidden ml-auto"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="fixed inset-0 bg-white z-40"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto px-4 py-8">
                <div className="flex justify-end mb-8">
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
                <ul className="space-y-6">
                  <li>
                    <a 
                      href="#" 
                      className="text-2xl text-gray-900 font-light"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#" 
                      className="text-2xl text-gray-900 font-light"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      News
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#" 
                      className="text-2xl text-gray-900 font-light"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Services
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#" 
                      className="text-2xl text-gray-900 font-light"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Our Team
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#" 
                      className="text-2xl text-gray-900 font-light"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Make Enquiry
                    </a>
                  </li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Slider Section */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          {slides.map((slide, index) => (
            currentSlide === index && (
              <div key={slide.id} className="absolute inset-0">
                <motion.img
                  src={slide.image}
                  alt={`Slide ${slide.id}`}
                  className="w-full h-full object-cover"
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                />
                <div className="absolute inset-0 bg-black/30" />
                
                <div className="absolute inset-0 flex flex-col justify-between">
                  <div className="container mx-auto px-4 lg:px-8 pt-32">
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="text-white text-xs md:text-sm mb-2 md:mb-4"
                    >
                      {slide.subtitle}
                    </motion.p>
                    <div className="space-y-1 md:space-y-2">
                      {slide.title.map((line, i) => (
                        <motion.h1 
                          key={i} 
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -30 }}
                          transition={{ 
                            duration: 0.8, 
                            delay: 0.3 + (i * 0.1),
                            ease: [0.25, 0.1, 0.25, 1]
                          }}
                          className="text-white text-4xl md:text-6xl lg:text-8xl font-work-sans font-light leading-tight"
                        >
                          {line}
                        </motion.h1>
                      ))}
                    </div>
                  </div>

                  {/* Slider Navigation */}
                  <div className="absolute left-4 md:left-8 bottom-8 flex items-center gap-16 md:gap-32">
                    {/* Thumbnail with Progress */}
                    <div 
                      className="relative cursor-pointer group"
                      onClick={handleNextSlide}
                    >
                      <div className="w-20 h-20 md:w-32 md:h-32 overflow-hidden">
                        <img 
                          src={slides[(currentSlide + 1) % slides.length].thumbnail}
                          alt="Next slide"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                      </div>

                      {/* White Border Frame */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-white" />
                      <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-white" />

                      {/* Progress Border - Clockwise Fill */}
                      <div className="absolute inset-0">
                        {/* Top Border - Left to Right */}
                        <div 
                          className="absolute top-0 left-0 h-[6px] bg-white"
                          style={{
                            width: progress <= 25 ? `${progress * 4}%` : '100%',
                            transition: 'width 0.1s linear'
                          }}
                        />
                        {/* Right Border - Top to Bottom */}
                        <div 
                          className="absolute top-0 right-0 w-[6px] bg-white"
                          style={{
                            height: progress > 25 && progress <= 50 ? `${(progress - 25) * 4}%` : progress > 50 ? '100%' : '0%',
                            transition: 'height 0.1s linear'
                          }}
                        />
                        {/* Bottom Border - Right to Left */}
                        <div 
                          className="absolute bottom-0 right-0 h-[6px] bg-white"
                          style={{
                            width: progress > 50 && progress <= 75 ? `${(progress - 50) * 4}%` : progress > 75 ? '100%' : '0%',
                            transition: 'width 0.1s linear'
                          }}
                        />
                        {/* Left Border - Bottom to Top */}
                        <div 
                          className="absolute left-0 bottom-0 w-[6px] bg-white"
                          style={{
                            height: progress > 75 ? `${(progress - 75) * 4}%` : '0%',
                            transition: 'height 0.1s linear'
                          }}
                        />
                      </div>

                      {/* Static Border */}
                      <div className="absolute inset-0 border-[6px] border-white/30" />

                      <span className="absolute inset-0 flex items-center justify-center text-white text-base md:text-xl font-light">
                        Next
                      </span>
                    </div>

                    {/* Slide Numbers */}
                    <div className="flex items-center">
                      <span className="text-white text-xl md:text-[32px] font-light leading-none">
                        {String(currentSlide + 1).padStart(2, '0')}
                      </span>
                      <div className="mx-1 md:mx-2 flex items-center">
                        <div className="w-8 md:w-16 h-[1px] bg-white/50 rotate-[-15deg]" />
                      </div>
                      <span className="text-white/50 text-xl md:text-[32px] font-light leading-none">
                        {String(slides.length).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default HeroSlider
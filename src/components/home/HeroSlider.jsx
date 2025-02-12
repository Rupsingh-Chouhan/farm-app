import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&auto=format',
    title: 'From Our Farms To Your Hands'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1472145246862-b24cf25c4a36?w=1600&auto=format',
    title: 'From Our Farms To Your Hands'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&auto=format',
    title: 'From Our Farms To Your Hands'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&auto=format',
    title: 'From Our Farms To Your Hands'
  }
]

const slideVariants = {
  enter: {
    clipPath: 'inset(50% 0% 50% 0%)',
    zIndex: 3,
  },
  center: {
    clipPath: 'inset(0% 0% 0% 0%)',
    zIndex: 3,
    transition: {
      clipPath: {
        duration: 1.5,
        ease: 'easeInOut',
      },
    },
  },
  exit: {
    clipPath: 'inset(0% 0% 0% 0%)',
    zIndex: 1,
  },
}

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAnimating(true)
  }

  // Single timer for both slide and animation
  useEffect(() => {
    const timer = setInterval(() => {
      handleNextSlide()
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative min-h-screen">
      <div className="w-[1440px] mx-auto max-w-full">
        <div className="mx-8">
          <div className="absolute inset-0">
            <div className="absolute inset-0 overflow-hidden rounded z-1">
              <img
                src={slides[(currentSlide - 1 + slides.length) % slides.length].image}
                alt="Previous slide"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>

            <AnimatePresence initial={false}>
              <motion.div 
                key={currentSlide}
                className="absolute inset-0"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <div className="absolute inset-0 overflow-hidden rounded">
                  <motion.img
                    src={slides[currentSlide].image}
                    alt={`Slide ${slides[currentSlide].id}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute inset-0 flex items-center p-16">
                    <div>
                      <p className="text-white text-sm mb-4">Welcome To TenTwenty Farms</p>
                      <h1 className="text-white text-7xl font-light leading-tight">
                        {slides[currentSlide].title}
                      </h1>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute left-16 bottom-16 flex items-center gap-8 z-50">
            <div className="relative w-[100px] h-[100px] md:w-[138px] md:h-[138px] cursor-pointer" onClick={handleNextSlide}>
              <div className="absolute inset-0">
                <svg className="w-full h-full">
                  <rect 
                    className="w-full h-full fill-none stroke-white"
                    strokeWidth="1"
                  />
                </svg>
              </div>

              <div className="absolute -inset-[7.5px]">
                <svg className="w-full h-full">
                  <rect 
                    key={currentSlide}
                    className="w-full h-full fill-none stroke-white animate-border"
                    strokeWidth="15"
                    strokeDasharray="550"
                    strokeDashoffset="550"
                    pathLength="550"
                    style={{
                      strokeLinecap: 'square',
                      transformOrigin: '0 0',
                    }}
                    onAnimationEnd={() => setIsAnimating(false)}
                  />
                </svg>
              </div>

              <div className="absolute inset-[15px] md:inset-[22px]">
                <img 
                  src={slides[(currentSlide + 1) % slides.length].image}
                  alt="Next slide"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <span className="text-white text-base md:text-[20px] font-light">Next</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <span className="text-white text-xs md:text-sm">0{currentSlide + 1}</span>
              <div className="w-8 md:w-12 h-[1px] bg-white/50"></div>
              <span className="text-white text-xs md:text-sm">04</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes borderAnimation {
          0% {
            stroke-dashoffset: 550;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        .animate-border {
          animation: borderAnimation 6s linear forwards;
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .w-\\[1440px\\] {
            width: 100%;
          }

          .mx-8 {
            margin-left: 1rem;
            margin-right: 1rem;
          }

          .p-16 {
            padding: 1.5rem;
          }

          .text-7xl {
            font-size: 2.5rem;
            line-height: 1.2;
          }

          .text-sm {
            font-size: 0.75rem;
          }

          .mb-4 {
            margin-bottom: 0.5rem;
          }

          .left-16 {
            left: 1.5rem;
          }

          .bottom-16 {
            bottom: 1.5rem;
          }

          .gap-8 {
            gap: 1rem;
          }

          .w-\\[138px\\] {
            width: 80px;
          }

          .h-\\[138px\\] {
            height: 80px;
          }

          .inset-\\[22px\\] {
            inset: 15px;
          }

          .-inset-\\[7\\.5px\\] {
            inset: -5px;
          }

          .text-\\[20px\\] {
            font-size: 1rem;
          }

          .w-12 {
            width: 2rem;
          }
        }
      `}</style>
    </div>
  )
}

export default HeroSlider
import { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

const products = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1580164631075-b3f1304f4051?w=800&auto=format', // Purple leaves
    title: 'Client 1',
    subtitle: "Dubai, United Arab Emirates"
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&auto=format', // Cherry blossoms
    title: 'Client 2',
    subtitle: "New York, United States"
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1504567961542-e24d9439a724?w=800&auto=format', // Sunflowers
    title: 'Client 3',
    subtitle: "London, United Kingdom"
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&auto=format', // Modern architecture
    title: 'Client 4',
    subtitle: "Singapore"
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format', // Mountain landscape
    title: 'Client 5',
    subtitle: "Toronto, Canada"
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format', // Urban cityscape
    title: 'Client 6',
    subtitle: "Sydney, Australia"
  }
]

const ProductSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(1)
  const dragX = useMotionValue(0)
  const containerRef = useRef(null)
  
  const handleDragEnd = () => {
    const x = dragX.get()
    if (Math.abs(x) > 100) {
      const direction = x > 0 ? -1 : 1
      setCurrentIndex((prev) => (prev + direction + products.length) % products.length)
    }
    animate(dragX, 0, { duration: 0.5 })
  }

  // Get current product data
  const currentProduct = products[currentIndex]

  return (
    <div className="relative h-[400px] md:h-[750px] w-full max-w-[1400px] mx-auto overflow-hidden">
      {/* Slider Section */}
      <div className="relative h-[200px] md:h-[450px]" ref={containerRef}>
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          drag="x"
          dragConstraints={containerRef}
          onDragEnd={handleDragEnd}
          style={{ x: dragX }}
        >
          {products.map((product, index) => {
            const position = ((index - currentIndex + products.length) % products.length)
            
            // Reduced spacing and sizes for mobile
            const translateX = (position - 1) * (window.innerWidth < 768 ? 180 : 450)
            let rotate = 0
            let translateY = 0
            let skewY = 0

            if (position < 1) { // Left image
              rotate = -35
              translateY = window.innerWidth < 768 ? 40 : 120
              skewY = -12
            } else if (position > 1) { // Right image
              rotate = 35
              translateY = window.innerWidth < 768 ? 40 : 120
              skewY = 12
            }

            const scale = position === 1 ? 1 : 0.85
            const opacity = position === 1 ? 1 : 0.9

            return (
              <motion.div
                key={product.id}
                className="absolute"
                animate={{
                  x: translateX,
                  y: translateY,
                  rotate: rotate,
                  scale,
                  opacity,
                }}
                transition={{ 
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1]
                }}
                style={{ 
                  transformOrigin: 'bottom center',
                  width: position === 1 ? 
                    (window.innerWidth < 768 ? '140px' : '350px') : 
                    (window.innerWidth < 768 ? '160px' : '400px'),
                  height: position === 1 ? 
                    (window.innerWidth < 768 ? '180px' : '450px') : 
                    (window.innerWidth < 768 ? '200px' : '500px'),
                  zIndex: position === 1 ? 2 : 1,
                  transform: `perspective(2000px) rotateX(8deg) skewY(${skewY}deg)`,
                }}
              >
                <div className="relative w-full h-full">
                  <div 
                    className="absolute inset-0 overflow-hidden"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, 94% 100%, 0% 100%)',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                    }}
                  >
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-cover"
                      draggable="false"
                    />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Drag indicator */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50">
          <motion.div 
            className="w-[60px] h-[60px] md:w-[100px] md:h-[100px] rounded-full flex items-center justify-center bg-white"
            style={{
              opacity: useTransform(dragX, [-100, 0, 100], [1, 1, 1])
            }}
          >
            <span className="text-black text-[16px] md:text-[20px] font-light">Drag</span>
          </motion.div>
        </div>
      </div>

      {/* Caption Section - Bottom */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 text-center z-20 pb-2 md:pb-8 mt-[-30px] md:mt-0"
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.h3 
          className="text-xl md:text-[32px] text-gray-900 font-medium mb-1 md:mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          key={`title-${currentIndex}`}
        >
          {currentProduct.title}
        </motion.h3>
        <div className="space-y-0.5 md:space-y-1">
          <motion.p 
            className="text-sm md:text-lg text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={`subtitle-${currentIndex}`}
          >
            {currentProduct.subtitle}
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}

export default ProductSlider 
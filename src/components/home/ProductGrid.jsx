import { motion, useMotionValue, animate } from 'framer-motion'
import { useState } from 'react'

const products = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=800&auto=format',
    rotation: -15,
    client: "Client 1",
    location: "Dubai, United Arab Emirates"
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&auto=format',
    rotation: 0,
    client: "Client 2",
    location: "Singapore"
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format',
    rotation: 15,
    client: "Client 3",
    location: "Tokyo, Japan"
  }
]

const ProductGrid = () => {
  const [currentIndex, setCurrentIndex] = useState(1)
  const x = useMotionValue(0)

  // Get the indices for all three positions
  const leftIndex = (currentIndex - 1 + products.length) % products.length
  const rightIndex = (currentIndex + 1) % products.length

  const handleDragEnd = (_, info) => {
    const velocity = info.velocity.x
    const offset = info.offset.x

    if (Math.abs(velocity) > 500 || Math.abs(offset) > 100) {
      const direction = velocity < 0 || offset < 0 ? 1 : -1
      setCurrentIndex((prev) => (prev + direction + products.length) % products.length)
      animate(x, 0, { type: "spring", stiffness: 300, damping: 30 })
    } else {
      animate(x, 0, { type: "spring", stiffness: 500, damping: 30 })
    }
  }

  return (
    <div className="relative py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light mb-4">Quality Products</h2>
        </div>

        {/* Images Grid */}
        <div className='mobile-responsive pt-5'>
          <div className="draggable-area grid grid-cols-3 gap-8 mb-16 px-12">
            {/* Left Image - Fixed Position */}
            <motion.div
              className="relative w-full"
              style={{ 
                rotate: -15,
                transformOrigin: 'center'
              }}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <motion.img
                  key={products[leftIndex].id}
                  src={products[leftIndex].image}
                  alt="Left slide"
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>

            {/* Center Image - Draggable */}
            <motion.div
              className="relative"
              style={{ 
                rotate: 0,
                transformOrigin: 'center'
              }}
            >
              <motion.div
                className="aspect-[3/4] overflow-hidden cursor-grab active:cursor-grabbing"
                whileDrag={{ scale: 1.05 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragEnd={handleDragEnd}
                style={{ x }}
              >
                <motion.img
                  key={products[currentIndex].id}
                  src={products[currentIndex].image}
                  alt="Current slide"
                  className="w-full h-full object-cover pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center">
                    <span className="text-gray-800">Drag</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Image - Fixed Position */}
            <motion.div
              className="relative"
              style={{ 
                rotate: 15,
                transformOrigin: 'center'
              }}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <motion.img
                  key={products[rightIndex].id}
                  src={products[rightIndex].image}
                  alt="Right slide"
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Client Info - Fixed Position */}
        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={products[currentIndex].client}
        >
          <div className="inline-block px-12 py-4">
            <h3 className="text-2xl font-work-sans font-light text-gray-900 mb-2">
              {products[currentIndex].client}
            </h3>
            <p className="text-sm text-gray-500">
              {products[currentIndex].location}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ProductGrid
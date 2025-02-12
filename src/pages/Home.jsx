import HeroSlider from '../components/home/HeroSlider'
import { motion } from 'framer-motion'
import ProductSlider from '../components/home/ProductSlider'

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSlider />

      {/* Quality Products Section with animations */}
      <motion.section 
        className="py-16 md:py-24 lg:py-32 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="w-[1440px] mx-auto">
          <div className="mx-8">
            <motion.div 
              className="max-w-xl md:max-w-2xl mx-auto text-center mb-16 md:mb-24"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2 
                className="text-3xl md:text-4xl lg:text-5xl font-work-sans font-light text-gray-900 mb-6 md:mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                Quality Products
              </motion.h2>
              <motion.p 
                className="text-base md:text-lg text-gray-400 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.
              </motion.p>
            </motion.div>
            
            <ProductSlider />
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default Home
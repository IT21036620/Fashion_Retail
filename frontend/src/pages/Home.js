import { useEffect } from 'react'
import axios from 'axios'

import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import bp01 from './img/bp01.png'
import img2 from './img/02.jpg'
import img3 from './img/03.jpg'
import HomeReview from '../components/HomeReview/HomeReview'
import FeaturedProducts from '../components/HomeProducts/FeaturedProducts'
import LatestProducts from '../components/HomeProducts/LatestProducts'
import InexpensiveProducts from '../components/HomeProducts/InexpensiveProducts'
import Footer from '../components/footer'
import FashionCards from '../components/HomeProducts/FashionCards'

const Home = () => {
  return (
    <div>
      <Carousel
        autoPlay
        interval={5000}
        infiniteLoop
        showThumbs={false}
        showStatus={false}
      >
        <div>
          <img class="h-[750px]" src={bp01} alt="Slide 1" />
        </div>
        <div>
          <img class="h-[750px]" src={img2} alt="Slide 2" />
        </div>
        <div>
          <img class="h-[750px]" src={img3} alt="Slide 3" />
        </div>
      </Carousel>

      <FashionCards />
      <FeaturedProducts />
      <LatestProducts />
      <InexpensiveProducts />
      <HomeReview />

      <section className="bg-[#fcf5f5] text-black py-6 h-[400px]">
        <div className="container mx-auto flex flex-col items-center justify-center h-full">
          <h2 className="text-4xl font-bold mb-4">
            Subscribe to our Newsletter
          </h2>
          <p className="mb-6 text-xl">
            Stay updated with our latest fashion trends and offers.
          </p>

          <form className="flex justify-center">
            <input
              type="email"
              placeholder="Enter your email address"
              className="p-2 rounded-l-md focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-r-md"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Home

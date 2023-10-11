import { useEffect } from 'react'
import axios from 'axios'

import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import bp01 from './img/f01.jpg'
import img2 from './img/f02.jpg'
import img3 from './img/f03.jpg'
import ver01 from './img/ver01.jpg'
import ver02 from './img/ver02.jpg'
import ver03 from './img/ver03.jpg'

import t01 from './img/t01.jpg'
import t02 from './img/t02.jpeg'
import t03 from './img/t03.jpg'
import t04 from './img/t04.jpg'

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
      <div className="flex justify-between">
        <div className="w-1/3 p-4 cursor-pointer transform transition hover:scale-105 h-[500px]">
          <div
            style={{ backgroundImage: `url(${ver01})` }}
            className="bg-cover bg-center h-full rounded-lg flex flex-col items-center justify-center p-4"
          >
            <h3 className="text-2xl font-bold text-white mb-2">MEN</h3>
            <button className="bg-white text-black p-2 rounded-md w-[100px]">
              Explore
            </button>
          </div>
        </div>

        <div className="w-1/3 p-4 cursor-pointer transform transition hover:scale-105 h-[500px]">
          <div
            style={{ backgroundImage: `url(${ver02})` }}
            className="bg-cover bg-center h-full rounded-lg flex flex-col items-center justify-center p-4"
          >
            <h3 className="text-2xl font-bold text-white mb-2">WOMEN</h3>
            <button className="bg-white text-black p-2 rounded-md w-[100px]">
              Explore
            </button>
          </div>
        </div>

        <div className="w-1/3 p-4 cursor-pointer transform transition hover:scale-105 h-[500px]">
          <div
            style={{ backgroundImage: `url(${ver03})` }}
            className="bg-cover bg-center h-full rounded-lg flex flex-col items-center justify-center p-4"
          >
            <h3 className="text-2xl font-bold text-white mb-2">KIDS</h3>
            <button className="bg-white text-black p-2 rounded-md w-[100px]">
              Explore
            </button>
          </div>
        </div>
      </div>

      {/* cloth images */}
      <div className="flex justify-between">
        <div className="w-1/4 p-4 cursor-pointer transform transition hover:scale-105">
          <div
            style={{ backgroundImage: `url(${t01})` }}
            className="bg-cover bg-center h-[300px] rounded-lg"
          ></div>
        </div>

        <div className="w-1/4 p-4 cursor-pointer transform transition hover:scale-105">
          <div
            style={{ backgroundImage: `url(${t02})` }}
            className="bg-cover bg-center h-[300px] rounded-lg"
          >
            {/* Content for Card 2 */}
          </div>
        </div>

        <div className="w-1/4 p-4 cursor-pointer transform transition hover:scale-105">
          <div
            style={{ backgroundImage: `url(${t03})` }}
            className="bg-cover bg-center h-[300px] rounded-lg"
          >
            {/* Content for Card 3 */}
          </div>
        </div>

        <div className="w-1/4 p-4 cursor-pointer transform transition hover:scale-105">
          <div
            style={{ backgroundImage: `url(${t04})` }}
            className="bg-cover bg-center h-[300px] rounded-lg"
          >
            {/* Content for Card 4 */}
          </div>
        </div>
      </div>

      {/* <FeaturedProducts />
      <LatestProducts />
      <InexpensiveProducts /> */}
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
              className="bg-[#018083] hover:bg-blue-600 text-white p-2 rounded-r-md"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
      {/* <Footer /> */}
    </div>
  )
}

export default Home

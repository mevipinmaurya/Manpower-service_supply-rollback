import React from 'react'
import HeroSection from '../components/HeroSection'
import ServicesHome from '../components/ServicesHome'
import Features from '../components/Features'
import HomeBanner from '../components/HomeBanner'
import WhyChooseUs from '../components/WhyChooseUs'
import FAQ from '../components/FAQ'
import Carousel from '../components/Carousel'
import HomeAbout from '../components/HomeAbout'
const Home = () => {
  return (
    <div>
      <HeroSection />
      <ServicesHome />
      <HomeAbout />
      <Features />
      <WhyChooseUs />
      <Carousel />
      <FAQ />
      <HomeBanner />
    </div>
  )
}

export default Home
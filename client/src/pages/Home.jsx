import React from 'react'
import Navbar from '../components/Navbar'
import AiTools from '../components/AiTools'
import Testimonial from '../components/Testimonial'
import Plan from '../components/Plan'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import { Layout } from 'lucide-react'


const Home = () => {
  return (
    <>
      <Layout/>
      <Navbar/>
      <Hero/>
      <AiTools/>
      <Testimonial/>
      <Plan/>
      <Footer/>
    </>
  )
}

export default Home

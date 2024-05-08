import React from 'react'
import banner from "../../assets/banner.png"

const Home = () => {
  return (
    <div className='bg-white w-full'>
      <div className='w-full h-fit'>
        <img src={banner} alt="banner" />
      </div>
      <div className='w-main mx-auto'>
        content
      </div>
    </div>
  )
}

export default Home
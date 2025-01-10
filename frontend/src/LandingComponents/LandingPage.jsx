import React from 'react';
import Header from './Header';
import Intro from './Intro';
import Slider from './Slider';

const LandingPage = () => {
  return (
    <div className='h-screen w-full bg-theme-primaryRedone'>
      <Header />
      <div className='flex flex-nowrap'>
         <Intro />
         <Slider/>
      </div>
     
      
    </div>
  )
}

export default LandingPage;

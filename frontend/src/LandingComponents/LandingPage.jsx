import React from 'react';
import Header from './Header';
import Intro from './Intro';

const LandingPage = () => {
  return (
    <div className='h-screen w-full bg-theme-primaryRedone'>
      <Header />
      <Intro />
    </div>
  )
}

export default LandingPage;

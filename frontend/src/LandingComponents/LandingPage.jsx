<<<<<<< HEAD
﻿import React, { useContext, useState } from 'react';
import Header from './Header';
import Intro from './Intro';
import Slider from './Slider';
import Footer from './footer';

// export const FormToggleContext = useContext();

const LandingPage = () => {

  const [toggle, setToggle] = useState(false);

  return (
    <div className='h-screen w-full bg-theme-primaryRedone'>
      {/* <FormToggleContext.Provider values={{toggle, setToggle}}> */}
        <Header />
        <div className='flex flex-nowrap'>
          <Intro />
          <Slider/>
          
        </div>
      {/* </FormToggleContext.Provider> */}
  
   
      <Footer />
      
=======
﻿import React, { useState, useRef } from 'react';
import Header from './Header';
import Intro from './Intro';
import Slider from './Slider';
import KnowMore from './KnowMore';

const LandingPage = () => {
  const [knowmore, setKnowmore] = useState(false);
  const knowMoreRef = useRef(null); // Ref for the target element

  const handleBtnClicked = () => {
    setKnowmore(true);
    setTimeout(() => {
      knowMoreRef.current?.scrollIntoView({ behavior: 'smooth' }); // Scroll smoothly to the element
    }, 100); // Delay to ensure the element is rendered before scrolling
  };

  return (
    <div className="h-screen w-full bg-theme-primaryRedone">
      <Header />
      <div className="flex flex-nowrap">
        <Intro handleBtnClicked={handleBtnClicked} />
        <Slider />
      </div>
      {knowmore && (
        <div ref={knowMoreRef}>
          <KnowMore />
        </div>
      )}
>>>>>>> 40ad7f4cab88b7e18b37782cdbdba5ceae909e19
    </div>
  );
};

export default LandingPage;

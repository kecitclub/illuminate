import React, { useContext, useState } from 'react';
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
      
    </div>
  )
}

export default LandingPage;

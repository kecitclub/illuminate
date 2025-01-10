import React, { useState, useRef } from 'react';
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
    </div>
  );
};

export default LandingPage;

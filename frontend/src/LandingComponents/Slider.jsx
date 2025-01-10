import React, { useState, useEffect, useRef } from "react";
import slide1 from '../Assets/slide1.jpg'
import slide2 from '../Assets/slide2.png'
import slide3 from '../Assets/slide3.png'
import slide4 from '../Assets/slide4.jpg'

const Slider = () => {
  const slides = [
    slide1,slide2,slide3,slide4
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideInterval = useRef(null);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

 

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const startAutoSlide = () => {
    slideInterval.current = setInterval(goToNextSlide, 2000);
  };

  const stopAutoSlide = () => {
    if (slideInterval.current) clearInterval(slideInterval.current);
  };

  return (
    <div
      className="absolute mt-28 w-[60%] max-w-4xl ml-[530px]  rounded-lg  overflow-hidden"
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="flex-shrink-0 w-full">
            <img  src={slide} alt={`Slide ${index + 1}`} className="w-full h-[400px]" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;

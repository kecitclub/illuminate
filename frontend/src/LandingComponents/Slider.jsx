import React, { useState, useEffect, useRef } from "react";
import slide1 from '../Assets/slide1.png'
import slide2 from '../Assets/slide2.png'
import slide3 from '../Assets/slide3.png'
import slide4 from '../Assets/slide4.png'
import slide5 from '../Assets/slide5.png'
import slide6 from '../Assets/slide6.png'

const Slider = () => {
  const slides = [
    slide1,slide2,slide3,slide5,slide6,slide4
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
      className="absolute w-[50%] max-w-4xl top-[23%]  left-[44%] rounded-lg  overflow-hidden"
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="flex-shrink-0 w-full">
            <img  src={slide} alt={`Slide ${index + 1}`} className="w-full h-[500px]" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;

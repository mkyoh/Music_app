import React, { useEffect, useState } from "react";
import SliderImage from "./SliderImage";
import "./slider.css";

interface Slide {
  urls: string;
  title?: string;
  description?: string;
}

interface SliderContentProps {
  activeIndex: number;
  sliderImage: Slide[];
}

const SliderContent: React.FC<SliderContentProps> = ({ activeIndex, sliderImage }) => {
  return (
    <section>
      {sliderImage.map((slide, index) => (
        <div
          key={index}
          className={index === activeIndex ? "slides active" : "inactive"}
        >
          <img className="slide-image" src={slide.urls} alt="" />
          <h2 className="slide-title">{slide.title}</h2>
          <h3 className="slide-text">{slide.description}</h3>
        </div>
      ))}
    </section>
  );
};

interface ArrowsProps {
  prevSlide: () => void;
  nextSlide: () => void;
}

const Arrows: React.FC<ArrowsProps> = ({ prevSlide, nextSlide }) => {
  return (
    <div className="arrows">
      <span className="prev" onClick={prevSlide}>
        &#10094;
      </span>
      <span className="next" onClick={nextSlide}>
        &#10095;
      </span>
    </div>
  );
};

const len = SliderImage.length - 1;

const Slider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex === len ? 0 : prevIndex + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider-container">
      <SliderContent activeIndex={activeIndex} sliderImage={SliderImage} />
      <Arrows
        prevSlide={() =>
          setActiveIndex((prevIndex) => (prevIndex < 1 ? len : prevIndex - 1))
        }
        nextSlide={() =>
          setActiveIndex((prevIndex) => (prevIndex === len ? 0 : prevIndex + 1))
        }
      />
    </div>
  );
};

export default Slider;
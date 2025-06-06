"use client";

import styled from "styled-components";
import Slider from "react-slick";
import Image from "next/image";

const LandingCarousel: React.FC = () => {
  const Banners = [
    "/assets/L1.webp",
    "/assets/L2.webp",
    "/assets/L3.jpg",
    "/assets/L4.jpg",
    "/assets/L5.jpg",
    "/assets/L6.jpg",
    "/assets/L7.jpg",
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnHover: true,
  };

  return (
    <CarouselContainer>
      <Slider {...settings}>
        {Banners.map((banner, index) => (
          <div key={index} className="slide">
            <Image
              src={banner}
              width={1920}
              height={800}
              alt={`Banner ${index + 1}`}
              className="banner"
              priority
            />
          </div>
        ))}
      </Slider>
    </CarouselContainer>
  );
};

export default LandingCarousel;

const CarouselContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  overflow: hidden;

  .slide {
    position: relative;
    display: grid;
    place-items: center;
  }

  .banner {
    width: 75%;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.06);
    height: auto;
    border-radius: 10px;
    transition: transform 0.3s ease-in-out;
  }
`;

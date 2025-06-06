"use client";

import styled from "styled-components";
import Banner from "@/public/assets/banner2.jpg";

import { MainBtn, ShopNowBtn } from "../ui/Buttons";
import { useSelector } from "react-redux";
import VideoBox from "./VideoBox";
import Image from "next/image";

const Landing = () => {
  //   const isAdmin = useSelector((state) => state.app.isAdmin);

  return (
    <Style>
      <div>
        <a href="#shop"></a>
      </div>
    </Style>
  );
};

const Style = styled.div`
  height: 700px;
  margin-bottom: 30px;

  background-image: url("/assets/L4.jpg");
  background-size: cover;

  filter: sepia(0.15) contrast(1.05) brightness(0.98) saturate(1.2)
    hue-rotate(-2deg);
  transition: filter 0.3s ease;
  background-position: center;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url("/assets/grain.png"); /* transparent PNG grain texture */
    background-size: cover;
    mix-blend-mode: soft-light;
    opacity: 0.08; /* adjust for more/less grain */
    pointer-events: none;
  }

  div {
    position: absolute;
    top: 240px;
    left: -60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      transform: scale(0.6);
    }
    @media (max-width: 980px) {
      transform: scale(0.9);

      left: -100px;
    }
    @media (max-width: 500px) {
      transform: scale(0.6);
      top: 350px;
      left: -130px;
    }
  }
`;

export default Landing;

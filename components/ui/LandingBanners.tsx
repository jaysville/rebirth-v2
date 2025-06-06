"use client";

import styled from "styled-components";
import Banner from "@/public/assets/banner2.jpg";

import { MainBtn, ShopNowBtn } from "../ui/Buttons";
import { useSelector } from "react-redux";
import VideoBox from "./VideoBox";
import Image from "next/image";
import { ArrowRightOutlined } from "@ant-design/icons";

const Landing = () => {
  //   const isAdmin = useSelector((state) => state.app.isAdmin);

  return (
    <Style>
      <div>
        <button>
          Shop Men <ArrowRightOutlined />
        </button>
        <button>
          Shop Women <ArrowRightOutlined />
        </button>
        <button>
          Shop Accessories <ArrowRightOutlined />
        </button>
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
    bottom: 100px;
    left: 20px;

    display: flex;
    flex-direction: column;
    align-items: center;
    button {
      border: 2px solid aliceblue;
      text-align: center;
      background-color: #0000004a;
      width: 160px;
      color: aliceblue;
      font-size: 800;
      height: 40px;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      transition: all 2ms ease-in-out;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
`;

export default Landing;

"use client";

import styled from "styled-components";

import { ArrowRightOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const Landing = () => {
  const router = useRouter();

  return (
    <Style>
      <div>
        <button
          onClick={() => {
            router.push("/collections/male");
          }}
        >
          Shop Male <ArrowRightOutlined />
        </button>
        <button
          onClick={() => {
            router.push("/collections/female");
          }}
        >
          Shop Female <ArrowRightOutlined />
        </button>
        <button
          onClick={() => {
            router.push("/collections/accessories");
          }}
        >
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
  background-position: center;
  position: relative;

  filter: sepia(0.15) contrast(1.05) brightness(0.98) saturate(1.2)
    hue-rotate(-2deg);
  transition: filter 0.3s ease;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url("/assets/grain.png");
    background-size: cover;
    mix-blend-mode: soft-light;
    opacity: 0.08;
    pointer-events: none;
  }

  div {
    position: absolute;
    bottom: 100px;
    left: 20px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px; /* ✅ adds space between buttons */

    button {
      border: 2px solid aliceblue;
      background-color: #0000004a;
      width: 180px;
      color: aliceblue;
      height: 42px;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 12px;

      transition: all 0.2s ease-in-out;
      &:hover {
        transform: scale(1.05);
      }
    }
  }
`;

export default Landing;

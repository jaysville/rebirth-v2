"use client";

import { MainBtn, Tag } from "@/components/ui/Buttons";
import Landing from "@/components/ui/LandingBanners";
import LandingCarousel from "@/components/ui/LandingCarousel";
import ProductsCarousel from "@/components/ui/ProductsCarousel";
import Landingmerch from "@/components/ui/TrendingMerch";

import { Grid } from "@mui/material";
import styled from "styled-components";

const HomePage: React.FC = () => {
  return (
    <Style>
      <Landing />
      <Grid container spacing={4} sx={{ padding: "5px" }}>
        <Grid size={{ xs: 12, md: 5 }} order={{ xs: 2, md: 2 }}>
          <LandingCarousel />
        </Grid>
        <Grid
          size={{ xs: 12, md: 7 }}
          order={{ xs: 1, md: 1 }}
          sx={{ padding: "10px" }}
          className="landing-text"
        >
          {/* <Item className="text-container"> */}
          <Tag>Welcome To</Tag>
          <h1 className="h1">The Rebirth Island 🌴</h1>
          <p>
            At Rebirth Island, we design clean, high-quality apparel that
            empowers confidence and self-expression. Born from the idea of
            starting fresh and showing up stronger, our pieces reflect growth,
            resilience, and bold simplicity. This isn’t just clothing — it’s a
            symbol of your evolution.
          </p>
          <MainBtn>Learn More</MainBtn>
          {/* </Item> */}
        </Grid>
      </Grid>
      <br />
      <br />
      <h2>Trending</h2>
      <Landingmerch />
      <h2>Best Sellers</h2>
      <ProductsCarousel />
    </Style>
  );
};

export default HomePage;

const Style = styled.div`
  display: flex;
  flex-direction: column;
  h2 {
    text-align: center;
  }
  h3 {
    text-align: center;
  }
  .landing-text {
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.06);
    height: fit-content;
    border-radius: 10px;
  }
  button {
    align-self: center;
    margin-top: 20px;
  }
  #shop {
    margin-top: 50px;
  }
  .h1 {
    text-align: start;
    font-size: 23px;
    color: #5d90be;
  }
`;
const Item = styled.div`
  margin-top: 20px;
  padding: 30px;
  h1 {
    font-weight: bold;

    margin: 0;
  }
  h2 {
    text-align: center;
  }

  .image {
    width: 384px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.06);
    height: 350px;
    border-radius: 10px;
  }

  .landing &.text-container {
    display: flex;
    text-align: start;
    flex-direction: column;
    justify-content: center;
    /* padding: 10px; */

    p {
      margin: 10px 0;
    }
    button {
      justify-self: start;
      align-self: start;
    }
  }
`;

const Loader = styled.div`
  display: grid;
  place-items: center;
  width: 100vw;
`;

// export const Tag = styled.span`
//   background-color: #f1f1f1;
//   /* color: ${({ theme }) => theme.secondary}; */
//   border-radius: 20px;
//   padding: 5px;
//   width: 100px;
//   display: grid;
//   place-items: center;
//   transform: scale(0.9);

//   font-size: 14px;
//   i {
//     transform: translateX(-8px);
//     font-style: normal;
//   }
// `;

// const ProductsContainer = styled.ul`
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   gap: 30px;
//   @media (max-width: 650px) {
//     grid-template-columns: repeat(2, 1fr);
//   }
// `;

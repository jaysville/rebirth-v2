"use client";

import { Grid } from "@mui/material";
import styled from "styled-components";
import { MainBtn, Tag } from "@/components/ui/Buttons";
import LandingCarousel from "@/components/ui/LandingCarousel";
import ProductsCarousel from "@/components/ui/ProductsCarousel";
import Landingmerch from "@/components/ui/TrendingMerch";
import { MerchProps } from "@/types/components";
import { useDispatch } from "react-redux";
import { setMerch } from "@/redux/slices/appSlice";
import { useEffect } from "react";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
interface Props {
  merch: MerchProps[];
}

const LandingContent: React.FC<Props> = ({ merch }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    if (merch?.length) {
      dispatch(setMerch(merch));
    }
  }, [merch, dispatch]);

  return (
    <Style>
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
          <MainBtn
            onClick={() => {
              router.push("/about-us");
            }}
          >
            Learn More
          </MainBtn>
        </Grid>
      </Grid>

      <br />
      <h2 className="trending">Trending</h2>
      <Landingmerch />
      <h2 className="trending">Best Sellers</h2>
      <ProductsCarousel />
    </Style>
  );
};

export default LandingContent;

const Style = styled.div`
  display: flex;
  flex-direction: column;

  h2.trending {
    text-align: center;
    font-size: 30px;
    font-weight: bold;
  }
  .landing-text {
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    height: fit-content;
    p {
      margin: 10px 0;
      margin-bottom: 20px;
      color: #552c36;
    }
    button {
      margin-bottom: 10px;
    }
    .h1 {
      margin: 10px 0;
      font-size: 30px;
      font-weight: bold;
    }
  }
`;

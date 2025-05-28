import styled from "styled-components";
import { Divider, Grid } from "@mui/material";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MainBtn, Tag } from "./Buttons";
import { Trending_Merch } from "@/utils/trendingMerch";

const Landingmerch: React.FC = () => {
  return (
    <Container>
      {Trending_Merch.map((merch, index) => {
        const isImageRight = index % 2 === 0;
        return (
          <Grid container spacing={4} key={merch.id} alignItems="center">
            <Grid
              size={{ xs: 12, md: 6 }}
              order={{ xs: 2, md: isImageRight ? 1 : 2 }}
            >
              <Tag>Popular</Tag>
              <h3>{merch.name}</h3>
              <p>{merch.description}</p>
              <Link href={`/merchs/${merch.id}`}>
                <MainBtn>View</MainBtn>
              </Link>
            </Grid>
            <Grid
              size={{ xs: 12, md: 6 }}
              order={{ xs: 1, md: isImageRight ? 2 : 1 }}
            >
              <Image
                src={merch.thumbmail}
                alt={merch.name}
                className={`image ${isImageRight ? "start" : ""}`}
                priority
                width={500}
                height={500}
              />
            </Grid>
          </Grid>
        );
      })}
      <Divider variant="middle" />
    </Container>
  );
};

export default Landingmerch;

const Container = styled.div`
  display: grid;

  gap: 40px;
  padding: 30px;
  h3 {
    justify-self: start;
    align-self: start;

    color: #032f6f;
    margin: 10px 0;
    font-weight: bold;
  }
  .tag {
    transform: scale(0.8) translateX(-15px) translateY(5px);
  }
  p {
    margin: 0.8 0;
  }
  button {
    margin-bottom: 20px;
  }
  .image {
    width: 384px;
    height: 330px;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.06);

    display: grid;
    place-items: center;
    @media (max-width: 900px) {
      margin: auto;
      width: 100%;
    }
  }
  .start {
    margin-left: auto;
  }
`;

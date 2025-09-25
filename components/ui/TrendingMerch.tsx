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
          <Grid
            container
            spacing={4}
            key={merch._id}
            alignItems="center"
            className={`merch  ${isImageRight ? "pink " : "grey"}`}
          >
            <Grid
              size={{ xs: 12, md: 6 }}
              order={{ xs: 2, md: isImageRight ? 1 : 2 }}
              sx={{ padding: "20px" }}
            >
              <Tag className="tag">Hot</Tag>
              <h3>{merch.name}</h3>
              <p className="description">{merch.description}</p>
              <Link href={`/merch/${merch._id}`}>
                <MainBtn>View</MainBtn>
              </Link>
            </Grid>
            <Grid
              size={{ xs: 12, md: 6 }}
              order={{ xs: 1, md: isImageRight ? 2 : 1 }}
              sx={{
                display: "flex",
                justifyContent: isImageRight ? "flex-end" : "flex-start",
              }}
            >
              <div className={`image-wrapper ${index === 0 ? "first" : ""}`}>
                <Image
                  src={merch.thumbmail || ""}
                  alt={merch.name}
                  className={`image ${isImageRight ? "start" : ""}`}
                  priority
                  width={500}
                  height={500}
                />
              </div>
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
  /* transform: scale(0.9); */

  .description {
    color: #2e2e2e;
  }
  button {
    margin: 10px 0;
  }
  h3 {
    justify-self: start;
    align-self: start;

    color: #2e2e2e;
    margin: 10px 0;
    font-weight: bold;
  }
  .merch {
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.06);
    border-radius: 10px;
  }
  .pink {
    background-color: #d7c5c273;
    border-radius: 15px;
    padding: 5px;
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
  .image-wrapper {
    width: 300px;
    height: auto;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.06);
    display: grid;
    background-color: white;
    place-items: center;

    @media (max-width: 900px) {
      margin: auto;
      width: 100%;
    }

    &.first {
      img {
        transform: scale(0.85);
        transition: transform 0.3s ease;
        border: transparent;
      }
    }
  }
  .image {
    width: 300px;
    height: auto;
    border-radius: 10px;

    display: grid;
    place-items: center;
    @media (max-width: 900px) {
      margin: auto;
      width: 100%;
    }
  }

  .start {
    display: flex;
    justify-content: end;
  }
`;

"use client";

import { MerchProps } from "@/types/components";
import styled from "styled-components";
import ProductBox from "./ProductBox";
import Link from "next/link";

interface Props {
  merch: MerchProps[];
  category: string;
}

const CollectionPageContent: React.FC<Props> = ({ merch, category }) => {
  return (
    <Style>
      <h3>
        {category.slice(0, 1).toUpperCase()}
        {category.slice(1)}
      </h3>
      <ProductsContainer>
        {merch.map((merch, i) => {
          return (
            <Link key={merch._id} href={`/merch/${merch._id}`}>
              <ProductBox
                _id={merch._id}
                name={merch.name}
                price={merch.price}
                thumbmail={merch.images[0]}
              />
            </Link>
          );
        })}
      </ProductsContainer>
    </Style>
  );
};
export default CollectionPageContent;
const Style = styled.div`
  margin-top: 120px;
  h3 {
    margin: 10px;
    text-align: center;
  }
`;

export const ProductsContainer = styled.ul`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  @media (max-width: 650px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

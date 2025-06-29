"use client";

import styled from "styled-components";
import ProductBox from "./ProductBox";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { MerchProps } from "@/types/components";
import Link from "next/link";

export interface ProductBoxProps {
  _id: string;
  name: string;
  price: number;
  thumbmail: string;
}

const ProductsCarousel: React.FC = () => {
  const merch = useSelector((state: RootState) => state.app.merch) || [];

  const merchToRender: ProductBoxProps[] = merch.map(
    (item: any, i: number) => ({
      _id: item._id,
      name: item.name,
      price: item.price,
      thumbmail: item?.images?.[0],
    })
  );

  return (
    <ScrollWrapper>
      <Container>
        {merchToRender.map((merch, i) => {
          return (
            <Link href={`/merch/${merch._id}`} key={i}>
              <ProductBox
                _id={merch._id}
                name={merch.name}
                thumbmail={merch.thumbmail}
                price={merch.price}
              />
            </Link>
          );
        })}
      </Container>
    </ScrollWrapper>
  );
};

export default ProductsCarousel;

const Container = styled.div`
  display: flex;
  gap: 30px;
  width: fit-content;
  padding: 0 20px;
`;

const ScrollWrapper = styled.div`
  overflow-x: auto;
  padding: 10px 0;
  width: 100%;
`;

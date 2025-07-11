"use client";
import ProductBox from "@/components/ui/ProductBox";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Link from "next/link";

const Shop: React.FC = () => {
  const merchList = useSelector((state: RootState) => {
    return state.app.merch;
  });
  return (
    <Style>
      <h1>Shop</h1>
      <ProductsContainer>
        {merchList.map((merch, i) => {
          return (
            <Link href={`/admin/shop/edit-merch/${merch._id}`} key={i}>
              <ProductBox
                _id={merch._id}
                name={merch.name}
                thumbmail={merch.images[0]}
                price={merch.price}
              />
            </Link>
          );
        })}
      </ProductsContainer>
    </Style>
  );
};

export default Shop;

const Style = styled.div`
  margin-top: 100px;
  h1 {
    text-align: center;
  }
`;

const ProductsContainer = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  @media (max-width: 650px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

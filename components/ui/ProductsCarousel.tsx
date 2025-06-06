import styled from "styled-components";
import ProductBox from "./ProductBox";

const ProductsCarousel: React.FC = () => {
  return (
    <ScrollWrapper>
      <Container>
        <ProductBox /> <ProductBox /> <ProductBox /> <ProductBox />{" "}
        <ProductBox /> <ProductBox /> <ProductBox /> <ProductBox />{" "}
        <ProductBox /> <ProductBox />
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

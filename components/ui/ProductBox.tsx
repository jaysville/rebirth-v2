import Image from "next/image";
import styled from "styled-components";
import { ProductBoxProps } from "./ProductsCarousel";

const ProductBox: React.FC<ProductBoxProps> = ({ name, price, thumbmail }) => {
  return (
    <Style>
      <Image
        src={thumbmail}
        alt="poster"
        priority
        width={220}
        height={220}
        className="image"
      />
      <div>
        <p className="title">{name}</p>
        <p className="price">₦{price}</p>
      </div>
    </Style>
  );
};

export default ProductBox;

const Style = styled.div`
  cursor: pointer;
  margin: 15px;
  flex-shrink: 0;
  width: 200px;
  cursor: pointer;
  text-align: center;
  /* box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.06); */
  .image {
    width: 150px;
    height: auto;
  }
  p {
    font-family: "Open Sans";
    text-align: center;
    font-size: 13px;
    margin: 5px 0;
  }
  .title {
    font-weight: 600;
  }
`;

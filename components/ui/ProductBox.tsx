import Image from "next/image";
import styled from "styled-components";

const ProductBox: React.FC = () => {
  return (
    <Style>
      <Image
        src="https://i.postimg.cc/7Y4pBfpd/product7.png"
        alt="poster"
        priority
        width={500}
        height={500}
        className="image"
      />
      <p>
        Palm Paradise <br />
        <small>70000</small>
      </p>
    </Style>
  );
};

export default ProductBox;

const Style = styled.div`
  cursor: pointer;
  margin: 15px;
  flex-shrink: 0;
  width: 250px;
  cursor: pointer;
  text-align: center;
  /* box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.06); */
  .image {
    width: 250px;
    height: auto;
  }
  p {
    font-family: "Open Sans";
    font-weight: 600;
    transform: translateY(-20px);
    small {
      font-weight: normal;
    }
  }
`;

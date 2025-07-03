import styled from "styled-components";
import { Badge } from "@mui/material";
import { CartItemProps } from "@/types/reduxStates";

interface Props {
  item: CartItemProps;
}

export const CheckoutItem: React.FC<Props> = ({ item }) => {
  const Style = styled.div`
    display: flex;
    gap: 40px;
    margin-bottom: 30px;

    div.details {
      span {
        display: block;
        margin-left: 20px;
        margin-bottom: 5px;
      }
    }

    span.size {
      color: grey;
    }

    div.price {
      margin-left: auto;
    }
    img {
      width: 70px;
      border-radius: 10px;
    }
  `;

  return (
    <Style>
      <div>
        <Badge
          badgeContent={item.quantity}
          color="secondary"
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: "#552c36",
              color: "aliceblue",
              fontStyle: "normal",
            },
          }}
        >
          <img src={item.images[0]} alt="product" />
        </Badge>
      </div>
      <div className="details">
        <span>{item.name}</span>
        <span className="size">{item.size !== "N/A" && item.size}</span>
      </div>
      <div className="price">
        <span>₦{item.price}</span>
      </div>
    </Style>
  );
};

export const ErrorText = styled.small`
  color: red;
`;

export const Form = styled.form`
  input {
    width: 100%;
    height: 40px;
    /* border: 1px solid; */
    outline: none;
    padding: 5px;
    box-sizing: border-box;
  }
  label {
    display: block;
    font-weight: 600;
    font-size: 15px;
    margin: 5px 0;
  }
  button {
    display: block;
    border-radius: 0;
    width: 100%;
    margin: 10px 0;
    cursor: pointer;
  }
`;

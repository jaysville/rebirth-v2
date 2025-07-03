"use client";

import { useSelector } from "react-redux";
import styled from "styled-components";
import CartItem from "@/components/ui/CartItem";

// import { AltBtn } from "../components/ui/Buttons";
// import { useNavigate } from "react-router-dom";
import { RootState } from "@/redux/store";
import { MainBtn } from "@/components/ui/Buttons";
import { useRouter } from "next/navigation";

const CartPage: React.FC = () => {
  const cart = useSelector((state: RootState) => state.app.cart);

  const router = useRouter();

  const totalPrice = cart
    .reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0)
    .toFixed(2);

  return (
    <CartStyle>
      <h3>Cart</h3>
      <CheckoutSection>
        <div>
          <table>
            <tbody>
              <tr>
                <td>Subtotal</td>
                <td>₦{totalPrice}</td>
              </tr>
              <tr>
                <td>Shipping </td>
                <td>Calculated at checkout</td>
              </tr>
              <tr className="total">
                <td>Total</td>
                <td>₦{totalPrice}</td>
              </tr>
            </tbody>
          </table>

          <div className="btn-container">
            {cart.length > 0 ? (
              <MainBtn
                onClick={() => {
                  router.push("/checkout");
                }}
              >
                Checkout
              </MainBtn>
            ) : (
              <MainBtn
                onClick={() => {
                  router.push("/");
                }}
              >
                Go shopping
              </MainBtn>
            )}
          </div>
        </div>
      </CheckoutSection>
      {cart.length > 0 ? (
        <>
          <ul>
            {cart.map((item, i) => {
              return (
                <li key={i}>
                  <CartItem item={item} />
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <p>No item added yet.</p>
      )}
    </CartStyle>
  );
};

const CartStyle = styled.div`
  padding: 30px;
  h3 {
    padding: 10px;
    text-align: center;
  }
  p {
    text-align: center;
    margin-bottom: 132px;
  }
`;

const CheckoutSection = styled.div`
  transform: translateY(-10px);
  display: flex;
  justify-content: end;

  table {
    width: 100%;

    tr {
      display: flex;
      width: 300px;
      justify-content: space-between;
      margin: 10px 0;
    }
    tr.total {
      border-top: 1px solid rgba(0, 0, 0, 0.3);
      margin-top: 20px;
      padding-top: 10px;
    }
    @media (max-width: 800px) {
      table: {
        margin: 0;
      }
    }
  }
  div.btn-container {
    display: flex;
    justify-content: end;
  }
  button {
    width: 120px;
  }

  @media (max-width: 800px) {
    display: block;

    button {
      width: 100%;
    }
  }
`;

export default CartPage;

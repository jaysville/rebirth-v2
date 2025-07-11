"use client";

import styled from "styled-components";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { statesInNigeria } from "@/lib";
import { MainBtn } from "../../components/ui/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { CheckoutItem, ErrorText } from "../../components/ui/styled-components";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import PaystackPop from "@paystack/inline-js";
import { useFormik } from "formik";
import { Modal } from "antd";
import { clearCart } from "@/redux/slices/appSlice";
import { useRouter } from "next/navigation";
import { orderSchema } from "@/lib/schemas";

import { CartItemProps } from "@/types/reduxStates";
import { Form } from "../../components/ui/styled-components";
import { notifySuccess, notifyError } from "@/lib";
import useHttp from "@/lib/hooks/useHttp";

const Checkout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.app.cart);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCartSummary, setShowCartSummary] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [transactionInitialized, setTransactionInitialized] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    if (windowWidth <= 900) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  useEffect(() => {
    if (cart.length < 1) router.push("/");
  }, [cart]);

  const shippingPrice = 5000;
  const totalProductPrice = cart.reduce(
    (acc: number, item: any) => acc + item.price * item.quantity,
    0
  );
  const netPrice = shippingPrice + totalProductPrice;

  const { values, errors, handleChange, handleBlur, handleSubmit, touched } =
    useFormik({
      initialValues: {
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        landmark: "",
        city: "",
        state: "Lagos",
      },
      validationSchema: orderSchema,
      onSubmit: () => setIsModalOpen(true),
    });
  //initialize transaction

  const {
    isSuccess: transactionInitializationSuccess,
    data: initilizationData,
    fetchData: initializeTransaction,
    loading: initializationLoading,
  } = useHttp("transaction/initialize", "POST", {
    key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
    email: values.email,
    amount: netPrice * 100,
  });

  //verify transaction

  const {
    isSuccess: verificationSuccess,
    loading: verificationLoading,
    fetchData: verifyTransaction,
  } = useHttp(
    `transaction/verify/${initilizationData?.data?.reference}`,
    "Post"
  );

  //place order

  const {
    fetchData: placeOrder,
    isSuccess: orderSuccess,
    loading: orderLoading,
  } = useHttp("order", "POST", {
    email: values.email,
    phone: values.phone,
    address: values.address,
    firstName: values.firstName,
    lastName: values.lastName,
    landmark: values.landmark,
    city: values.city,
    state: values.state,
    products: cart.map(
      ({ _id, name, price, images, size, quantity }: CartItemProps) => ({
        productId: _id,
        image: images[0],
        price,
        name,
        size,
        quantity,
      })
    ),
    totalAmount: totalProductPrice,
  });

  const handleOk = () => {
    setIsModalOpen(false);
    initializeTransaction();
  };

  useEffect(() => {
    if (!initializationLoading && transactionInitializationSuccess) {
      //verify transaction  after initialization
      const popup = new PaystackPop();
      popup.newTransaction({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
        email: values.email,
        amount: netPrice * 100,
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        onSuccess: async () => {
          setTransactionInitialized(true);
        },
        onCancel: () => {
          notifyError("Payment cancelled.");
        },
      });
    }
  }, [initializationLoading, transactionInitializationSuccess]);

  useEffect(() => {
    if (transactionInitialized) {
      verifyTransaction();
    }
  }, [transactionInitialized]);

  useEffect(() => {
    if (!verificationLoading && verificationSuccess) {
      placeOrder();
    }
  }, [verificationSuccess, verificationLoading]);

  useEffect(() => {
    if (!orderLoading && orderSuccess) {
      dispatch(clearCart());
      setTimeout(() => {
        router.push("/");
      }, 200);
      notifySuccess(
        "Thanks for shopping with Rebirth! You will receive an email containing your order details shortly."
      );
    }
  }, [orderLoading, orderSuccess]);

  return (
    <Style mobileview={mobileView}>
      <div>
        {mobileView && (
          <div className="order-summary">
            <div className="control">
              <span onClick={() => setShowCartSummary(!showCartSummary)}>
                {showCartSummary ? "Hide " : "Show "} order summary
                {!showCartSummary ? <DownOutlined /> : <UpOutlined />}
              </span>
              <span className="total">₦{netPrice}</span>
            </div>
            {showCartSummary && (
              <div>
                <hr />
                {cart.map((item: any, i: number) => (
                  <CheckoutItem key={i} item={item} />
                ))}
                <table>
                  <tbody>
                    <tr>
                      <td>Subtotal</td>
                      <td>₦{totalProductPrice}</td>
                    </tr>
                    <tr>
                      <td>Shipping</td>
                      <td>₦{shippingPrice}</td>
                    </tr>
                    <br />
                    <tr className="total">
                      <td>Total</td>
                      <td>₦{netPrice}</td>
                    </tr>
                  </tbody>
                </table>
                <DisaclaimerTag>
                  Please add reachable contact information.
                  <br />
                  Delivery Prices are subject to change.
                </DisaclaimerTag>
              </div>
            )}
          </div>
        )}

        <Form onSubmit={handleSubmit}>
          <h3>Contact</h3>
          <Modal
            title="Confirm Delivery details"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={() => setIsModalOpen(false)}
          >
            <p>
              <b>Please ensure your delivery details are accurate.</b>
            </p>
          </Modal>

          <DoubleContainer>
            <div>
              <label>Email</label>
              <input
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.email && errors.email && (
                <ErrorText>{errors.email}</ErrorText>
              )}
            </div>
            <div>
              <label>Phone</label>
              <input
                name="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.phone && errors.phone && (
                <ErrorText>{errors.phone}</ErrorText>
              )}
            </div>
          </DoubleContainer>

          <h3>Delivery</h3>
          <DoubleContainer>
            <div>
              <label>First Name</label>
              <input
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.firstName && errors.firstName && (
                <ErrorText>{errors.firstName}</ErrorText>
              )}
            </div>
            <div>
              <label>Last Name</label>
              <input
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.lastName && errors.lastName && (
                <ErrorText>{errors.lastName}</ErrorText>
              )}
            </div>
          </DoubleContainer>

          <label>Address</label>
          <input
            name="address"
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.address && errors.address && (
            <ErrorText>{errors.address}</ErrorText>
          )}

          <label>Landmark</label>
          <input
            name="landmark"
            value={values.landmark}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.landmark && errors.landmark && (
            <ErrorText>{errors.landmark}</ErrorText>
          )}

          <LocationContainer>
            <div>
              <label>City</label>
              <input
                name="city"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.city && errors.city && (
                <ErrorText>{errors.city}</ErrorText>
              )}
            </div>
            <TextField
              select
              label="State"
              name="state"
              value={values.state}
              onChange={handleChange}
              onBlur={handleBlur}
              sx={{ width: "100%" }}
            >
              {statesInNigeria.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </LocationContainer>

          <MainBtn type="submit">
            {verificationLoading
              ? "Verifying payment..."
              : orderLoading
              ? "Placing Order..."
              : "Pay Now"}
          </MainBtn>
        </Form>
      </div>

      {!mobileView && (
        <ProductContainer>
          {cart.map((item: any, i: number) => (
            <CheckoutItem key={i} item={item} />
          ))}
          <table>
            <tbody>
              <tr>
                <td>Subtotal</td>
                <td>₦{totalProductPrice}</td>
              </tr>
              <tr>
                <td>Shipping</td>
                <td>₦{shippingPrice}</td>
              </tr>

              <tr className="total">
                <td>Total</td>
                <td>₦{netPrice}</td>
              </tr>
            </tbody>
          </table>
          <DisaclaimerTag>
            Delivery Prices are subject to change.
          </DisaclaimerTag>
        </ProductContainer>
      )}
    </Style>
  );
};

export default Checkout;

const Style = styled.div<{ mobileview: boolean }>`
  display: ${(props) => (!props.mobileview ? "grid" : "block")};
  grid-template-columns: repeat(2, 1fr);
  border: 1px solid rgba(0, 0, 0, 0.3);
  margin-top: ${(props) => props.mobileview && "145px"};
  form {
    label {
      font-size: 14px;
    }
  }
  table {
    width: 100%;
    margin-top: 20px;

    tr {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
    }
    tr.total {
      margin-top: 20px;
      padding-top: 10px;
      font-size: 20px;
      font-weight: 600;
    }
    @media (max-width: 800px) {
      table: {
        margin: 0;
      }
    }
  }

  label {
    font-size: 20px;
  }
  button {
    width: 100%;
  }
  form {
    padding: 15px;
    div {
      margin: 10px 0;
    }
  }

  /* padding: 0 30px; */
  div.order-summary {
    background-color: rgb(245, 245, 245);
    padding: 10px;

    .control {
      display: flex;
      align-items: center;

      span {
        color: #2e2e2e;
        font-size: 15px;
        cursor: pointer;
        svg {
          margin-left: 10px;
          transform: scale(0.7) translateY(2px);
        }
      }
      span.total {
        margin-left: auto;
        cursor: auto;
        font-size: 20px;
        font-weight: 600;
        color: black;
      }
    }
  }
`;

const DoubleContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  @media (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
const LocationContainer = styled.div``;
const ProductContainer = styled.div`
  background-color: rgb(245, 245, 245);
  padding: 30px;
`;
const DisaclaimerTag = styled.small`
  color: #2e2e2e;
`;

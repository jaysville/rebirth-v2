"use client";
import styled from "styled-components";
import { getStatusColor } from "@/utils/colors";

import { OrderProps } from "@/types/components";
interface Props {
  order: OrderProps;
}
const SingleOrderDetails: React.FC<Props> = ({ order }) => {
  return (
    <Container>
      <Title>Order #{order._id}</Title>
      <Section>
        <Label>Order Status</Label>
        <Value status={order.status}>{order.status}</Value>
      </Section>
      <Section>
        <Label>Full Name:</Label>
        <Value>{order.fullName}</Value>
      </Section>
      <Section>
        <Label>Email:</Label>
        <Value>{order.email}</Value>
      </Section>
      <Section>
        <Label>Phone:</Label>
        <Value>{order.phone}</Value>
      </Section>
      <Section>
        <Label>Address:</Label>
        <Value>
          {order.address}, {order.city}, {order.state}
        </Value>
      </Section>
      <Section>
        <Label>Landmark:</Label>
        <Value>{order.landmark}</Value>
      </Section>
      <Section>
        <Label>Total Amount:</Label>
        <Value>₦{order.totalAmount}</Value>
      </Section>
      <Section>
        <Label>Products:</Label>
        <ProductList>
          {order.products.map((product) => (
            <ProductItem key={product._id}>
              <div>
                <ProductName>{product.name}</ProductName>
                <ProductDetail>Price:₦{product.price}</ProductDetail>
                <ProductDetail>Size: {product.size}</ProductDetail>
                <ProductDetail>Quantity: {product.quantity}</ProductDetail>
              </div>

              <img src={product.image} alt="merch" />
            </ProductItem>
          ))}
        </ProductList>
      </Section>
    </Container>
  );
};

export default SingleOrderDetails;

const Container = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h2`
  color: #333;
  font-size: 25px;
  font-style: "Pacifico";
  font-weight: bold;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.span`
  font-weight: bold;
`;

const Value = styled.span<{ status?: string }>`
  margin-left: 10px;
  color: ${({ status }) => (status ? getStatusColor(status) : "inherit")};
`;

const ProductList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
`;

const ProductItem = styled.li`
  background-color: #fff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  img {
    width: 70px;
    border-radius: 10px;
  }
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const ProductName = styled.div`
  font-weight: bold;
`;

const ProductDetail = styled.div`
  margin-top: 5px;
  color: #555;
`;

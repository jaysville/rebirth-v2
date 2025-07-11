"use client";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { TableContainer } from "@mui/material";
import { AltBtn, MainBtn } from "@/components/ui/Buttons";
import { useRouter } from "next/navigation";
import { getStatusColor } from "@/utils/colors";
import { RootState } from "@/redux/store";
import useHttp from "@/lib/hooks/useHttp";
import { useEffect, useState } from "react";
import { Modal } from "antd";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/appSlice";
import { Logout } from "@mui/icons-material";
import { notifySuccess } from "@/lib";
import { OrderProps } from "@/types/components";

const Account: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.app.token);

  useEffect(() => {
    if (!token) {
      router.replace("/");
    }
  }, [token]);

  const user = useSelector((state: RootState) => state.app.user);

  const {
    loading,
    isSuccess,
    data: orders,
    fetchData: fetchUserOrderHistory,
  } = useHttp(`orders/user/${user?.email}`, "Get");

  useEffect(() => {
    fetchUserOrderHistory();
  }, [user]);

  const handleOk = () => {
    setIsModalOpen(false);
    dispatch(logout());
    setTimeout(() => {
      notifySuccess("Logout successful, See you soon :(");
    }, 200);
  };
  return (
    <Style>
      <Modal
        title="Confirm Logout"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <p>
          <b>Are you sure you want to logout ?</b>
        </p>
      </Modal>
      <h3>Hi , {user?.name.split(" ")[0]}</h3>
      <hr />
      <br />
      <h4>Order History</h4>
      {loading ? (
        <span>Loading...</span>
      ) : isSuccess ? (
        orders.length > 0 ? (
          <TableContainer>
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Order Date</th>
                  <th>Status</th>
                  <th>Total Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order: OrderProps) => {
                  return (
                    <tr key={order._id}>
                      <td data-label="Order ID">
                        <b>#{order._id}</b>
                      </td>

                      <td data-label="Order Date">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <OrderStatus data-label="Status" status={order.status}>
                        {order.status}
                      </OrderStatus>
                      <td data-label="Total Amount">
                        ₦{order.totalAmount.toLocaleString("en-US")}
                      </td>
                      <td data-label="Actions" className="button-container">
                        <AltBtn
                          onClick={() => {
                            router.push(`/orders/${order._id}`);
                          }}
                        >
                          View Details
                        </AltBtn>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </TableContainer>
        ) : (
          <p>No Orders yet</p>
        )
      ) : (
        <p>Server is down :(</p>
      )}
      <div className="logout-btn-container">
        <MainBtn
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Logout <LogoutIcon />
        </MainBtn>
      </div>
    </Style>
  );
};
export default Account;

const OrderStatus = styled.td<{ status: string }>`
  color: ${({ status }) => getStatusColor(status)};
`;

const Style = styled.div`
  padding: 0 50px;
  margin-top: 100px;
  margin-bottom: 200px;

  h3 {
    text-align: right;
    font-weight: 600;
    color: #2e2e2e;
  }

  h4 {
    text-align: center;
    font-size: 30px;
  }
  p {
    text-align: center;
    margin-top: 30px;
    font-size: 20px;
    font-weight: 500;
  }

  .button-container {
    display: flex;
    gap: 10px;
    @media (max-width: 460px) {
      flex-direction: column;
    }
  }
  button {
    border-radius: 0;
    width: 100%;
    padding: 10px;
    height: fit-content;
    cursor: pointer;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 8px;
    text-align: left;
    border: 1px solid #ddd;
  }

  thead {
    background-color: #f2f2f2;
  }

  @media (max-width: 860px) {
    table,
    thead,
    tbody,
    th,
    td,
    tr {
      display: block;
    }

    thead tr {
      display: none;
    }

    tr {
      border: 1px solid #ccc;
      margin-bottom: 10px;
    }

    td {
      border: none;
      border-bottom: 1px solid #eee;
      position: relative;
      padding-left: 42%;
    }

    td:before {
      position: absolute;
      top: 6px;
      left: 6px;
      width: 45%;
      padding-right: 10px;
      white-space: nowrap;
      content: attr(data-label);
      color: black;
      font-weight: bold;
    }
  }

  .logout-btn-container {
    margin-top: 50px;
    display: flex;
    justify-content: center;
    font-size: 20px;
  }
`;
const LogoutIcon = styled(Logout)`
  transform: scale(0.9) translateY(6px) translateX(2px);
`;

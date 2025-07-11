"use client";

import styled from "styled-components";
import { useEffect, useState } from "react";
import { Spin, Modal } from "antd";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";

import { AltBtn } from "@/components/ui/Buttons";
import { useRouter } from "next/navigation";
import { getStatusColor } from "@/utils/colors";
import useHttp from "@/lib/hooks/useHttp";
import { notifySuccess } from "@/lib";
import { OrderProps } from "@/types/components";

const Orders = () => {
  const {
    data: orders,
    fetchData: getOrders,
    isSuccess,
    loading,
  } = useHttp(`orders`, "GET");

  useEffect(() => {
    getOrders();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [orderId, setOrderId] = useState("");

  const {
    fetchData: updateOrderStatus,
    loading: statusLoading,
    isSuccess: statusIsSuccess,
  } = useHttp(`order/${orderId}`, "POST", { status: newStatus });

  useEffect(() => {
    if (statusIsSuccess) {
      notifySuccess("Status Updated");
      getOrders();
    }
  }, [statusIsSuccess]);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const router = useRouter();

  const status = ["Received", "Shipped", "Delivered"];

  const handleOk = () => {
    setIsModalOpen(false);
    updateOrderStatus();
  };

  return (
    <Style>
      <h2>Orders</h2>
      <Modal
        title="Confirm Status Update"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        Update order #<b>{orderId}</b> status to <b>{newStatus}</b> ?
      </Modal>
      {loading ? (
        <Spin />
      ) : isSuccess ? (
        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
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
                    <td data-label="Order ID">{order._id}</td>
                    <td data-label="Customer Name">{order.fullName}</td>
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
                      <AltBtn
                        onClick={(e) => {
                          handleClick(e);
                          setOrderId(order._id || "");
                        }}
                      >
                        Update Status
                      </AltBtn>
                      <Popover
                        id={order._id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                      >
                        {status.map((status, i) => {
                          return (
                            <Text
                              sx={{ p: 2, cursor: "pointer" }}
                              key={i}
                              onClick={() => {
                                handleClose();

                                setNewStatus(status);
                                showModal();
                              }}
                            >
                              {status}
                            </Text>
                          );
                        })}
                      </Popover>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableContainer>
      ) : (
        <p>Server is down :(</p>
      )}
    </Style>
  );
};

export default Orders;

const OrderStatus = styled.td<{ status: string }>`
  color: ${({ status }) => getStatusColor(status)};
`;
const Text = styled(Typography)`
  padding: 5px;
  &:hover {
    color: aliceblue;
    background-color: #2e2e2e;
    transition: all 200ms ease-in-out;
  }
`;

const Style = styled.div`
  padding: 0 30px;
  margin-bottom: 200px;

  h2 {
    text-align: center;
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
    width: fit-content;
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
`;

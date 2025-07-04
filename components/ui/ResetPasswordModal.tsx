"use client";
import { Modal, Box } from "@mui/material";
import { AltBtn } from "./Buttons";
import styled from "styled-components";
import { FormEvent, useEffect, useState } from "react";
import { notifyError, notifySuccess } from "@/lib";
import useHttp from "@/lib/hooks/useHttp";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

const ResetPasswordModal: React.FC<Props> = ({ isOpen, handleClose }) => {
  const [email, setEmail] = useState("");

  function validateEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  const handleSubmit = async (e: FormEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const isValid = validateEmail(email);
    if (!isValid) {
      notifyError("Enter a valid email address");
      return;
    }

    fetchData();
  };

  const { fetchData, data, isSuccess, loading } = useHttp(
    "forgot-password",
    "POST",
    { email }
  );

  useEffect(() => {
    if (isSuccess) {
      notifySuccess(data.message);
      handleClose();
    }
  }, [isSuccess]);

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          width: 400,
          bgcolor: "background.paper",
          p: 4,
          mx: "auto",
          mt: "10%",
        }}
      >
        <Form>
          <label>
            <b>Email</b>
          </label>
          <input
            type="email"
            placeholder="Enter your email address"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <div>
            <AltBtn onClick={handleSubmit} disabled={loading}>
              {loading ? "Processing..." : "Submit"}
            </AltBtn>
          </div>
        </Form>
      </Box>
    </Modal>
  );
};

export default ResetPasswordModal;
const Form = styled.form`
  label,
  input {
    display: block;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  input {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
  }
  button {
    width: 100%;
  }
`;

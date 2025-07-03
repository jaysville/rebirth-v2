"use client";

import { Modal, Box } from "@mui/material";
import { AltBtn } from "./Buttons";
import styled from "styled-components";
import { FormEvent, useState } from "react";

import serverUrl from "@/utils/server";
import { notifyError, notifySuccess } from "@/lib";
import { error } from "console";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

const ResetPasswordModal: React.FC<Props> = ({ isOpen, handleClose }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

    try {
      setIsLoading(true);
      const response = await fetch(`${serverUrl}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        notifySuccess(data.message);
        handleClose();
      } else {
        throw new Error("Something Went Wrong");
      }
    } catch (e: any) {
      notifyError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

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
            <AltBtn onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? "Processing..." : "Submit"}
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

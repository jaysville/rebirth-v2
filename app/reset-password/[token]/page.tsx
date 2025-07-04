"use client";
import styled from "styled-components";
import { use, useEffect, useState } from "react";

import { notification } from "antd";
import { Form } from "@/components/ui/styled-components";
import { useRouter } from "next/navigation";
import useHttp from "@/lib/hooks/useHttp";
import { MainBtn } from "@/components/ui/Buttons";
import { notifyError, notifySuccess } from "@/lib";

interface Props {
  params: Promise<{ token: string }>;
}

const ResetPassword: React.FC<Props> = ({ params }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = use(params);

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  });

  const router = useRouter();

  const { fetchData, data, loading, isError, isSuccess } = useHttp(
    `reset-password/${token}`,
    "POST",
    {
      password,
    }
  );

  useEffect(() => {
    if (isSuccess) {
      notifySuccess(data.message);
      router.push("/login");
    }
    if (isError) {
      notifyError("Something went wrong.");
    }
  }, [isSuccess, data, isError]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 5 || password.length > 12) {
      notifyError("Password should contain 5-12 characters.");
      return;
    }
    if (password !== confirmPassword) {
      notifyError("Passwords do not match");
      return;
    }
    fetchData();
  };

  return (
    <Style>
      <Form>
        <div>
          <label>New Password</label>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Confirm New Password</label>
          <input
            type="password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </div>
        <MainBtn disabled={loading} onClick={handleSubmit}>
          {loading ? "Processing" : "Reset Your Password"}
        </MainBtn>
      </Form>
    </Style>
  );
};

export default ResetPassword;

const Style = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  margin: 150px auto;
  form {
    width: 400px;
    @media (max-width: 460px) {
      width: 100%;
    }
  }
`;

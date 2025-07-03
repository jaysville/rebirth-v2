"use client";

import styled from "styled-components";
import { Form } from "@/components/ui/styled-components";
import { AltBtn, MainBtn } from "../../components/ui/Buttons";
import { useFormik } from "formik";
import { loginSchema } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { refreshToken, updateAdmin } from "@/redux/slices/appSlice";
import { ErrorText } from "@/components/ui/styled-components";
import ResetPasswordModal from "@/components/ui/ResetPasswordModal";
import serverUrl from "@/utils/server";

import { notifyError, notifySuccess } from "@/lib";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { values, errors, handleChange, handleBlur, handleSubmit, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: async () => {
        await handleLogin();
      },
    });

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${serverUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Login failed");
      }
      setIsLoading(false);
      dispatch(updateAdmin(data.user.isAdmin));
      dispatch(refreshToken(data.token));
      notifySuccess("Welcome Back");
      setTimeout(() => {
        router.push("/");
      }, 200);
    } catch (e: any) {
      notifyError(e?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Style>
      <h3>Login</h3>
      <Form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email && (
            <ErrorText>{errors.email}</ErrorText>
          )}
        </div>

        <div className="password-container">
          <ResetPasswordModal isOpen={open} handleClose={handleClose} />
          <label>Password</label>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <p onClick={handleOpen}>Forgot your Password?</p>
          {touched.password && errors.password && (
            <ErrorText>{errors.password}</ErrorText>
          )}
        </div>

        <MainBtn type="submit">
          {isLoading ? <small>Authorizing...</small> : "Login"}{" "}
        </MainBtn>
        <hr />

        <AltBtn
          type="button"
          onClick={(e) => {
            e.preventDefault();
            router.push("/register");
          }}
        >
          Create Account
        </AltBtn>
      </Form>
    </Style>
  );
};

const Style = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  margin-bottom: 150px;

  form {
    width: 400px;
    @media (max-width: 460px) {
      width: 100%;
    }
  }

  h3 {
    text-align: center;
  }

  div {
    margin-bottom: 20px;
  }

  .password-container {
    position: relative;
    p {
      position: absolute;
      text-decoration: underline;
      cursor: pointer;
      top: -10px;
      right: 0;
    }
  }
`;

export default Login;

"use client";

import styled from "styled-components";
import { Form } from "@/components/ui/styled-components";
import { AltBtn, MainBtn } from "@/components/ui/Buttons";
import { useFormik } from "formik";
import { loginSchema } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { refreshToken, updateAdmin, updateUser } from "@/redux/slices/appSlice";
import { ErrorText } from "@/components/ui/styled-components";
import ResetPasswordModal from "@/components/ui/ResetPasswordModal";

import { notifySuccess } from "@/lib";
import useHttp from "@/lib/hooks/useHttp";
import { RootState } from "@/redux/store";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const token = useSelector((state: RootState) => state.app.token);

  const [authChecked, setAuthChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (token) {
      router.replace("/");
    } else {
      setAuthChecked(true);
    }
  }, [token]);

  const { values, errors, handleChange, handleBlur, handleSubmit, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: () => login(),
    });

  const {
    fetchData: login,
    data,
    isSuccess,
    loading,
  } = useHttp("auth/login", "POST", {
    email: values.email,
    password: values.password,
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(updateAdmin(data.user.isAdmin));
      dispatch(updateUser(data.user));
      dispatch(refreshToken(data.token));
      notifySuccess("Welcome Back");
      setTimeout(() => {
        router.push("/");
      }, 100);
    }
  }, [isSuccess]);

  if (!authChecked) return null;

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

        <MainBtn type="submit" disabled={loading}>
          {loading ? <small>Authorizing...</small> : "Login"}
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

export default Login;

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

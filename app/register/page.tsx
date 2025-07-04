"use client";

import styled from "styled-components";
import { Form, ErrorText } from "@/components/ui/styled-components";
import { MainBtn } from "../../components/ui/Buttons";
import { useFormik } from "formik";
import { registerSchema } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { notification } from "antd";
import { refreshToken, updateAdmin } from "@/redux/slices/appSlice";
import useHttp from "@/lib/hooks/useHttp";
import { notifySuccess } from "@/lib";

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { values, errors, handleChange, handleBlur, handleSubmit, touched } =
    useFormik({
      initialValues: {
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: registerSchema,
      onSubmit: () => {
        registerUser();
      },
    });

  const {
    fetchData: registerUser,
    data,
    isSuccess,
    loading,
  } = useHttp("auth/register", "POST", {
    email: values.email,
    fullName: values.fullName,
    password: values.password,
    confirmPassword: values.confirmPassword,
  });

  useEffect(() => {
    if (isSuccess) {
      //   dispatch(updateUser(data.user));
      dispatch(refreshToken(data.token));
      dispatch(updateAdmin(data.user.isAdmin));
      notifySuccess("Welcome to Rebirth Island");
      router.push("/");
    }
  }, [data, isSuccess, loading, dispatch]);

  return (
    <Style>
      <h3>Register</h3>
      <Form onSubmit={handleSubmit}>
        <div>
          <label>Full Name</label>
          <input
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.fullName && errors.fullName && (
            <ErrorText>{errors.fullName}</ErrorText>
          )}
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
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
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.password && errors.password && (
            <ErrorText>{errors.password}</ErrorText>
          )}
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <ErrorText>{errors.confirmPassword}</ErrorText>
          )}
        </div>

        <MainBtn type="submit" disabled={loading}>
          {loading ? "Loading..." : "Register"}
        </MainBtn>
      </Form>
    </Style>
  );
};

const Style = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
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
    margin-bottom: 15px;
  }
`;

export default Register;

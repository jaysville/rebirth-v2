"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

interface ReduxProviderProps {
  children: React.ReactNode;
}

const ProviderWrapper: React.FC<ReduxProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ProviderWrapper;

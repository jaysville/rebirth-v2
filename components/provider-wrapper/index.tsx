"use client";

import React from "react";
import { Provider } from "react-redux";
import { store, persistor } from "../../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import GlobalStyle from "../ui/GlobalStyleWrapper";

import SessionWrapper from "../ui/SessionWrapper";

interface ReduxProviderProps {
  children: React.ReactNode;
}

const ProviderWrapper: React.FC<ReduxProviderProps> = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SessionWrapper> {children}</SessionWrapper>
        </PersistGate>
      </Provider>
    </>
  );
};

export default ProviderWrapper;

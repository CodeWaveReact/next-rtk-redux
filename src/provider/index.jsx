"use client";

import { Provider } from "react-redux";
import React from "react";
import { store } from "@/redux/store";
// import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
// import { apiSlice } from "@/redux/apiServices/apiSlice";

export const ReduxProvider = ({children}) => {
  // For RTK Query only use for api calls
  // return <ApiProvider api={apiSlice}>{children}</ApiProvider>;

  // ForRTK both use for state management & api calls
  return <Provider store={store}>{children}</Provider>;

};

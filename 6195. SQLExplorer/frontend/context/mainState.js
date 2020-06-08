import React, { useReducer } from "react";
import { MainContext } from "./mainContext";
import { MainReducer } from "./mainReducer";
import { API } from "../network/API";

export const MainState = ({ children }) => {
  const initialState = {
    data: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(MainReducer, initialState);

  const fetchData = async (data) => {
    let res = await API.getData(data);

    dispatch({
      type: "SET_DATA",
      payload: res.data,
    });
  };

  return (
    <MainContext.Provider value={{ fetchData, data: state.data }}>
      {children}
    </MainContext.Provider>
  );
};

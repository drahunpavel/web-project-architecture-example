import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";

import { Main } from "../views/Main/Main";

// import store from "../store/configureStore";

const AppRouter = () => {
  return (
    // <Provider store={store}>
    //   <BrowserRouter>
    //     <Route path="/" component={Main} />
    //   </BrowserRouter>
    // </Provider>
    <BrowserRouter>
      <Route path="/" component={Main} />
    </BrowserRouter>
  );
};

export default AppRouter;

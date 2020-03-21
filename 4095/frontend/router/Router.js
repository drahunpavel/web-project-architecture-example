import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from "react-redux";

import MainComponent from "../views/MainComponent/MainComponent";

import store from "../store/configureStore";

const AppRouter = () => {
    return (
        //     <Router >
        //     <Route path='/' component={Home}>
        //       {/* <IndexRoute component={Home} /> */}
        //       <Route path='admin' component={Home} />
        //       <Route path='genre' component={Home} />
        //     </Route>
        //     {/* для всех остальных роутов: показывай NotFound */}
        //     <Route path='*' component={Home} />
        //   </Router>
        <Provider store={store}>
            <BrowserRouter>
                <Route path="/" component={MainComponent} />
            </BrowserRouter>
        </Provider>
    );
};

export default AppRouter;

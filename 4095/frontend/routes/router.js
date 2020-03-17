import React from "react";
// import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { BrowserRouter, Route } from 'react-router-dom';

import Home from "../views/Home";


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
        <BrowserRouter>
            <Route path="/" component={Home} />
        </BrowserRouter>
    );
};

export default AppRouter;

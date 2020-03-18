import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';

import MainComponent from "../views/MainComponent/MainComponent";


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
            <Route path="/" component={MainComponent} />
        </BrowserRouter>
    );
};

export default AppRouter;

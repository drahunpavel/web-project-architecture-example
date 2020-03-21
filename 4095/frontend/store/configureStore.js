import { combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';


import windows from '../reducer/rdWindows';

import { createStore } from 'redux'


const reducer = combineReducers({
    routing: routerReducer,
    windows,
});

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(routerMiddleware(browserHistory), reduxThunk)
));


export default store;

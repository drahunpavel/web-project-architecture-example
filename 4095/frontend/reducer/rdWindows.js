// import { 
//     WINDOW_CREATE, 
//     WINDOW_UPDATE, 
//     WINDOW_ROW_CLICK, 
//     WINDOW_ROWS_SELECTED, 
//     WINDOW_ROWS_FULL_INFORMATION, 
//     WINDOW_SECOND_UPDATE,
//     WINDOW_ROWS_DEBET_CREDIT,
// } from '../constants/windows'

const initialState = {
    createVisible: false,
}

export default function windows(state = initialState, action) {
    switch (action.type) {
        case 'WINDOW_CREATE':
            return { ...state, createVisible: action.payload }
        default:
            return state;
    };
};

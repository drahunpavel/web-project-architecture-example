// import { 
//     WINDOW_CREATE, 
//     WINDOW_ROW_CLICK, 
//     WINDOW_UPDATE, 
//     LIST_REQUEST, 
//     WINDOW_ROWS_SELECTED,
//     WINDOW_ROWS_FULL_INFORMATION,
//     WINDOW_SECOND_UPDATE,
//     WINDOW_ROWS_DEBET_CREDIT,
// } from '../constants/windows';
// import { acGet } from './acAPI';
// import { getApiUrl } from '../network/services';
// import ApiDataManager from '../network/DictionaryDataManager';
// import { ErrorHandler }  from '../network/BaseDataManager';

const acCreateOpen = () => {
    return {
        type: 'WINDOW_CREATE',
        payload: true
    };
};

export {
    acCreateOpen,
};

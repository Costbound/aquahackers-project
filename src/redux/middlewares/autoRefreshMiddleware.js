import { isRejectedWithValue } from '@reduxjs/toolkit';
import { refresh } from '../auth/ops-auth.js';
import {toast} from "react-hot-toast";

const autoRefreshMiddleware = ({ dispatch }) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        const actionType = action.type.split('/')[0];

        if (action.payload?.status === 401 && actionType !== 'auth') {
            toast.error(`Something going wrong. \n Please try again.`);
            dispatch(refresh());
        }
    }
    return next(action);
};

export default autoRefreshMiddleware;

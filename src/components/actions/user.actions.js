import { Types } from '../config/actionTypes';
import { saveToLocalStorage } from '../helper/localstorageHelper'

export const userActions = {
    login,
    logout,
};

function login(userAllData) {
    return dispatch => {

        let userData = {}
        userData.iUserID = userAllData.iUserID
        userData.vUserName = userAllData.vUserName
        userData.vEmail = userAllData.vEmail
        userData.token = userAllData.token

        dispatch(request({ userData : userData , token :userData.token }));
        saveToLocalStorage(userData)

        dispatch(() => success({ userData : userData , token : userData.token }));
    };

    function request(user) { return { type: Types.LOGIN_REQUEST, payload: user } }
    function success(user) { return { type: Types.LOGIN_SUCCESS, payload: user } }
    // function failure(error) { return { type: Types.LOGIN_FAILURE, payload: error } }
}

function logout() {
    return dispatch => {
        var userData = localStorage.removeItem('blogUser');
        dispatch({ type: Types.LOGOUT, ...userData });
    }
}
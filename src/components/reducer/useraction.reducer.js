import { Types } from '../config/actionTypes'
import { loadFromLocalStorage } from '../helper/localstorageHelper'

var nullState = { 
    loggedIn: false, 
    token : null , 
    userData : null
} 
const user = loadFromLocalStorage();
const initialState = user ? { loggedIn: user.loggedIn , token : user.token , userData : user.userData } : nullState ;

export function authentication(state = initialState, action) {
    console.log("🚀 ~ file: useraction.reducer.js ~ line 8 ~ authentication ~ action", action)
    switch (action.type) {

        case Types.LOGIN_REQUEST:
            return {
                loggedIn: true,
                token: action.payload.token,
                userData: action.payload.userData
            };

        case Types.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                token: action.payload.token,
                userData: action.payload.userData
            };

        case Types.LOGIN_FAILURE:
            return {
                loggedIn: false,
                token: null,
                userData: null
            };

        case Types.LOGOUT:
            return {
                loggedIn: false,
                token: null,
                userData: null,
            }

        default:
            return state
    }
}
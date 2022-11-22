import * as types from '../types';

export function loginRequest(payload: any) {
    return {
        type: types.LOGIN_REQUEST,
        payload,
    }
}
export function loginSuccess(payload: any) {
    return {
        type: types.LOGIN_SUCCESS,
        payload,
    }
}
export function loginFailure() {
    return {
        type: types.LOGIN_FAILURE
    }
}
export function registerRequest(payload: any) {
    return {
        type: types.REGISTER_REQUEST,
        payload,
    }
}
export function registerSuccess(payload: any) {
    return {
        type: types.REGISTER_SUCCESS,
        payload,
    }
}
export function registerFailure() {
    return {
        type: types.REGISTER_FAILURE
    }
}

export function favoriteMovie(payload: any) {
    return {
        type: types.FAVORITE_MOVIE,
        payload
    }
}

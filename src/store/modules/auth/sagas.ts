import * as types from './../types';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';

import axios from '../../../services/axios';
import * as actions from './actions';
import { toast } from 'react-toastify';

interface PayloadProps {
    name?: string;
    email: string;
    password: string;
    navigate?: any;
    prevPath?: string;
}

interface FavoritePayload {
    userId: string;
    movieId: string;
    favoriteMovie: boolean;
    navigate: any;
}

function* loginRequest({ payload }: { payload: PayloadProps }): Generator<any> {
    try {
        const response: any = yield call(axios.post, '/login/token', payload);

        yield put(actions.loginSuccess({ ...response.data }));

        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

        toast.success("You're Logged");
        payload.navigate(payload.prevPath);
    } catch (e) {
        const errors = get(e, 'response.data.errors', []) as [];

        if (errors.length > 0) {
            errors.map((err: string) => toast.error(err))
        }

        yield put(actions.loginFailure());
    }
}

function persistRehydrate({ payload }: { payload: PayloadProps }) {
    const token = get(payload, 'auth.token', '');
    if (!token) return;

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

function* registerRequest({ payload }: { payload: PayloadProps }) {
    const { name, password, email } = payload;

    try {
        yield call(axios.post, '/login/register', {
            name,
            email,
            password,
        });


        yield put(actions.registerSuccess({ name, email, password }));
        toast.success('User has successfully registered!');
        return payload.navigate('/login');
    } catch (e) {
        const errors = get(e, 'response.data.errors', []) as [];

        if (errors.length > 0) {
            errors.map((err: string) => toast.error(err))
        }
        yield put(actions.registerFailure());
    }
}

function* favoriteMovie({ payload }: { payload: FavoritePayload }) {
    const { userId, movieId, favoriteMovie: favorite } = payload;

    try {
        if (favorite) {
            yield call(axios.put, `/favorites/${movieId}`, {
                userId
            })
        } else {
            yield call(axios.delete, `/dislike/${movieId}`, {
                data: {
                    userId
                }
            })
        }

    } catch (e) {
        const status = get(e, 'response.status', 0) as number;

        if (status === 401) {
            toast.error('Is necessary to be logged')
            return payload.navigate('/login');
        }

        return toast.error('Error while favoriting movie!');
    }
}

export default all([
    takeLatest(types.LOGIN_REQUEST as any, loginRequest),
    takeLatest(types.PERSIST_REHYDRITE as any, persistRehydrate),
    takeLatest(types.REGISTER_REQUEST as any, registerRequest),
    takeLatest(types.FAVORITE_MOVIE as any, favoriteMovie)
])
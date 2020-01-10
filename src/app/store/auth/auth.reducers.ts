import { User } from '../user/user.model';
import { All, AuthActionTypes } from '../user/user.actions';


export interface State {
    isAuthenticated: boolean;
    user: User | null;
    errorMessage: string | null;
}

export const initialState: State = {
    isAuthenticated: false,
    user: null,
    errorMessage: null,
}

export function reducer(state = initialState, action: All): State {
    console.log('state:', initialState);
    console.log('action:', action);
    switch (action.type) {
        case AuthActionTypes.LOGIN_SUCCESS: {
            return {
                ...state,
                isAuthenticated: true,
                user: {
                    token: action.payload.token,
                    username: action.payload.username
                },
                errorMessage: null,
            };
        }
        case AuthActionTypes.LOGIN_FAILURE: {
            return {
                ...state,
                errorMessage: 'Incorrect username or password'
            };
        }
        default: {
            return state;
        }
    }
}



import * as auth from './auth/auth.reducers';

export interface AppState {
    authState: auth.State;
}

export const reducers = {
    auth: auth.reducer,
};


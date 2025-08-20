import * as SessionKeys from '../constants/session-constants';

export const getFromStorage = (key: string) => {
    return localStorage.getItem(key) || localStorage.getItem(key);
};

export class TokenService {
    static getToken() {
        return localStorage.getItem(SessionKeys.TOKEN);
    }

    static getRefreshToken() {
        return localStorage.getItem(SessionKeys.REFRESH_TOKEN);
    }

    static getApplication() {
        return localStorage.getItem(SessionKeys.application);
    }

    static getApplicationStep() {
        return localStorage.getItem(SessionKeys.STEP_STORAGE_KEY);
    }

    static setToken(accessToken: string, refreshToken: string) {
        localStorage.setItem(SessionKeys.TOKEN, accessToken);
        localStorage.setItem(SessionKeys.REFRESH_TOKEN, refreshToken);
    }

    static setApplication(detail: string) {
        localStorage.setItem(SessionKeys.application, detail);
    }

    static setApplicationStep(step: string) {
        localStorage.setItem(SessionKeys.STEP_STORAGE_KEY, step);
    }

    static clearTokens() {
        localStorage.removeItem(SessionKeys.TOKEN);
        localStorage.removeItem(SessionKeys.REFRESH_TOKEN);
    }

    static clearApplication() {
        localStorage.removeItem(SessionKeys.application);
    }

    static clearApplicationStep() {
        localStorage.removeItem(SessionKeys.STEP_STORAGE_KEY);
    }
}

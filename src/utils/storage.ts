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

    static setToken(accessToken: string, refreshToken: string) {
        localStorage.setItem(SessionKeys.TOKEN, accessToken);
        localStorage.setItem(SessionKeys.REFRESH_TOKEN, refreshToken);
    }

    static clearTokens() {
        localStorage.removeItem(SessionKeys.TOKEN);
        localStorage.removeItem(SessionKeys.REFRESH_TOKEN);
    }
}

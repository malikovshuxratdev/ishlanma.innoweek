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

    static getApplication1() {
        return localStorage.getItem(SessionKeys.application1);
    }

    static getApplication2() {
        return localStorage.getItem(SessionKeys.application2);
    }

    static getApplication3() {
        return localStorage.getItem(SessionKeys.application3);
    }

    static getApplication4() {
        return localStorage.getItem(SessionKeys.application4);
    }

    static setToken(accessToken: string, refreshToken: string) {
        localStorage.setItem(SessionKeys.TOKEN, accessToken);
        localStorage.setItem(SessionKeys.REFRESH_TOKEN, refreshToken);
    }

    static setApplication1(detail: string) {
        localStorage.setItem(SessionKeys.application1, detail);
    }

    static setApplication2(detail: string) {
        localStorage.setItem(SessionKeys.application2, detail);
    }

    static setApplication3(detail: string) {
        localStorage.setItem(SessionKeys.application3, detail);
    }

    static setApplication4(detail: string) {
        localStorage.setItem(SessionKeys.application4, detail);
    }

    static clearTokens() {
        localStorage.removeItem(SessionKeys.TOKEN);
        localStorage.removeItem(SessionKeys.REFRESH_TOKEN);
        localStorage.removeItem(SessionKeys.application1);
        localStorage.removeItem(SessionKeys.application2);
        localStorage.removeItem(SessionKeys.application3);
        localStorage.removeItem(SessionKeys.application4);
    }
}

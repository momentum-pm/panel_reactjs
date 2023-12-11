export const Keys = {
    lang: "lang",
    accessToken: "accessToken",
    refreshToken: "refreshToken",
    tokenType: "tokenType",
    label: "label",
    token: "token",
    ott:"ott",
};
export default class Storage {
    static get(key, defaultValue = undefined) {
        let value = localStorage.getItem(key);
        if ((value === null) || (value === undefined) || (value === "null") || (value === "undefined")) {
            return defaultValue;
        } else {
            return value;
        }
    }

    static getJSON(key, defaultValue = undefined) {
        let value = localStorage.getItem(key);
		if ((value === null) || (value === undefined) || (value === "null") || (value === "undefined")) {
            return defaultValue;
        } else {
            return JSON.parse(value);
        }
    }

    static getOrSet(key, defaultValue = undefined) {
        let value = localStorage.getItem(key);
		if ((value === null) || (value === undefined) || (value === "null") || (value === "undefined")) {
            return defaultValue;
        } else {
            return value;
        }
    }

    static put(key, value) {
        localStorage.setItem(key, value);
    }

    static putJSON(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static remove(key) {
        localStorage.removeItem(key);
    }

    static containsKey(key) {
        let value = this.get(key);
        return value !== undefined;
    }

    static clear() {
        localStorage.clear()
    }

    static checkKey(key) {
        if (Keys[key] === undefined) {
            throw Error(key + " is not a valid key");
        }
    }
}

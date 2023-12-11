export default class Status {
  static NO_INTERNET = 0;
  static FOUND_302 = 302;
  static OK_200 = 200;
  static NOT_FOUND_404 = 404;
  static NOT_ACCEPTABLE_406 = 406;
  static BAD_REQUEST = 400;
  static UN_AUTHORIZED_401 = 401;

  static isOk(status) {
    return Math.floor(status / 100) === 2;
  }

  static isRedirect(status) {
    return Math.floor(status / 100) === 3;
  }

  static isAuthenticationError(status) {
    return status === this.UN_AUTHORIZED_401;
  }
}

import Environment from "./Environment";
import Auth from "./views/auth/stores/Auth";

export default class Settings {
  static CLIENT_ID = "M8d3wSaR4clCcKu2xTPgJAWaxjVDPGPtkv21busd";
  static CLIENT_SECRET =
    "whs9Csp3tGeOLJHY354OhpS2e3ul5RXHXyFQzwXaqgAYirNeeqm8ECd9VVQRzA52lOecKL5WyO22zu84ibhZYIUgeH7DTO41xiteB9MXSw5IhawTANi9HnLlxPbIDINk";
  static SERVER_URL = Environment.SERVER_URL;
  static CLIENT_URL = Environment.CLIENT_URL;
  static TELL = "02188740578";
  static SAND_BOX = Environment.SAND_BOX;
  static API_VERSION_URL = "/";
  static LOGIN_DEFAULT_REDIRECT = "/dashboard/chats/";
  static DEFAULT_LANG = "en";
  static ANALYTICS_TRACKING_ID = "G-71TEVBQ266";
  static LOGIN_REDIRECT = (callback, location) => {
    Auth.open(callback, location, false);
  };
}

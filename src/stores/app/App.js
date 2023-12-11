import RemoteStore, { CACHE_POLICY, LOADING_STATE } from "../base/RemoteStore";
import { STORE_TYPE } from "../base/Store";
import Authenticator from "../../utils/requests/Authenticator";
import Toolbar from "./toolbar/Toolbar";
import Auth from "../../views/auth/stores/Auth";
import SwitchField from "../base/form/fields/SwitchField";
import Res from "../../assets/Res";
import Storage from "../../utils/Storage";

export default class App extends RemoteStore {
  static storeName = "App";
  static type = STORE_TYPE.SINGLETON;

  static getActions() {
    return [...super.getActions(), "init", "setShouldLog"];
  }
  onIsDarkModeChange() {
    let isDarkModeValue = this.state.isDarkMode.state.value;
    let currentTheme = isDarkModeValue ? "dark" : "light";

    Storage.put("theme", currentTheme);
    this.state.changingTheme = true;
    this.state.showingTheme = false;
    this.save();

    setTimeout(() => {
      this.state.currentTheme = currentTheme;
      this.save();
    }, 100);

    setTimeout(() => {
      this.state.showingTheme = true;
      this.save();
    }, 500);
    setTimeout(() => {
      this.state.changingTheme = false;
      this.save();
    }, 600);
  }
  onCreate() {
    this.init();
  }

  init() {
    if (!this.state.initializing) {
      this.state.loadingState = LOADING_STATE.NOT_LOADED;
      this.state.initializing = true;
      this.save();
      Authenticator.getFreshToken(() => this.load(CACHE_POLICY.IGNORE));
    }
  }
  isAuthenticated() {
    return this.state.data && this.state.data.is_authenticated;
  }

  getInitialState(args) {
    let currentTheme = Storage.getOrSet("theme", "dark");
    let isDarkModeValue = currentTheme === "dark";
    let isDarkMode = SwitchField.create({
      name: "isDarkMode",
      value: isDarkModeValue,
      required: false,
      offIcon: Res.icon.moon,
      onIcon: Res.icon.sun,
      offClassName: "dark-mode inline-field",
      className: "primary inline-field toolbar-switch",
    });
    isDarkMode.subscribe(() => this.onIsDarkModeChange());
    return {
      initializing: false,
      ...super.getInitialState(args),
      shouldLog: false,
      isDarkMode,
      currentTheme,
    };
  }

  getUrl() {
    return "auth/essentials/";
  }

  setShouldLog(shouldLog) {
    this.state.shouldLog = shouldLog;
    this.save();
  }

  success(data, status) {
    super.success(data, status);
    Toolbar.get().resetData();
    Auth.get().callback(true);
  }
  static getId() {
    return this.profile().id;
  }

  static profile() {
    return App.get().state.data.profile;
  }
  static person() {
    return App.get().state.data.profile;
  }
  static setProfileData(data) {
    App.get().state.data.profile = data;
    App.get().save();
  }
  static getMemberId() {
    return this.profile().member;
  }

  getLoginRequired() {
    return false;
  }
}

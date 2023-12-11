import Store, { STORE_TYPE } from "../../base/Store";
import Button from "../../base/form/buttons/Button";
import Res from "../../../assets/Res";
import Confirm from "../../base/Confirm";
import Authenticator from "../../../utils/requests/Authenticator";
import { get_lang_url } from "../../../History";
import App from "../App";
import Auth from "../../../views/auth/stores/Auth";

export default class Toolbar extends Store {
  static storeName = "Toolbar";
  static type = STORE_TYPE.SINGLETON;

  static getActions() {
    return [
      "resetData",
      "setScrolled",
      "setSearchbarOpen",
      "toggleOptions",
      "setUnreadMessageCount",
    ];
  }

  getInitialState(args) {
    return {
      ...super.getInitialState(args),
      isAuthenticated: false,
      scrolled: false,
      openOptions: false,
      searchbarOpen: false,

      dashboardButton: Button.create_link({
        name: "dashboard",
        link: `/dashboard/`,
        icon: Res.icon.home,
        title: Res.string.toolbar.home,
        className: " flat default",
      }),

      coursesButton: Button.create_link({
        name: "notifications",
        link: "/school/",
        icon: Res.icon.education,
        badge: 0,
        title: "همه ی دوره ها",
        className: " flat default",
      }),

      chatsButton: Button.create_link({
        name: "chats",
        link: "/dashboard/chats/",
        icon: Res.icon.chat,
        badge: 0,
        title: "Chats",
        className: " flat default",
      }),

      profileButton: Button.create_link({
        name: "profileButton",
        link: `@`,
        icon: Res.icon.profile,
        title: Res.string.toolbar.profile,
        className: " flat default",
      }),
      schoolAdminButton: Button.create_link({
        name: "schoolAdminButton",
        link: `/`,
        icon: Res.icon.education,
        title: Res.string.toolbar.school_admin,
        className: " flat default",
      }),
      commentsAdminButton: Button.create_link({
        name: "commentsAdminButton",
        link: "/",
        icon: Res.icon.comment,
        title: "کامنت ها",
        className: "flat default",
      }),
      blogAdminButton: Button.create_link({
        name: "blogAdminButton",
        link: `/`,
        icon: Res.icon.note,
        title: Res.string.toolbar.blog_admin,
        className: " flat default",
      }),

      logoutButton: Button.create_button({
        name: "logoutButton",
        onClick: () => this.logout(),
        icon: Res.icon.logout,
        title: Res.string.toolbar.logout_button_title,
        className: " flat danger",
      }),
      navigationLogoutButton: Button.create_button({
        name: "logoutButton",
        onClick: () => this.logout(),
        icon: Res.icon.logout,
        title: Res.string.toolbar.logout_button_title,
        className: "navigation-button flat default",
      }),
      navigationDashboardButton: Button.create_link({
        name: "dashboard",
        link: `/dashboard/`,
        icon: Res.icon.home,
        title: Res.string.toolbar.home,
        className: "navigation-button flat default",
      }),

      navigationCoursesButton: Button.create_link({
        name: "notifications",
        link: "/school/",
        icon: Res.icon.education,
        badge: 0,
        title: "دوره ها",
        className: "navigation-button flat default",
      }),
      navigationProfileButton: Button.create_link({
        name: "profileButton",
        link: `@`,
        icon: Res.icon.profile,
        title: Res.string.toolbar.profile,
        className: "navigation-button flat default",
      }),
      loginButton: Button.create_button({
        name: "login",
        onClick: () => Auth.open(),
        icon: Res.icon.login,
        title: Res.string.toolbar.login,
        className: "bordered default primary",
      }),
      navigationLoginButton: Button.create_button({
        name: "login",
        onClick: () => Auth.open(),
        icon: Res.icon.profile,
        title: Res.string.toolbar.login,
        className: "navigation-button flat default",
      }),
      schoolButton: Button.create_link({
        name: "school",
        link: `/school/`,
        icon: Res.icon.education,
        title: "همه دوره ها",
        className: " flat default",
      }),

      navigationSchoolButton: Button.create_link({
        name: "school",
        link: `/school/`,
        icon: Res.icon.education,
        title: "همه دوره ها",
        className: "navigation-button flat default",
      }),
      callButton: Button.create_external_link({
        name: "callButton",
        link: "tel:02188740578",
        icon: Res.icon.call,
        title: "تماس 02188740578",
        className: "flat default",
      }),
      navigationCallButton: Button.create_external_link({
        name: "callButton",
        link: "tel:02188740578",
        title: "021-88740578",
        icon: Res.icon.call,
        className: "navigation-button flat default",
      }),
    };
  }

  logout() {
    Confirm.get().open(
      Res.string.toolbar.logout,
      Res.string.toolbar.logout_question,
      () => Authenticator.logout(() => (window.location = get_lang_url("/"))),
      Res.string.toolbar.logoutButton,
      "raised danger"
    );
  }
  resetData() {
    this.state.isAuthenticated = App.get().state.data.is_authenticated;
    this.state.isStaff = App.get().state.data.is_staff;
    if (this.state.isAuthenticated) {
      this.state.profileButton.set_link(
        `/@${App.profile().username}?edit=true`
      );
      this.state.navigationProfileButton.set_link(
        `/@${App.profile().username}?edit=true`
      );
    }
    if (this.state.isStaff) {
      this.state.commentsAdminButton.set_link(`/comments/`);
      this.state.schoolAdminButton.set_link(
        `/school/authors/${App.profile().id}/courses/`
      );
      this.state.blogAdminButton.set_link(
        `/blog/authors/${App.profile().id}/posts/`
      );
    }
    this.save();
  }

  setScrolled(scrolled) {
    this.state.scrolled = scrolled;
    this.save();
  }

  setSearchbarOpen(open) {
    this.state.searchbarOpen = open;
    this.save();
  }

  toggleOptions() {
    this.state.openOptions = !this.state.openOptions;
    this.save();
  }
  setUnreadMessageCount(unreadMessageCount) {
    this.state.messengerButton.setBadge(unreadMessageCount);
  }
}

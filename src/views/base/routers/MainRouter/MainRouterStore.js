import Store from "../../../../stores/base/Store";

export class MainRouterStore extends Store {
  static storeName = "MainRouter";

  static getActions() {
    return [];
  }

  getInitialState(args) {
    let routes = this.getRoutes(args);
    return {
      routes,
    };
  }
  getRoutes(args) {
    return {
      home: "",
      dashboard: "dashboard",
      profile: "@:username",
      blog: "blog",
      school: "school",
      tv: "tv",
      redirect: "u/:code",
    };
  }
}

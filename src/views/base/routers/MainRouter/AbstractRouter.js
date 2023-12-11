import Store from "../../../../stores/base/Store";

export class AbstractRouter extends Store {
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
    throw Error("getRoutes should be overrided");
  }
}

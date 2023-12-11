import React, { lazy, Suspense } from "react";
import "./AppRouter.scss";

import RemoteStoreView from "../base/RemoteStoreView";
import { connect } from "../../stores/base/StoreManager";
import App from "../../stores/app/App";
import { get_lang_free_url } from "../../History";
import Res from "../../assets/Res";
import ToolbarView from "./common/toolbarView/ToolbarView";
import Row from "../base/Row";
import LoadingView from "../base/refactored/loadingView/LoadingView";
import { Route, Switch, withRouter } from "react-router";
import ShortRedirectPage from "./shortener/ShortRedirectPage";
import MasterColumn from "../base/MasterColumn";
import { Link } from "react-router-dom";
import ScrollableColumn from "../base/refactored/scrollable/ScrollableColumn";
import Scrollable from "../base/refactored/scrollable/Scrollable";
const DashboardRouter = lazy(() => import("./dashboard/DashboardRouter"));
const ProfilesRouter = lazy(() => import("./profiles/Router"));
const BlogRouter = lazy(() => import("./blog/BlogRouter"));
const HomeRouter = lazy(() => import("./home/Router"));
const AuthRouter = lazy(() => import("../auth/AuthRouter"));
const SchoolRouter = lazy(() => import("./school/Router"));
const CoursePage = lazy(() => import("./school/views/CoursePage"));
const PlayerPage = lazy(() => import("./school/views/PlayerPage"));
const CommentsAdminPage = lazy(() => import("./comments/CommentsAdminPage"));
export function NavigationAllMenus({ childRoutes }) {
  return (
    <ScrollableColumn className={"full-heigth"}>
      <Scrollable className={"padding-one"}>
        {childRoutes.map((child, index) => (
          <NavigationMenu data={child} level={1} key={index} />
        ))}
      </Scrollable>
    </ScrollableColumn>
  );
}
export function NavigationMenu({ data, level }) {
  return (
    <div>
      <Link
        to={data.link}
        className={`row centered navigation-item level-${level} ${
          data.active ? "active" : ""
        }`}
      >
        {data.icon}
        <MasterColumn className={"padding-two-sides"}>
          <p className="text bold">{data.title}</p>
        </MasterColumn>
        {Res.icon.nextArrow}
      </Link>
      {data.childRoutes && data.open ? (
        <div className="margin-two-start padding-two-bottom">
          {data.childRoutes.map((child) => (
            <NavigationMenu data={child} level={level + 1} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
class MainRouter extends RemoteStoreView {
  static getRemoteStore(props) {
    return App.map();
  }

  componentDidMount() {
    this.getStore().init();
  }

  getOkView() {
    let path = this.props.match.path;
    let pathname = this.props.location.pathname;
    if (!pathname.endsWith("/")) {
      pathname += "/";
    }
    pathname = get_lang_free_url(pathname);
    let locationClassName = "";
    locationClassName = pathname === "/" ? "in-home" : locationClassName;
    locationClassName = pathname.startsWith("/dashboard")
      ? "in-dashboard"
      : locationClassName;
    locationClassName = pathname.startsWith("/school")
      ? "in-school"
      : locationClassName;
    locationClassName = pathname.startsWith("/tv")
      ? "in-tv"
      : locationClassName;
    locationClassName = pathname.startsWith("/blog")
      ? "in-blog"
      : locationClassName;

    let childRoutes = [];
    if (this.getData().is_authenticated) {
      childRoutes.push({
        title: "داشبورد",
        link: "/dashboard/",
        icon: Res.icon.home,
        active: this.props.location.pathname.indexOf("dashboard") > -1,
        open: this.props.location.pathname.indexOf("dashboard") > -1,
        childRoutes: [
          {
            title: "ادمین",
            link: "/dashboard/admin",
            icon: Res.icon.wand,
            active:
              this.props.location.pathname.indexOf("dashboard/admin") > -1,
          },
          {
            title: "دوره های من",
            link: "/dashboard/courses",
            icon: Res.icon.note,
            active:
              this.props.location.pathname.indexOf("dashboard/courses") > -1,
          },
          {
            title: "پشتیبانی",
            link: "/dashboard/support",
            icon: Res.icon.support,
            active:
              this.props.location.pathname.indexOf("dashboard/support") > -1,
          },
        ],
      });
      childRoutes.push({
        title: "پروفایل من",
        link: `/@${this.getData().profile.username}?edit=true`,
        icon: Res.icon.home,
      });
    }
    childRoutes.push({
      title: "بلاگ",
      link: "/blog/",
      icon: Res.icon.note,
    });
    childRoutes.push({
      title: "درباره ما",
      link: "/about-us/",
      icon: Res.icon.about_us,
    });
    return (
      <div className={`app ${locationClassName}`}>
        <Row className={`app-body app-body-with-nav`}>
          <div className={`app-content-container`}>
            <ToolbarView />
            <div className={"app-content"}>
              <div className="app-content-menu">
                {/* <NavigationAllMenus childRoutes={childRoutes} /> */}

                {/* <HomeProfileView /> */}
              </div>
              <div className="app-content-router">
                <Suspense
                  fallback={<LoadingView className={"app-router-loading"} />}
                >
                  <Switch>
                    <Route
                      path={path + "dashboard/"}
                      render={() => <DashboardRouter />}
                    />
                    <Route
                      path={path + "@:username/"}
                      render={() => <ProfilesRouter />}
                    />
                    <Route
                      path={path + "auth/"}
                      render={() => <AuthRouter />}
                    />
                    <Route
                      path={path + "blog/"}
                      render={() => <BlogRouter />}
                    />
                    <Route
                      path={path + "comments/"}
                      render={() => <CommentsAdminPage />}
                    />
                    <Route
                      path={path + "school/"}
                      render={() => <SchoolRouter />}
                    />
                    <Route
                      path={path + "c/:courseSlug/e/:episodeId/:episodeSlug/"}
                      render={() => <PlayerPage />}
                    />
                    <Route
                      path={path + "c/:courseSlug/"}
                      render={() => <CoursePage />}
                    />

                    <Route
                      path={path + "u/:code"}
                      render={() => <ShortRedirectPage />}
                    />
                    <Route path={path} render={() => <HomeRouter />} />
                  </Switch>
                </Suspense>
              </div>
            </div>
          </div>
        </Row>
      </div>
    );
  }
}

export default withRouter(connect(MainRouter));

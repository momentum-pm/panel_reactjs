import React from "react";
import ScrollableColumn from "../../base/refactored/scrollable/ScrollableColumn";
import Scrollable from "../../base/refactored/scrollable/Scrollable";
import Box from "../../base/refactored/box/Box";
import Body from "../../base/Body";
import Row from "../../base/Row";
import MasterColumn from "../../base/MasterColumn";
import Res from "../../../assets/Res";
import { withRouter } from "react-router";
import ButtonView from "../../base/forms/button/ButtonView";
import TabsContainerView from "../../base/tabView/TabsContainerView";
import { BUTTON_TYPE } from "../../../stores/base/form/buttons/Button";
import { Switch, Route } from "react-router";
import { Suspense } from "react";
import LoadingView from "../../base/refactored/loadingView/LoadingView";
import AdminEpisodeCommentsView from "./AdminEpisodeCommentsView";
import AdminCourseCommentsView from "./AdminCourseCommentsView";
import AdminBlogCommentsView from "./AdminBlogCommentsView";
const links = [
  {
    hash: "course",
    title: "لندینگ دوره",
    isDefault: true,
  },
  {
    hash: "episode",
    title: "قسمت ها",
  },
  {
    hash: "blog",
    title: "مقالات",
  },
];

class CourseAdminPage extends React.Component {
  getTabsView() {
    let hash = this.props.location.pathname;
    return (
      <TabsContainerView
        className={"full-width desktop-only z-index-2 background"}
      >
        {links.map((link) => (
          <ButtonView
            type={BUTTON_TYPE.LINK}
            className={`flat ${
              (!hash && link.isDefault) || hash.indexOf(link.hash) > -1
                ? "primary"
                : "gray"
            }`}
            icon={link.icon}
            title={link.title}
            link={`/comments/${link.hash}`}
          />
        ))}
      </TabsContainerView>
    );
  }
  render() {
    let path = this.props.match.path;
    return (
      <ScrollableColumn>
        {this.getTabsView()}

          <Suspense fallback={<LoadingView />}>
            <Switch>
              <Route
                path={path + "course"}
                render={() => <AdminCourseCommentsView />}
              />
              <Route
                path={path + "episode"}
                render={() => <AdminEpisodeCommentsView />}
              />

              <Route
                path={path + "blog"}
                render={() => <AdminBlogCommentsView />}
              />
              <Route path={path} render={() => <AdminCourseCommentsView />} />
            </Switch>
          </Suspense>
      </ScrollableColumn>
    );
  }
}

export default withRouter(CourseAdminPage);

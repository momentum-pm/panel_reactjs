import { connect } from "../../../../stores/base/StoreManager";
import React from "react";
import App from "../../../../stores/app/App";
import RemoteStoreView from "../../../base/RemoteStoreView";
import ScrollableColumn from "../../../base/refactored/scrollable/ScrollableColumn";
import Scrollable from "../../../base/refactored/scrollable/Scrollable";
import HomeCoursesView from "./common/HomeCoursesView";

class DashboardCoursesView extends RemoteStoreView {
  static getRemoteStore() {
    return App.map();
  }

  getOkView() {
    let myCourses = this.getData().profile.courses.length;
    return (
      <ScrollableColumn>
        <Scrollable className={"padding-one-desktop"}>
          <div className="container full-height">
            <HomeCoursesView courses={myCourses} />
          </div>
        </Scrollable>
      </ScrollableColumn>
    );
  }
}

export default connect(DashboardCoursesView);

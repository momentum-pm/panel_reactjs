import React from "react";
import Row from "../../../../base/Row";
import { withRouter } from "react-router";
import { connect } from "../../../../../stores/base/StoreManager";
import AuthorCourseTeachers from "../../stores/author/AuthorCourseTeachers";
import CompactTeacherView from "../CompactTeacherView";
import ListRemoteStoreView from "../../../../base/ListRemoteStoreView";
import ButtonView from "../../../../base/forms/button/ButtonView";
class AuthorCourseTeachersPage extends ListRemoteStoreView {
  static getRemoteStore(props) {
    let { courseId, authorId } = props.match.params;
    return AuthorCourseTeachers.map(courseId, { courseId, authorId });
  }
  getPinnedView() {
    return (
      <Row>
        <h2 className="header-style margin-two">استاید</h2>
      </Row>
    );
  }
  mapItemToView(item) {
    return (
      <CompactTeacherView
        access={item}
        editable={true}
        onDelete={() => this.getStore().deleteItem(item)}
        onEdit={() => this.getStore().editItem(item)}
      />
    );
  }

  getListView() {
    return (
      <ol className={"row padding-one"}>
        {this.getPinnedView()}
        {this.getData().map(this.mapItemToView)}
      </ol>
    );
  }
}

export default withRouter(connect(AuthorCourseTeachersPage));

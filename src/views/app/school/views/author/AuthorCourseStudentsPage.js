import React from "react";
import { withRouter } from "react-router";
import { connect } from "../../../../../stores/base/StoreManager";
import PaginatedRemoteStoreView from "../../../../base/PaginatedRemoteStoreView";
import AuthorCourseStudents from "../../stores/author/AuthorCourseStudents";
import CompactProfileView from "../CompactProfileView";
import AuthorCourseStudentsFilterFormView from "./AuthorCourseStudentsFilterFormView";
import Row from "../../../../base/Row";
import MasterColumn from "../../../../base/MasterColumn";
import ButtonView from "../../../../base/forms/button/ButtonView";
class AuthorCourseStudentsPage extends PaginatedRemoteStoreView {
  static getRemoteStore(props) {
    let { courseId, authorId } = props.match.params;
    return AuthorCourseStudents.map(courseId, { courseId, authorId });
  }
  getMainClass() {
    return "padding-one";
  }
  noScrollable() {
    return true;
  }
  getFilterFormView() {
    return (
      <Row className={"centered"}>
        <MasterColumn>
          <AuthorCourseStudentsFilterFormView />
        </MasterColumn>
        <MasterColumn className={"row reverse centered"}>
          <ButtonView id={this.getState().addStudentButton.id} />
          <ButtonView id={this.getState().downloadButton.id} />
          <ButtonView id={this.getState().downloadAllButton.id} />
        </MasterColumn>
      </Row>
    );
  }
  getPinnedView() {
    return (
      <Row>
        <h2 className="header-style margin-two">دانش آموزان</h2>
      </Row>
    );
  }

  mapItemToView(item) {
    return (
      <div className="inline-half-row-responsive">
        <CompactProfileView
          student={item}
          onDelete={() => this.getStore().deleteItem(item)}
          onEdit={() => this.getStore().editItem(item)}
        />
      </div>
    );
  }

  getListView() {
    return <ol className={"row"}>{this.getData().map(this.mapItemToView)}</ol>;
  }
}

export default withRouter(connect(AuthorCourseStudentsPage));

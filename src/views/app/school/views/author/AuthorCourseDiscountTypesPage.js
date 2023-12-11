import React from "react";
import { withRouter } from "react-router";
import { connect } from "../../../../../stores/base/StoreManager";
import PaginatedRemoteStoreView from "../../../../base/PaginatedRemoteStoreView";
import AuthorCourseDiscountTypes from "../../stores/author/AuthorCourseDiscountTypes";
import DiscountTypeView from "../DiscountTypeView";
import AuthorCourseDiscountTypesFilterFormView from "./AuthorCourseDiscountTypesFilterFormView";
import Row from "../../../../base/Row";
import MasterColumn from "../../../../base/MasterColumn";
import ButtonView from "../../../../base/forms/button/ButtonView";
class AuthorCourseDiscountTypesPage extends PaginatedRemoteStoreView {
  static getRemoteStore(props) {
    let { courseId, authorId } = props.match.params;
    return AuthorCourseDiscountTypes.map(courseId, { courseId, authorId });
  }
  getMainClass() {
    return "padding-one";
  }
  noScrollable() {
    return true;
  }
  getFilterFormView() {
    return <AuthorCourseDiscountTypesFilterFormView />;
  }
 

  mapItemToView(item) {
    return (
      <div className="inline-half-row-responsive">
        <DiscountTypeView discountType={item} />
      </div>
    );
  }

  getListView() {
    return <ol className={"row"}>{this.getData().map(this.mapItemToView)}</ol>;
  }
}

export default withRouter(connect(AuthorCourseDiscountTypesPage));

import React from "react";
import ScrollableColumn from "../../../../base/refactored/scrollable/ScrollableColumn";
import Scrollable from "../../../../base/refactored/scrollable/Scrollable";
import Box from "../../../../base/refactored/box/Box";
import Body from "../../../../base/Body";
import Row from "../../../../base/Row";
import MasterColumn from "../../../../base/MasterColumn";
import { splitDigits } from "../../../../../utils/StringUtils";
import Res from "../../../../../assets/Res";
import IconTitleValueView from "../../../../base/iconTitleValueView/IconTitleValueView";
import { withRouter } from "react-router";
import RemoteStoreView from "../../../../base/RemoteStoreView";
import { connect } from "../../../../../stores/base/StoreManager";
import { getDurationText } from "../../../../../utils/DateUtils";
import AuthorCourse from "../../stores/author/AuthorCourse";
import AuthorSectionsListView from "./AuthorSectionsListView";
import ButtonView from "../../../../base/forms/button/ButtonView";
import CourseEditModal from "./CourseEditModal";
import HeaderRow from "../../../../base/refactored/headerRow/HeaderRow";
import TabsContainerView from "../../../../base/tabView/TabsContainerView";
import { BUTTON_TYPE } from "../../../../../stores/base/form/buttons/Button";
import { Switch, Route } from "react-router";
import { Suspense } from "react";
import LoadingView from "../../../../base/refactored/loadingView/LoadingView";
import SlaveColumn from "../../../../base/SlaveColumn";
import AuthorCourseInvoices from "../../stores/author/AuthorCourseInvoices";
import PaginatedRemoteStoreView from "../../../../base/PaginatedRemoteStoreView";
import InvoiceView from "../../../dashboard/accounting/views/accountingPage/InvoiceView";
import AuthorCourseInvoiceFilterFormView from "./AuthorCourseInvoiceFilterFormView";
class AuthorCourseInvoicesPage extends PaginatedRemoteStoreView {
  static getRemoteStore(props) {
    let { courseId, authorId } = props.match.params;
    return AuthorCourseInvoices.map(courseId, { courseId, authorId });
  }
  getMainClass() {
    return "padding-one";
  }
  noScrollable() {
    return true;
  }

  getFilterFormView() {
    return <AuthorCourseInvoiceFilterFormView />;
  }
  getPinnedView() {
    return (
      <Row>
        <h2 className="header-style margin-two">فاکتور ها</h2>
      </Row>
    );
  }
  mapItemToView(item) {
    return (
      <div className="inline-half-row-responsive">
        <InvoiceView invoice={item} key={item.id} />
      </div>
    );
  }

  getListView() {
    return <ol className={"row"}>{this.getData().map(this.mapItemToView)}</ol>;
  }
}

export default withRouter(connect(AuthorCourseInvoicesPage));

import React from "react";
import EmptyView from "./emptyListView/EmptyView";
import Res from "../../assets/Res";
import Scrollable from "./refactored/scrollable/Scrollable";
import RemoteStoreView from "./RemoteStoreView";
import LoadingView from "./refactored/loadingView/LoadingView";
import LinkGroupView from "../../stores/base/form/buttons/LinkGroupView";
import Row from "./Row";
import SlaveColumn from "./SlaveColumn";
import ScrollableColumn from "./refactored/scrollable/ScrollableColumn";
import MasterColumn from "./MasterColumn";

export default class PaginatedRemoteStoreView extends RemoteStoreView {
  constructor(props) {
    super(props);
    this.mapItemToView = this.mapItemToView.bind(this);
  }

  render() {
    if (this.noScrollable()) {
      return (
        <div className={this.getMainClass()}>
          {this.getFilterFormView()}
          {this.getPagesView(true)}
          {this.getPinnedView()}

          {super.render()}
          {this.getPagesView(false)}
        </div>
      );
    } else {
      return (
        <div className={this.getMainClass()}>
          <ScrollableColumn className={`full-height`}>
            {this.getPinnedView()}
            <Scrollable className={"padding-one-desktop"}>
              <div className="container full-height">
                <Row className={"full-height filters-form-row topped"}>
                  {this.getFilterFormView()}
                  <MasterColumn>
                    {this.getHeaderView()}
                    {this.getPagesView(true)}
                    {super.render()}
                    {this.getPagesView(false)}
                  </MasterColumn>
                </Row>
              </div>
            </Scrollable>
          </ScrollableColumn>
        </div>
      );
    }
  }

  noScrollable() {
    return false;
  }

  getPinnedView() {
    return null;
  }
  getFilterFormView() {
    let filterForm = this.getFilterForm();
    if (filterForm) {
      return (
        <SlaveColumn className={"full-height filters-form-container"}>
          {this.getFilterForm()}
        </SlaveColumn>
      );
    }
  }

  getFilterForm() {}

  getMainClass() {
    return " full-height";
  }

  getHeaderView() {}

  componentDidMount() {
    this.getStore().checkLoad();
  }

  componentDidUpdate() {
    this.getStore().checkLoad();
  }

  getOkView() {
    if (this.getData().length > 0) {
      return (
        <div className={"with-responsive-pinned-bottom page-body"}>
          {this.getListView()}
        </div>
      );
    } else {
      return this.getEmptyView();
    }
  }

  getLoadingView() {
    return <LoadingView className={"loading-box-item"} />;
  }

  getListView() {
    return <ol className={""}>{this.getData().map(this.mapItemToView)}</ol>;
  }

  getEmptyView() {
    return (
      <EmptyView
        title={Res.string.nothingToShow}
        text={Res.string.nothingToShow}
      />
    );
  }

  getPagesView(top) {
    return (
      <div className={`${top ? " desktop-only" : ""}`}>
        <LinkGroupView id={this.getState().linkGroup.id} />
      </div>
    );
  }

  mapItemToView(item, index) {
    throw Error(
      `You should override mapItemToView in ${this.constructor.name} class`
    );
  }
}

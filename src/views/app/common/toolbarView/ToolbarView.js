import React from "react";
import "./ToolbarView.scss";
import { withRouter } from "react-router";
import { connect } from "../../../../stores/base/StoreManager";
import Row from "../../../base/Row";
import MasterColumn from "../../../base/MasterColumn";
import ButtonView from "../../../base/forms/button/ButtonView";
import Res from "../../../../assets/Res";
import Toolbar from "../../../../stores/app/toolbar/Toolbar";
import StoreView from "../../../base/StoreView";
import Link from "../../../base/Link";
import App from "../../../../stores/app/App";
import logo from "../../../../assets/images/logo.png";
import SwitchFieldView from "../../../base/forms/fields/switchFieldView/SwitchFieldView";
import watermark_dark from "../../../../assets/images/watermark-dark.png";
import watermark_light from "../../../../assets/images/watermark-light.png";
class ToolbarView extends StoreView {
  static mapPropsToStores() {
    return { toolbar: Toolbar.map(), app: App.map() };
  }

  getState() {
    return this.props.toolbar.state;
  }

  render() {
    return (
      <div className={`no-select toolbar-container`}>
        <div
          className={`toolbar ${this.getState().scrolled ? "scrolled" : ""}`}
        >
          <div className="container full-height">
            <Row className={"centered full-height"}>
              <MasterColumn
                className={"centered row full-height padding-two-sides"}
              >
                <Row className={"centered"}>{this.getHomeView()}</Row>
              </MasterColumn>

              {this.getButtonsView()}
            </Row>
          </div>
        </div>
      </div>
    );
  }

  getHomeView() {
    return (
      <Link to={"/"} className={"row centered toolbar-home"}>
        <img className={"toolbar-logo-container"} src={logo} alt={"گرینولی"} />
        <h1>Momentum AI</h1>
      </Link>
    );
  }

  getButtonsView() {
    return this.getState().isAuthenticated ? (
      <Row className={"centered"}>
        {/* <ButtonView id={this.getState().dashboardButton.id} /> */}
        {/* <ButtonView id={this.getState().chatsButton.id} /> */}
        {/* <ButtonView id={this.getState().profileButton.id} /> */}
        <ButtonView id={this.getState().logoutButton.id} />

        <div className="responsive-only bottom-navigation">
          <ButtonView id={this.getState().navigationDashboardButton.id} />
          {/* <ButtonView id={this.getState().messengerButton.id} /> */}
          <ButtonView id={this.getState().navigationLogoutButton.id} />
        </div>
        {/* {this.getThemeSwitchView()} */}
      </Row>
    ) : (
      <Row className={"centered"}>
        <div className="responsive-only bottom-navigation">
          <ButtonView id={this.getState().navigationLoginButton.id} />
        </div>
        <div className="dekstop-only">
          <Row className={"centered"}>
            {/* <ButtonView id={this.getState().loginButton.id} /> */}
          </Row>
        </div>

        {/* {this.getThemeSwitchView()} */}
      </Row>
    );
  }
  getThemeSwitchView() {
    return <SwitchFieldView id={this.props.app.state.isDarkMode.id} />;
  }
}

export default withRouter(connect(ToolbarView));

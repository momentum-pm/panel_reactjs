import React, { Suspense } from "react";
import "./Styles.scss";
import ScrollableColumn from "../base/refactored/scrollable/ScrollableColumn";
import Scrollable from "../base/refactored/scrollable/Scrollable";
import Row from "../base/Row";
import MasterColumn from "../base/MasterColumn";
import SlaveColumn from "../base/SlaveColumn";
import ResetPasswordView from "./views/ResetPasswordView";
import RegisterView from "./views/RegisterView";
import PhoneNumberView from "./views/PhoneNumberView";
import Box from "../base/refactored/box/Box";
import LoadingView from "../base/refactored/loadingView/LoadingView";
import { Route, Switch, withRouter } from "react-router";
import { connect } from "../../stores/base/StoreManager";
import StoreView from "../base/StoreView";
import Auth from "./stores/Auth";
import logo from "../../assets/images/logo.png";
import Res from "../../assets/Res";
import Column from "../base/Column";

class AuthRouter extends StoreView {
  static mapPropsToStores(props) {
    return { auth: Auth.get() };
  }
  render() {
    let path = this.props.match.path;

    return (
      <ScrollableColumn>
        <Scrollable>
          <div className={"container full-height"}>
            <Row className={"full-height"}>
              <SlaveColumn className={"desktop-only dominant"} />
              <MasterColumn className={"row centered full-height"}>
                <Box className={""}>
                  <div className={"padding-two-sides padding-two-bottom"}>
                    <Column className={"full-width centered"}>
                      <img
                        src={logo}
                        alt={Res.string.app_label}
                        className={"square margin-two"}
                      />
                      <p className={"center"}>
                        {this.props.auth.state.message ||
                          "Continue to Momentum-AI"}
                      </p>
                    </Column>

                    <Suspense fallback={<LoadingView />}>
                      <Switch>
                        <Route
                          path={`${path}register/`}
                          render={() => <RegisterView />}
                        />
                        <Route
                          path={`${path}:phone_number/reset/`}
                          render={() => <ResetPasswordView />}
                        />
                        <Route path={path} render={() => <PhoneNumberView />} />
                      </Switch>
                    </Suspense>
                  </div>
                </Box>
              </MasterColumn>
              <SlaveColumn className={"desktop-only dominant"} />
            </Row>
          </div>
        </Scrollable>
      </ScrollableColumn>
    );
  }
}

export default withRouter(connect(AuthRouter));

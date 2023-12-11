import React, { Suspense } from "react";
import Row from "../../../../../base/Row";
import MasterColumn from "../../../../../base/MasterColumn";
import SlaveColumn from "../../../../../base/SlaveColumn";
import WalletView from "./WalletView";
import Header from "../../../../../base/refactored/header/Header";
import Res from "../../../../../../assets/Res";
import { Route, Switch, withRouter } from "react-router";
import TabsContainerView from "../../../../../base/tabView/TabsContainerView";
import ButtonView from "../../../../../base/forms/button/ButtonView";
import { BUTTON_TYPE } from "../../../../../../stores/base/form/buttons/Button";
import LoadingView from "../../../../../base/refactored/loadingView/LoadingView";
import InvoicesView from "./InvoicesView";
import IncomesView from "./IncomesView";
import WithdrawsView from "./WithdrawsView";
import ScrollableColumn from "../../../../../base/refactored/scrollable/ScrollableColumn";
import Scrollable from "../../../../../base/refactored/scrollable/Scrollable";
import Box from "../../../../../base/refactored/box/Box";

class AccountingPage extends React.Component {
  render() {
    let path = this.props.match.path;
    return (
      <div className={"full-height"}>
        <ScrollableColumn>
          <Scrollable className={"padding-one-desktop"}>
            <div className="container full-height">
              <Row className={"desktop-reverse padding-one-desktop full-height"}>
                <SlaveColumn className={"dominant"}>
                  <WalletView />
                </SlaveColumn>
                <MasterColumn>
                  <Box>
                    <Header>
                      {Res.string.dashboard.accounting.transactions}
                    </Header>
                    {this.getTabsView()}

                    <Suspense fallback={<LoadingView />}>
                      <Switch>
                        <Route
                          path={path + "invoices/"}
                          render={() => <InvoicesView />}
                        />
                        <Route
                          path={path + "incomes/"}
                          render={() => <IncomesView />}
                        />
                        <Route path={path} render={() => <WithdrawsView />} />
                      </Switch>
                    </Suspense>
                  </Box>
                </MasterColumn>
              </Row>
            </div>
          </Scrollable>
        </ScrollableColumn>
      </div>
    );
  }

  getTabsView() {
    let path = this.props.location.pathname;
    let basePath = `/dashboard/accounting/`;
    let activeWithdraws = !(
      path.endsWith("invoices/") || path.endsWith("incomes/")
    );
    return (
      <TabsContainerView className={"z-index-2 background-light"}>
        <ButtonView
          type={BUTTON_TYPE.LINK}
          className={`flat responsive-tab ${
            activeWithdraws ? "primary" : "gray"
          }`}
          title={Res.string.dashboard.accounting.withdraws}
          link={`${basePath}withdraws/`}
        />
        <ButtonView
          type={BUTTON_TYPE.LINK}
          className={`flat responsive-tab ${
            path.endsWith("invoices/") ? "primary" : "gray"
          }`}
          title={Res.string.dashboard.accounting.invoices}
          link={`${basePath}invoices/`}
        />
        <ButtonView
          type={BUTTON_TYPE.LINK}
          className={`flat responsive-tab ${
            path.endsWith("incomes/") ? "primary" : "gray"
          }`}
          title={Res.string.dashboard.accounting.incomes}
          link={`${basePath}incomes/`}
        />
      </TabsContainerView>
    );
  }
}

export default withRouter(AccountingPage);

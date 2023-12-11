import Invoice from "../stores/Invoice";
import RemoteStoreView from "../../../../base/RemoteStoreView";
import { withRouter } from "react-router";
import { connect } from "../../../../../stores/base/StoreManager";
import React from "react";
import Res from "../../../../../assets/Res";
import { getCredit } from "../../../../../utils/StringUtils";
import Wallet from "../stores/Wallet";
import ScrollableColumn from "../../../../base/refactored/scrollable/ScrollableColumn";
import Scrollable from "../../../../base/refactored/scrollable/Scrollable";
import Body from "../../../../base/Body";
import Page from "../../../../base/Page";
import Box from "../../../../base/refactored/box/Box";
import Row from "../../../../base/Row";
import MasterColumn from "../../../../base/MasterColumn";
import SlaveColumn from "../../../../base/SlaveColumn";
import Thumbnail from "../../../../base/refactored/thumbnail/Thumbnail";
import Column from "../../../../base/Column";
import Header from "../../../../base/refactored/header/Header";
import DashedItemView from "../../../../base/dashedItemView/DashedItemView";
import logo from "../../../../../assets/images/logo.png";
import DiscountCodeFormView from "./DiscountCodeFormView";
import enamaad from "../../../../../assets/images/enamaad.png";
import ButtonView from "../../../../base/forms/button/ButtonView";
import FooterView from "../../../home/views/footerView/FooterView";

class InvoicePaymentPage extends RemoteStoreView {
  static getRemoteStore(props) {
    let invoiceId = props.match.params.invoiceId;
    return Invoice.map(invoiceId, { invoiceId });
  }

  getOkView() {
    let discount = this.getData().available_discount;
    return (
      <ScrollableColumn>
        <Scrollable>
          <Page>
            <div className={"padding-two-before-after"}>
              <Row className={"centered"}>
                <SlaveColumn />
                <SlaveColumn className={"dominant"}>
                  <div className="box">
                    <Body>
                      <Row className={"padding-one"}>
                        <h2 className={"header-style"}>
                          {Res.string.dashboard.accounting.invoice_title}
                        </h2>
                      </Row>
                      <div className="padding-one">
                        <p className={" title"}>
                          {Res.get_attribute(this.getData(), "description")}
                        </p>
                      </div>

                      {discount ? null : (
                        <Column
                          className={"padding-two-before-after full-width"}
                        >
                          <DiscountCodeFormView invoiceId={this.getData().id} />
                        </Column>
                      )}
                      <div className={""}>
                        {discount ? (
                          <div>
                            <DashedItemView
                              title={
                                Res.string.dashboard.accounting.first_price
                              }
                              value={getCredit(this.getData().price)}
                              valueClassName={"line-through"}
                            />
                            <DashedItemView
                              title={Res.get_attribute(discount.type, "title")}
                              value={getCredit(
                                this.getData().discounted_amount
                              )}
                              valueClassName={"accent"}
                              className={"accent large bold"}
                            />{" "}
                            <DashedItemView
                              title={"پس از تخفیف"}
                              value={getCredit(this.getData().discounted_price)}
                              valueClassName={"accent"}
                              className={"accent large bold"}
                            />
                          </div>
                        ) : (
                          <DashedItemView
                            title={Res.string.dashboard.accounting.price}
                            value={getCredit(this.getData().price)}
                          />
                        )}
                        {this.getData().credit > 0 ? (
                          <DashedItemView
                            title={Res.string.dashboard.accounting.balance}
                            value={getCredit(this.getData().credit)}
                          />
                        ) : null}
                      </div>

                      <DashedItemView
                        title={Res.string.dashboard.accounting.to_pay_amount}
                        value={getCredit(this.getData().credit_shortage)}
                        className={"large"}
                        valueClassName={"accent "}
                      />

                      <Column className={"full-width centered"}>
                        <ButtonView id={this.getState().button.id} />

                        {/* <Row className={"centered"}>
                          <a
                            referrerpolicy="origin"
                            target="_blank"
                            href="https://trustseal.enamad.ir/?id=339895&amp;Code=YMW2GozPzD8FYIUCEPoG"
                          >
                            <img
                              referrerPolicy="origin"
                              src={enamaad}
                              alt="Enamaad"
                              style={{
                                cursor: "pointer",
                                width: "100px",
                                height: "100px",
                              }}
                              id="YMW2GozPzD8FYIUCEPoG"
                            />
                          </a>
                        </Row> */}
                      </Column>
                    </Body>
                  </div>
                </SlaveColumn>
                <SlaveColumn />
              </Row>
            </div>
          </Page>

          <FooterView />
        </Scrollable>
      </ScrollableColumn>
    );
  }
}

export default withRouter(connect(InvoicePaymentPage));

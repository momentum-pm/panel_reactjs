import RemoteStoreView from "../../../../base/RemoteStoreView";
import Charge from "../stores/Charge";
import { withRouter } from "react-router";
import { connect } from "../../../../../stores/base/StoreManager";
import ScrollableColumn from "../../../../base/refactored/scrollable/ScrollableColumn";
import Scrollable from "../../../../base/refactored/scrollable/Scrollable";
import HalfPageBox from "../../../../base/HalfPageBox";
import Header from "../../../../base/refactored/header/Header";
import Res from "../../../../../assets/Res";
import React from "react";
import TitleValueView from "../../../../base/titleValueView/TitleValueView";
import ButtonView from "../../../../base/forms/button/ButtonView";
import { getCredit } from "../../../../../utils/StringUtils";
import Row from "../../../../base/Row";
import MasterColumn from "../../../../base/MasterColumn";
import Box from "../../../../base/refactored/box/Box";
import Thumbnail from "../../../../base/refactored/thumbnail/Thumbnail";
import Column from "../../../../base/Column";
import TagView from "../../../../base/tag/TagView";

class ChargePage extends RemoteStoreView {
  static getRemoteStore(props) {
    let chargeId = props.match.params.chargeId;
    return Charge.map(chargeId, { chargeId });
  }

  getOkView() {
    return (
      <ScrollableColumn>
        <Scrollable>
          <div className="container">
            <Row>
              <MasterColumn />
              <MasterColumn>
                <Box>
                  <Header className={"center"}>
                    {Res.string.dashboard.accounting.charge_payment}
                  </Header>
                  <Column className={"centered full-width"}>
                    <Thumbnail
                      svg={
                        this.getData().done ? Res.icon.check : Res.icon.cross
                      }
                      className={`center large ${
                        this.getData().done ? "primary" : "danger"
                      }`}
                    />
					<TagView
                      title={
                        this.getData().done
                          ? Res.string.dashboard.accounting.charge_success
                          : Res.string.dashboard.accounting.charge_failure
                      }
                      className={`colored large ${
                        this.getData().done ? "primary" : "danger"
                      }`}
                    />
                  </Column>

                  <div className={"padding-two"}>
                    
                    <TitleValueView
                      title={Res.string.dashboard.accounting.charge_amount}
                      value={getCredit(this.getData().amount)}
                      className={"expanded margin-one"}
                    />

                    {this.getState().redirectButton ? (
                      <div className={"padding-one"}>
                        <ButtonView id={this.getState().redirectButton.id} />
                      </div>
                    ) : null}
                  </div>
                </Box>
              </MasterColumn>
              <MasterColumn />
            </Row>
          </div>
        </Scrollable>
      </ScrollableColumn>
    );
  }
}

export default withRouter(connect(ChargePage));

import Row from "../../../../base/Row";
import React from "react";
import Res from "../../../../../assets/Res";
import RemoteStoreView from "../../../../base/RemoteStoreView";
import Wallet from "../../accounting/stores/Wallet";
import {
  getCredit,
  getCreditCard,
  getSheba,
} from "../../../../../utils/StringUtils";
import { connect } from "../../../../../stores/base/StoreManager";
import MasterColumn from "../../../../base/MasterColumn";
import Column from "../../../../base/Column";
import Link from "../../../../base/Link";
import Thumbnail from "../../../../base/refactored/thumbnail/Thumbnail";

class ProfileWalletView extends RemoteStoreView {
  static getRemoteStore() {
    return Wallet.map();
  }

  getOkView() {
    return (
      <Link
        to={"/dashboard/accounting"}
        className={"box  padding-two-before-after dark clickable"}
      >
        <Column className={"centered full-height padding-two"}>
          <Row className={"centered full-width padding-"}>
    
            <MasterColumn className={"padding-two-sides"}>
              <p className={"title "}>
                {Res.string.dashboard.accounting.wallet_info}
              </p>
            </MasterColumn>
            <h3 className={"small title padding-two-sides "}>
              {getCredit(this.getData().balance)}
            </h3>
          </Row>
          <MasterColumn></MasterColumn>

          {/* <Row className={"reverse padding-two-sides full-width"}>
            {getCreditCard(this.getData().credit_card).map((part, index) => (
              <p className={" bold padding-half-sides"} key={index}>
                {part}
              </p>
            ))}
          </Row> */}
          {/* <Row className={"reverse padding-two-sides  full-width"}>
            {getSheba(this.getData().sheba).map((part, index) => (
              <p
                className={
                  "bold title inline-flex padding-half-sides padding-half-after"
                }
                key={index}
              >
                {part}
              </p>
            ))}
          </Row> */}
        </Column>
      </Link>
    );
  }
}

export default connect(ProfileWalletView);

import React from "react";
import Item from "../../../../../../base/refactored/item/Item";
import Row from "../../../../../../base/Row";
import Thumbnail from "../../../../../../base/refactored/thumbnail/Thumbnail";
import MasterColumn from "../../../../../../base/MasterColumn";
import ItemTitle from "../../../../../../base/refactored/itemTitle/ItemTitle";
import ItemInfo from "../../../../../../base/refactored/itemInfo/ItemInfo";
import ItemDescription from "../../../../../../base/refactored/itemDescription/ItemDescription";
import Res from "../../../../../../../assets/Res";
import { getYearAndMonth } from "../../../../../../../utils/DateUtils";
import PropTypes from "prop-types";

import medal_gold from "../../../../../../../assets/images/medal-gold.png";
import medal_silver from "../../../../../../../assets/images/medal-silver.png";
import medal_boronze from "../../../../../../../assets/images/medal-boronze.png";
import medal_coper from "../../../../../../../assets/images/medal-coper.png";
export default class CompactCertificateView extends React.Component {
  render() {
    return (
      <Row className={'centered'}>
        {this.getThumbnailView()}
        {this.getContentView()}
      </Row>
    );
  }

  
  getThumbnailView() {
    let medal;
    switch (this.props.certificate.rank) {
      case 1:
        medal = medal_gold;
        break;
      case 2:
        medal = medal_silver;
        break;
      case 3:
        medal = medal_boronze;
        break;
      case 4:
        medal = medal_coper;
        break;
      default:
        break;
    }
    return (
      <Thumbnail
        src={medal}
        className={"round small"}
        alt={`the logo of ${this.props.certificate.organization.name}`}
        placeholder={this.props.certificate.organization.type.icon}
      />
    );
  }
  getContentView() {
    return (
      <MasterColumn className={"margin-one"}>
        <ItemTitle>{this.props.certificate.title}</ItemTitle>
          <ItemDescription>
            {this.props.certificate.organization.name}
          </ItemDescription>
      </MasterColumn>
    );
  }
}
CompactCertificateView.propTypes = {
  certificate: PropTypes.object.isRequired,
};

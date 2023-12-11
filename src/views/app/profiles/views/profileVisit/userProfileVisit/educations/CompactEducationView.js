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
import RichText from "../../../../../../base/richText/RichText";
import organization from "../../../../../../../assets/images/organization.svg";

export default class CompactEducationView extends React.Component {
  render() {
    return (
      <Row className={'centered'}>
        {this.getThumbnailView()}
        {this.getContentView()}
      </Row>
    );
  }

  getThumbnailView() {
    return (
      <Thumbnail
        className={"round small"}
        src={this.props.education.organization.logo || organization}
        alt={`the logo of ${this.props.education.organization.name}`}
        placeholder={organization}
      />
    );
  }

  getContentView() {
    return (
      <MasterColumn className={"margin-one"}>
        <ItemTitle>{this.props.education.organization.name}</ItemTitle>
          <ItemDescription>
            {Res.get_attribute(this.props.education.major, "title")}
          </ItemDescription>
      </MasterColumn>
    );
  }
}
CompactEducationView.propTypes = {
  education: PropTypes.object.isRequired,
};

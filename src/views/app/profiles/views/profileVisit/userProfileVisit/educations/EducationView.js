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
import ButtonView from "../../../../../../base/forms/button/ButtonView";
import { BUTTON_TYPE } from "../../../../../../../stores/base/form/buttons/Button";

export default class EducationView extends React.Component {
  render() {
    return (
      <div className="inline-hlf-row-responsive bordered-box">
        <div className="row padding-one">
          {this.getThumbnailView()}
          {this.getContentView()}
        </div>
      </div>
    );
  }

  getThumbnailView() {
    return (
      <Thumbnail
        src={this.props.education.organization.logo || organization}
        alt={`the logo of ${this.props.education.organization.name}`}
        placeholder={this.props.education.organization.type.icon}
      />
    );
  }

  getContentView() {
    return (
      <MasterColumn className={"margin-one"}>
        <Row className={"centered underline-text"}>
          <ItemTitle>{this.props.education.organization.name}</ItemTitle>
          {this.props.education.organization.website ? (
            <ButtonView
              type={BUTTON_TYPE.EXTERNAL_LINK}
              link={this.props.education.organization.website}
              className="hyperlink flat small hyper-link"
              icon={Res.icon.hyperlink}
              title={"مشاهده"}
            />
          ) : null}
        </Row>

        <Row>
          <ItemInfo>
            {Res.get_attribute(this.props.education.stage, "title")}
          </ItemInfo>
          <ItemDescription>
            (
            {this.props.education.graduated
              ? Res.string.profiles.educations.graduated
              : Res.string.profiles.educations.under_graduate}
            )
          </ItemDescription>
        </Row>
        <Row>
          <ItemInfo>
            {Res.get_attribute(this.props.education.major, "title")}
          </ItemInfo>
          <ItemDescription>
            (
            {`${Res.string.profiles.educations.entered_at} ${getYearAndMonth(
              this.props.education.start
            )}`}
            )
          </ItemDescription>
        </Row>
        <RichText className={"desktop-only"}>{this.props.education.about}</RichText>
      </MasterColumn>
    );
  }
}
EducationView.propTypes = {
  education: PropTypes.object.isRequired,
};

import React from "react";
import Item from "../../../../../../base/refactored/item/Item";
import Row from "../../../../../../base/Row";
import Thumbnail from "../../../../../../base/refactored/thumbnail/Thumbnail";
import MasterColumn from "../../../../../../base/MasterColumn";
import ItemTitle from "../../../../../../base/refactored/itemTitle/ItemTitle";
import ItemInfo from "../../../../../../base/refactored/itemInfo/ItemInfo";
import ItemDescription from "../../../../../../base/refactored/itemDescription/ItemDescription";
import PropTypes from "prop-types";
import RichText from "../../../../../../base/richText/RichText";
import Res from "../../../../../../../assets/Res";
import { GregorianCalendar } from "../../../../../../../utils/CalendarUtils";
import organization from "../../../../../../../assets/images/organization.svg";
import Body from "../../../../../../base/Body";
import ButtonView from "../../../../../../base/forms/button/ButtonView";
import { BUTTON_TYPE } from "../../../../../../../stores/base/form/buttons/Button";
export default class ExperienceView extends React.Component {
  render() {
    return (
      <div className="bordered-box full-width">
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
        src={this.props.experience.organization.logo || organization}
        alt={`the logo of ${this.props.experience.organization.name}`}
        placeholder={this.props.experience.organization.type.icon}
      />
    );
  }

  getContentView() {
    return (
      <MasterColumn className={"margin-one"}>
        <Row className={"centered"}>
          <ItemTitle>{this.props.experience.organization.name}</ItemTitle>

          <ItemDescription>({this.props.experience.duration})</ItemDescription>
          {this.props.experience.organization.website ? (
            <ButtonView
              type={BUTTON_TYPE.EXTERNAL_LINK}
              link={this.props.experience.organization.website}
              className="hyperlink flat small hyper-link"
              icon={Res.icon.hyperlink}
              title={"مشاهده"}
            />
          ) : null}
        </Row>
        <ItemInfo>{this.props.experience.title}</ItemInfo>
        <ItemDescription>
          {`${Res.string.from} ${Res.getCalendar().getYearMonthString(
            GregorianCalendar.toCalendar(
              this.props.experience.start,
              Res.getCalendar()
            )
          )}`}
          {this.props.experience.end
            ? ` ${Res.string.to} ${Res.getCalendar().getYearMonthString(
                GregorianCalendar.toCalendar(
                  this.props.experience.end,
                  Res.getCalendar()
                )
              )}`
            : ` ${Res.string.until_now}`}
        </ItemDescription>
        <RichText className={"desktop-only"}>
          {this.props.experience.about}
        </RichText>
      </MasterColumn>
    );
  }
}
ExperienceView.propTypes = {
  experience: PropTypes.object.isRequired,
};

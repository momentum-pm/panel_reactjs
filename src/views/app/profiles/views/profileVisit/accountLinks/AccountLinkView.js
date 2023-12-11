import React from "react";
import PropTypes from "prop-types";
import Res from "../../../../../../assets/Res";
import ButtonView from "../../../../../base/forms/button/ButtonView";
import { BUTTON_TYPE } from "../../../../../../stores/base/form/buttons/Button";

export default class AccountLinkView extends React.Component {
  render() {
    return (
      <ButtonView
        type={BUTTON_TYPE.EXTERNAL_LINK}
        link={this.props.accountLink.link}
        icon={this.getIcon()}
        title={
          Res.string.on +
          " " +
          Res.get_attribute(this.props.accountLink.website, "title")
        }
        className={"flat primary"}
      />
    );
  }

  getIcon() {
    switch (this.props.accountLink.website.title_en) {
      case "Instagram":
        return Res.icon.instagram;
      case "WhatsApp":
        return Res.icon.whatsapp;
      case "Linked-in":
        return Res.icon.linkedin;
      case "Telegram":
        return Res.icon.telegram;
      case "Twitter":
        return Res.icon.twitter;
      default:
        return Res.icon.hyperlink;
    }
  }
}

AccountLinkView.propTypes = {
  accountLink: PropTypes.object.isRequired,
};

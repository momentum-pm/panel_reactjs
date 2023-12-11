import React from "react";
import Item from "../../../../../../base/refactored/item/Item";
import Row from "../../../../../../base/Row";
import ButtonView from "../../../../../../base/forms/button/ButtonView";
import CertificateView from "../../../profileVisit/userProfileVisit/certificates/CertificateView";

export default class CertificateEditView extends CertificateView {
	render() {
		return (
			<Item>
				<Row>
					{this.getThumbnailView()}
					{this.getContentView()}
					<ButtonView id={this.props.certificate.editButton.id}/>
				</Row>
			</Item>
		)
	}
}

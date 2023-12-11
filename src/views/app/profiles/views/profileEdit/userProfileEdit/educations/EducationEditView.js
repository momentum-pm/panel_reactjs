import React from "react";
import Item from "../../../../../../base/refactored/item/Item";
import Row from "../../../../../../base/Row";
import ButtonView from "../../../../../../base/forms/button/ButtonView";
import EducationView from "../../../profileVisit/userProfileVisit/educations/EducationView";

export default class EducationEditView extends EducationView {
	render() {
		return (
			<Item>
				<Row>
					{this.getThumbnailView()}
					{this.getContentView()}
					<ButtonView id={this.props.education.editButton.id}/>
				</Row>
			</Item>
		)
	}
}

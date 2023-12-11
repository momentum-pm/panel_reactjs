import React from "react";
import Item from "../../../../../../base/refactored/item/Item";
import Row from "../../../../../../base/Row";
import ButtonView from "../../../../../../base/forms/button/ButtonView";
import ExperienceView from "../../../profileVisit/userProfileVisit/experiences/ExperienceView";

export default class ExperienceEditView extends ExperienceView {
	render() {
		return (
			<Item>
				<Row>
					{this.getThumbnailView()}
					{this.getContentView()}
					<ButtonView id={this.props.experience.editButton.id}/>
				</Row>
			</Item>
		)
	}
}

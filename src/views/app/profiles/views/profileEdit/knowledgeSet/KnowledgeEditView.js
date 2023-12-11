import React from "react";
import FormView from "../../../../../base/forms/FormView";
import KnowledgeEditForm from "../../../stores/knowledges/KnowledgeEditForm";
import {connect} from "../../../../../../stores/base/StoreManager";
import "./KnowledgeEditView.scss"
import ButtonView from "../../../../../base/forms/button/ButtonView";
import MasterColumn from "../../../../../base/MasterColumn";
import Row from "../../../../../base/Row";

class KnowledgeEditView extends FormView {
	static getForm(props) {
		let knowledgeId = props.knowledge.id;
		let profileId = props.knowledge.profileId;
		return KnowledgeEditForm.map(knowledgeId, {knowledgeId, profileId});
	}

	render() {
		return (
			<form className={'knowledge-edit-view-item'}>
				<Row className={'centered knowledge-edit-view-content'}>
					<MasterColumn>
						{this.getFieldsView()}
					</MasterColumn>
					<ButtonView id={this.getState().deleteButton.id}/>
				</Row>
				{this.getState().loading ? <div className={'knowledge-edit-view-loading'}/> : null}

			</form>
		);
	}
}

export default connect(KnowledgeEditView);

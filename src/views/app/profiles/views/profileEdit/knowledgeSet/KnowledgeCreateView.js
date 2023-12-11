import {connect} from "../../../../../../stores/base/StoreManager";
import KnowledgeCreateForm from "../../../stores/knowledges/KnowledgeCreateForm";
import Row from "../../../../../base/Row";
import MasterColumn from "../../../../../base/MasterColumn";
import React from "react";
import FormView from "../../../../../base/forms/FormView";


class KnowledgeCreateView extends FormView {
	static getForm(props) {
		let skill = props.store.skill;
		let profileId = props.store.profileId;
		return KnowledgeCreateForm.map(skill, {skill, profileId});
	}

	render() {
		return (
			<form className={'knowledge-edit-view-item'}>
				<Row className={'centered knowledge-edit-view-content'}>
					<MasterColumn>
						{this.getFieldsView()}
					</MasterColumn>
				</Row>
				{this.getState().loading ? <div className={'knowledge-edit-view-loading'}/> : null}

			</form>
		);
	}

}

export default connect(KnowledgeCreateView);

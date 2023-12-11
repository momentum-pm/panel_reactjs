import React from "react";
import CharFieldView from "./fields/charFieldView/CharFieldView";
import SearchFieldView from "./fields/searchFieldView/SearchFieldView";
import StoreView from "../StoreView";
import {FIELD_TYPE} from "../../../stores/base/form/fields/Field";
import ButtonView from "./button/ButtonView";
import AutoCompleteFieldView from "./fields/autoCompleteFieldView/AutoCompleteFieldView";
import TextFieldView from "./fields/textFieldView/TextFieldView";
import SelectFieldView from "./fields/selectFieldView/SelectFieldView";
import RemoteSelectFieldView from "./fields/remoteSelectFieldView/RemoteSelectFieldView";
import HiddenFieldView from "./fields/hiddenFieldView/HiddenFieldView";
import ImageFieldView from "./fields/imageFieldView/ImageFieldView";
import URLFieldView from "./fields/urlFieldView/URLFieldView";
import BulletFieldView from "./fields/bulletFieldView/BulletFieldView";
import RemoteBulletFieldView from "./fields/remoteBulletFieldView/RemoteBulletFieldView";
import TagSearcherFieldView from "./fields/tagSearcherFieldView/TagSearcherFieldView";
import FileFieldView from "./fields/fileFieldView/FileFieldView";
import MultiSelectFieldView from "./fields/multiSelectFieldView/MultiSelectFieldView";
import Row from "../Row";
import SwitchFieldView from "./fields/switchFieldView/SwitchFieldView";
import BooleanFieldView from "./fields/booleanFieldView/BooleanFieldView";
import RemoteMultiSelectFieldView from "./fields/remoteMultiSelectFieldView/RemoteMultiSelectFieldView";
import ProfilePictureFieldView from "./fields/profilePictureFieldView/ProfilePictureFieldView";
import DateFieldView from "./fields/dateField/DateFieldView";
import StepView from "./fields/stepView/StepView";
import FixedDayDateFieldView from "./fields/fixedDayDateFieldView/FixedDayDateFieldView";
import {GroupedMultiSelectFieldView} from "./fields/groupedMultiSelectFieldView/GroupedMultiSelectFieldView";
import RemoteGroupedMultiSelectFieldView
	from "./fields/remoteGroupedMultiSelectFieldView/RemoteGroupedMultiSelectFieldView";
import "./fields/FormView.scss"
import MultiFileFieldView from "./fields/multiFileFieldView/MultiFileFieldView";
import ScoreFieldView from "./fields/scoreFieldView/ScoreFieldView";
import RichTextFieldView from "./fields/richTextFieldView/RichTextFieldView";
import MessageStepView from "./fields/messageStepView/MessageStepView";

export default class FormView extends StoreView {
	static getForm(props) {

	}

	static mapPropsToStores(props) {
		return {
			form: this.getForm(props),
		};
	}

	constructor(props) {
		super(props);
		this.getForm = this.getForm.bind(this);
		this.getState = this.getState.bind(this);
		this.mapFieldToView = this.mapFieldToView.bind(this);
		this.fieldRefs = {};
		this.scrollableRef = React.createRef();

	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.getState().shouldScrollToFirstField) {
			this.getForm().scrolledToFirstErrorField();
			let firstErrorField = this.getForm().getFirstErrorField();
			let field_type = firstErrorField.name;
			let field_id = firstErrorField.id;
			let field_key = field_type + field_id;
			let ref = this.fieldRefs[field_key];
			ref.current.scrollInto();
			// this.scrollableRef.current.scrollTo(0, ref.current.top);
		}
	}

	getForm() {
		return this.props.form;
	}

	getState() {
		return this.getForm().state;
	}

	render() {
		return <form className={this.getFormClass()}>
			{this.getTitleView()}
			{this.getHintView()}
			{this.getFieldsView()}
			{this.getButtonsView()}
		</form>
	}


	getTitleView() {
		let state = this.getState();
		if (state.title) {
			return <h3 className={this.getHeaderClass()}>{state.title}</h3>;
		}
	}

	getHintView() {
		return null;
	}

	getFieldsView() {
		let state = this.getState();
		return <div className={this.getFieldsClassName()}>
			{state.fields.map(this.mapFieldToView)}
		</div>;
	}

	getButtonsView() {
		let state = this.getState();
		return <Row className={this.getButtonsClass()}>
			{state.buttons.map(this.map_button_to_view)}
		</Row>;
	}

	getFormClass() {
		return '';
	}

	getHeaderClass() {
		return 'form-title';
	}

	getFieldsClassName() {
		return 'row';
	}

	getButtonsClass() {
		return 'reverse padding-one';
	}


	mapFieldToView(field) {
		let field_type = field.name;
		let field_id = field.id;
		let field_key = field_type + field_id;
		if (!this.fieldRefs[field_key]) {
			this.fieldRefs[field_key] = React.createRef();
		}
		let props = {
			fieldRef: this.fieldRefs[field_key],
			key: field_key,
			id: field_id,
		};
		switch (field_type) {
			case FIELD_TYPE.STEP:
				return <div className={'full-width'} ref={this.fieldRefs[field_key]}><StepView {...props}/></div>;
			case FIELD_TYPE.CHAR:
				return <CharFieldView ref={this.fieldRefs[field_key]} {...props}/>;
			case FIELD_TYPE.SEARCH:
				return <SearchFieldView ref={this.fieldRefs[field_key]} {...props}/>;
			case FIELD_TYPE.TEXT:
				return <TextFieldView ref={this.fieldRefs[field_key]}{...props}/>;
			case FIELD_TYPE.RICH_TEXT:
				return <RichTextFieldView ref={this.fieldRefs[field_key]}{...props}/>;
			case FIELD_TYPE.SELECT:
				return <SelectFieldView ref={this.fieldRefs[field_key]}{...props}/>;
			case FIELD_TYPE.REMOTE_SELECT:
				return <RemoteSelectFieldView ref={this.fieldRefs[field_key]}{...props}/>;
			case FIELD_TYPE.MULTI_SELECT:
				return <MultiSelectFieldView ref={this.fieldRefs[field_key]}{...props}/>;
			case FIELD_TYPE.REMOTE_MULTI_SELECT:
				return <RemoteMultiSelectFieldView ref={this.fieldRefs[field_key]}{...props}/>;
			case FIELD_TYPE.BULLET:
				return <BulletFieldView ref={this.fieldRefs[field_key]} {...props}/>;
			case FIELD_TYPE.REMOTE_BULLET:
				return <RemoteBulletFieldView ref={this.fieldRefs[field_key]} {...props}/>;
			case FIELD_TYPE.HIDDEN:
				return <HiddenFieldView ref={this.fieldRefs[field_key]}{...props}/>;
			case FIELD_TYPE.FILE:
				return <FileFieldView ref={this.fieldRefs[field_key]}{...props}/>;
			case FIELD_TYPE.IMAGE:
				return <ImageFieldView ref={this.fieldRefs[field_key]}{...props}/>;
			case FIELD_TYPE.PROFILE_PICTURE:
				return <ProfilePictureFieldView ref={this.fieldRefs[field_key]}{...props}/>;
			case FIELD_TYPE.AUTO_COMPLETE:
				return <AutoCompleteFieldView ref={this.fieldRefs[field_key]}{...props}/>;
			case FIELD_TYPE.DATE_FIELD:
				return <DateFieldView ref={this.fieldRefs[field_key]}{...props}/>;
			case FIELD_TYPE.FIXED_DAY_DATE_FIELD:
				return <FixedDayDateFieldView ref={this.fieldRefs[field_key]}{...props}/>;
			case FIELD_TYPE.TAG_SEARCHER:
				return <TagSearcherFieldView ref={this.fieldRefs[field_key]}{...props}/>;
			case FIELD_TYPE.SWITCH:
				return <SwitchFieldView ref={this.fieldRefs[field_key]}{...props}/>;
			case FIELD_TYPE.BOOLEAN:
				return <BooleanFieldView ref={this.fieldRefs[field_key]}{...props}/>;
			case FIELD_TYPE.URL:
				return <URLFieldView ref={this.fieldRefs[field_key]}{...props}/>;
			case FIELD_TYPE.GROUPED_MULTI_SELECT:
				return <GroupedMultiSelectFieldView ref={this.fieldRefs[field_key]}{...props}/>;
			case FIELD_TYPE.REMOTE_GROUPED_MULTI_SELECT:
				return <RemoteGroupedMultiSelectFieldView ref={this.fieldRefs[field_key]}{...props}/>;
			case FIELD_TYPE.MULTI_FILE_FIELD:
				return <MultiFileFieldView ref={this.fieldRefs[field_key]}{...props}/>;
			case FIELD_TYPE.SCORE:
				return <ScoreFieldView ref={this.fieldRefs[field_key]} {...props}/>;
			case FIELD_TYPE.MESSAGE_STEP:
				return <MessageStepView ref={this.fieldRefs[field_key]} {...props}/>;
			default:
				return field.render(props);

			// throw Error('invalid field type');
		}
	}

	map_button_to_view(button) {
		return <ButtonView key={button.id} id={button.id}/>;
	}

}

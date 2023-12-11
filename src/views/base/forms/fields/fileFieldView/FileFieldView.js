import React from "react";
import FieldView from "../FieldView";
import PropTypes from "prop-types";
import "./FileFieldView.scss";
import Res from "../../../../../assets/Res";
import {connect} from "../../../../../stores/base/StoreManager";
import FileField from "../../../../../stores/base/form/fields/FileField";
import FileIconView from "../../../fileIconView/FileIconView";
import Column from "../../../Column";

class FileFieldView extends FieldView {
	static getField(props) {
		return FileField.map(props.id);
	}

	constructor(props) {
		super(props);
		this.get_set_null_view = this.get_set_null_view.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	render() {
		let state = this.getState();
		return <div
			ref={this.props.fieldRef}
			className={`field ${state.className} ${this.hasError() ? 'danger' : ''} ${state.error ? '' : 'filled'}`}>
			{this.getState().label ?
				<div className={'padding-one'}>
					{this.getLabelView()}
				</div>
				: null}

			{this.getInputView()}

		</div>
	}

	getInputView() {
		let state = this.getState();
		return <div>
			<div className={`file-field-view-input-container`}>
				{this.getContentView()}
				<input className="file-field-view-input" value={""} type="file"
					   name={state.name}
					   onChange={this.onChange}/>
			</div>
			{this.get_set_null_view()}

		</div>

	}

	getContentView() {
		let state = this.getState();
		if (state.file) {
			return (
				<Column className={'centered'}>
					<FileIconView fileAddress={state.file.name}/>
				</Column>)
		} else if (state.value) {
			return (
				<Column className={'centered'}>
					<FileIconView fileAddress={state.value}/>
				</Column>)
		}
		return (
			<div className={'file-field-view-content'}>
				{state.loading ? Res.icon.loading : Res.icon.fileUpload}
				<p className={'file-field-view-text'}>{state.loading ? Res.string.uploading : state.placeholder}</p>
			</div>
		);

	}

	get_set_null_view() {
		let state = this.getState();
		if (state.value) {
			return <p onClick={this.getField().removeFile}
					  className={'file-field-view-remove'}>({Res.string.remove_file})</p>
		}
	}

	onChange(event) {
		let file;
		if (event.target.files && event.target.files.length > 0) {
			file = event.target.files[0];
		}
		this.getField().setFile(file);
	}

}

FileFieldView.propTypes = {
	id: PropTypes.number.isRequired,
};
export default connect(FileFieldView);

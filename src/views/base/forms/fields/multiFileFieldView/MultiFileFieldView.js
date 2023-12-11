import React from "react";
import FieldView from "../FieldView";
import PropTypes from "prop-types";
import "./MultiFileFieldView.scss";
import {connect} from "../../../../../stores/base/StoreManager";
import Row from "../../../Row";
import MultiFileField from "../../../../../stores/base/form/fields/MultiFileField";
import Res from "../../../../../assets/Res";
import ripple_loading from "../../../../../assets/images/ripple_loading.svg";
import FileIconView from "../../../fileIconView/FileIconView";

class MultiFileFieldView extends FieldView {
	static getField(props) {
		return MultiFileField.map(props.id);
	}

	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
	}

	render() {
		let state = this.getState();
		return <div
			ref={this.props.fieldRef}
			className={`field ${state.className} padding-one-before-after multi-file-view-main ${this.hasError() ? 'danger' : ''} ${state.error ? '' : 'filled'}`}>
			{this.getInputView()}
		</div>
	}

	getInputView() {
		let state = this.getState();
		return <Row className={'padding-one centered'}>
			{this.getUploadView()}
			{state.value.map((file, index) => {
				return (
					<div className={'multi-file-item-container'} key={file}
						 onClick={() => this.getField().removeFile(index)}>
						<FileIconView fileAddress={file}/>
						<p className={'multi-file-remove'}>({Res.string.remove_file})</p>
					</div>
				);
			})}
			{state.uploadingFiles.map((file, index) => {
				return (
					<div className={'multi-file-loading-container'} key={file.name}>
						<FileIconView fileAddress={file.name}/>
						{Res.icon.ripple_loading}
						{/*<img className={'icon-root loading-icon'}*/}
						{/*	 src={ripple_loading}*/}
						{/*	 alt={Res.string.uploading}/>*/}
						<p className={'multi-file-remove'}
						   onClick={() => this.getField().cancelUploading(index)}>({Res.string.cancel_uploading})</p>
					</div>
				);
			})}
		</Row>
	}

	getUploadView() {
		let state = this.getState();
		if (state.loading) {
			return this.getLoadingView();
		} else {
			return this.getFieldView();
		}
	}

	getLoadingView() {
		return (
			<div className={`multi-file-field-input-container`}>
				<div className={'multi-file-field-input-content'}>
					<img className={'icon-root'}
						 src={ripple_loading}
						 alt={Res.string.uploading}/>
					<p>{Res.string.uploading}</p>
				</div>
			</div>
		);
	}

	getFieldView() {
		let state = this.getState();
		return (
			<div className={`multi-file-field-input-container`}>
				<div className={'multi-file-field-input-content'}>
					{Res.icon.fileUpload}
					<p>{state.placeholder}</p>
				</div>
				<input className="multi-file-field-input" value={""} type="file"
					   multiple
					   name={state.name}
					   onChange={this.onChange}/>
			</div>
		);
	}

	onChange(event) {
		let files;
		if (event.target.files && event.target.files.length > 0) {
			files = event.target.files;
		}
		this.getField().addFiles(files);
	}

}

MultiFileFieldView.propTypes = {
	id: PropTypes.number.isRequired,
};
export default connect(MultiFileFieldView);

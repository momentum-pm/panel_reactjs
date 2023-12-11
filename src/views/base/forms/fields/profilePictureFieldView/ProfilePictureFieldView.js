import {connect} from "../../../../../stores/base/StoreManager";
import ProfilePictureField from "../../../../../stores/base/form/fields/ProfilePictureField";
import {ImageFieldView} from "../imageFieldView/ImageFieldView";
import "./ProfilePictureFieldView.scss";
import Res from "../../../../../assets/Res";
import React from "react";
import user from "../../../../../assets/images/user.svg";
import ripple_loading from "../../../../../assets/images/ripple_loading.svg";
import Row from "../../../Row";
import Column from "../../../Column";

class ProfilePictureFieldView extends ImageFieldView {
	static getField(props) {
		return ProfilePictureField.map(props.id);
	}

	render() {
		let state = this.getState();
		return <div className={`${state.className} profile-picture-field-view`} ref={this.props.fieldRef}>
			<Column className={'centered'}>
				<Row className={`centered profile-picture-content`}>
					{state.loading ?
						<div className={'profile-picture-uploading-view'}>
							<img className={'icon-root'}
								 src={ripple_loading}
								 alt={Res.string.uploading}/>
						</div>
						: <div className={`profile-picture-field-view-image-container`}>
							{this.get_image_view()}
							{this.getUploadView()}
							<input className="profile-picture-field-view-input" value={""} type="file" accept="image/*"
								   name={state.name}
								   onChange={this.onChange}/>
							{this.getSetNullView()}

						</div>}
					<div className={'padding-one'}>
						<p className={'subtitle'}>{}</p>
					</div>
				</Row>
			</Column>
		</div>
	}

	// getLabelView() {
	// 	let state = this.getState();
	// 	if (state.label) {
	// 		if (state.showLabelDetails) {
	// 			return <div>
	// 				<p>
	// 					{state.label}
	// 					{state.required ? <b className={'primary'}>*</b> : ` (${R.string.optional})`}
	// 				</p>
	// 				<p className={'subtitle'}>{R.string.drop_or_click}</p>
	// 			</div>
	// 		} else {
	// 			return <div>
	// 				<p>{state.label}</p>
	// 				<p className={'subtitle'}>{R.string.drop_or_click}</p>
	// 			</div>
	// 		}
	//
	// 	}
	// 	return <p>{this.getState().label}</p>
	// }

	getUploadView() {
		let state = this.getState();
		if (!state.value) {
			return <div className={'profile-picture-upload-view'}>{Res.icon.photoUpload}</div>
		}
	}


	get_image_view() {
		let state = this.getState();
		if (state.value) {
			return <img src={state.value} className={'profile-picture-field-view-image'} alt={'current file'}/>;
		} else {
			return <img className={'profile-picture-field-view-image'} src={state.placeholder || user}
						alt={'placeholder'}/>;
		}
	}

	getSetNullView() {
		let state = this.getState();
		if (state.value) {
			return <div onClick={this.getField().removeFile}
						className={'profile-picture-remove-view'}>{Res.icon.cross}</div>
		}
	}

}

export default connect(ProfilePictureFieldView);

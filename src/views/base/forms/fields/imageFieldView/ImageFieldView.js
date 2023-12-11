import React from "react";
import FieldView from "../FieldView";
import PropTypes from "prop-types";
import "./ImageFieldView.scss";
import Res from "../../../../../assets/Res";
import {connect} from "../../../../../stores/base/StoreManager";
import ImageField from "../../../../../stores/base/form/fields/ImageField";

export class ImageFieldView extends FieldView {
	static getField(props) {
		return ImageField.map(props.id);
	}

	constructor(props) {
		super(props);
		this.get_image_view = this.get_image_view.bind(this);
		this.get_set_null_view = this.get_set_null_view.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	render() {
		let state = this.getState();
		return <div className={state.className} ref={this.props.fieldRef}>
			<div className={'nnn-field'}>
				<div className={`image-field-view image-field-view-${state.ratio}`}>
					<div className={`image-field-view-image-container`}>
						{this.get_image_view()}
						<input className="image-field-view-input" value={""} type="file" accept="image/*"
							   name={state.name}
							   onChange={this.onChange}/>
					</div>
					<div className={'image-field-view-content'}>
						<p className={'subtitle'}>{state.placeholder}</p>
						{this.get_set_null_view()}
					</div>
				</div>
			</div>
		</div>
	}


	get_image_view() {
		let state = this.getState();
		if (state.value) {
			return <img src={state.value} className={'image-field-view-image'} alt={'current file'}/>;
		} else {
			return <div className={'image-field-view-image'}>
			</div>
		}
	}

	get_set_null_view() {
		let state = this.getState();
		if (state.value) {
			return <p onClick={this.getField().removeFile}
					  className={'image-field-view-remove'}>({Res.string.remove_image})</p>
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

ImageFieldView.propTypes = {
	id: PropTypes.number.isRequired,
};
export default connect(ImageFieldView);

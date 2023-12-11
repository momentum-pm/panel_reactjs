import React from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import "./RichTextFieldView.scss";
import FieldView from "../FieldView";
import RichTextField from "../../../../../stores/base/form/fields/RichTextField";
import PropTypes from "prop-types";
import {connect} from "../../../../../stores/base/StoreManager";

class RickTextFieldView extends FieldView {
	static getField(props) {
		return RichTextField.map(props.id);
	}

	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.state = {initialized: false};
		this.quilRef = React.createRef();
	}

	componentDidMount() {
		if (this.quilRef.current) {
			if (!this.state.initialized && !this.getState().value) {
				this.onChange("<p class=\"ql-direction-rtl ql-align-right\"><br/></p>", true);
				this.setState({initialized: true});
			}

		}
	}

	getInputView() {
		let className = 'rich text rich-text-field-view';
		let modules = {
			toolbar: [
				[{header: 1}, {header: 2}],
				['bold', 'italic', 'underline'],
				[{list: 'ordered'}, {list: 'bullet'}],
				[{direction: 'rtl'}],
				[{align: []}],
				['link'],
			],
		};
		if (this.getState().minimalToolbar) {
			className += ' minimal-toolbar';
			modules.toolbar = [
				['bold', 'italic', 'underline'],
				[{list: 'ordered'}, {list: 'bullet'}],
				[{direction: 'rtl'}],
				[{align: []}],
			]
		}
		if (this.getState().fullToolbar) {
			modules.toolbar.push([{header: [1, 2, 3, 4, 5, false]}]);
		}
		return (
			<div className={className}>
				<ReactQuill value={this.getState().value || ''} ref={this.quilRef} modules={modules}
							onChange={(value) => this.onChange(value, false)}
							placeholder={this.getState().placeholder}/>
			</div>
		)
	}

	onChange(value, silently) {
		if (this.quilRef.current){
			this.getField().setValue(value, silently, this.quilRef.current.getEditor().getText());
		}
	}

}

RickTextFieldView.propTypes = {
	id: PropTypes.number.isRequired,
};

export default connect(RickTextFieldView);

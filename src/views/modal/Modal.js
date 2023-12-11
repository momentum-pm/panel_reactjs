import "./ModalRouter.scss";
import React, {Component} from "react";
import PropTypes from "prop-types";

class Modal extends Component {
    render() {
        return <div className="modal">
            <div className="header">
                <div className="title center">{this.props.title}</div>
            </div>
            <div className="body">
                {this.props.body}
            </div>
        </div>
    }

}

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.any.isRequired,
    options: PropTypes.array.isRequired,
};
export default Modal;



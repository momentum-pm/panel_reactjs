import React from "react";
import "./ButtonView.scss";
import Link from "../../Link";
import StoreView from "../../StoreView";
import Button, {BUTTON_TYPE} from "../../../../stores/base/form/buttons/Button";
import PropTypes from "prop-types";
import {connect} from "../../../../stores/base/StoreManager";
import Res from "../../../../assets/Res";
import {normalizeNumber} from "../../../../utils/StringUtils";

class ButtonView extends StoreView {
	static mapPropsToStores(props) {
		if (props.id !== undefined) {
			return {
				hasStore: true,
				button: Button.map(props.id)
			};
		} else {
			if (props.active === undefined) {
				props.active = true;
			}

			if (props.loading === undefined) {
				props.loading = false;
			}
			return {
				hasStore: false,
				...props,
			}
		}
	}

	constructor(props) {
		super(props);
		this.getState = this.getState.bind(this);
		this.get_content_view = this.get_content_view.bind(this);
		this.onClick = this.onClick.bind(this);

	}

	getState() {
		if (this.props.hasStore) {
			return this.props.button.state;
		} else {
			return this.props;
		}
	}

	render() {
		let state = this.getState();
		let className = `button-view ${state.className} ${!state.active ? 'button-view-disabled' : ''}  ${state.loading ? 'button-view-loading ' : ''}`;
		if (!state.title) {
			className += 'icon';
		}
		if (state.about) {
			className += ' has-about'
		}
		switch (state.type) {
			case BUTTON_TYPE.EXTERNAL_LINK:
				return (<a className={className}
						   onMouseOver={() => this.setState({hovered: true})}
						   onMouseLeave={() => this.setState({hovered: false})}
						   href={state.link} target="_blank"
						   rel="noopener noreferrer">
					{this.get_content_view()}
					{state.about && state.active ? <div className={'about-data'} data-title={state.about}/> : null}
				</a>);
			case BUTTON_TYPE.LINK:
				return <Link className={className}
							 onMouseOver={() => this.setState({hovered: true})}
							 onMouseLeave={() => this.setState({hovered: false})}
							 to={state.link}>
					{this.get_content_view()}
					{state.about && state.active ? <div className={'about-data'} data-title={state.about}/> : null}
				</Link>;
			case BUTTON_TYPE.BUTTON:
			case BUTTON_TYPE.SUBMIT:
				return <div className={className}>
					{this.get_content_view()}
					{state.about && state.active ? <div className={'about-data'} data-title={state.about}/> : null}
					<input name={state.name}
						   type={state.type}
						   onMouseOver={() => {
							   this.setState({hovered: true});
							   if (state.onHover) {
								   state.onHover(this.props.button)
							   }
						   }}
						   onMouseLeave={() => {
							   this.setState({hovered: false});
							   if (state.onExit) {
								   state.onExit(this.props.button)
							   }
						   }}
						   readOnly={true}
						   onClick={this.onClick}
						   disabled={state.loading || !state.active}
						   value={state.title}/>
				</div>;
			case BUTTON_TYPE.FAKE:
				return <div className={className}>
					{this.get_content_view()}
					{state.about && state.active ? <div className={'about-data'} data-title={state.about}/> : null}
				</div>;
			default:
				return null;
		}
	}

	get_content_view() {
		let state = this.getState();

		let icon = state.loading ? Res.icon.ripple_loading : state.icon;
		let isDual = icon && Object.keys(icon).indexOf('linear') >= 0 && Object.keys(icon).indexOf('filled') >= 0;

		let title_view = state.title ? <p className={'button-view-title'}>{state.title}</p> : undefined;
		let badgeView;
		if (this.getState().badge) {
			badgeView = <p className={'button-view-badge'}>{normalizeNumber(this.getState().badge)}</p>
		}
		return <div className="button-view-content">
			{isDual ? icon.linear : icon}
			{title_view}
			{badgeView}
		</div>
	}


	onClick(event) {
		event.preventDefault();
		this.getState().onClick();
	}
}


ButtonView.propTypes = {
	id: PropTypes.number,
	title: PropTypes.string,
	icon: PropTypes.any,
	className: PropTypes.string,
	type: PropTypes.string,
	onClick: PropTypes.func,
	name: PropTypes.string,
	loading: PropTypes.bool,
	active: PropTypes.bool,
	about: PropTypes.string,
	link: PropTypes.string,
};
export const ExtendableButtonView = ButtonView;
export default connect(ButtonView);

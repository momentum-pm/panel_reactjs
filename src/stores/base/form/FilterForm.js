import Form from "./Form";
import History from "../../../History";
import Button from "./buttons/Button";
import Res from "../../../assets/Res";
import ArrayUtils from "../../../utils/ArrayUtils";

export default class FilterForm extends Form {
	static getActions() {
		return [...super.getActions(), 'resetValues'];
	}

	getInitialState(args) {
		return {
			...super.getInitialState(args),
			titleIcon: Res.icon.filter,
			isOpen: false,
			lastValues: {},
			cascadeButton: Button.create_button({
				name: 'cascade',
				className: 'responsive-only flat primary small',
				icon: Res.icon.filter,
				title: Res.string.filter,
				onClick: () => this.toggleOpen(),
			})
		}
	}

	toggleOpen() {
		this.state.isOpen = !this.state.isOpen;
		if (this.state.isOpen) {
			this.state.cascadeButton.setIcon(Res.icon.upArrow);
		} else {
			this.state.cascadeButton.setIcon(Res.icon.filter);
		}
		this.save();
	}

	onFieldChange(field) {
		if (field.state.isInstant) {
			if (field.state.name.endsWith('__in')) {
				if (!ArrayUtils.equals(field.state.value, this.state.lastValues[field.state.name] || [])) {
					this.instantFieldChanged(field);
				}
			} else {
				if (field.state.value !== this.state.lastValues[field.state.name]) {
					this.instantFieldChanged(field);
				}
			}

		}
	}

	instantFieldChanged(field) {
		this.state.lastValues[field.state.name] = field.state.value;
		this.save();
		this.submitFilters();
	}

	submitFilters() {
		let filteredUrl = History.location.pathname + '?page=1';
		this.state.fields.forEach(field => {
			let value = this.getValue(field.state.name);
			if (field.state.name.endsWith("__in")) {
				if (value && value.length > 0) {
					value.forEach(v => filteredUrl += "&" + field.state.name + "=" + v);
				}
			} else {
				if (value) {
					filteredUrl += "&" + field.state.name + "=" + value;
				}
			}
		});
		History.replace_url(filteredUrl);
	}

	createButtons(args) {
		return []
	}

	getTitle(args) {
		return Res.string.filters;
	}

	submit() {
		this.toggleOpen();
		this.submitFilters();
	}

	resetValues(values) {
		Object.keys(values).forEach(key => {
			let field = this.getField(key);
			if (field) {
				let value = values[key];
				field.setValue(value);
			}

		});
	}
}

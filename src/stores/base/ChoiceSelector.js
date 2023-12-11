import {STORE_TYPE} from "./Store";
import Button from "./form/buttons/Button";
import Res from "../../assets/Res";
import History from "../../History";
import Form from "./form/Form";
import BulletField from "./form/fields/BulletField";


export default class ChoiceSelector extends Form {
	static type = STORE_TYPE.SINGLETON;
	static storeName = 'ChoiceSelector';

	static getActions() {
		return [...super.getActions(), 'open'];
	}

	getInitialState(args) {
		return {
			...super.getInitialState(args),
			callback: undefined,
		}
	}

	createFields(args) {
		return [
			BulletField.create({
				name: 'items',
				items: [],
				itemToTitle: item => item,
				itemToValue: item => item,
				label: '',
				placeholder: '',
			})
		]
	}

	createButtons(args) {
		return [
			Button.createSubmit({
				className: 'raised primary',
				title: Res.string.choose,
				onClick: () => this.submit(),
			}),
			Button.create_back(),
		]
	}

	submit() {
		History.goBack();
		setTimeout(() => this.state.callback(this.getField('items').state.item), 100);
	}

	open({
			 title,
			 text,
			 items,
			 itemToTitle,
			 itemToValue,
			 callback,
			 confirm_title = Res.string.choose,
			 confirm_class = 'raised primary'
		 }) {
		this.state.title = title;
		this.state.text = text;
		this.state.callback = callback;
		this.save();
		this.state.buttons[0].set_title(confirm_title);
		this.state.buttons[0].setClassName(`end ${confirm_class}`);
		this.state.fields[0].setItems(items);
		this.state.fields[0].setProperty('itemToValue', itemToValue);
		this.state.fields[0].setProperty('itemToTitle', itemToTitle);
		this.state.fields[0].setProperty('placeholder', text);
		History.pushSmallModal('choice-select/');
	}

	static open(title, text, callback, confirm_title = Res.string.ok, confirm_class = 'raised primary') {
		ChoiceSelector.get().open(title, text, callback, confirm_title, confirm_class);
	}
}

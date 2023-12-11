import RemoteFormView from "./RemoteFormView";

export default class FormBox extends RemoteFormView {


	getFormClass() {
		return 'box';
	}

	getHeaderClass() {
		return `${super.getHeaderClass()} background border-bottom`
	}


}

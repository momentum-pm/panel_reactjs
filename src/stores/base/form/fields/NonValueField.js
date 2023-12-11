import Field, {FIELD_TYPE} from "./Field";


export default class NonValueField extends Field{
	static storeName = FIELD_TYPE.NON_VALUE;


	getInitialState(args) {
		return {
			...args,
			nonValueField: true,
		};
	}

}

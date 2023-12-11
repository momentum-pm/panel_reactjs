import {FIELD_TYPE} from "./Field";
import SelectField from "./SelectField";

export default class BulletField extends SelectField {
	static storeName = FIELD_TYPE.BULLET;
}

import {STORE_TYPE} from "../../../../stores/base/Store";
import Res from "../../../../assets/Res";
import RemoteMultiSelectField from "../../../../stores/base/form/fields/RemoteMultiSelectField";
import FilterForm from "../../../../stores/base/form/FilterForm";
import HomeCategories from "../../home/stores/HomeCategories";
import RemoteSelectField from "../../../../stores/base/form/fields/RemoteSelectField";
import RemoteBulletField from "../../../../stores/base/form/fields/RemoteBulletField";

export default class SchoolFilterForm extends FilterForm {
	static storeName = 'SchoolFilterForm';
	static type = STORE_TYPE.SINGLETON;

	getTitle(args) {
		return Res.string.dashboard.admin.filters_title;
	}


	createFields(args) {
		return [
			RemoteBulletField.create({
				name: 'category',
				question:'دسته بندی',
				itemToTitle: item => item.title,
				showDeselect:true,
				deselectLabel: 'همه',
				itemToValue: item => item.id,
				remoteStore: HomeCategories.get(),
				isInstant: true,
				itemsClassName:'row',
				className:'inline-field horizontal-scrollable-container',
				inputClassName:'horizontal-scrollable',
				itemClassName:'button-item',
				required: false,
				showLabelDetails: false,
			}),
			

		]
	}
	getTitle(){
		return 'دسته بندی'
	}
}

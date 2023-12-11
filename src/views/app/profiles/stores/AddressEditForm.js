import RemoteSelectField from "../../../../stores/base/form/fields/RemoteSelectField";
import Res from "../../../../assets/Res";
import Provinces from "../../../../stores/app/dashboard/address/Provinces";
import Cities from "../../../../stores/app/dashboard/address/Cities";
import Button from "../../../../stores/base/form/buttons/Button";
import UserProfileEdit from "./userProfileEdit/UserProfileEdit";
import BooleanField from "../../../../stores/base/form/fields/BooleanField";
import TextField from "../../../../stores/base/form/fields/TextField";
import CollapsedForm from "../../../../stores/base/form/CollapsedForm";
import Status from "../../../../utils/requests/Status";
import CharField from "../../../../stores/base/form/fields/CharField";
import Validators from "../../../../utils/Validators";

export default class AddressEditForm extends CollapsedForm {
  static storeName = "AddressEditForm";

  createFields(args) {
    return [
      RemoteSelectField.create({
        name: "province",
        label: Res.string.profiles.province_label,
        itemToTitle: (item) => Res.get_attribute(item, "title"),
        itemToValue: (item) => item.id,
        remoteStore: Provinces.get(),
        required: false,
        value: null,
        placeholder: Res.string.profiles.province_placeholder,
      }),
      RemoteSelectField.create({
        name: "city",
        label: Res.string.profiles.city_label,
        itemToTitle: (item) => Res.get_attribute(item, "title"),
        itemToValue: (item) => item.id,
        value: null,
        required: false,
        remoteStore: null,
        placeholder: Res.string.profiles.city_placeholder,
      }),
      CharField.create({
        name: "district",
        placeholder: Res.string.dashboard.district_placeholder,
        required: false,
        validators: [Validators.at_last(100, Res.string.characters)],
      }),
      TextField.create({
        name: "text",
        rows: 2,
        required: false,
        label: Res.string.profiles.address_label,
        placeholder: Res.string.profiles.address_placeholder,
      }),
      BooleanField.create({
        name: "public",
        required: false,
        question: Res.string.profiles.public_address,
      }),
    ];
  }

  // getOpenTitle() {
  // 	return R.string.profiles.edit_address;
  // }
  //
  // getCloseTitle() {
  // 	return this.getOpenTitle();
  // }

  getCloseIcon() {
    return Res.icon.edit;
  }

  onFieldChange(field) {
    if (field.state.name === "province") {
      let provinceId = field.state.value;
      let cityField = this.getField("city");
      if (
        !provinceId ||
        !cityField.getRemoteStore() ||
        cityField.getRemoteStore().id.toString() !== provinceId.toString()
      ) {
        cityField.setValue(null);
        if (provinceId) {
          cityField.setRemoteStore(Cities.get(provinceId, { provinceId }));
          cityField.setProperty("className", "");
        } else {
          cityField.setProperty("className", "invisible-field");
        }
      }
    }
  }

  getTitle(args) {
    return Res.string.profiles.address_form;
  }

  createButtons(args) {
    return [
      Button.createSubmit({
        title: Res.string.profiles.address_save,
        icon: Res.icon.check,
        className: "raised primary",
        onClick: () => this.submit(),
      }),
      Button.create_button({
        name: "reset",
        title: Res.string.reset_form,
        className: "flat primary",
        onClick: () => this.reset(),
      }),
    ];
  }
  getValues() {
    return { address: super.getValues() };
  }

  reset() {
    this.setContext(
      UserProfileEdit.get(this.state.profileId).state.data.address
    );
  }

  getSubmitUrl() {
    return `profiles/profiles/${this.state.profileId}/edit/`;
  }

  onSubmitCallback(response) {
    super.onSubmitCallback(response);
    if (Status.isOk(response.status)) {
      let profileId = this.state.profileId;
      UserProfileEdit.get(profileId, { profileId }).success(
        response.data.profile,
        response.status
      );
    }
  }
}

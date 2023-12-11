import CharField from "../../../../../stores/base/form/fields/CharField";
import Res from "../../../../../assets/Res";
import RemoteForm from "../../../../../stores/base/form/RemoteForm";
import HiddenField from "../../../../../stores/base/form/fields/HiddenField";
import SelectField from "../../../../../stores/base/form/fields/SelectField";
import AutoCompleteField from "../../../../../stores/base/form/fields/AutoCompleteField";

import Validators from "../../../../../utils/Validators";
export default class AccessBaseForm extends RemoteForm {
  static storeName = "AccessBaseForm";

  createFields(args) {
    return [
      HiddenField.create({
        name: "participant",
        required: false,
      }),
      AutoCompleteField.create({
        name: "profile",
        label: "پروفایل",
        placeholder: "نام، شماره، ...",
        url: "profiles/profiles/search/",
        itemToTitle: (item) => item.title,
        itemToValue: (item) => item.title,
        className: "inline-half-row-responsive",
      }),

      SelectField.create({
        name: "role",
        itemToTitle: (item) => item,
        value: args.role,
        itemToValue: (item) => item,
        items: ["teacher", "admin", "student"],
        label: "نوع دسترسی",
        className: "inline-half-row-responsive",
      }),

      CharField.createNumber({
        name: "price",
        label: "مبلغ کارت به کارت",
        required: false,
        className: args.role === "student" ? "" : "invisible-field",
      }),
      CharField.createNumber({
        name: "commission_rate",
        label: "نرخ کمیسیون",
        required: false,
        validators: [
          Validators.at_least_num(0, ""),
          Validators.at_last_num(100, ""),
        ],
      }),
      SelectField.create({
        name: "education",
        items: [],
        itemToTitle: (item) =>
          Res.get_attribute(item.stage, "title") + " " + item.organization.name,
        itemToValue: (item) => item.id,
        required: false,
        label: "تحصیلات نمایشی",
        className: args.role === "teacher" ? "" : "invisible-field",
      }),
      SelectField.create({
        name: "experience",
        items: [],
        required: false,

        itemToTitle: (item) => item.title + " " + item.organization.name,
        itemToValue: (item) => item.id,
        label: "سابقه نمایشی",
        className: args.role === "teacher" ? "" : "invisible-field",
      }),
      SelectField.create({
        name: "certificate",
        required: false,
        items: [],
        label: "مدال نمایشی",

        itemToTitle: (item) => item.rank + " " + item.title,
        itemToValue: (item) => item.id,
        className: args.role === "teacher" ? "" : "invisible-field",
      }),
    ];
  }
  onFieldChange(field) {
    if (field.state.name === "role") {
      let role = field.state.value;
      if (role === "teacher") {
        this.getField("experience").setProperty("className", "");
        this.getField("education").setProperty("className", "");
        this.getField("certificate").setProperty("className", "");
        this.getField("commission_rate").setProperty("className", "");
        this.getField("price").setProperty("className", "invisible-field");
      }
      if (role === "admin") {
        this.getField("experience").setProperty("className", "invisible-field");
        this.getField("education").setProperty("className", "invisible-field");
        this.getField("commission_rate").setProperty("className", "");
        this.getField("certificate").setProperty(
          "className",
          "invisible-field"
        );
        this.getField("price").setProperty("className", "invisible-field");
      }
      if (role === "student") {
        this.getField("experience").setProperty("className", "invisible-field");
        this.getField("education").setProperty("className", "invisible-field");
        this.getField("commission_rate").setProperty(
          "className",
          "invisible-field"
        );
        this.getField("certificate").setProperty(
          "className",
          "invisible-field"
        );
        this.getField("price").setProperty("className", "");
      }
    }
    if (field.state.name === "profile") {
      let profile = field.state.item;

      if (profile?.participant !== this.getValue("participant")) {
        this.getField("participant").setValue(profile?.participant);
        if (profile?.participant) {
          this.getField("participant").setValue(profile.participant);
          this.getField("education").setProperty("items", profile.educations);
          this.getField("certificate").setProperty(
            "items",
            profile.certificates
          );
          this.getField("experience").setProperty("items", profile.experiences);
        } else {
          this.getField("participant").setValue(null);
          this.getField("education").setProperty("items", []);
          this.getField("certificate").setProperty("items", []);
          this.getField("experience").setProperty("items", []);
        }
      }
    }
  }
}

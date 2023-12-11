import CharField from "../../../../../stores/base/form/fields/CharField";
import Res from "../../../../../assets/Res";
import RemoteForm from "../../../../../stores/base/form/RemoteForm";
import HiddenField from "../../../../../stores/base/form/fields/HiddenField";
import SelectField from "../../../../../stores/base/form/fields/SelectField";
import AutoCompleteField from "../../../../../stores/base/form/fields/AutoCompleteField";
import Validators from "../../../../../utils/Validators";
import SwitchField from "../../../../../stores/base/form/fields/SwitchField";
import DateField from "../../../../../stores/base/form/fields/DateField";
import { GregorianCalendar } from "../../../../../utils/CalendarUtils";
export default class DiscountBaseForm extends RemoteForm {
  static storeName = "DiscountBaseForm";

  createFields(args) {
    return [
      SwitchField.create({
        name: "active",
        question: "فعال",
        className: "half-row-responsive",
        required: false,
        showLabelDetails: false,
      }),

      CharField.create({
        name: "title_fa",
        label: "عنوان",
        placeholder: "عنوان...",
        className: "inline-half-row-responsive",

        required: false,
      }),

      CharField.create({
        name: "code",
        label: "کد",
        className: "inline-half-row-responsive",
        placeholder: "کد...",
        required: false,
      }),

   
      SelectField.create({
        name: "pricing_method",
        itemToTitle: (item) => {
          return {
            percentage: "درصدی",
            "fixed-price": "مبلغ ثابت",
            "fixed-discount": "تخفیف ثابت",
          }[item];
        },
        itemToValue: (item) => item,
        items: ["percentage", "fixed-price", "fixed-discount"],
        label: "نوع تخفیف",
        className: "half-row-responsive",
      }),
      CharField.createNumber({
        name: "fixed_price",
        label: "قیمت ثابت",
        placeholder: "قیمت به تومان...",
        validators: [Validators.at_least(0), Validators.at_last(10000000000)],
        required: false,
        className: "hidden-field",
      }),

      CharField.createNumber({
        name: "fixed_discount",
        label: "تخفیف ثابت",
        placeholder: "تخفیف به تومان...",
        validators: [Validators.at_least(0), Validators.at_last(10000000000)],
        className: "hidden-field",
        required: false,
      }),

      CharField.createNumber({
        name: "percentage",
        label: "درصد تخفیف",
        validators: [Validators.at_least(0), Validators.at_last(100)],
        className: "hidden-field",
        placeholder: "درصد تخفیف...",
        required: false,
      }),

      HiddenField.create({
        name: "commissioner_wallet",
        required: false,
      }),
      AutoCompleteField.create({
        name: "profile",
        label: "معرف",
        placeholder: "نام، شماره، ...",
        required: false,
        url: "profiles/profiles/search/",
        itemToTitle: (item) => item.title,
        className: "half-row-responsive",

        itemToValue: (item) => item.title,
      }),
      CharField.createNumber({
        name: "commission_percentage",
        label: "درصد کمیسیون",
        className: "hidden-field",

        validators: [Validators.at_least(0), Validators.at_last(100)],
        placeholder: "درصد کمیسیون...",
        required: false,
      }),
      CharField.create({
        name: "max_count",
        label: "تعداد باقی مانده",
        placeholder: "برای بی نهایت -۱ وارد کنید...",
        className: "inline-half-row-responsive",
      }),
      DateField.create({
        name: "expire_date",
        label: "تاریخ انقضا",
        minDate: "2021-05-22",
        className: "inline-half-row-responsive",
        required: false,
        showLabelDetails: false,
      }),
    ];
  }
  onFieldChange(field) {
    if (
      field.state.name === "pricing_method" &&
      this.state.last_method !== field.state.value
    ) {
      let method = field.state.value;
      this.state.last_method = method;
      this.save();
      if (method === "percentage") {
        this.getField("pricing_method").setProperty(
          "className",
          "inline-half-row-responsive"
        );
        this.getField("percentage").setProperty(
          "className",
          "inline-half-row-responsive"
        );
        this.getField("fixed_price").setProperty("className", "hidden-field");
        this.getField("fixed_discount").setProperty(
          "className",
          "hidden-field"
        );
      } else if (method === "fixed-price") {
        this.getField("pricing_method").setProperty(
          "className",
          "inline-half-row-responsive"
        );

        this.getField("percentage").setProperty("className", "hidden-field");
        this.getField("fixed_price").setProperty(
          "className",
          "inline-half-row-responsive"
        );
        this.getField("fixed_discount").setProperty(
          "className",
          "hidden-field"
        );
      } else if (method === "fixed-discount") {
        this.getField("pricing_method").setProperty(
          "className",
          "inline-half-row-responsive"
        );

        this.getField("percentage").setProperty("className", "hidden-field");
        this.getField("fixed_price").setProperty("className", "hidden-field");
        this.getField("fixed_discount").setProperty(
          "className",
          "inline-half-row-responsive"
        );
      } else {
        this.getField("pricing_method").setProperty(
          "className",
          "half-row-responsive"
        );
        this.getField("percentage").setProperty("className", "hidden-field");
        this.getField("fixed_price").setProperty("className", "hidden-field");
        this.getField("fixed_discount").setProperty(
          "className",
          "hidden-field"
        );
      }
    }
    if (field.state.name === "profile") {
      let profile = field.state.item;

      if (profile?.wallet !== this.getValue("commissioner_wallet")) {
        if (profile?.wallet) {
          this.getField("commissioner_wallet").setValue(profile.wallet);
          this.getField("profile").setProperty(
            "className",
            "inline-half-row-responsive"
          );
          this.getField("commission_percentage").setProperty(
            "className",
            "inline-half-row-responsive"
          );
          this.getField("commission_percentage").setProperty("required", true);
        } else {
          this.getField("commissioner_wallet").setValue(null);
          this.getField("profile").setProperty(
            "className",
            "half-row-responsive"
          );

          this.getField("commission_percentage").setProperty(
            "className",
            "hidden-field"
          );
          this.getField("commission_percentage").setProperty("required", false);
        }
      }
    }
  }
}

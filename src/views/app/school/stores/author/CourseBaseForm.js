import Form from "../../../../../stores/base/form/Form";
import CharField from "../../../../../stores/base/form/fields/CharField";
import Res from "../../../../../assets/Res";
import Validators from "../../../../../utils/Validators";
import SwitchField from "../../../../../stores/base/form/fields/SwitchField";
import HiddenField from "../../../../../stores/base/form/fields/HiddenField";
import App from "../../../../../stores/app/App";
import RemoteForm from "../../../../../stores/base/form/RemoteForm";
import FileField from "../../../../../stores/base/form/fields/FileField";
import RichTextField from "../../../../../stores/base/form/fields/RichTextField";

export default class CourseBaseForm extends RemoteForm {
  static storeName = "CourseBaseForm";
  createFields(args) {
    return [
      HiddenField.create({
        name: "owner",
        value: App.getId(),
      }),
      HiddenField.create({
        name: "author",
        value: App.getId(),
      }),
      SwitchField.create({
        question: Res.string.school.public_label,
        className: "inline-half-row-responsive",
        name: "public",
        required: false,
      }),
      SwitchField.create({
        question: Res.string.school.top_label,
        name: "top",
        className: "inline-half-row-responsive",
        required: false,
      }),
      CharField.create({
        name: "title",
        placeholder: Res.string.school.title_placeholder,
        label: Res.string.school.title_label,
        validators: [Validators.at_last(200, Res.string.characters)],
        className: "inline-half-row-responsive",
      }),
      CharField.create({
        name: "slug",
        label: Res.string.school.slug_label,
        placeholder: Res.string.school.slug_placeholder,
        className: "inline-half-row-responsive",
      }),

      CharField.createNumber({
        name: "price",
        label: Res.string.school.price_label,
        placeholder: Res.string.school.price_placeholder,
        validators: [
          Validators.at_last_num(100000000, Res.string.tooman),
          Validators.at_least_num(10000, Res.string.tooman),
        ],
        className: "inline-half-row-responsive",
      }),

      CharField.createNumber({
        name: "actual_price",
        required: false,
        label: Res.string.school.actual_price_label,
        placeholder: Res.string.school.actual_price_placeholder,
        validators: [
          Validators.at_last_num(100000000, Res.string.tooman),
          Validators.at_least_num(10000, Res.string.tooman),
        ],
        className: "inline-half-row-responsive",
      }),
      CharField.createNumber({
        name: "access_count",
        required: false,
        label: Res.string.school.access_count_label,
        placeholder: Res.string.school.access_count_placeholder,
        className: "inline-half-row-responsive",
      }),

      CharField.create({
        name: "description",
        required: false,
        label: Res.string.school.description_label,
        placeholder: Res.string.school.description_placeholder,
        validators: [Validators.at_last(200, Res.string.characters)],
      }),
      CharField.create({
        name: "about",
        required: false,
        label: Res.string.school.description_label + " در سایت",
        placeholder: Res.string.school.description_placeholder,
        validators: [Validators.at_last(200, Res.string.characters)],
      }),

      CharField.create({
        name: "channel_name",
        label: Res.string.school.channel_name_label,
        placeholder: Res.string.school.channel_name_placeholder,
        className: "inline-half-row-responsive",
      }),
      CharField.create({
        name: "remote_teaser_id",
        required: false,
        label: Res.string.school.teaser_label,
        placeholder: Res.string.school.teaser_placeholder,
        className: "inline-half-row-responsive",
      }),
      FileField.create({
        name: "cover",
        required: false,
        label: Res.string.school.cover_label,
        placeholder: "اینجا رها کنید!",
        className: "inline-half-row-responsive",
      }),
      FileField.create({
        name: "image",
        required: false,
        label: Res.string.school.image_label,
        placeholder: "اینجا رها کنید!",
        className: "inline-half-row-responsive",
      }),
      FileField.create({
        name: "thumbnail_image",
        required: false,
        label: Res.string.school.thumbnail_image_label,
        placeholder: "اینجا رها کنید!",
        className: "inline-half-row-responsive",
      }),
      RichTextField.create({
        name: "about_course_long",
        label: "درباره دوره",
        required: false,
      }),
      RichTextField.create({
        name: "pre_course",
        label: "پیش نیاز ها",
        required: false,
      }),
      RichTextField.create({
        name: "students",
        label: "مخاطبین",
        required: false,
      }),
    ];
  }
}

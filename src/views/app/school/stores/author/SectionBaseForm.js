import CharField from "../../../../../stores/base/form/fields/CharField";
import Res from "../../../../../assets/Res";
import RemoteForm from "../../../../../stores/base/form/RemoteForm";
import HiddenField from "../../../../../stores/base/form/fields/HiddenField";

export default class SectionBaseForm extends RemoteForm {
  static storeName = "SectionBaseForm";

  createFields(args) {
    return [
      HiddenField.create({
        name: "parent_id",
        required: false,
      }),
      CharField.create({
        name: "title",
        label: Res.string.school.section_title_label,
        placeholder: Res.string.school.section_title_placeholder,
      }),
      CharField.createNumber({
        name: "order",
        label: Res.string.school.section_order_label,
        placeholder: Res.string.school.section_order_placeholder,
      }),
    ];
  }
}

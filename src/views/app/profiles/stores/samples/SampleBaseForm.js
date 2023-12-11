import Form from "../../../../../stores/base/form/Form";
import Res from "../../../../../assets/Res";
import FileField, {
  ALL_FORMATS,
  SIZE,
} from "../../../../../stores/base/form/fields/FileField";
import Validators from "../../../../../utils/Validators";

export default class SampleBaseForm extends Form {
  static storeName = "SampleBaseForm";

  getInitialState(args) {
    return {
      ...super.getInitialState(args),
      lastFile: null,
    };
  }

  createFields(args) {
    return [
      FileField.create({
        name: "file",
        validators: [
          Validators.file_format(ALL_FORMATS),
          Validators.file_max_size(SIZE.MB(10)),
        ],
        placeholder: Res.string.profiles.samples.file_placeholder,
      }),
    ];
  }

  createButtons(args) {
    return [];
  }

  onFieldChange(field) {
    if (field.state.name === "file") {
      let fileAddress =
        (field.state.file && field.state.file.name) || field.state.value;
      if (fileAddress !== this.state.lastFile) {
        this.state.lastFile = fileAddress;
        this.save();
      }
    }
  }
}

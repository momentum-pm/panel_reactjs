import Res from "../../../../../assets/Res";
import {
  ALL_FORMATS,
  SIZE,
} from "../../../../../stores/base/form/fields/FileField";
import RemoteMultiSelectField from "../../../../../stores/base/form/fields/RemoteMultiSelectField";
import BooleanField from "../../../../../stores/base/form/fields/BooleanField";
import MultiFileField from "../../../../../stores/base/form/fields/MultiFileField";
import Validators from "../../../../../utils/Validators";
import CharField from "../../../../../stores/base/form/fields/CharField";
import Button from "../../../../../stores/base/form/buttons/Button";
import History from "../../../../../History";
import { CACHE_POLICY } from "../../../../../stores/base/RemoteStore";
import Collections from "./Collections";
import RemoteForm from "../../../../../stores/base/form/RemoteForm";

export default class CollectionCreateForm extends RemoteForm {
  static storeName = "CollectionCreateForm";

  getInitialState(args) {
    return {
      ...super.getInitialState(args),
      lastFile: null,
    };
  }

  createFields(args) {
    return [
      CharField.create({
        name: "title",
        label: Res.string.profiles.samples.collection_title_label,
        placeholder: Res.string.profiles.samples.collection_title_placeholder,
      }),
      MultiFileField.create({
        name: "files",
        file_validators: [
          Validators.file_format(ALL_FORMATS),
          Validators.file_max_size(SIZE.MB(500)),
        ],
        placeholder: Res.string.profiles.samples.files_placeholder,
        label: Res.string.profiles.samples.files_label,
      }),
      BooleanField.create({
        name: "is_private",
        question: Res.string.profiles.samples.public_check_placeholders,
        value: true,
      }),
    ];
  }

  createButtons(args) {
    return [
      Button.createSubmit({
        title: Res.string.profiles.samples.create_collection_submit,
        onClick: () => this.submit(),
        className: "raised primary",
      }),
      Button.create_back(),
    ];
  }

  getTitle(args) {
    return Res.string.profiles.samples.new_collection_button;
  }

  submitCallback(response) {
    super.submitCallback(response);
    this.setContext({});
  }

  onSubmitCallback(response) {
    super.onSubmitCallback(response);
    History.goBack();
    this.setContext({});
    Collections.get(this.state.profileId).load(CACHE_POLICY.UPDATE);
  }

  forceSetContext() {
    return true;
  }

  getSubmitUrl() {
    return `profiles/profiles/${this.state.profileId}/collections/`;
  }
}

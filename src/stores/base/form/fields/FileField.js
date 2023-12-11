import Field, { FIELD_TYPE } from "./Field";
import Requester from "../../../../utils/requests/Requester";
import Status from "../../../../utils/requests/Status";
import Validators, { ValidationError } from "../../../../utils/Validators";
import MessageQueue from "../../MessageQueue";

export const SIZE = {
  KB: (value) => value * 0x400,
  MB: (value) => value * 0x100000,
  GB: (value) => value * 0x40000000,
};
export const DOCUMENT_FORMATS = [
  "doc",
  "docx",
  "html",
  "htm",
  "odt",
  "pdf",
  "xls",
  "xlsx",
  "ods",
  "ppt",
  "pptx",
  "txt",
];
export const VIDEO_FORMATS = [
  "webm",
  "mpg",
  "mpeg",
  "mpv",
  "mp4",
  "m4p",
  "m4v",
  "avi",
  "wmv",
  "mov",
  "flv",
  "swf",
  "mkv",
];
export const COMPRESSED_FORMATS = ["zip", "tar", "gz", "rar", "7z"];
export const IMAGE_FORMATS = ["bmp", "jpg", "jpeg", "gif", "png", "svg"];
export const AUDIO_FORMATS = ["mp3", "ogg", "wav"];

export const ALL_FORMATS = [].concat(
  DOCUMENT_FORMATS,
  VIDEO_FORMATS,
  COMPRESSED_FORMATS,
  IMAGE_FORMATS,
  AUDIO_FORMATS
);
export default class FileField extends Field {
  static storeName = FIELD_TYPE.FILE;

  /**
   * @param {string} args.name
   * @param {string} [args.label = undefined] - The label of the field
   * @param {boolean} [args.required = true] - If the field is required, default is true
   * @param {string} [args.hint = undefined] - Hint for the field
   * @param {string} [args.className = undefined] - The root class of field_view
   * @param {function[]} [args.validators = [] ] - The array of field validators
   * @returns {Store} the created store
   */
  static create(args) {
    return super.create({
      ...args,
      loading: false,
      file: undefined,
    });
  }

  static getActions() {
    return [...super.getActions(), "removeFile", "setFile"];
  }

  removeFile() {
    this.state.file = undefined;
    this.setValue(undefined);
  }

  setFile(file) {
    if (!file) {
      this.removeFile();
    } else {
      let bad_file = false;
      let errors = "";
      this.state.touched = true;
      this.state.validators.forEach((validator) => {
        try {
          validator(file);
        } catch (e) {
          errors += `${e.error}, `;
          bad_file = true;
        }
      });
      if (bad_file) {
        MessageQueue.show(errors.substring(0, errors.length - 2), "danger");
      } else {
        this.state.loading = true;
        this.save();
        let data = new FormData();
        data.append("file", file);
        Requester.request(
          "post",
          "storage/storages/",
          data,
          (response) => this.setFileCallback(response),
          "multipart/form-data"
        );
      }
      this.save();
    }
  }

  setFileCallback(response) {
    this.state.loading = false;
    if (Status.isOk(response.status)) {
      this.setValue(response.data.file);
    } else {
      this.save();
    }
  }

  getError() {
    try {
      if (this.state.required) {
        Validators.required(this.state.value || this.state.file);
      }
      if (!Validators.isNull(this.state.file)) {
        this.state.validators.forEach((validator) => {
          validator(this.state.file);
        });
      }
    } catch (e) {
      if (e instanceof ValidationError) {
        return e.error;
      } else {
        throw e;
      }
    }
  }
}

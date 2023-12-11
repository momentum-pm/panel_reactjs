import Field, { FIELD_TYPE } from "./Field";
import Requester from "../../../../utils/requests/Requester";
import Status from "../../../../utils/requests/Status";
import MessageQueue from "../../MessageQueue";
import { LOADING_STATE } from "../../RemoteStore";

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
export default class MultiFileField extends Field {
  static storeName = FIELD_TYPE.MULTI_FILE_FIELD;

  /**
   * @param {string} args.name
   * @param {string} [args.label = undefined] - The label of the field
   * @param {boolean} [args.required = true] - If the field is required, default is true
   * @param {string} [args.hint = undefined] - Hint for the field
   * @param {string} [args.className = undefined] - The root class of field_view
   * @param {function[]} [args.validators = [] ] - The array of field validators
   * @param {function[]} [args.file_validators = [] ] - The array of field validators
   * @returns {Store} the created store
   */
  static create(args) {
    return super.create({
      ...args,
      loading: false,
      uploadingFiles: [],
      file_validators: args.file_validators || [],
    });
  }

  static getActions() {
    return [...super.getActions(), "removeFile", "cancelUploading", "addFiles"];
  }

  resetValue(value) {
    if (!value) {
      super.resetValue([]);
    } else {
      super.resetValue(value);
    }
  }

  removeFile(removeIndex) {
    let newValue = this.state.value.filter(
      (item, index) => index !== removeIndex
    );
    this.setValue(newValue);
  }

  cancelUploading(removeIndex) {
    this.state.uploadingFiles = this.state.uploadingFiles.filter(
      (item, index) => index !== removeIndex
    );
    this.save();
  }

  addFiles(files) {
    if (files) {
      let errors = "";
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        let error = this.getErrorFor(file);
        if (error) {
          errors += error;
        } else {
          this.state.uploadingFiles = [
            ...this.state.uploadingFiles,
            {
              file,
              name: file.name,
              loadingState: LOADING_STATE.LOADING,
            },
          ];
          this.save();
          this.sendFile(file);
        }
      }
      if (errors) {
        MessageQueue.show(errors.substring(0, errors.length - 2), "danger");
      }
    }
  }

  getErrorFor(file) {
    let error = "";
    this.state.file_validators.forEach((validator) => {
      try {
        validator(file);
      } catch (e) {
        error += `${e.error}, `;
      }
    });
    return error;
  }

  sendFile(file) {
    let data = new FormData();
    data.append("file", file);
    Requester.request(
      "post",
      "storage/storages/",
      data,
      (response) => this.addFileCallback(response, file.name),
      "multipart/form-data"
    );
  }

  addFileCallback(response, filename) {
    this.state.uploadingFiles.forEach((uploadingFile) => {
      if (uploadingFile.name === filename) {
        if (Status.isOk(response.status)) {
          this.state.uploadingFiles = this.state.uploadingFiles.filter(
            (f) => f.name !== filename
          );
          this.setValue([...this.state.value, response.data.file]);
        } else {
          this.state.uploadingFiles = this.state.uploadingFiles.map((f) => {
            if (f.name === filename) {
              f.loadingState = LOADING_STATE.FAILED;
            }
            return f;
          });
          this.save();
        }
      }
    });
  }
}

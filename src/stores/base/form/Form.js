import Store from "../Store";
import Requester from "../../../utils/requests/Requester";
import MessageQueue from "../MessageQueue";
import Step from "./fields/Step";

export default class Form extends Store {
  static storeName = "Form";

  static getActions() {
    return [
      "setContext",
      "getValue",
      "getSteps",
      "getField",
      "getButton",
      "scrolledToFirstErrorField",
      "scrollToFirstErrorField",
      "getFirstErrorField",
      "scrolledToStep",
      "scrollToStep",
    ];
  }

  getInitialState(args) {
    let fields = this.createFields(args);
    let buttons = this.createButtons(args);
    fields.forEach((field) => {
      field.subscribe((field) => this.onFieldChange(field));
    });
    return {
      fields,
      buttons,
      context: undefined,
      title: this.getTitle(args),
      ...args,
    };
  }

  createFields(args) {
    throw Error(`You should override createFields method in ${this.name}`);
  }

  createButtons(args) {
    throw Error(`You should override createButtons method in ${this.name}`);
  }

  getButton(name) {
    let button = undefined;
    this.state.buttons.forEach((item) => {
      if (item.state.name === name) {
        button = item;
      }
    });
    return button;
  }

  getField(name) {
    let element = undefined;
    this.state.fields.forEach((field) => {
      if (field.state.name === name) {
        element = field;
      }
    });
    return element;
  }

  getValue(name) {
    return this.getField(name).state.value;
  }

  getValues() {
    let values = {};
    this.state.fields.forEach((field) => {
      if (!field.state.nonValueField) {
        values[field.state.name] = field.state.value;
      }
    });
    return values;
  }

  getSteps() {
    let steps = [];
    this.state.fields.forEach((field) => {
      if (field.constructor.storeName === Step.storeName) {
        steps.push(field);
      }
    });
    return steps;
  }

  setContext(context) {
    this.state.context = context;
    this.save();
    this.state.fields.forEach((field) => {
      if (!field.state.nonValueField) {
        if (this.state.context && field.state.name in this.state.context) {
          field.resetValue(this.getFieldInitialValue(field));
        }
        if (
          this.state.context &&
          !(field.state.name in this.state.context) &&
          this.forceSetContext()
        ) {
          field.resetValue(this.getFieldInitialValue(field));
        }
      }
    });
  }

  forceSetContext() {
    return false;
  }

  getFieldInitialValue(field) {
    if (this.state.context) {
      return this.state.context[field.state.name];
    } else {
      return undefined;
    }
  }

  touch() {
    this.state.fields.forEach((field) => {
      if (!field.state.nonValueField) {
        field.touch();
      }
    });
  }

  isValid() {
    let valid = true;
    this.state.fields.forEach((field) => {
      if (!field.state.nonValueField) {
        valid = field.state.error === undefined && valid;
      }
    });
    return valid;
  }

  getTitle(args) {}

  getSubmitUrl() {
    throw Error(
      `You should override getSubmitUrl method in ${this.constructor.name}`
    );
  }

  submit() {
    this.touch();
    if (this.isValid()) {
      this.getButton("submit") && this.getButton("submit").set_loading(true);
      let values = this.getValues();
      Requester.request("post", this.getSubmitUrl(), values, (response) =>
        this.submitCallback(response)
      );
    } else {
      this.scrollToFirstErrorField();
    }
  }

  submitCallback(response) {
    this.getButton("submit") && this.getButton("submit").set_loading(false);
    MessageQueue.showObject(response.data);
    this.onSubmitCallback(response);
  }

  onSubmitCallback(response) {}

  onFieldChange(field) {}

  scrollToFirstErrorField() {
    this.state.shouldScrollToFirstField = true;
    this.save();
  }

  scrolledToFirstErrorField() {
    this.state.shouldScrollToFirstField = false;
    this.save();
  }

  scrollToStep(step) {
    this.state.destinationStep = step;
    this.state.shouldScrollToStep = true;
    this.save();
  }

  scrolledToStep() {
    this.state.shouldScrollToStep = false;
    this.save();
  }

  getFirstErrorField() {
    let firstField = undefined;
    this.state.fields.forEach((field) => {
      if (!field.state.nonValueField) {
        if (field.state.error !== undefined) {
          if (!firstField) {
            firstField = field;
          }
        }
      }
    });
    return firstField;
  }
}

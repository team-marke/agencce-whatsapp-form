import TelField from "./custom-fields/tel-field";
import LocationFields from "./custom-fields/location-fields";

/**
 * Default component for sending emails with Marke Forms V2
 * @param {HTMLFormElement} - The form element itself
 */
export default class Form {
  constructor(form) {
    this.form = form;
    this.fields = Array.from(form.elements).filter(
      (element) => !(element instanceof HTMLButtonElement)
    );
    this.successMsg =
      form.dataset.messageSuccess || "Formulário enviado com sucesso!";
    this.errorMsg =
      form.dataset.messageError ||
      "Houve um erro ao enviar o formulário, tente novamente mais tarde!";
    this.redirect = form.dataset.redirect;
    this.submitEvent = new CustomEvent(form.dataset.submitEventName || "mkformsubmit", {
      detail: {},
      bubbles: true,
      cancelable: true,
      composed: false,
    });
    this.submitButton = form.querySelector('button[type="submit"]');
    this.initTelFields();
    this.initLocationFields();
    this.listenFormEvents();
  }

  dispatchSubmitEvent() {
    this.form.dispatchEvent(this.submitEvent);
  }

  getFormData() {
    let data = [];
    this.fields.forEach((field) => {
      if (!field.value) return;
      data.push({
        label: field.labels[0]?.innerHTML,
        value: field.value,
      });
    });
    return data;
  }

  redirectURL() {
    if (this.redirect) {
      window.location.href = this.redirect;
    }
  }

  async submit() {
    let submitBtnOldValue = this.submitButton.value;
    this.submitButton.value = "Enviando...";
    try {
      const url = process.env.FORM_SUBMIT_URL;
      const body = JSON.stringify({
        from: process.env.FORM_SUBMIT_FROM || false,
        to: process.env.FORM_SUBMIT_TO,
        subject: process.env.FORM_SUBMIT_SUBJECT,
        fields: this.getFormData(),
        sendGridAPIKey: process.env.SENDGRID_API_KEY || false,
      });
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });
      if (res.status == 201) {
        this.dispatchSubmitEvent();
        console.log(res);
        this.redirectURL();
      } else {
        console.log(res);
      }
    } catch (error) {
      console.error(error);
    }
    this.submitButton.value = submitBtnOldValue;
    this.submitButton.disabled = true;
  }

  initTelFields() {
    this.fields.forEach((field) => {
      if (field.type == "tel") {
        new TelField(field);
      }
    });
  }

  initLocationFields() {
    let stateField = false;
    let cityField = false;

    this.fields.forEach((field) => {
      if (field.dataset.locationField == "state") {
        stateField = field;
      }
    });

    this.fields.forEach((field) => {
      if (field.dataset.locationField == "city") {
        cityField = field;
      }
    });

    if (stateField) {
      new LocationFields(stateField, cityField);
    }
  }

  listenFormEvents() {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.submit();
      this.form.reset();
    });
  }
}

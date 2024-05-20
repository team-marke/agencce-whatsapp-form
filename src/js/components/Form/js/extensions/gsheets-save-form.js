import Form from "../form";

/**
 * Form for saving the data in to a Google Sheet
 * @param {HTMLFormElement} - The form element itself
 */
export default class GsheetsSaveForm extends Form {
  constructor(form) {
    super(form);
    this.fileId = form.dataset.fileId;
    console.dir(this.submitButton)
  }

  getDate() {
    return new Date().toLocaleDateString();
  }

  getFormData() {
    let data = {};
    this.fields.forEach((field) => {
      if (!field.value) return;
      data[field.dataset.gsheetField] = field.value;
    });
    data["Data"] = this.getDate();
    return data;
  }

  async submit() {
    let submitBtnOldValue = this.submitButton.innerHTML;
    this.submitButton.innerHTML = "Enviando...";
    try {
      const url = `https://api.apispreadsheets.com/data/${this.fileId}`;
      const headers = { "Content-Type": "application/json" };
      const body = JSON.stringify({
        data: this.getFormData(),
      });
      const res = await fetch(url, {
        method: "POST",
        headers: headers,
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
    this.submitButton.innerHTML = submitBtnOldValue;
    this.submitButton.disabled = true;
  }
}

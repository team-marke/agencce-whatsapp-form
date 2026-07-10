import Form from "../form";

/**
 * Form for saving the data in to a Google Sheet
 * @param {HTMLFormElement} - The form element itself
 */
export default class GsheetsSaveForm extends Form {
  constructor(form) {
    super(form);
    this.fileId = form.dataset.fileId;
    this.submitUrl = form.dataset.submitUrl;
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
    const submitBtnOldValue = this.submitButton.innerHTML;
    this.submitButton.innerHTML = "Enviando...";
    this.submitButton.disabled = true;

    try {
      const url =
        this.submitUrl ||
        `https://api.apispreadsheets.com/data/${this.fileId}`;
      const headers = { "Content-Type": "application/json" };
      const body = JSON.stringify({
        data: this.getFormData(),
      });
      const res = await fetch(url, {
        method: "POST",
        headers: headers,
        body: body,
      });

      if (!res.ok) {
        throw new Error(`Falha ao enviar o formulário (HTTP ${res.status})`);
      }

      this.dispatchSubmitEvent();
      this.form.reset();
      console.log(res);
      this.redirectURL();
    } catch (error) {
      console.error(error);
      window.alert(
        "Não foi possível enviar o formulário. Confira sua conexão e tente novamente."
      );
    } finally {
      this.submitButton.innerHTML = submitBtnOldValue;
      this.submitButton.disabled = false;
    }
  }
}

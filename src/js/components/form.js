export default class Form {
  constructor({ id, fields, fileId, redirect, submitEventName }) {
    this.id = id;
    this.fields = fields;
    this.fileId = fileId;
    this.redirect = redirect;
    this.submitEventName = submitEventName;
  }

  getFields() {
    let str = "";
    for (const field of this.fields) {
      str += `<div class="col-${field.size ? field.size : "3"}">`;
      switch (field.type) {
        case "select":
          str += this.getSelectField(field);
          break;
        case "select-location-state":
          str += this.getLocationStateField(field);
          break;
        case "select-location-city":
          str += this.getLocationCityField(field);
          break;
        default:
          str += this.getGenericField(field);
      }
      str += "</div>";
    }
    return str;
  }

  getSelectField(field) {
    return `
      <label for="${field.id}">${field.label}</label>
      <select 
        class="form__select" 
        id="${field.id}" 
        data-gsheet-field="${field.gsheetField}"
        required
      >
      ${this.getSelectOptions(field)}
      </select>
    `;
  }

  getLocationCityField(field) {
    return `
      <label for="${field.id}">${field.label}</label>
      <select data-location="true" data-location-field="city" class="form__select" id="${field.id}" data-gsheet-field="${field.gsheetField}" disabled required></select>
    `;
  }

  getLocationStateField(field) {
    return `
      <label for="${field.id}">${field.label}</label>
      <select data-location="true" data-location-field="state" class="form__select" id="${field.id}" data-gsheet-field="${field.gsheetField}" required></select>
    `;
  }

  getGenericField(field) {
    return `
      <label for="${field.id}">${field.label}</label>
      <input type="${field.type}" class="form__input" id="${
      field.id
    }" data-gsheet-field="${field.gsheetField}" ${this.getPlaceholder(field)}" required>
    `;
  }

  getSelectOptions(field) {
    let str = "";
    for (const option of field.options) {
      str += `<option value="${option.value}" ${
        option.selected ? "selected" : ""
      } ${option.disabled ? "disabled" : ""}>${option.text}</option>`;
    }
    return str;
  }

  getPlaceholder(field) {
    if (field.placeholder) {
      return `placeholder="${field.placeholder}"`;
    }
    return "";
  }

  render() {
    return `
      <form id="${this.id}" class="form-submit" data-file-id="${
      this.fileId
    }" data-redirect="${this.redirect}" data-submit-event-name=${this.submitEventName}>
        <div class="row g-3">
        ${this.getFields()}
        <div class="col-12">
          <button type="submit" class="button">Enviar</button>
        </div>
        </div>
      </form>
    `;
  }
}

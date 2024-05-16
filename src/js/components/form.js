export default class Form {
  constructor({ id, fields, fileId, redirect }) {
    this.id = id;
    this.fields = fields;
    this.fileId = fileId;
    this.redirect = redirect;
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
      <label for="${field.id}" class="form-label">${field.label}</label>
      <select 
        class="form-select form__select" 
        id="${field.id}" 
        data-gsheet-field="${field.gsheetField}"
      >
      ${this.getSelectOptions(field)}
      </select>
    `;
  }

  getLocationCityField(field) {
    return `
      <label for="${field.id}" class="form-label">${field.label}</label>
      <select data-location="true" data-location-field="city" class="form-select form__select" id="${field.id}" data-gsheet-field="${field.gsheetField}" disabled></select>
    `;
  }

  getLocationStateField(field) {
    return `
      <label for="${field.id}" class="form-label">${field.label}</label>
      <select data-location="true" data-location-field="state" class="form-select form__select" id="${field.id}" data-gsheet-field="${field.gsheetField}"></select>
    `;
  }

  getGenericField(field) {
    return `
      <label for="${field.id}" class="form-label">${field.label}</label>
      <input type="${field.type}" class="form-control form__control" id="${
      field.id
    }" data-gsheet-field="${field.gsheetField}" ${this.getPlaceholder(field)}">
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
      <form id="${this.id}" class="form" data-file-id="${
      this.fileId
    }" data-redirect="${this.redirect}">
        <div class="row g-3">
        ${this.getFields()}
        <div class="col">
          <button type="submit" class="btn btn-primary text-white">Enviar</button>
        </div>
        </div>
      </form>
    `;
  }
}

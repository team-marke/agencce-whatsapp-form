export default class Form {
  constructor({ id, fields }) {
    this.id = id;
    this.fields = fields;
  }

  getFields() {
    let str = "";
    for (const field of this.fields) {
      str += `
        <div class="mb-3">
          <label for="${field.id}" class="form-label">${field.label}</label>
          <input type="${field.type}" class="form-control" id="${field.id}">
        </div>
      `;
    }
    return str;
  }

  render() {
    return `
      <form id="${this.id}">
        ${this.getFields()}
        <button type="submit" class="btn btn-primary">Enviar</button>
      </form>
    `;
  }
}

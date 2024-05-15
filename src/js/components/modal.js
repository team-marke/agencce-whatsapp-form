export default class Modal {
  constructor({ id, header, body }) {
    this.id = id;
    this.header = header;
    this.body = body;
  }

  render() {
    return `
      <div class="modal fade" tabindex="-1" id="${this.id}">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <div class="modal-title">${this.header}</div>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              ${this.body}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

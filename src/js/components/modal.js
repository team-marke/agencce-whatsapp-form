export default class Modal {
  constructor({ id, body }) {
    this.id = id;
    this.body = body;
  }

  render() {
    return `
      <div class="modal fade" tabindex="-1" id="${this.id}">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <div class="modal-title h3">Preencha os campos abaixo para iniciar a conversa pelo <strong>WhatsApp</strong></div>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">x</button>
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

// Import our custom CSS
import "../scss/styles.scss";

import Form from "./components/form";
import Modal from "./components/modal";
import Btn from "./components/btn";

const renderElements = () => {
  // Instâncias Cliente
  const formCliente = new Form({
    id: "cliente-form",
    fields: [
      {
        type: "text",
        id: "contact-name",
        label: "Nome",
        name: "name",
      },
      {
        type: "email",
        id: "contact-email",
        label: "Email",
        name: "email",
      },
      {
        type: "tel",
        id: "contact-phone",
        label: "Telefone",
        name: "phone",
      },
    ],
  });

  const modalCliente = new Modal({
    id: "cliente-modal",
    header: "Preencha o formulário para falar com o nosso especialista.",
    body: formCliente.render(),
  });

  const btnCliente = new Btn({
    text: "Para cliente",
    id: "cliente-btn",
    target: "cliente-modal",
  });

  // Instâncias Candidato
  const formCandidato = new Form({
    id: "candidato-form",
    fields: [
      {
        type: "text",
        id: "contact-name",
        label: "Nome",
        name: "name",
      },
      {
        type: "tel",
        id: "contact-phone",
        label: "Telefone",
        name: "phone",
      },
    ],
  });

  const modalCandidato = new Modal({
    id: "candidato-modal",
    header: "Preencha o formulário para falar com o nosso especialista.",
    body: formCandidato.render(),
  });

  const btnCandidato = new Btn({
    text: "Para candidato",
    id: "candidato-btn",
    target: "candidato-modal",
  });

  const btnWrapper = document.createElement("div");
  btnWrapper.classList.add('agencce-whatsapp-form-btns')
  btnWrapper.innerHTML += btnCandidato.render();
  btnWrapper.innerHTML += btnCliente.render();

  const modalWrapper = document.createElement("div");
  modalWrapper.innerHTML += modalCandidato.render();
  modalWrapper.innerHTML += modalCliente.render();

  document.body.appendChild(modalWrapper);
  document.body.appendChild(btnWrapper);
};

const loadModal = async () => {
  if (document.querySelector(".modal")) {
    await import("bootstrap/js/dist/modal");
  }
};

renderElements();
loadModal();

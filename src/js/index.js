import "../scss/styles.scss";

import Form from "./components/form";
import Modal from "./components/modal";
import Btn from "./components/btn";
import GsheetsSaveForm from "./components/Form/js/extensions/gsheets-save-form";
import defaultOptions from "./components/defaultOptions";
import { Modal as BsModal } from "bootstrap";

const renderElements = () => {
  // Instâncias Cliente
  const formCliente = new Form({
    id: "form-cliente",
    fileId: "1skNCp7uN6YK46MC",
    redirect: "https://wa.me/5551996412233",
    fields: [
      {
        type: "text",
        id: "form-cliente-nome",
        label: "Nome",
        gsheetField: "Nome",
        size: 6,
      },
      {
        type: "tel",
        id: "form-cliente-telefone",
        label: "Telefone",
        gsheetField: "Telefone",
        placeholder: "51999999",
        size: 6,
      },
      {
        type: "select-location-state",
        id: "form-cliente-estado",
        label: "Estado",
        gsheetField: "Estado",
        size: 6,
      },
      {
        type: "select-location-city",
        id: "form-cliente-cidade",
        label: "Cidade",
        gsheetField: "Cidade",
        size: 6,
      },
      {
        type: "select",
        id: "form-cliente-profissional",
        label: "Profissional de interesse",
        gsheetField: "Profissional de interesse",
        options: defaultOptions,
        size: 12,
      },
    ],
  });

  const modalCliente = new Modal({
    id: "cliente-modal",
    body: formCliente.render(),
  });

  const btnCliente = new Btn({
    text: "Para cliente",
    id: "cliente-btn",
    target: "cliente-modal",
  });

  // Instâncias Candidato
  const formCandidato = new Form({
    id: "form-candidato",
    fileId: "5gr3x50IXLh9aABm",
    redirect: "https://wa.me/5551998666622",
    fields: [
      {
        type: "text",
        id: "form-candidato-nome",
        label: "Nome",
        gsheetField: "Nome",
        size: 6,
      },
      {
        type: "tel",
        id: "form-candidato-telefone",
        label: "Telefone",
        gsheetField: "Telefone",
        placeholder: "51999999",
        size: 6,
      },
      {
        type: "select-location-state",
        id: "form-candidato-estado",
        label: "Estado",
        gsheetField: "Estado",
        size: 6,
      },
      {
        type: "select-location-city",
        id: "form-candidato-cidade",
        label: "Cidade",
        gsheetField: "Cidade",
        size: 6,
      },
      {
        type: "select",
        id: "form-candidato-vaga",
        label: "Vaga de interesse",
        gsheetField: "Vaga de interesse",
        options: defaultOptions,
        size: 12,
      },
    ],
  });

  const modalCandidato = new Modal({
    id: "candidato-modal",
    body: formCandidato.render(),
  });

  const btnCandidato = new Btn({
    text: "Para candidato",
    id: "candidato-btn",
    target: "candidato-modal",
  });

  const btnWrapper = document.createElement("div");
  btnWrapper.classList.add("agencce-whatsapp-form-btns");
  btnWrapper.innerHTML += btnCandidato.render();
  btnWrapper.innerHTML += btnCliente.render();

  const modalWrapper = document.createElement("div");
  modalWrapper.innerHTML += modalCandidato.render();
  modalWrapper.innerHTML += modalCliente.render();

  document.body.appendChild(modalWrapper);
  document.body.appendChild(btnWrapper);
};

const loadForm = () => {
  if (document.querySelector(".form")) {
    const elements = Array.from(document.querySelectorAll(".form"));
    for (const element of elements) {
      console.log(element);
      new GsheetsSaveForm(element);
    }
  }
};

const loadLinkInterceptors = () => {
  const a = document.querySelector('a[href="tel:+5551996412233"]');
  console.log(a);
  a.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#candidato-btn").click();
  });
};

window.addEventListener("load", (event) => {
  renderElements();
  loadForm();
  loadLinkInterceptors();
});

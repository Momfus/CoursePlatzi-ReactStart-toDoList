import "./Modal.css";
import React from "react";
import ReactDOM from "react-dom"; // Se usa la "maquina de react" para renderizar el modal

function Modal({ children }) {
  // Permite estilizar el modal de lo que recibe y se use en otros lados
  return ReactDOM.createPortal(
    <div className="ModalBackground">{children}</div>,
    document.getElementById("modal")
  ); // Donde se va a hacer la "teletransportación"
}

export { Modal };

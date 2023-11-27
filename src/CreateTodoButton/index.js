import React from "react";
import "./CreateTodoButton.css";

function CreateTodoButton({ setOpenModal, openModal }) {
  return (
    <button
      className="CreateTodoButton"
      onClick={() => setOpenModal(!openModal)} // Otra forma es con state => !state (enviar una función usando el estado anterior y lo cambia)
    >
      +
    </button>
  );
}

export { CreateTodoButton };

import React from "react";
import { useStorageListener } from "./useStorageListener";
import "./ChangeAlert.css";

// Se utiliza HOC para poder escuchar los cambios en el localStorage (agrega funcionalidad a un componente)
function ChangeAlert({ sincronize }) {
  const { show, toggleShow } = useStorageListener(sincronize);

  if (show) {
    return (
      <div className="ChangeAlert-bg">
        <div className="ChangeAlert-container">
          <p>Parece que cambiaste tus TODOs en otra pestaña o ventana</p>
          <button
            className="TodoForm-button TodoForm-button--add"
            onClick={() => toggleShow(false)}
          >
            Recargar
          </button>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export { ChangeAlert };

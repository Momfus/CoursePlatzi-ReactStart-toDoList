import React from "react";
import "./TodoCounter.css";

function TodoCounter({ loading, totalTodos, completedTodos }) {
  let htmlRender;

  htmlRender = loading ? (
    <>Cargando...</>
  ) : totalTodos !== completedTodos ? (
    <>
      Haz completado <br /> <span>{completedTodos}</span> de{" "}
      <span>{totalTodos}</span> TODOs
    </>
  ) : (
    <>¡Haz completado todas las tareas!</>
  );

  return (
    <div className="mainCounter">
      <h1>{htmlRender}</h1>
    </div>
  );
}

export { TodoCounter };

import React from "react";
import { TodoContext } from "../TodoContext";

function EmptyTodos() {
  const { totalTodos } = React.useContext(TodoContext);

  return totalTodos === 0 ? (
    <p>Crea tu primer TODO</p>
  ) : (
    <p>No se encontraron resultados</p>
  );
}

export { EmptyTodos };

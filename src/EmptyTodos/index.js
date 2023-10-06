import React from "react";

function EmptyTodos() {
  const { totalTodos } = {};

  return totalTodos === 0 ? (
    <p>Crea tu primer TODO</p>
  ) : (
    <p>No se encontraron resultados</p>
  );
}

export { EmptyTodos };

import "./TodoSearch.css";
import React from "react";

function TodoSearch() {
  const [searchValue, setSearchValue] = React.useState(""); // Nomeclatura: state, setState

  console.log("Los usuarios buscan todos de " + searchValue);
  return (
    <input
      placeholder="Cortar cebolla"
      value={searchValue}
      onChange={(event) => {
        setSearchValue(event.target.value); // Usar el callback del cambio de estado
      }}
    />
  );
}

export { TodoSearch };

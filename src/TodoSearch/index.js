import "./TodoSearch.css";
import React from "react";

function TodoSearch({ searchValue, setSearchValue }) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <input
        placeholder="Cortar cebolla"
        value={searchValue}
        onChange={(event) => {
          setSearchValue(event.target.value); // Usar el callback del cambio de estado
        }}
      />
    </div>
  );
}

export { TodoSearch };

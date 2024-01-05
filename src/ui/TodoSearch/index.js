import "./TodoSearch.css";
import React from "react";

function TodoSearch({ loading, searchValue, setSearchValue }) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <input
        className="TodoSearch"
        placeholder="Filtrar..."
        value={searchValue}
        onChange={(event) => {
          setSearchValue(event.target.value); // Usar el callback del cambio de estado
        }}
        disabled={loading}
      />
    </div>
  );
}

export { TodoSearch };

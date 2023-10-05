import "./TodoSearch.css";
import React from "react";

function TodoSearch({ searchValue, setSearchValue, loading }) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <input
        placeholder="Filtrar..."
        value={searchValue}
        onChange={(event) => {
          setSearchValue(event.target.value); // Usar el callback del cambio de estado
        }}
        disabled={loading ? true : false}
      />
    </div>
  );
}

export { TodoSearch };

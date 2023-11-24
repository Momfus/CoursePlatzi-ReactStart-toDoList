import React from "react";

function TodoHeader({ children, loading }) {
  return (
    <header>
      {
        // El React.Children nos ayuda a comprender el objeto children sin importar la cantidad de elementos tenga (tiene varios elementos child dentro el header por ejemplo)
        React.Children.toArray(children).map((child) =>
          // Se señala el primer elemento que se clona y el segundo argumento que propiedades queremos que tenga
          React.cloneElement(child, { loading })
        )
      }
    </header>
  );
}

export { TodoHeader };

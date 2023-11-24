import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";

// Esto es una prueba de HOC (high order component)
function App(props) {
  return (
    <h1>
      ¡{props.saludo} {props.nombre}!
    </h1>
  );
}

// Con "with" se indica que inyección se hará al componente (nomenclatura de React)
function withSaludo(WrappedComponent) {
  return function WrappedComponentWithSaludo(saludo) {
    return function ComponenteDeVerdad(props) {
      return (
        <>
          <WrappedComponent {...props} saludo={saludo} />
          <p>Estamos Acompañando al WrapperdComponent</p>
        </>
      );
    };
  };
}

// Se nombre según combinación de componentes (nombenclatura   )
const AppWithSaludo = withSaludo(App)("Buenas"); // Segundo parámetro es el saludo para el HOC, importante el orden de como se van haciendo las inyecciones, primero el componente
const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App saludo="Hola" nombre="Momfus" />);
root.render(<AppWithSaludo nombre="Arboleo" />);

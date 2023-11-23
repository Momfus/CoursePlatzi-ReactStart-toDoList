import React from "react"; // Necesario para usar react.fragment (sirve para no generar un nodo adicional en el DOM)
import { AppUi } from "./AppUi";
import { TodoProvider } from "../TodoContext";

function App() {
  return (
    <TodoProvider>
      <AppUi />
    </TodoProvider>
  );
}

export default App;

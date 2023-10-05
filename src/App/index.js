import React from "react"; // Necesario para usar react.fragment (sirve para no generar un nodo adicional en el DOM)
import { AppUi } from "./AppUi";
import { TodoProvider } from "../TodoContext";

// Como hay una carpeta con ese nombre que tiene un archivo que exporte en un index.js --> lo toma igual
//import {RxCheck} from 'react-icons/rx' // si uno quiere para iconos generales, usar npm install react-icons --save

function App() {
  return (
    // Ahora todo se comparte por el Context en TodoContext con TodoProvider

    <TodoProvider>
      <AppUi />
    </TodoProvider>
  );
}

export default App;

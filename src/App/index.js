import React from "react"; // Necesario para usar react.fragment (sirve para no generar un nodo adicional en el DOM)
import { AppUi } from "./AppUi";

// Como hay una carpeta con ese nombre que tiene un archivo que exporte en un index.js --> lo toma igual
//import {RxCheck} from 'react-icons/rx' // si uno quiere para iconos generales, usar npm install react-icons --save
import { useLocalStorage } from "./userLocalStorage";

function App() {
  const [todos, saveTodos] = useLocalStorage("TODOS_V1", []); // Lo que destructuramos (variables, estados y funciones) podemos colocar el nombre que queramos
  const [searchValue, setSearchValue] = React.useState(""); // Nomeclatura: state, setState

  const completedTodos = todos.filter((todo) => !!todo.completed).length; // todo.completed === true; el simbolo !! lo convierte en booleano en caso que haya string o un valor cualquiera
  const totalTodos = todos.length;

  const searchedTodos = todos.filter((todo) => {
    const todoText = todo.text.toLowerCase();
    const searchText = searchValue.toLowerCase();
    return todoText.includes(searchText);
  });

  const completeTodo = (text) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex((todo) => todo.text === text);
    const previousState = newTodos[todoIndex].completed;
    newTodos[todoIndex].completed = !previousState;
    saveTodos(newTodos);
  };

  const deleteTodo = (text) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex((todo) => todo.text === text);
    newTodos.splice(todoIndex, 1); // Lo saca del arreglo
    saveTodos(newTodos);
  };

  return (
    // Se envia todo como props y así se separá la lógica de lo que se muestra en renderizado
    <AppUi
      completedTodos={completedTodos}
      searchValue={searchValue}
      totalTodos={totalTodos}
      setSearchValue={setSearchValue}
      searchedTodos={searchedTodos}
      completeTodo={completeTodo}
      deleteTodo={deleteTodo}
    />
  );
}

export default App;

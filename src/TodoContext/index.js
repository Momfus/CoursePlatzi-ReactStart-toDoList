import React from "react";
import { useLocalStorage } from "./userLocalStorage";

// Esto permite compartir props en diferentes capas de los componentes sin tener que ir pasandolo entre varios hijos
const TodoContext = React.createContext();

function TodoProvider({ children }) {
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStorage("TODOS_V1", []); // Lo que destructuramos (variables, estados y funciones) podemos colocar el nombre que queramos
  const [searchValue, setSearchValue] = React.useState(""); // Nomeclatura: state, setState

  const [openModal, setOpenModal] = React.useState(false);

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
    <TodoContext.Provider
      value={{
        loading,
        error,
        completedTodos,
        totalTodos,
        searchValue,
        setSearchValue,
        searchedTodos,
        completeTodo,
        deleteTodo,
        openModal,
        setOpenModal,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };

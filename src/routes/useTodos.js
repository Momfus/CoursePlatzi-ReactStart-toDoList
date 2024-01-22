import React from "react";
import { useLocalStorage } from "./useLocalStorage";

// En versión pasado se uso context, ahora se usará un custom hook
function useTodos() {
  const {
    item: todos,
    saveItem: saveTodos,
    sincronizeItem: sincronizeTodos,
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

  const addTodo = (text) => {
    const newTodos = [...todos];
    newTodos.push({
      text,
      completed: false,
    });

    saveTodos(newTodos);
  };

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

  const state = {
    loading,
    error,
    completedTodos,
    totalTodos,
    searchValue,
    searchedTodos,
    openModal,
  };

  const stateUpdaters = {
    setSearchValue,
    addTodo,
    completeTodo,
    deleteTodo,
    setOpenModal,
    sincronizeTodos,
  };

  return {
    state,
    stateUpdaters,
  };
}

export { useTodos };

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
  } = useLocalStorage("TODOS_V2", []); // Lo que destructuramos (variables, estados y funciones) podemos colocar el nombre que queramos
  const [searchValue, setSearchValue] = React.useState(""); // Nomeclatura: state, setState

  const completedTodos = todos.filter((todo) => !!todo.completed).length; // todo.completed === true; el simbolo !! lo convierte en booleano en caso que haya string o un valor cualquiera
  const totalTodos = todos.length;

  const searchedTodos = todos.filter((todo) => {
    const todoText = todo.text.toLowerCase();
    const searchText = searchValue.toLowerCase();
    return todoText.includes(searchText);
  });

  const addTodo = (text) => {
    const newTodos = [...todos];
    const id = newTodoId(newTodos);
    newTodos.push({
      text,
      completed: false,
      id,
    });

    saveTodos(newTodos);
  };

  const completeTodo = (id) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex((todo) => todo.id === id);
    const previousState = newTodos[todoIndex].completed;
    newTodos[todoIndex].completed = !previousState;
    saveTodos(newTodos);
  };

  const editTodo = (id, newText) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex((todo) => todo.id === id);
    newTodos[todoIndex].text = newText;
    saveTodos(newTodos);
  };

  const deleteTodo = (id) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex((todo) => todo.id === id);
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
  };

  const stateUpdaters = {
    setSearchValue,
    addTodo,
    completeTodo,
    editTodo,
    deleteTodo,
    sincronizeTodos,
  };

  return {
    state,
    stateUpdaters,
  };
}

const newTodoId = (todoList) => {
  const idList = todoList.map((todo) => todo.id);
  const idMax = idList.length > 0 ? Math.max(...idList) : -1; // Obtener el id más grande y de ahi va armando los nuevos
  return idMax + 1;
};

export { useTodos };

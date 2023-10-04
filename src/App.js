import React from "react"; // Necesario para usar react.fragment (sirve para no generar un nodo adicional en el DOM)

import { TodoCounter } from "./TodoCounter";
import { TodoSearch } from "./TodoSearch";
import { TodoList } from "./TodoList";
import { TodoItem } from "./TodoItem";
import { CreateTodoButton } from "./CreateTodoButton";
//import {RxCheck} from 'react-icons/rx' // si uno quiere para iconos generales, usar npm install react-icons --save

function useLocalStorage(itemName, initialValue) {
  // Por convención, en react, los custom hooks se usa el prefijo "use"
  const localStorageItem = localStorage.getItem(itemName);
  let parsedItems;

  if (!localStorageItem) {
    localStorage.setItem(itemName, JSON.stringify(initialValue));
    parsedItems = initialValue;
  } else {
    parsedItems = JSON.parse(localStorageItem);
  }

  const [item, setItem] = React.useState(parsedItems); // Estado interno del esta custom hook (se coloca aca porque puede tener un valor inicial vacio como el indicado anteriormente)

  const saveItem = (newItem) => {
    localStorage.setItem(itemName, JSON.stringify(newItem));
    setItem(newItem);
  };

  return [item, saveItem]; // Asi se exporta para poder usarlo en otro lado (el estado y la función)
}

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
    <React.Fragment>
      <TodoCounter completed={completedTodos} total={totalTodos} />
      <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />

      <br />

      <TodoList>
        {searchedTodos.map((todo) => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)} // Se envuelve la función en otra para ejecutarse solamente cuando se require (sino hace un etorno loop)
            onDelete={() => deleteTodo(todo.text)}
          />
        ))}
      </TodoList>

      <CreateTodoButton />
    </React.Fragment>
  );
}

export default App;

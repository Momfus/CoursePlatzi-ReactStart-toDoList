import React from "react";
import { useNavigate } from "react-router-dom";
import { useTodos } from "../useTodos";
import { TodoSearch } from "../../ui/TodoSearch";
import { TodoList } from "../../ui/TodoList";
import { TodoItem } from "../../ui/TodoItem";
import { TodosLoading } from "../../ui/TodosLoading";
import { TodosError } from "../../ui/TodosError";
import { EmptyTodos } from "../../EmptyTodos";
import { CreateTodoButton } from "../../CreateTodoButton";
import { TodoHeader } from "../../ui/TodoHeader";
import { TodoCounter } from "../../ui/TodoCounter";
import { ChangeAlert } from "../../ChangeAlert";

function HomePage() {
  const navigate = useNavigate();
  const { state, stateUpdaters } = useTodos();

  const {
    loading,
    error,
    completedTodos,
    totalTodos,
    searchValue,
    searchedTodos,
  } = state;

  const { setSearchValue, completeTodo, deleteTodo, sincronizeTodos } =
    stateUpdaters;

  return (
    <>
      <TodoHeader loading={loading}>
        <TodoCounter totalTodos={totalTodos} completedTodos={completedTodos} />
        <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />
      </TodoHeader>

      <br />

      {/* Se aplica el patrón "render props" que sirve para renderizar según lo que se va necesitando  */}
      <TodoList
        error={error}
        loading={loading}
        searchedTodos={searchedTodos}
        totalTodos={totalTodos}
        searchValue={searchValue}
        onError={() => <TodosError />} // Esto es un render prop y similares
        onLoading={() => <TodosLoading />}
        onEmptyTodos={() => <EmptyTodos />}
        onEmptySearchResults={(searchText) => (
          <p>No hay resultados para {searchText}</p>
        )}
      >
        {/* Por cada TODO que tenemos, renderizamos un TodoItem */}
        {(todo) => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
            onEdit={() => navigate("/edit/" + todo.id, {
              state: { todo } // Se pasa la informacion del mismo todo directamente para evitar mas tiempos de carga
            })}
          />
        )}
      </TodoList>

      <CreateTodoButton onClick={() => navigate("/new")} />

      <ChangeAlert sincronize={sincronizeTodos} />
    </>
  );
}

export { HomePage };

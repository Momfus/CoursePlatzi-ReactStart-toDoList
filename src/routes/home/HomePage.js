import React from "react";
import { useTodos } from "../useTodos";
import { TodoSearch } from "../../ui/TodoSearch";
import { TodoList } from "../../ui/TodoList";
import { TodoItem } from "../../ui/TodoItem";
import { TodosLoading } from "../../ui/TodosLoading";
import { TodosError } from "../../ui/TodosError";
import { EmptyTodos } from "../../EmptyTodos";
import { CreateTodoButton } from "../../CreateTodoButton";
import { Modal } from "../../Modal";
import { TodoForm } from "../../ui/TodoForm";
import { TodoHeader } from "../../ui/TodoHeader";
import { TodoCounter } from "../../ui/TodoCounter";
import { ChangeAlert } from "../../ChangeAlert";

function HomePage() {
  const { state, stateUpdaters } = useTodos();

  const {
    loading,
    error,
    completedTodos,
    totalTodos,
    searchValue,
    searchedTodos,
    openModal,
  } = state;

  const {
    setSearchValue,
    addTodo,
    completeTodo,
    deleteTodo,
    setOpenModal,
    sincronizeTodos,
  } = stateUpdaters;

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
        // Lo de abajo es para hacer por render props
        // render={(todo) => (
        //   <TodoItem
        //     key={todo.text}
        //     text={todo.text}
        //     completed={todo.completed}
        //     onComplete={() => completeTodo(todo.text)}
        //     onDelete={() => deleteTodo(todo.text)}
        //   />
        // )}
      >
        {/* Por cada TODO que tenemos, renderizamos un TodoItem */}
        {(todo) => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
            onEdit={() => console.log("Editando")}
          />
        )}
      </TodoList>

      <CreateTodoButton setOpenModal={setOpenModal} openModal={openModal} />
      {openModal && (
        <Modal>
          <TodoForm addTodo={addTodo} setOpenModal={setOpenModal}></TodoForm>
        </Modal>
      )}

      <ChangeAlert sincronize={sincronizeTodos} />
    </>
  );
}

export { HomePage };

import React from "react";
import { useTodos } from "./useTodos";
import { TodoSearch } from "../TodoSearch";
import { TodoList } from "../TodoList";
import { TodoItem } from "../TodoItem";
import { TodosLoading } from "../TodosLoading";
import { TodosError } from "../TodosError";
import { EmptyTodos } from "../EmptyTodos";
import { CreateTodoButton } from "../CreateTodoButton";
import { Modal } from "../Modal";
import { TodoForm } from "../TodoForm";
import { TodoHeader } from "../TodoHeader";
import { TodoCounter } from "../TodoCounter";

function App() {
  const {
    loading,
    error,
    searchedTodos,
    completeTodo,
    deleteTodo,
    openModal,
    totalTodos,
    completedTodos,
    searchValue,
    setSearchValue,
    addTodo,
    setOpenModal,
  } = useTodos();

  return (
    <>
      <TodoHeader>
        <TodoCounter
          loading={loading}
          totalTodos={totalTodos}
          completedTodos={completedTodos}
        />
        <TodoSearch
          loading={loading}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </TodoHeader>

      <br />
      <TodoList>
        {loading && (
          <>
            <TodosLoading />
            <TodosLoading />
            <TodosLoading />
          </>
        )}
        {error && <TodosError />}
        {!loading && searchedTodos.length === 0 && (
          <EmptyTodos totalTodos={totalTodos} />
        )}

        {searchedTodos.map((todo) => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        ))}
      </TodoList>

      <CreateTodoButton setOpenModal={setOpenModal} openModal={openModal} />
      {openModal && (
        <Modal>
          <TodoForm addTodo={addTodo} setOpenModal={setOpenModal}></TodoForm>
        </Modal>
      )}
    </>
  );
}

export default App;

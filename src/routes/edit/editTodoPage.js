import React from "react";
import { TodoForm } from "../../ui/TodoForm";
import { useTodos } from "../useTodos";
import { useParams } from "react-router-dom";

function EditTodoPage() {

  const params = useParams();

  const id = Number(params.id); // Por como se eta haciendo aca, se hace con un numero el id, normalmente es string

  const { stateUpdaters } = useTodos();
  const {editTodo} = stateUpdaters;

  return (
    <TodoForm
      label="Edita tu TODO"
      submitText="Editar"
      submitEvent={(newText) => editTodo(id, newText)}
    />
  );
}

export { EditTodoPage };

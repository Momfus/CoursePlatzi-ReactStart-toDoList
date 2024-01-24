import React from "react";
import { TodoForm } from "../../ui/TodoForm";
import { useTodos } from "../useTodos";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function EditTodoPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const id = Number(params.id); // Por como se eta haciendo aca, se hace con un numero el id, normalmente es string

  const { state, stateUpdaters } = useTodos();
  const { loading, getTodo } = state;
  const { editTodo } = stateUpdaters;

  let todoText;

  try {

    // EN caso que se tenga la informacion, no hace falta esperar que cargue ya que lo trae la misma navegacion
    if( location.state?.todo ) {
      todoText = location.state.todo.text;
    } else if(loading) {
      return <p>Cargando...</p>
    } else {
      const todo = getTodo(id);
      todoText = todo.text;
    }
  
  
    return (
      <TodoForm
        label="Edita tu TODO"
        defaultTodoText={todoText}
        submitText="Editar"
        submitEvent={(newText) => editTodo(id, newText)}
      />
    );
    
  } catch (error) {
    console.error(`Item with id ${id} not found`);
    navigate("/notFound")
  }

}

export { EditTodoPage };

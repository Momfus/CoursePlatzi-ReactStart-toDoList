import React from "react";
import { useNavigate } from "react-router-dom";
import "./TodoForm.css";

function TodoForm(props) {
  const navigate = useNavigate();
  // Para manejar los valores (no esta en el contexto porque no es necesario todo lo se hace en el formulario en este caso)
  const [newTodoValue, setNewTodoValue] = React.useState(props.defaultTodoText || "");

  const onSubmit = (event) => {
    event.preventDefault();
    props.submitEvent(newTodoValue);
    navigate("/");
  };

  const onCancel = () => {
    navigate("/");
  };

  const onChange = (event) => {
    setNewTodoValue(event.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <label>{props.label}</label>
      <textarea
        placeholder="Escribe el nombre de tu TODO..."
        value={newTodoValue}
        onChange={onChange}
      />

      <div className="TodoForm-buttonContainer">
        <button
          type="button"
          className="TodoForm-button TodoForm-button--cancel"
          onClick={onCancel}
        >
          Cancelar
        </button>
        <button type="submit" className="TodoForm-button TodoForm-button--add">
          {props.submitText}
        </button>
      </div>
    </form>
  );
}

export { TodoForm };

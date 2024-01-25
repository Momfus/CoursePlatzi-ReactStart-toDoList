export const newTodoId = (todoList) => {
  const idList = todoList.map((todo) => todo.id);
  Math.max(...idList); // Obtener
};

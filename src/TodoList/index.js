import "./TodoList.css";

function TodoList(props) {
  console.log("test > ", props.searchedTodos);
  console.log("test > ", props.render);
  return (
    <section className="TodoList-container">
      {props.error && props.onError()}
      {props.loading && props.onLoading()}
      {!props.loading &&
        props.searchedTodos.length === 0 &&
        props.onEmptyTodos()}
      {props.searchedTodos.map(props.render)}
      {/* Lo de arriba --> Equivalente a poner (todo) => props.render(todo) */}
      <ul className="TodoList">{props.children}</ul>
    </section>
  );
}

export { TodoList };

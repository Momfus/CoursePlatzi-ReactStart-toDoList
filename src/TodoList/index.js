import "./TodoList.css";

function TodoList(props) {
  return (
    <section className="TodoList-container">
      {props.error && props.onError()}
      {props.loading && props.onLoading()}
      {!props.loading && !props.totalTodos && props.onEmptyTodos()}
      {!!props.totalTodos &&
        !props.searchedTodos.length &&
        props.onEmptySearchResults(props.searchValue)}

      {/* Lo de abajo --> Equivalente a poner (todo) => props.render(todo) */}
      {props.children
        ? props.searchedTodos.map(props.children)
        : props.searchedTodos.map(props.render)}
      {/* Lo de arriba --> Se hace para que use si tiene un hijo (elementro entre etiquetas) y más versatil si se envia como "render props" la función render como un atributo mas */}
    </section>
  );
}

export { TodoList };

import "./TodoList.css";

function TodoList(props) {
  const renderFunc = props.children || props.render;

  return (
    <section className="TodoList-container">
      {props.error && props.onError()}
      {props.loading && props.onLoading()}
      {!props.loading && !props.totalTodos && props.onEmptyTodos()}
      {!!props.totalTodos &&
        !props.searchedTodos.length &&
        props.onEmptySearchResults(props.searchValue)}

      {!props.loading && !props.error && props.searchedTodos.map(renderFunc)}
      {/* Lo de arriba --> Se hace para que use si tiene un hijo (elementro entre etiquetas) y más versatil si se envia como "render props" la función render como un atributo mas */}
    </section>
  );
}

export { TodoList };

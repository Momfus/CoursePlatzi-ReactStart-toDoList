import "./TodoList.css";

function TodoList({ children }) {
  // props.children o directametne {children} al destructurar (react automaticamente convierte en children lo que este entre tags)
  return <ul className="TodoList">{children}</ul>;
}

export { TodoList };

import "./TodoCounter.css";

function TodoCounter({ total, completed }) {
  return (
    <div className="mainCounter">
      <h1>
        Haz completado <br /> <span>{completed}</span> de <span>{total}</span>{" "}
        TODOs
      </h1>
    </div>
  );
}

export { TodoCounter };

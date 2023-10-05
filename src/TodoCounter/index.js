import "./TodoCounter.css";

function TodoCounter({ total, completed, loading }) {
  let htmlRender;

  htmlRender = loading ? (
    <>Cargando...</>
  ) : total !== completed ? (
    <>
      Haz completado <br /> <span>{completed}</span> de <span>{total}</span>{" "}
      TODOs
    </>
  ) : (
    <>¡Haz completado todas las tareas!</>
  );

  return (
    <div className="mainCounter">
      <h1>{htmlRender}</h1>
    </div>
  );
}

export { TodoCounter };

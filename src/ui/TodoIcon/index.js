// ReactComponent es el que permite importar especificamente los iconos de svg (le puse alias para diferenciarlos)
import { ReactComponent as CheckSVG } from "./assets/icon-check.svg";
import { ReactComponent as DeleteSVG } from "./assets/icon-delete.svg";
import { ReactComponent as EditSVG } from "./assets/icon-edit.svg";

import "./TodoIcon.css";
const iconTypes = {
  check: (color) => <CheckSVG className="Icon-svg" fill={color} />,
  edit: (color) => <EditSVG className="Icon-svg" fill={color} />,
  delete: (color) => <DeleteSVG className="Icon-svg" fill={color} />,
};

function TodoIcon({ type, color = "gray", onClick }) {
  return (
    <span className={`Icon-container Icon-container-${type}`} onClick={onClick}>
      {iconTypes[type](color)}
    </span>
  );
}

export { TodoIcon };

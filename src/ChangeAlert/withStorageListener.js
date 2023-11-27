import React from "react";

function withStorageListener(WrappedComponent) {
  return function WrappedComponentWithStorageListener(props) {
    const [storageChange, setStorageChange] = React.useState(false);

    // Con esto se subscribe a los cambios que se realicen en el local storage (y funciona en diferentes lugares que esten usando eso)
    window.addEventListener("storage", (change) => {
      if (change.key === "TODOS_V1") {
        setStorageChange(true);
      }
    });

    const toggleShow = () => {
      props.sincronize();
      setStorageChange(false);
    };

    return <WrappedComponent show={storageChange} toggleShow={toggleShow} />;
  };
}

export { withStorageListener };

import React from "react";

// Por convención, en react, los custom hooks se usa el prefijo "use"
function useLocalStorage(itemName, initialValue) {
  const [item, setItem] = React.useState(initialValue); // Estado interno del esta custom hook (se coloca aca porque puede tener un valor inicial vacio como el indicado anteriormente)
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItems;

        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItems = initialValue;
        } else {
          parsedItems = JSON.parse(localStorageItem);
          setItem(parsedItems);
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    }, 2000); // Prueba de segundos para simular el tiempo de conexión
  });

  const saveItem = (newItem) => {
    localStorage.setItem(itemName, JSON.stringify(newItem));
    setItem(newItem);
  };

  // Asi se exporta para poder usarlo en otro lado (el estado y la función)
  return {
    item,
    saveItem,
    loading,
    error,
  };
}

export { useLocalStorage };

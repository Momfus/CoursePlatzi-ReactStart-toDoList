import React from "react";

// Por convención, en react, los custom hooks se usa el prefijo "use"
function useLocalStorage(itemName, initialValue) {
  const [sincronizedItem, setSincronizedItem] = React.useState(true); // Usado para saber si esta todo sincronizado en las diferentes ventanas del navegador
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
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
        setSincronizedItem(true);
      }
    }, 2000); // Prueba de segundos para simular el tiempo de conexión
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sincronizedItem]); // Lo dejo vacio porque así señalo que no hay dependencias que deba volvers a llamar por cada cambio de estado

  const saveItem = (newItem) => {
    localStorage.setItem(itemName, JSON.stringify(newItem));
    setItem(newItem);
  };

  //Sincronizar todo y colocar el loading en true (al cambiar el estado de sincronized, es que se efectua la carga del localstorage)
  const sincronizeItem = () => {
    setLoading(true);
    setSincronizedItem(false);
  };

  // Asi se exporta para poder usarlo en otro lado (el estado y la función)
  return {
    item,
    saveItem,
    loading,
    error,
    sincronizeItem,
  };
}

export { useLocalStorage };

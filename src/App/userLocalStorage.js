import React from "react";

function useLocalStorage(itemName, initialValue) {
  // Por convención, en react, los custom hooks se usa el prefijo "use"
  const localStorageItem = localStorage.getItem(itemName);
  let parsedItems;

  if (!localStorageItem) {
    localStorage.setItem(itemName, JSON.stringify(initialValue));
    parsedItems = initialValue;
  } else {
    parsedItems = JSON.parse(localStorageItem);
  }

  const [item, setItem] = React.useState(parsedItems); // Estado interno del esta custom hook (se coloca aca porque puede tener un valor inicial vacio como el indicado anteriormente)

  const saveItem = (newItem) => {
    localStorage.setItem(itemName, JSON.stringify(newItem));
    setItem(newItem);
  };

  return [item, saveItem]; // Asi se exporta para poder usarlo en otro lado (el estado y la función)
}

export { useLocalStorage };

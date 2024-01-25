import React from "react";

// Por convención, en react, los custom hooks se usa el prefijo "use"
function useLocalStorage(itemName, initialValue) {
  const [state, dispatch] = React.useReducer(
    reducer,
    initialState({ initialValue })
  );

  const { sincronizedItem, item, loading, error } = state;

  // Action creators
  const onError = (error) => dispatch({ type: actionTypes.error, error });
  const onSuccess = (parsedItem) =>
    dispatch({ type: actionTypes.success, payload: parsedItem });
  const onSave = (newItem) =>
    dispatch({ type: actionTypes.save, payload: newItem });
  const onSincronize = () => dispatch({ type: actionTypes.sincronize });

  // Main code
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
        }
        onSuccess(parsedItems);
      } catch (error) {
        onError(error);
      }
    }, 2000); // Prueba de segundos para simular el tiempo de conexión
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sincronizedItem]); // Lo dejo vacio porque así señalo que no hay dependencias que deba volvers a llamar por cada cambio de estado

  const saveItem = (newItem) => {
    try {
      const stringifiedItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringifiedItem);
      onSave(newItem); // Aquí es donde necesitas llamar a dispatch
    } catch (error) {
      onError(error);
    }
  };
  //Sincronizar todo y colocar el loading en true (al cambiar el estado de sincronized, es que se efectua la carga del localstorage)
  const sincronizeItem = () => {
    onSincronize();
  };

  // Asi se exporta para poder usarlo en otro lado (el estado y la función)
  return { item, saveItem, loading, error, sincronizeItem };
}

const initialState = ({ initialValue }) => ({
  sincronizedItem: true,
  loading: true,
  error: false,
  item: initialValue,
});

// se crea un reducer object
const actionTypes = {
  error: "ERROR",
  success: "SUCCESS",
  save: "SAVE",
  sincronize: "SINCRONIZE",
};

const reducerObject = (state, payload) => ({
  [actionTypes.error]: {
    ...state,
    error: true,
  },
  [actionTypes.success]: {
    ...state,
    error: false,
    sincronizedItem: true,
    loading: false,
    item: payload,
  },
  [actionTypes.save]: {
    ...state,
    item: payload,
  },
  [actionTypes.sincronize]: {
    ...state,
    sincronizedItem: false,
    loading: true,
  },
});

const reducer = (state, action) => {
  // Si no existe el action.type,, devuelve el mismo estado que tenia
  return reducerObject(state, action.payload)[action.type] || state;
};

export { useLocalStorage };

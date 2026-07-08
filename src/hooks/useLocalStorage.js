import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  // 1. Al iniciar, intentamos leer si ya hay algo guardado en el navegador
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error leyendo localStorage", error);
      return initialValue;
    }
  });

  // 2. Cada vez que el valor cambie, lo guardamos automáticamente en el navegador
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Error guardando en localStorage", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
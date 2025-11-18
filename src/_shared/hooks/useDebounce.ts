import { useState, useEffect } from 'react';

// O hook recebe um valor e um delay
export function useDebounce<T>(value: T, delay: number): T {
  // Estado para guardar o valor "atrasado"
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Cria um timer
    const handler = setTimeout(() => {
      // Só atualiza o valor debounced depois do delay
      setDebouncedValue(value);
    }, delay);

    // Isso é crucial: limpa o timer se o valor mudar
    // (ex: o usuário continuou digitando)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Roda o efeito se o valor ou o delay mudarem

  return debouncedValue;
}

import { useState, useEffect } from 'react';

const useDebounce = (value, delay) => {
    // État pour stocker la valeur avec le délai
    const [debouncedValue, setDebouncedValue] = useState(value);

    // Utilise l'effet useEffect pour mettre à jour la valeur avec le délai
    useEffect(() => {
        // Définit un timer qui met à jour la valeur après le délai
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Nettoie le timer lorsque le composant est démonté
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    // Retourne la valeur avec le délai
    return debouncedValue;
};

export default useDebounce;
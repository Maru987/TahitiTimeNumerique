// Hook personnalisé pour la recherche de fuseaux horaires
import { useState, useEffect } from 'react';
import TimeZoneService from '../../services/TimeZoneServices';

export const useTimeZoneSearch = (searchTerm) => {
    const [allOptions, setAllOptions] = useState([]);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Charge tous les fuseaux horaires au montage
    useEffect(() => {
        const fetchOptions = async () => {
            setLoading(true);
            try {
                const options = await TimeZoneService.getAllTimeZones();
                setAllOptions(options);
            } catch (err) {
                setError('Erreur lors de la récupération des fuseaux horaires');
                console.error(err);
            }
            setLoading(false);
        };
        fetchOptions();
    }, []);

    // Filtre les options quand le terme de recherche change
    useEffect(() => {
        if (searchTerm.trim()) {
            const filtered = allOptions.filter((option) =>
                option.label.toLowerCase().startsWith(searchTerm.toLowerCase())
            );
            setFilteredOptions(filtered);
        } else {
            setFilteredOptions([]);
        }
    }, [searchTerm, allOptions]);

    return {
        allOptions,
        filteredOptions,
        error,
        loading
    };
};
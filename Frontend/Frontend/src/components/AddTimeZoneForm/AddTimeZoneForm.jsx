import React, { useState } from 'react';
import useDebounce from '../hooks/useDebounce.js';
import { useTimeZoneSearch } from '../hooks/useTimeZoneSearch';
import './AddTimeZoneForm.css';

const AddTimeZoneForm = ({ onTimeZoneAdded }) => {
    // États locaux pour stocker la recherche et l'option sélectionnée
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);

    // Hook personnalisé pour le débouncing de la recherche
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    // Hook pour la recherche de fuseaux horaires
    const { filteredOptions, error, loading } = useTimeZoneSearch(debouncedSearchTerm);

    // Fonction pour ajouter une option sélectionnée
    const handleAdd = (option) => {
        setSearchTerm(option.label);
        setSelectedOption(option);
    };

    // Fonction pour soumettre le formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedOption) return;

        try {
            // Appeler la fonction passée en props pour ajouter le fuseau horaire
            onTimeZoneAdded(selectedOption);
            // Réinitialiser le formulaire
            setSearchTerm('');
            setSelectedOption(null);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="add-timezone-form">
            <h2 className="form-title">Add your Time zone</h2>
            {/* Afficher un message d'erreur si une erreur est survenue */}
            {error && <div className="error-message">{error}</div>}
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search a place"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setSelectedOption(null);
                        }}
                        disabled={loading}
                    />
                    {/* Afficher les options filtrées si la recherche a donné des résultats */}
                    {filteredOptions.length > 0 && (
                        <div className="timezone-dropdown">
                            {filteredOptions.map((option) => (
                                <div
                                    key={option.id}
                                    className="timezone-option"
                                    onClick={() => handleAdd(option)}
                                >
                                    <div className="option-dot"></div>
                                    <span className="option-label">{option.label}</span>
                                    <span className="option-zone">{option.zoneId}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    <button
                        type="submit"
                        className="add-button"
                        disabled={loading || !selectedOption}
                    >
                        {loading ? 'Adding...' : 'Add'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTimeZoneForm;
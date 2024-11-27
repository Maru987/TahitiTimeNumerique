import React, { useState, useEffect } from 'react';
import { useTimeZoneSearch } from '../hooks/useTimeZoneSearch';
import './TImeZoneCard.css';

const TimeZoneCard = ({ id, label, zoneId, utcOffset, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);     // Etat pour savoir si on est en mode édition
    const [editValue, setEditValue] = useState(label);     // Etat pour stocker la valeur d'édition
    const [selectedOption, setSelectedOption] = useState(null);    // Etat pour stocker l'option sélectionnée
    const [currentTime, setCurrentTime] = useState(new Date());    // Etat pour stocker l'heure actuelle

    // Hook pour la recherche de fuseaux horaires
    const { filteredOptions } = useTimeZoneSearch(isEditing ? editValue : '');
    // Met à jour l'heure toutes les secondes
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Formateur pour afficher la date et l'heure
    const formatter = new Intl.DateTimeFormat('fr-FR', {
        timeZone: zoneId,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    // String avec la date et l'heure formatée
    const timeString = formatter.format(currentTime);

    // Fonction pour sélectionner une option
    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setEditValue(option.label);
    };

    // Fonction pour confirmer l'édition
    const handleConfirm = () => {
        if (selectedOption) {
            onEdit({
                id,
                label: selectedOption.label,
                zoneId: selectedOption.zoneId,
                utcOffset: selectedOption.utcOffset,
                active: true
            });
        }
        setIsEditing(false);
        setSelectedOption(null);
    };

    return (
        <div className="timezone-card">
            <div className="card-header">
                {isEditing ? (
                    // Affiche le champ d'édition et les options de recherche
                    <div className="edit-container">
                        <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="edit-input"
                            autoFocus
                            placeholder="Search timezone"
                        />
                        {filteredOptions.length > 0 && (
                            <ul className="timezone-dropdown">
                                {filteredOptions.map((option) => (
                                    <li
                                        key={option.id}
                                        className="timezone-option"
                                        onClick={() => handleOptionSelect(option)}
                                    >
                                        {option.label}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ) : (
                    <h2>{label}</h2>
                )}
            </div>

            <div className="time-display">
                {timeString.split(' à ')[1]}
            </div>

            <div className="utc-offset">
                {utcOffset}
            </div>

            <div className="date-display">
                {timeString.split(' à ')[0]}
            </div>

            <div className="button-group">
                <button
                    className="edit-button"
                    onClick={() => {
                        setIsEditing(!isEditing);
                        setEditValue('');
                        setSelectedOption(null);
                    }}
                >
                    {isEditing ? 'Cancel' : 'Edit'}
                </button>
                <button
                    className={isEditing ? "confirm-button" : "delete-button"}
                    onClick={isEditing ? handleConfirm : onDelete}
                    disabled={isEditing && !selectedOption}
                >
                    {isEditing ? 'Confirm' : 'Delete'}
                </button>
            </div>
        </div>
    );
};

export default TimeZoneCard;
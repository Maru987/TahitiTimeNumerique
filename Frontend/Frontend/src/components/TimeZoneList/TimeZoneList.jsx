import React from 'react';
import TimeZoneCard from '../TimeZoneCard/TimeZoneCard';
import './TimeZoneList.css';

const TimeZoneList = ({ selectedTimezones, onEdit, onDelete }) => {
    // Affiche un message si aucun fuseau horaire n'est sélectionné
    if (!selectedTimezones || selectedTimezones.length === 0) {
        return (
            <div className="no-timezones">
                No time zone in your list.<br/>add one !
            </div>
        );
    }

    // Affiche la grille de cartes de fuseaux horaires
    return (
        <div className="timezone-list">
            <div className="timezone-grid">
                {selectedTimezones.map((timezone) => (
                    <TimeZoneCard
                        key={timezone.id}
                        {...timezone} // Passe toutes les propriétés du fuseau horaire
                        onEdit={onEdit}
                        onDelete={() => onDelete(timezone)}
                    />
                ))}
            </div>
        </div>
    );
};

export default TimeZoneList;
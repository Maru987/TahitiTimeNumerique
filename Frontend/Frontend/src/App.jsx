import React, { useState } from 'react';
import AddTimeZoneForm from './components/AddTimeZoneForm/AddTimeZoneForm';
import TimeZoneList from './components/TimeZoneList/TimeZoneList';
import TimeZoneConverter from './components/TimeZoneConverter/TimeZoneConverter';
import './App.css';

function App() {
    // État pour stocker les fuseaux horaires sélectionnés
    const [selectedTimezones, setSelectedTimezones] = useState([]);

    // Ajoute un nouveau fuseau horaire à la liste
    const handleTimeZoneAdded = (newTimeZone) => {
        setSelectedTimezones([...selectedTimezones, newTimeZone]);
    };

    // Supprime un fuseau horaire de la liste
    const handleTimeZoneDelete = (timeZoneToDelete) => {
        setSelectedTimezones(selectedTimezones.filter(
            tz => tz.id !== timeZoneToDelete.id
        ));
    };

    // Met à jour un fuseau horaire existant
    const handleTimeZoneEdit = async (editedTimeZone) => {
        try {
            // Trouve et remplace le fuseau horaire modifié
            setSelectedTimezones(prevTimezones =>
                prevTimezones.map(timezone =>
                    timezone.id === editedTimeZone.id ? editedTimeZone : timezone
                )
            );
        } catch (error) {
            console.error('Erreur lors de la mise à jour:', error);
        }
    };

    return (
        <div className="App">
            <h1>Tahiti Time Numerique</h1>

            {/* Formulaire d'ajout de fuseau horaire */}
            <AddTimeZoneForm
                onTimeZoneAdded={handleTimeZoneAdded}
            />

            {/* Liste des fuseaux horaires sélectionnés */}
            <TimeZoneList
                selectedTimezones={selectedTimezones}
                onEdit={handleTimeZoneEdit}
                onDelete={handleTimeZoneDelete}
            />

            {/* Convertisseur*/}
            <TimeZoneConverter
                selectedTimezones={selectedTimezones}
            />
        </div>
    );
}

export default App;
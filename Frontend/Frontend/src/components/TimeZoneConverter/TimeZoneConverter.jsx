import React, { useState, useEffect } from 'react';
import { formatInTimeZone } from 'date-fns-tz';
import { parseISO } from 'date-fns';
import TimeZoneService from '../../services/TimeZoneServices.js';
import './TimeZoneConverter.css';

const TimeZoneConverter = () => {
    const [selectedDateTime, setSelectedDateTime] = useState('');     // Date/heure sélectionnée
    const [convertedTimes, setConvertedTimes] = useState([]);        // Résultats des conversions
    const [allTimeZones, setAllTimeZones] = useState([]);           // Liste des fuseaux disponibles

    // Charge tous les fuseaux horaires au montage du composant
    useEffect(() => {
        const fetchAllTimeZones = async () => {
            try {
                const zones = await TimeZoneService.getAllTimeZones();
                setAllTimeZones(zones);
            } catch (error) {
                console.error("Erreur lors de la récupération des fuseaux horaires:", error);
            }
        };
        fetchAllTimeZones();
    }, []);

    // Convertit l'heure sélectionnée dans tous les fuseaux horaires
    const handleConvert = (e) => {
        e.preventDefault();
        if (!selectedDateTime) return;

        // Parse la date sélectionnée
        const date = parseISO(selectedDateTime);

        // Convertit dans chaque fuseau horaire
        const conversions = allTimeZones.map(tz => ({
            city: tz.label,
            time: formatInTimeZone(date, tz.zoneId, 'HH:mm dd/MM/yyyy'),
            offset: tz.utcOffset
        }));

        setConvertedTimes(conversions);
    };

    return (
        <div className="converter-container">
            <h2 className="converter-title">Converter Tahiti</h2>

            {/* Formulaire de sélection de date/heure */}
            <form className="converter-form" onSubmit={handleConvert}>
                <div className="converter-inputs">
                    <input
                        type="datetime-local"
                        className="datetime-input"
                        value={selectedDateTime}
                        onChange={(e) => setSelectedDateTime(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="convert-button"
                    >
                        Convert
                    </button>
                </div>
            </form>

            {/* Affichage des résultats de conversion */}
            <div className="conversion-result">
                {convertedTimes.map((conv, index) => (
                    <div key={index} className="result-item">
                        <div className="city-time">
                            <span className="city">{conv.city}</span>
                            <div className="time-info">
                                <span className="time">{conv.time}</span>  <span></span>
                                <span className="offset">{conv.offset}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TimeZoneConverter;
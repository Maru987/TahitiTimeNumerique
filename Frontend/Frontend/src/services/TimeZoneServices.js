// src/services/timeZoneService.js

const BASE_URL = 'http://localhost:8080/api/timezones';

const TimeZoneService = {
    // Récupérer tous les fuseaux horaires
    getAllTimeZones: async () => {
        try {
            const response = await fetch(BASE_URL);
            return await response.json();
        } catch (error) {
            console.error('Error fetching timezones:', error);
            throw error;
        }
    },
};

export default TimeZoneService;
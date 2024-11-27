package com.tahitinumerique.tahiti_time_numerique.config;

import com.tahitinumerique.tahiti_time_numerique.model.TimeZone;
import com.tahitinumerique.tahiti_time_numerique.repository.TimeZoneRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class InsertDataTimeZone {

    @Bean
    CommandLineRunner initDatabase(TimeZoneRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                createTimeZone(repository, "Tahiti", "Pacific/Tahiti", "UTC-10");

                // Europe
                createTimeZone(repository, "Paris", "Europe/Paris", "UTC+1");
                createTimeZone(repository, "London", "Europe/London", "UTC+0");
                createTimeZone(repository, "Berlin", "Europe/Berlin", "UTC+1");
                createTimeZone(repository, "Moscow", "Europe/Moscow", "UTC+3");
                createTimeZone(repository, "Rome", "Europe/Rome", "UTC+1");
                createTimeZone(repository, "Madrid", "Europe/Madrid", "UTC+1");

                // Asie
                createTimeZone(repository, "Tokyo", "Asia/Tokyo", "UTC+9");
                createTimeZone(repository, "Singapore", "Asia/Singapore", "UTC+8");
                createTimeZone(repository, "Hong Kong", "Asia/Hong_Kong", "UTC+8");
                createTimeZone(repository, "Dubai", "Asia/Dubai", "UTC+4");
                createTimeZone(repository, "Bangkok", "Asia/Bangkok", "UTC+7");
                createTimeZone(repository, "Seoul", "Asia/Seoul", "UTC+9");

                // Amériques
                createTimeZone(repository, "New York", "America/New_York", "UTC-5");
                createTimeZone(repository, "Los Angeles", "America/Los_Angeles", "UTC-8");
                createTimeZone(repository, "Chicago", "America/Chicago", "UTC-6");
                createTimeZone(repository, "Toronto", "America/Toronto", "UTC-5");
                createTimeZone(repository, "Mexico City", "America/Mexico_City", "UTC-6");
                createTimeZone(repository, "São Paulo", "America/Sao_Paulo", "UTC-3");

                // Pacifique
                createTimeZone(repository, "Sydney", "Australia/Sydney", "UTC+11");
                createTimeZone(repository, "Auckland", "Pacific/Auckland", "UTC+13");
                createTimeZone(repository, "Nouméa", "Pacific/Noumea", "UTC+11");
                createTimeZone(repository, "Honolulu", "Pacific/Honolulu", "UTC-10");
                createTimeZone(repository, "Fiji", "Pacific/Fiji", "UTC+12");

                // Afrique et Moyen-Orient
                createTimeZone(repository, "Cairo", "Africa/Cairo", "UTC+2");
                createTimeZone(repository, "Johannesburg", "Africa/Johannesburg", "UTC+2");
                createTimeZone(repository, "Nairobi", "Africa/Nairobi", "UTC+3");
                createTimeZone(repository, "Casablanca", "Africa/Casablanca", "UTC+1");
                createTimeZone(repository, "Istanbul", "Europe/Istanbul", "UTC+3");
                createTimeZone(repository, "Tel Aviv", "Asia/Tel_Aviv", "UTC+2");
            }
        };
    }

    private void createTimeZone(TimeZoneRepository repository, String label, String zoneId, String utcOffset) {
        TimeZone timeZone = new TimeZone();
        timeZone.setLabel(label);
        timeZone.setZoneId(zoneId);
        timeZone.setUtcOffset(utcOffset);
        timeZone.setActive(true);
        repository.save(timeZone);
    }
}
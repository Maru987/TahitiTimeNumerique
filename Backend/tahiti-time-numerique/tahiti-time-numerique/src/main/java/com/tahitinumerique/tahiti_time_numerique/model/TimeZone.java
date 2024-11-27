package com.tahitinumerique.tahiti_time_numerique.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class TimeZone {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String label;           // Nom de la ville/région (ex: "New York")
    private String zoneId;          // ID du fuseau (ex: "America/New_York")
    private String utcOffset;       // Décalage UTC (ex: "UTC-5/UTC-4")
    private boolean active = true;  // État du fuseau horaire
}
package com.tahitinumerique.tahiti_time_numerique.repository;

import com.tahitinumerique.tahiti_time_numerique.model.TimeZone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TimeZoneRepository extends JpaRepository<TimeZone, Long> {
}

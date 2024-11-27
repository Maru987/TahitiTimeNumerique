package com.tahitinumerique.tahiti_time_numerique.service;

import com.tahitinumerique.tahiti_time_numerique.model.TimeZone;
import com.tahitinumerique.tahiti_time_numerique.repository.TimeZoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TimeZoneService {

    private final TimeZoneRepository timeZoneRepository;

    @Autowired
    public TimeZoneService(TimeZoneRepository timeZoneRepository) {
        this.timeZoneRepository = timeZoneRepository;
    }

    public List<TimeZone> getAllTimeZones() {
        return timeZoneRepository.findAll();
    }

    public Optional<TimeZone> getTimeZoneById(Long id) {
        return timeZoneRepository.findById(id);
    }

    public TimeZone saveTimeZone(TimeZone timeZone) {
        return timeZoneRepository.save(timeZone);
    }

    public void deleteTimeZone(Long id) {
        timeZoneRepository.deleteById(id);
    }
}
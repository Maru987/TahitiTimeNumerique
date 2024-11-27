package com.tahitinumerique.tahiti_time_numerique.controller;

import com.tahitinumerique.tahiti_time_numerique.model.TimeZone;
import com.tahitinumerique.tahiti_time_numerique.service.TimeZoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/timezones")
@CrossOrigin(origins = "http://localhost:5173")
public class TimeZoneController {

    private final TimeZoneService timeZoneService;

    @Autowired
    public TimeZoneController(TimeZoneService timeZoneService) {
        this.timeZoneService = timeZoneService;
    }

    // GET all timezones
    @GetMapping
    public List<TimeZone> getAllTimeZones() {
        return timeZoneService.getAllTimeZones();
    }

    // GET single timezone
    @GetMapping("/{id}")
    public ResponseEntity<TimeZone> getTimeZoneById(@PathVariable Long id) {
        return timeZoneService.getTimeZoneById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST new timezone
    @PostMapping
    public TimeZone createTimeZone(@RequestBody TimeZone timeZone) {
        return timeZoneService.saveTimeZone(timeZone);
    }

    // PUT update timezone
    @PutMapping("/{id}")
    public ResponseEntity<TimeZone> updateTimeZone(@PathVariable Long id, @RequestBody TimeZone timeZone) {
        return timeZoneService.getTimeZoneById(id)
                .map(existingTimeZone -> {
                    timeZone.setId(id);
                    return ResponseEntity.ok(timeZoneService.saveTimeZone(timeZone));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE timezone
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTimeZone(@PathVariable Long id) {
        if (timeZoneService.getTimeZoneById(id).isPresent()) {
            timeZoneService.deleteTimeZone(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
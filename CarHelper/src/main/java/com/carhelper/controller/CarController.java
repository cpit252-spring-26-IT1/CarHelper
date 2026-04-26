package com.carhelper.controller;

import com.carhelper.factory.Car;
import com.carhelper.factory.CarFactory;
import com.carhelper.model.CarCategory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/cars")
@CrossOrigin(origins = "*")
public class CarController {

    @GetMapping("/details")
    public ResponseEntity<?> getCarDetails(
            @RequestParam String brand,
            @RequestParam String model,
            @RequestParam int year,
            @RequestParam String category) {

        try {
            CarCategory carCategory = CarCategory.valueOf(category.toUpperCase());

            double priceFromDatabase = 85000.0;

            Car requestedCar = CarFactory.createCar(brand, model, year, carCategory, priceFromDatabase);

            Map<String, Object> response = new HashMap<>();
            response.put("brand", requestedCar.getBrandName());
            response.put("model", requestedCar.getModel());
            response.put("year", requestedCar.getYear());
            response.put("category", requestedCar.getCategory());
            response.put("basePrice", requestedCar.getBasePrice());
            response.put("diagnosisGuide", requestedCar.getDiagnosisGuide());

            return ResponseEntity.ok(response);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
        }
    }
}

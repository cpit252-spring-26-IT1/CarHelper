package com.carhelper.controller;

import com.carhelper.factory.Car;
import com.carhelper.factory.CarFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cars")
public class CarController {

    @Autowired
    private CarFactory factory;

    @GetMapping("/diagnose")
    public String diagnose(@RequestParam String brand) {

        Car car = factory.getCar(brand);

        if (car != null) {
            return car.getBrandName() + " - " + car.getDiagnosisGuide();
        }

        return "Brand not supported";
    }
}
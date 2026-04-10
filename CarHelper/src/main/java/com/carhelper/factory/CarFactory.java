package com.carhelper.factory;

import org.springframework.stereotype.Component;

@Component
public class CarFactory {

    public static Car createCar(String brand) {
        if (brand == null) {
            throw new IllegalArgumentException("Brand cannot be null");
        }
        if (brand.equalsIgnoreCase("Toyota")) {
            return new ToyotaCar();
        } else if (brand.equalsIgnoreCase("Hyundai")) {
            return new HyundaiCar();
        } else if (brand.equalsIgnoreCase("Kia")) {
            return new KiaCar();
        } else {
            throw new IllegalArgumentException("Unknown brand: " + brand + ". Supported: Toyota, Hyundai, Kia");
        }
    }
}
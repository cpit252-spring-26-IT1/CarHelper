package com.carhelper.factory;

import org.springframework.stereotype.Component;
import com.carhelper.factory.Car;
import com.carhelper.factory.ToyotaCar;
import com.carhelper.factory.HyundaiCar;
import com.carhelper.factory.KiaCar;

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

    public Car getCar(String brand) {
        return createCar(brand);
    }
}
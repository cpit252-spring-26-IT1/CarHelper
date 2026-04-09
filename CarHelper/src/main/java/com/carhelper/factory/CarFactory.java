package com.carhelper.factory;

import org.springframework.stereotype.Component;

@Component
public class CarFactory {

    public Car getCar(String brand) {

        if (brand == null) return null;

        if (brand.equalsIgnoreCase("toyota"))
            return new ToyotaCar();

        if (brand.equalsIgnoreCase("hyundai"))
            return new HyundaiCar();

        if (brand.equalsIgnoreCase("kia"))
            return new KiaCar();

        return null;
    }
}
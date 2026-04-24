package com.carhelper.factory;
import com.carhelper.model.CarCategory;

public class CarFactory {
    public static Car createCar(String brand, String model, int year, CarCategory category, double priceFromDb) {
        if (brand == null) throw new IllegalArgumentException("Brand cannot be null");

        if (brand.equalsIgnoreCase("Toyota"))
            return new ToyotaCar(model, year, category, priceFromDb);
        else if (brand.equalsIgnoreCase("Hyundai"))
            return new HyundaiCar(model, year, category, priceFromDb);
        else if (brand.equalsIgnoreCase("Kia"))
            return new KiaCar(model, year, category, priceFromDb);
        else
            throw new IllegalArgumentException("Unknown brand: " + brand);
    }
}
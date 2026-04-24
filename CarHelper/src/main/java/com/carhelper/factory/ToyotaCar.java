package com.carhelper.factory;
import com.carhelper.model.CarCategory;

public class ToyotaCar implements Car {
    private String model;
    private int year;
    private CarCategory category;
    private double dynamicBasePrice;


    public ToyotaCar(String model, int year, CarCategory category, double dynamicBasePrice) {
        this.model = model;
        this.year = year;
        this.category = category;
        this.dynamicBasePrice = dynamicBasePrice;
    }

    @Override
    public String getBrandName() {
        return "Toyota";
    }
    @Override
    public String getModel() {
        return model;
    }
    @Override
    public int getYear() {
        return year;
    }
    @Override
    public CarCategory getCategory() {
        return category;
    }
    @Override
    public double getBasePrice() {
        return dynamicBasePrice;
    }
    @Override
    public String getDiagnosisGuide() {
        return "Toyota standard diagnosis system";
    }
}
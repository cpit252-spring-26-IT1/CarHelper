package com.carhelper.factory;

public class ToyotaCar implements Car {

    @Override
    public String getBrandName() {
        return "Toyota";
    }

    @Override
    public double getBasePrice() {
        return 75000;
    }

    @Override
    public String getDiagnosisGuide() {
        return "Toyota diagnosis system";
    }
}
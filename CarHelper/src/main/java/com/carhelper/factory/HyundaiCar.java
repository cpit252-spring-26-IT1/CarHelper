package com.carhelper.factory;

public class HyundaiCar implements Car {
    @Override
    public String getBrandName() {
        return "Hyundai";
    }

    @Override
    public double getBasePrice() {
        return 65000;
    }

    @Override
    public String getDiagnosisGuide() {
        return "Hyundai diagnosis system";
    }
}
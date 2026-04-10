package com.carhelper.factory;

public class KiaCar implements Car {
    @Override
    public String getBrandName() {
        return "Kia";
    }

    @Override
    public double getBasePrice() {
        return 60000;
    }

    @Override
    public String getDiagnosisGuide() {
        return "Kia diagnosis system";
    }
}
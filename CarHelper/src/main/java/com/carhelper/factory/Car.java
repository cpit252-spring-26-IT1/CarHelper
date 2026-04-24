package com.carhelper.factory;
import com.carhelper.model.CarCategory;

public interface Car {
    String getBrandName();
    String getModel();
    int getYear();
    CarCategory getCategory();
    double getBasePrice();
    String getDiagnosisGuide();
}
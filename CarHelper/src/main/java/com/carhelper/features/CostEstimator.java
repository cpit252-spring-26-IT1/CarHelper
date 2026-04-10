package com.carhelper.features;
import com.carhelper.factory.Car;

public class CostEstimator {
    public static double estimateRepairCost(Car car, String repairType) {
        double basePrice = car.getBasePrice();
        switch (repairType.toLowerCase()) {
            case "engine":
                return basePrice * 0.15;
            case "brakes":
                return basePrice * 0.05;
            case "transmission":
                return basePrice * 0.20;
            case "alternator":
                return basePrice * 0.08;
            default:
                return basePrice * 0.10;
        }
    }

    public static String getPriceBreakdown(Car car, String repairType) {
        double cost = estimateRepairCost(car, repairType);
        return String.format("Estimated %s repair for %s: %.2f SAR",
                repairType, car.getBrandName(), cost);
    }
}

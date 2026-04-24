package com.carhelper.model;

public class DiagnosticReport {
    private String issueName;
    private double estimatedCost;
    private String aiDisclaimer;

    public DiagnosticReport(String issueName, double estimatedCost, String aiDisclaimer) {
        this.issueName = issueName;
        this.estimatedCost = estimatedCost;
        this.aiDisclaimer = aiDisclaimer;
    }
    public String getIssueName() {
        return issueName;
    }
    public double getEstimatedCost() {
        return estimatedCost;
    }
    public String getAiDisclaimer() {
        return aiDisclaimer;
    }
}
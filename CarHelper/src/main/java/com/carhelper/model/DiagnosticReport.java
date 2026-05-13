package com.carhelper.model;

public class DiagnosticReport {
    private String issueName;
    private String detectedProblems;
    private String repairSuggestion;
    private String estimatedCost;
    private String aiDisclaimer;

    public DiagnosticReport() {
    }

    public DiagnosticReport(String issueName, double estimatedCost, String aiDisclaimer) {
        this.issueName = issueName;
        this.detectedProblems = issueName;
        this.repairSuggestion = "Please visit a trusted mechanic for confirmation.";
        this.estimatedCost = String.valueOf(estimatedCost);
        this.aiDisclaimer = aiDisclaimer;
    }

    public DiagnosticReport(String issueName, String detectedProblems, String repairSuggestion, String estimatedCost, String aiDisclaimer) {
        this.issueName = issueName;
        this.detectedProblems = detectedProblems;
        this.repairSuggestion = repairSuggestion;
        this.estimatedCost = estimatedCost;
        this.aiDisclaimer = aiDisclaimer;
    }

    public String getIssueName() {
        return issueName;
    }

    public void setIssueName(String issueName) {
        this.issueName = issueName;
    }

    public String getDetectedProblems() {
        return detectedProblems;
    }

    public void setDetectedProblems(String detectedProblems) {
        this.detectedProblems = detectedProblems;
    }

    public String getRepairSuggestion() {
        return repairSuggestion;
    }

    public void setRepairSuggestion(String repairSuggestion) {
        this.repairSuggestion = repairSuggestion;
    }

    public String getEstimatedCost() {
        return estimatedCost;
    }

    public void setEstimatedCost(String estimatedCost) {
        this.estimatedCost = estimatedCost;
    }

    public String getAiDisclaimer() {
        return aiDisclaimer;
    }

    public void setAiDisclaimer(String aiDisclaimer) {
        this.aiDisclaimer = aiDisclaimer;
    }
}

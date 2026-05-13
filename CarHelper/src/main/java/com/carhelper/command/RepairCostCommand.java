package com.carhelper.command;

import com.carhelper.service.RepairCostService;

public class RepairCostCommand implements DiagnosisCommand {

    private final RepairCostService repairCostService;
    private final String carBrand;
    private final String carModel;
    private final String carYear;
    private final String problemDescription;
    private final String city;
    private final String language;

    public RepairCostCommand(
            RepairCostService repairCostService,
            String carBrand,
            String carModel,
            String carYear,
            String problemDescription,
            String city,
            String language
    ) {
        this.repairCostService = repairCostService;
        this.carBrand = carBrand;
        this.carModel = carModel;
        this.carYear = carYear;
        this.problemDescription = problemDescription;
        this.city = city;
        this.language = language;
    }

    @Override
    public String execute() {
        return repairCostService.estimateRepairCost(
                carBrand,
                carModel,
                carYear,
                problemDescription,
                city,
                language
        );
    }
}
package com.carhelper.controller;

import com.carhelper.command.RepairCostCommand;
import com.carhelper.service.RepairCostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/diagnosis")
public class RepairCostController {

    private final RepairCostService repairCostService;

    public RepairCostController(RepairCostService repairCostService) {
        this.repairCostService = repairCostService;
    }

    @PostMapping("/analyze")
    public ResponseEntity<Map<String, String>> analyzeRepairCost(@RequestBody Map<String, String> request) {
        String carBrand = request.get("carBrand");
        String carModel = request.get("carModel");
        String carYear = request.get("carYear");
        String problemDescription = request.get("problemDescription");
        String city = request.get("city");
        String language = request.get("language");

        RepairCostCommand command = new RepairCostCommand(
                repairCostService,
                carBrand,
                carModel,
                carYear,
                problemDescription,
                city,
                language
        );

        String result = command.execute();

        return ResponseEntity.ok(Map.of("result", result));
    }
}
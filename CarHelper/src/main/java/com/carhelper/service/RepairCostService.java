package com.carhelper.service;

import com.carhelper.ai.TextAiService;
import com.carhelper.model.RepairCostRecord;
import com.carhelper.repository.RepairCostRepository;
import org.springframework.stereotype.Service;

@Service
public class RepairCostService {

    private final TextAiService textAiService;
    private final RepairCostRepository repairCostRepository;

    public RepairCostService(TextAiService textAiService, RepairCostRepository repairCostRepository) {
        this.textAiService = textAiService;
        this.repairCostRepository = repairCostRepository;
    }

    public String estimateRepairCost(
            String carBrand,
            String carModel,
            String carYear,
            String problemDescription,
            String city,
            String language
    ) {
        if (problemDescription == null || problemDescription.isBlank()) {
            return "Please describe the repair problem first.";
        }

        String prompt = buildPrompt(carBrand, carModel, carYear, problemDescription, city, language);
        String result = textAiService.analyzeText(prompt);

        RepairCostRecord record = new RepairCostRecord(
                carBrand,
                carModel,
                carYear,
                problemDescription,
                city,
                result
        );

        repairCostRepository.save(record);

        return result;
    }

    private String buildPrompt(
            String carBrand,
            String carModel,
            String carYear,
            String problemDescription,
            String city,
            String language
    ) {
        String reportLanguage = getReportLanguage(language);

        return "You are a car repair cost assistant for Saudi Arabia. "
                + "Estimate the repair cost for this car problem. "
                + "Car brand: " + safe(carBrand) + ". "
                + "Car model: " + safe(carModel) + ". "
                + "Car year: " + safe(carYear) + ". "
                + "City: " + safe(city) + ". "
                + "Problem description: " + safe(problemDescription) + ". "
                + "Write the full report only in " + reportLanguage + ". "
                + "Do not mix languages. "
                + "Return a simple report with possible issue, expected repair work, estimated cost range in Saudi Riyal, advice, and AI disclaimer. "
                + "Use simple student-level language. "
                + "Do not use markdown code block. "
                + "Do not say fixed prices from code.";
    }

    private String getReportLanguage(String language) {
        if (language == null) {
            return "English";
        }

        String value = language.trim();

        if (value.equalsIgnoreCase("ar") || value.equalsIgnoreCase("arabic")) {
            return "Arabic";
        }

        return "English";
    }

    private String safe(String value) {
        if (value == null || value.isBlank()) {
            return "not provided";
        }

        return value;
    }
}


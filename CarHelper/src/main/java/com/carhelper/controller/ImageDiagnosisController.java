package com.carhelper.controller;

import com.carhelper.adapter.ApiAdapter;
import com.carhelper.ai.ImageAiService;
import com.carhelper.model.DiagnosticReport;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/diagnosis")
public class ImageDiagnosisController {

    private final ImageAiService imageAiService;
    private final ApiAdapter apiAdapter;

    public ImageDiagnosisController(ImageAiService imageAiService, ApiAdapter apiAdapter) {
        this.imageAiService = imageAiService;
        this.apiAdapter = apiAdapter;
    }

    @PostMapping("/image")
    public ResponseEntity<DiagnosticReport> analyzeImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "language", required = false) String language
    ) {
        String rawResult = imageAiService.analyzeImage(file, language);
        DiagnosticReport report = apiAdapter.translateResponse(rawResult);
        return ResponseEntity.ok(report);
    }
}
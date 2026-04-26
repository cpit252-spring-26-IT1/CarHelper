package com.carhelper.controller;

import com.carhelper.adapter.AiResponseAdapter;
import com.carhelper.model.DiagnosticReport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/diagnosis")
public class ImageDiagnosisController {

    @Autowired
    private AiResponseAdapter adapter;

    @PostMapping("/image")
    public DiagnosticReport analyzeImage(
            @RequestParam("file") MultipartFile file
    ) {

        String fakeGeminiResponse = """
        {
          "candidates": [
            {
              "content": {
                "parts": [
                  {
                    "text": "The image shows bumper scratches and minor paint damage."
                  }
                ]
              }
            }
          ]
        }
        """;

        return adapter.translateResponse(fakeGeminiResponse);
    }
}
package com.carhelper.adapter;

import com.carhelper.model.DiagnosticReport;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

@Component
public class GeminiApiAdapter implements AiResponseAdapter {

    @Override
    public DiagnosticReport translateResponse(String rawAiJson) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(rawAiJson);

            String aiGeneratedText = rootNode
                    .path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();

            return new DiagnosticReport(
                    aiGeneratedText,
                    250.0,
                    "AI-generated report. Professional inspection is recommended."
            );

        } catch (Exception e) {
            return new DiagnosticReport(
                    "Failed to understand AI response.",
                    0.0,
                    "System error"
            );
        }
    }
}
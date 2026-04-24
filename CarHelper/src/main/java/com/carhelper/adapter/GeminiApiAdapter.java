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

            double parsedCost = 850.00;
            String disclaimer = "Note: This is an AI-generated report and may not be 100% accurate. Please consult a certified mechanic.";

            return new DiagnosticReport(aiGeneratedText, parsedCost, disclaimer);

        } catch (Exception e) {
            System.err.println("Failed to parse Gemini JSON: " + e.getMessage());
            return new DiagnosticReport("Failed to understand AI response.", 0.0, "Error");
        }
    }
}
package com.carhelper.ai;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;
import java.util.List;
import java.util.Map;

@Service
public class GeminiAiService implements AiService {

    @Value("${gemini.api.key:}")
    private String apiKey;

    @Value("${ai.model:gemini-2.0-flash}")
    private String model;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public String analyzeText(String prompt) {
        if (apiKey == null || apiKey.isBlank() || apiKey.equals("YOUR_GEMINI_API_KEY")) {
            return "Gemini API key is missing. Add your key in application.properties.";
        }

        try {
            Map<String, Object> textPart = Map.of("text", prompt);
            Map<String, Object> content = Map.of("parts", List.of(textPart));
            Map<String, Object> requestBody = Map.of("contents", List.of(content));

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<String> entity = new HttpEntity<>(mapper.writeValueAsString(requestBody), headers);

            String url = "https://generativelanguage.googleapis.com/v1beta/models/"
                    + model
                    + ":generateContent?key="
                    + apiKey;

            String response = restTemplate.postForObject(url, entity, String.class);
            return extractText(response);
        } catch (Exception e) {
            return "AI analysis failed: " + e.getMessage();
        }
    }

    @Override
    public String analyzeImage(MultipartFile file, String language) {
        if (apiKey == null || apiKey.isBlank() || apiKey.equals("YOUR_GEMINI_API_KEY")) {
            return "Gemini API key is missing. Add your key in application.properties.";
        }

        try {
            String base64Image = Base64.getEncoder().encodeToString(file.getBytes());

            String reportLanguage = "English";

            if (language != null && language.equalsIgnoreCase("ar")) {
                reportLanguage = "Arabic";
            }

            String prompt = "You are a car image diagnosis assistant. "
                    + "Analyze this car image. It may show car damage, dashboard warning light, or mechanical issue. "
                    + "Write the full report in " + reportLanguage + ". "
                    + "Return only valid JSON with these exact fields: issueName, detectedProblems, repairSuggestion, estimatedCost, aiDisclaimer. "
                    + "Do not use markdown. Do not use code block. "
                    + "Use simple student-level language. "
                    + "If you estimate cost, use Saudi Riyal.";

            Map<String, Object> textPart = Map.of("text", prompt);

            Map<String, Object> imageData = Map.of(
                    "mimeType", file.getContentType(),
                    "data", base64Image
            );

            Map<String, Object> imagePart = Map.of("inlineData", imageData);

            Map<String, Object> content = Map.of("parts", List.of(textPart, imagePart));
            Map<String, Object> requestBody = Map.of("contents", List.of(content));

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<String> entity = new HttpEntity<>(mapper.writeValueAsString(requestBody), headers);

            String url = "https://generativelanguage.googleapis.com/v1beta/models/"
                    + model
                    + ":generateContent?key="
                    + apiKey;

            return restTemplate.postForObject(url, entity, String.class);
        } catch (Exception e) {
            return "AI image analysis failed: " + e.getMessage();
        }
    }

    private String extractText(String response) throws Exception {
        JsonNode root = mapper.readTree(response);

        return root
                .path("candidates")
                .get(0)
                .path("content")
                .path("parts")
                .get(0)
                .path("text")
                .asText();
    }
}
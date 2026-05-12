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

import java.util.List;
import java.util.Map;

@Service
public class GroqAiService implements AiService {

    @Value("${groq.api.key:}")
    private String apiKey;

    @Value("${groq.model:llama-3.1-8b-instant}")
    private String model;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public String analyzeText(String prompt) {
        if (apiKey == null || apiKey.isBlank() || apiKey.equals("YOUR_GROQ_API_KEY")) {
            return "Groq API key is missing. Add your key in application.properties.";
        }

        try {
            Map<String, Object> message = Map.of(
                    "role", "user",
                    "content", prompt
            );

            Map<String, Object> requestBody = Map.of(
                    "model", model,
                    "messages", List.of(message)
            );

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);

            HttpEntity<String> entity = new HttpEntity<>(mapper.writeValueAsString(requestBody), headers);

            String response = restTemplate.postForObject(
                    "https://api.groq.com/openai/v1/chat/completions",
                    entity,
                    String.class
            );

            return extractText(response);
        } catch (Exception e) {
            return "Groq analysis failed: " + e.getMessage();
        }
    }

    @Override
    public String analyzeImage(MultipartFile file, String language) {
        return "Groq is used for text only. Use Gemini for image analysis.";
    }

    private String extractText(String response) throws Exception {
        JsonNode root = mapper.readTree(response);

        return root
                .path("choices")
                .get(0)
                .path("message")
                .path("content")
                .asText();
    }
}
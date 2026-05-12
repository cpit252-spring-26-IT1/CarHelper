package com.carhelper.ai;

import org.springframework.stereotype.Service;

@Service
public class TextAiService {

    private final GroqAiService groqAiService;
    private final GeminiAiService geminiAiService;

    public TextAiService(GroqAiService groqAiService, GeminiAiService geminiAiService) {
        this.groqAiService = groqAiService;
        this.geminiAiService = geminiAiService;
    }

    public String analyzeText(String prompt) {

        String lowerPrompt = prompt.toLowerCase();

        boolean isArabic =
                lowerPrompt.contains("arabic")
                        || lowerPrompt.contains("العربية")
                        || lowerPrompt.contains("اكتب")
                        || lowerPrompt.contains("السيارة");

        if (isArabic) {
            return geminiAiService.analyzeText(prompt);
        }

        return groqAiService.analyzeText(prompt);
    }
}
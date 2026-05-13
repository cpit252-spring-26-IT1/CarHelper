package com.carhelper.ai;

import org.springframework.web.multipart.MultipartFile;

public interface AiService {
    String analyzeText(String prompt);
    String analyzeImage(MultipartFile file, String language);
}

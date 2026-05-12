package com.carhelper.service;

import com.carhelper.model.SearchHistory;
import com.carhelper.model.User;
import com.carhelper.repository.SearchHistoryRepository;
import com.carhelper.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class HistoryService {
    private final SearchHistoryRepository historyRepository;
    private final UserRepository userRepository;

    public HistoryService(SearchHistoryRepository historyRepository, UserRepository userRepository) {
        this.historyRepository = historyRepository;
        this.userRepository = userRepository;
    }

    public void saveHistory(Long userId, String featureName, String inputText, String resultText) {
        if (userId == null) {
            return;
        }
        User foundUser = userRepository.findById(userId).orElse(null);
        if (foundUser == null) {
            return;
        }
        SearchHistory history = new SearchHistory(featureName, inputText, resultText, foundUser);
        historyRepository.save(history);
    }

    public List<SearchHistory> getUserHistory(Long userId) {
        return historyRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }
}

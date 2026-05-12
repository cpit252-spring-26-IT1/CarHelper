package com.carhelper.repository;

import com.carhelper.model.SearchHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SearchHistoryRepository extends JpaRepository<SearchHistory, Long> {
    List<com.carhelper.repository.SearchHistory> findByUserIdOrderByCreatedAtDesc(Long userId);
}

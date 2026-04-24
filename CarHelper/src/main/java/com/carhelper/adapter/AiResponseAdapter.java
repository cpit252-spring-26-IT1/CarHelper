package com.carhelper.adapter;
import com.carhelper.model.DiagnosticReport;

public interface AiResponseAdapter {
    DiagnosticReport translateResponse(String rawAiJson);
}
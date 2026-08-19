package com.farmchain.knowledge.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.farmchain.knowledge.dto.AiChatMessage;
import com.farmchain.knowledge.dto.AiChatRequest;
import com.farmchain.knowledge.dto.AiChatResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GeminiAiService {
    
    private static final Logger log = LoggerFactory.getLogger(GeminiAiService.class);

    @Value("${gemini.api.key:}")
    private String apiKey;

    private static final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=";
    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;

    private static final String SYSTEM_PROMPT = """
            You are an expert AI Agronomist and assistant for "FarmChain" - an agricultural decision support platform.
            Your job is to provide accurate, data-driven farming advice, crop recommendations, weather insights, and market (mandi) price trends to farmers.
            Keep your answers concise, practical, and friendly. 
            If the user asks in Hindi, reply in Hindi. If in English, reply in English.
            Never mention that you are a language model. You are the "FarmChain AI Agronomist".
            """;

    public GeminiAiService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
        this.httpClient = HttpClient.newBuilder()
                .version(HttpClient.Version.HTTP_2)
                .connectTimeout(Duration.ofSeconds(10))
                .build();
    }

    public AiChatResponse getChatResponse(AiChatRequest request) {
        if (apiKey == null || apiKey.isBlank()) {
            log.warn("Gemini API key is not configured. Falling back to mock response.");
            return AiChatResponse.builder()
                    .content("System is running in mock mode because the Gemini API key is missing. Please configure 'gemini.api.key' in application.properties.")
                    .build();
        }

        try {
            Map<String, Object> requestBody = buildGeminiRequest(request.getMessages());
            String jsonBody = objectMapper.writeValueAsString(requestBody);

            HttpRequest httpRequest = HttpRequest.newBuilder()
                    .uri(URI.create(GEMINI_API_URL + apiKey))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                    .timeout(Duration.ofSeconds(30))
                    .build();

            HttpResponse<String> response = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                JsonNode rootNode = objectMapper.readTree(response.body());
                JsonNode candidatesNode = rootNode.path("candidates");
                if (candidatesNode.isMissingNode() || candidatesNode.isEmpty()) {
                    return AiChatResponse.builder().content("Gemini API Error (No candidates): " + response.body()).build();
                }

                JsonNode partsNode = candidatesNode.get(0).path("content").path("parts");
                StringBuilder aiResponseText = new StringBuilder();
                if (partsNode.isArray()) {
                    for (JsonNode part : partsNode) {
                        if (part.has("text")) {
                            aiResponseText.append(part.get("text").asText());
                        }
                    }
                }
                
                String finalResponse = aiResponseText.toString();
                if (finalResponse.isEmpty()) {
                    return AiChatResponse.builder().content("Gemini API Error (Empty text parsed): " + response.body()).build();
                }
                        
                return AiChatResponse.builder().content(finalResponse).build();
            } else {
                log.error("Gemini API returned status code {}: {}", response.statusCode(), response.body());
                return AiChatResponse.builder().content("API Error " + response.statusCode() + ": " + response.body()).build();
            }

        } catch (Exception e) {
            log.error("Error calling Gemini API", e);
            return AiChatResponse.builder().content("Java Exception: " + e.getClass().getName() + " - " + e.getMessage()).build();
        }
    }

    private Map<String, Object> buildGeminiRequest(List<AiChatMessage> messages) {
        Map<String, Object> requestBody = new HashMap<>();

        // 1. System Instruction
        Map<String, Object> systemInstruction = new HashMap<>();
        systemInstruction.put("parts", List.of(Map.of("text", SYSTEM_PROMPT)));
        requestBody.put("systemInstruction", systemInstruction);

        // 2. Contents (Chat History)
        List<Map<String, Object>> contents = new ArrayList<>();
        
        for (AiChatMessage msg : messages) {
            String role = "user".equalsIgnoreCase(msg.getRole()) ? "user" : "model";
            Map<String, Object> contentPart = new HashMap<>();
            contentPart.put("role", role);
            contentPart.put("parts", List.of(Map.of("text", msg.getContent())));
            contents.add(contentPart);
        }
        
        requestBody.put("contents", contents);

        return requestBody;
    }
}

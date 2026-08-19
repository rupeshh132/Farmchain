package com.farmchain.knowledge.controller;

import com.farmchain.knowledge.dto.AiChatRequest;
import com.farmchain.knowledge.dto.AiChatResponse;
import com.farmchain.knowledge.service.GeminiAiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiAssistantController {

    private final GeminiAiService geminiAiService;

    @PostMapping("/chat")
    public ResponseEntity<AiChatResponse> chat(@RequestBody AiChatRequest request) {
        if (request.getMessages() == null || request.getMessages().isEmpty()) {
            return ResponseEntity.badRequest().body(new AiChatResponse("Message history cannot be empty."));
        }
        
        AiChatResponse response = geminiAiService.getChatResponse(request);
        return ResponseEntity.ok(response);
    }
}

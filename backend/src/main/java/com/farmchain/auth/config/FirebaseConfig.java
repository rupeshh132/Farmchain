package com.farmchain.auth.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.Base64;

@Configuration
@Slf4j
public class FirebaseConfig {

    @Value("${firebase.adminsdk.json.base64:}")
    private String firebaseAdminSdkJsonBase64;

    @PostConstruct
    public void initialize() {
        try {
            if (FirebaseApp.getApps().isEmpty()) {
                InputStream serviceAccount;
                if (firebaseAdminSdkJsonBase64 != null && !firebaseAdminSdkJsonBase64.trim().isEmpty()) {
                    log.info("Loading Firebase credentials from Base64 environment variable.");
                    byte[] decodedBytes = Base64.getDecoder().decode(firebaseAdminSdkJsonBase64);
                    
                    // --- DEBUG LOGGING START ---
                    try {
                        JsonNode jsonNode = new ObjectMapper().readTree(decodedBytes);
                        if (jsonNode.has("private_key") && !jsonNode.get("private_key").asText().isEmpty()) {
                            String privateKey = jsonNode.get("private_key").asText();
                            int length = privateKey.length();
                            String first30 = length > 30 ? privateKey.substring(0, 30).replace("\n", "[NEWLINE]") : privateKey;
                            String last30 = length > 30 ? privateKey.substring(length - 30).replace("\n", "[NEWLINE]") : privateKey;
                            
                            int literalNewlineCount = privateKey.split("\\\\n", -1).length - 1;
                            int actualNewlineCount = privateKey.split("\\n", -1).length - 1;
                            
                            log.info("DEBUG: private_key exists. Total length: {}", length);
                            log.info("DEBUG: First 30 chars: [{}]", first30);
                            log.info("DEBUG: Last 30 chars: [{}]", last30);
                            log.info("DEBUG: Literal '\\n' count: {}", literalNewlineCount);
                            log.info("DEBUG: Actual newline count: {}", actualNewlineCount);
                        } else {
                            log.warn("DEBUG: private_key field missing or empty.");
                        }
                    } catch (Exception e) {
                        log.error("DEBUG: Failed to parse JSON for debugging", e);
                    }
                    // --- DEBUG LOGGING END ---
                    
                    serviceAccount = new ByteArrayInputStream(decodedBytes);
                } else {
                    log.info("Loading Firebase credentials from classpath file.");
                    serviceAccount = getClass().getResourceAsStream("/firebase-adminsdk.json");
                }
                
                if (serviceAccount == null) {
                    log.error("Firebase Service Account JSON not found!");
                    return;
                }

                FirebaseOptions options = FirebaseOptions.builder()
                        .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                        .build();

                FirebaseApp.initializeApp(options);
                log.info("Firebase Admin SDK initialized successfully.");
            }
        } catch (Exception e) {
            log.error("Failed to initialize Firebase Admin SDK", e);
        }
    }
}

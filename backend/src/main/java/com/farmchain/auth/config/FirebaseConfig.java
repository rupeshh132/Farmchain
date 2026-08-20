package com.farmchain.auth.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

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

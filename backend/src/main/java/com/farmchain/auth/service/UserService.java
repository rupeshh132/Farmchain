package com.farmchain.auth.service;

import com.farmchain.auth.dto.UserDtos;
import com.farmchain.auth.entity.User;
import com.farmchain.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User getCurrentUserEntity() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        if (principal instanceof User) {
            return (User) principal;
        }
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Transactional(readOnly = true)
    public UserDtos.UserProfileResponse getCurrentUserProfile() {
        User user = getCurrentUserEntity();
        return mapToProfileResponse(user);
    }

    @Transactional
    public UserDtos.UserProfileResponse uploadProfilePhoto(UserDtos.PhotoUploadRequest request) {
        User user = getCurrentUserEntity();
        user.setProfilePhotoUrl(request.getBase64Image());
        userRepository.save(user);
        return mapToProfileResponse(user);
    }

    private UserDtos.UserProfileResponse mapToProfileResponse(User user) {
        return UserDtos.UserProfileResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .phone(user.getPhone())
                .role(user.getRole().name())
                .preferredLanguage(user.getPreferredLanguage())
                .profilePhotoUrl(user.getProfilePhotoUrl())
                .build();
    }
}

package store.aiexchange.shop.rest;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import store.aiexchange.shop.entities.Chatter;
import store.aiexchange.shop.entities.Login;
import store.aiexchange.shop.entities.Profile;
import store.aiexchange.shop.entities.ProfileData;
import store.aiexchange.shop.repositories.ProfileRepository;

@RestController
public class ProfileRest {
	private static final Map<String, Profile> PROFILE_MAP = new ConcurrentHashMap<String, Profile>();

    @Autowired
    private ProfileRepository profileRepository;

    @PostMapping("/createAccount")
    public ResponseEntity<?> createProfile(@RequestBody Profile accountData) {
    	ResponseEntity<?> response;
        Profile existingProfile = profileRepository.findByUsername(accountData.getUsername());
        if (existingProfile != null) {
            response = new ResponseEntity<>("Username already exists", HttpStatus.CONFLICT);
        } else {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(); 
            String encodedPassword = passwordEncoder.encode(accountData.getPassword()); 
            
            Profile profile = new Profile(accountData.getName(), accountData.getUsername(),
                    accountData.getEmail(), encodedPassword);
            profileRepository.save(profile);
            ProfileData profileData = new ProfileData(profile);
            
            response = new ResponseEntity<>(profileData, HttpStatus.CREATED);
        }

        return response;
    }
    @PostMapping("/updateProfile")
    public ResponseEntity<?> updateProfile(@RequestBody Map<String, String> formData) {
        ResponseEntity<?> response;
        String currentUsername = formData.get("currentUsername");
        String newUsername = formData.get("username");
        String newName = formData.get("name");

        Profile profile = PROFILE_MAP.get(currentUsername);

        if (profile == null) {
            response = new ResponseEntity<>("No profile is currently logged in", HttpStatus.UNAUTHORIZED);
        } else {
            Profile existingProfile = profileRepository.findByUsername(newUsername);

            // If the username is changing and the new username already exists
            if ( existingProfile != null) {
                response = new ResponseEntity<>("Username already exists", HttpStatus.CONFLICT);
            } else {
                // Update the profile's name and username
                if (newName != "") {
                    profile.setName(newName);
                }
                if (newUsername != "") {
                    profile.setUsername(newUsername);
                }
                PROFILE_MAP.remove(currentUsername);
                PROFILE_MAP.put(newUsername, profile);
                profileRepository.save(profile);
                ProfileData profileData = new ProfileData(profile);

                response = new ResponseEntity<>(profileData, HttpStatus.OK); 
            }
        }

        return response;
    }


    @GetMapping("/findByUsername")
    public ResponseEntity<ProfileData> findByUsername(@RequestParam(value = "username") String username) {
    	ResponseEntity<ProfileData> response;
    	if (username == null || username.isEmpty()) {
            response = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
        	Profile profile = profileRepository.findByUsername(username);
        	ProfileData profileData = new ProfileData(profile);
        	
            if (profile == null) {
                response = new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                response = new ResponseEntity<>(profileData, HttpStatus.OK);
            }
        }
        return response;
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Login loginData) {
    	System.out.println(loginData);
        Profile existingProfile = profileRepository.findByUsername(loginData.getUsername());
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(); 
        ResponseEntity<?> response;
        if (existingProfile == null) {
        	System.out.println("Username not found");
            response = new ResponseEntity<>("Username not found", HttpStatus.NOT_FOUND);
        } else {
        	if (!passwordEncoder.matches(loginData.getPassword(), existingProfile.getPassword())) {
        		System.out.println("Incorrect password");
        		response = new ResponseEntity<>("Incorrect password", HttpStatus.UNAUTHORIZED);
            } else {
            	PROFILE_MAP.put(existingProfile.getUsername(), existingProfile); 
            	response = new ResponseEntity<>(existingProfile.getUsername(), HttpStatus.OK);
            }
            
        }
        return response;
    }
    
    @PostMapping("/logout")
    public void logout(@RequestBody String username) {
    	PROFILE_MAP.remove(username);
    }
    
    
    public void addChatters(String username, List<Chatter> chatters) {
        Profile profile = PROFILE_MAP.get(username);

        for (Chatter chatter : chatters) {
            profile.addToMyChatters(chatter);
        }
        profileRepository.save(profile);
    }
    
    @PostMapping("/follow")
    public ResponseEntity<?> follow(@RequestBody Map<String, String> followData) {

            String currentUsername = followData.get("currentUsername");
            String otherUsername = followData.get("otherUsername");

            Profile currentProfile = profileRepository.findByUsername(currentUsername);
            Profile otherProfile = profileRepository.findByUsername(otherUsername);
            Map<String, Object> response = new HashMap<>();
            
            currentProfile.addToFollowing(otherProfile);
            otherProfile.addToFollowers(currentProfile);
            response.put("currentProfile", currentProfile);
            response.put("otherProfile", otherProfile);
            profileRepository.save(currentProfile);
            profileRepository.save(otherProfile);
            return new ResponseEntity<>(response, HttpStatus.OK);
            
        
    }

    
    @GetMapping("/profiles")
    public List<ProfileData> getProfiles() {
    	List<Profile> profiles = profileRepository.findAll();
    	List<ProfileData> profileDatas = new ArrayList<ProfileData>();
    	for(Profile profile : profiles) {
    		profileDatas.add(new ProfileData(profile));
    	}
    	return profileDatas;
    }
}

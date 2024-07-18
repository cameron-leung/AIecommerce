package store.aiexchange.shop.rest;

import java.util.List;

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
import store.aiexchange.shop.entities.Profile;
import store.aiexchange.shop.entities.ProfileRepository;

@RestController
public class ProfileRest {

    @Autowired
    private ProfileRepository profileRepository;
    private Profile profile;

    @PostMapping("/createAccount")
    public ResponseEntity<?> createProfile(@RequestBody Profile accountData) {
    	ResponseEntity<?> response;
        Profile existingProfile = profileRepository.findByUsername(accountData.getUsername());
        if (existingProfile != null) {
            response = new ResponseEntity<>("Username already exists", HttpStatus.CONFLICT);
        } else {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(); 
            String encodedPassword = passwordEncoder.encode(accountData.getPassword()); 

            System.out.println("Raw Password: " + accountData.getPassword()); 
            System.out.println("Encoded Password: " + encodedPassword); 
            
            Profile profile = new Profile(accountData.getName(), accountData.getUsername(),
                    accountData.getEmail(), encodedPassword);
            profileRepository.save(profile);
            
            response = new ResponseEntity<>(profile, HttpStatus.CREATED);
        }

        return response;
    }
    @PostMapping("/updateProfile")
    public ResponseEntity<?> updateProfile(@RequestBody Profile updatedProfileData) {
        ResponseEntity<?> response;

        if (profile == null) {
            response = new ResponseEntity<>("No profile is currently logged in", HttpStatus.UNAUTHORIZED);
        } else {
            Profile existingProfile = profileRepository.findByUsername(updatedProfileData.getUsername());

            // If the username is changing and the new username already exists
            if (!profile.getUsername().equals(updatedProfileData.getUsername()) && existingProfile != null) {
                response = new ResponseEntity<>("Username already exists", HttpStatus.CONFLICT);
            } else {
                // Update the profile's name and username
                if (updatedProfileData.getName() != "") {
                    profile.setName(updatedProfileData.getName());
                }
                if (updatedProfileData.getUsername() != "") {
                    profile.setUsername(updatedProfileData.getUsername());
                }
                profileRepository.save(profile);

                response = new ResponseEntity<>(profile, HttpStatus.OK);
            }
        }

        return response;
    }


    @GetMapping("/findByUsername")
    public ResponseEntity<Profile> findByUsername(@RequestParam(value = "username") String username) {
    	ResponseEntity<Profile> response;
        Profile profile = profileRepository.findByUsername(username);
        if (profile == null) {
            response = new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
        	response = new ResponseEntity<>(profile, HttpStatus.OK);
        }
        return response;
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Profile loginData) {
        Profile existingProfile = profileRepository.findByUsername(loginData.getUsername());
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(); 
        ResponseEntity<?> response;
        if (existingProfile == null) {
            response = new ResponseEntity<>("Username not found", HttpStatus.NOT_FOUND);
        } else {
        	if (!passwordEncoder.matches(loginData.getPassword(), existingProfile.getPassword())) {
        		response = new ResponseEntity<>("Incorrect password", HttpStatus.UNAUTHORIZED);
            } else {
            	profile = existingProfile; // Set the profile if login is successful
            	response = new ResponseEntity<>(profile, HttpStatus.OK);
            }
            
        }
        return response;
    }
    
    @GetMapping("/getProfile")
    public Profile getProfile() {
    	return profile;
    }
    
    @PostMapping("/logout")
    public void logout() {
    	profile = null;
    }
    
    @PostMapping("/addToMyChatters")
    public ResponseEntity<?> addChatters(@RequestBody List<Chatter> cart) {
        cart.forEach(profile::addToMyChatters);
        profileRepository.save(profile);

        return new ResponseEntity<>(profile, HttpStatus.OK);
    }
}

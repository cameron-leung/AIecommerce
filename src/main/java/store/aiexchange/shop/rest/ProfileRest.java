package store.aiexchange.shop.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import store.aiexchange.shop.entities.Profile;
import store.aiexchange.shop.entities.ProfileRepository;

@RestController
public class ProfileRest {

    @Autowired
    private ProfileRepository profileRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    private Profile profile;

    @PostMapping("/createAccount")
    public ResponseEntity<?> createProfile(@RequestBody Profile accountData) {
        Profile existingProfile = profileRepository.findByUsername(accountData.getUsername());
        if (existingProfile != null) {
            return new ResponseEntity<>("Username already exists", HttpStatus.CONFLICT);
        }
        String encodedPassword = bCryptPasswordEncoder.encode(accountData.getPassword());
        profile = new Profile(accountData.getName(), accountData.getUsername(),
                accountData.getEmail(), encodedPassword);
        profileRepository.save(profile);
        return new ResponseEntity<>(profile, HttpStatus.CREATED);
    }

    @GetMapping("/findByUsername")
    public ResponseEntity<Profile> findByUsername(@RequestParam(value = "username") String username) {
        Profile profile = profileRepository.findByUsername(username);
        if (profile == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(profile, HttpStatus.OK);
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Profile loginData) {
        Profile existingProfile = profileRepository.findByUsername(loginData.getUsername());
        if (existingProfile == null) {
            return new ResponseEntity<>("Username not found", HttpStatus.NOT_FOUND);
        }
        if (!bCryptPasswordEncoder.matches(loginData.getPassword(), existingProfile.getPassword())) {
            return new ResponseEntity<>("Incorrect password", HttpStatus.UNAUTHORIZED);
        }
        profile = existingProfile; // Set the profile if login is successful
        return new ResponseEntity<>(profile, HttpStatus.OK);
    }
    
    @GetMapping("/getProfile")
    public Profile getProfile() {
    	return profile;
    }
    
    @PostMapping("/logout")
    public void logout() {
    	profile = null;
    }
}

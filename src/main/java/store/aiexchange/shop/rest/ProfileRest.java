package store.aiexchange.shop.rest;


import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import store.aiexchange.shop.repositories.ProfileRepository;
import store.aiexchange.shop.entities.*;

@RestController
public class ProfileRest {

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
            
            response = new ResponseEntity<>(profile, HttpStatus.CREATED);
        }

        return response;
    }
    @PostMapping("/updateProfile")
    public ResponseEntity<?> updateProfile(HttpServletRequest request, @RequestBody Profile updatedProfileData) {
        ResponseEntity<?> response;
        HttpSession session = request.getSession();
        Profile profile = (Profile) session.getAttribute("profile");
        
        if (profile == null) {
            response = new ResponseEntity<>("No profile is currently logged in", HttpStatus.UNAUTHORIZED);
        } else {
            Profile existingProfile = profileRepository.findByUsername(updatedProfileData.getUsername());

            // If the username is changing and the new username already exists
            if (profile.getUsername().equals(updatedProfileData.getUsername()) || existingProfile != null) {
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
    public ResponseEntity<?> login(HttpServletRequest request, @RequestBody Profile loginData) {
    	Profile existingProfile = profileRepository.findByUsername(loginData.getUsername());
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(); 
        ResponseEntity<?> response;
        if (existingProfile == null) {
            response = new ResponseEntity<>("Username not found", HttpStatus.NOT_FOUND);
        } else {
        	if (!passwordEncoder.matches(loginData.getPassword(), existingProfile.getPassword())) {
        		response = new ResponseEntity<>("Incorrect password", HttpStatus.UNAUTHORIZED);
            } else {
            	request.getSession().setAttribute("profile", existingProfile);
                return new ResponseEntity<>(existingProfile, HttpStatus.OK);
            }
        }
        return response;
    }
    
    @GetMapping("/getProfile")
    public Profile getProfile(HttpServletRequest request) {
    	HttpSession session = request.getSession();
        Profile profile = (Profile) session.getAttribute("profile");
        return profile;
    }
    
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        request.getSession().invalidate();
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @PostMapping("/addToMyChatters")
    public ResponseEntity<?> addChatters(HttpServletRequest request, @RequestBody List<Chatter> cart) {
        HttpSession session = request.getSession();
        Profile profile = (Profile) session.getAttribute("profile");
        if (profile == null) {
            return new ResponseEntity<>("No profile is currently logged in", HttpStatus.UNAUTHORIZED);
        }

        cart.forEach(profile::addToMyChatters);
        profileRepository.save(profile);

        return new ResponseEntity<>(profile, HttpStatus.OK);
    }
}

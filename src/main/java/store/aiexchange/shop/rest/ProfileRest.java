package store.aiexchange.shop.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import store.aiexchange.shop.entities.Profile;
import store.aiexchange.shop.entities.ProfileRepository;

@RestController
public class ProfileRest {

    @Autowired
    private ProfileRepository profileRepository;
    private Profile profile;

    @PostMapping("/createAccount")
    public ResponseEntity<?> createProfile(@RequestBody Profile accountData) {
    	System.out.println("java creating profile...");
        Profile existingProfile = profileRepository.findByUsername(accountData.getUsername());
        if (existingProfile != null) {
            return new ResponseEntity<>("Username already exists", HttpStatus.CONFLICT);
        }
        profile = new Profile(accountData.getName(), accountData.getUsername(),
                accountData.getEmail(), accountData.getPassword());
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
}

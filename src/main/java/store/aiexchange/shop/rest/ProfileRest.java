package store.aiexchange.shop.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import store.aiexchange.shop.entities.Chatter;
import store.aiexchange.shop.entities.Order;
import store.aiexchange.shop.entities.Profile;
import store.aiexchange.shop.entities.ProfileRepository;

@RestController
public class ProfileRest {

    @Autowired
    private ProfileRepository profileRepository;

    @PostMapping("/createAccount")
    public Profile createProfile(@RequestBody Profile accountData) {
    	Profile newProfile = new Profile(accountData.getName(), accountData.getUsername(),
                accountData.getEmail(), accountData.getPassword());
    	return profileRepository.save(newProfile);
    }

    @GetMapping("/findByName")
    public Profile findByUsername(@RequestParam(value = "username", defaultValue = "") String username) {
    	return profileRepository.findByUsername(username);
    }
}

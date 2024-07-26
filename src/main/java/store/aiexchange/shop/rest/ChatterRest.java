package store.aiexchange.shop.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import store.aiexchange.shop.entities.Chatter;
import store.aiexchange.shop.repositories.ChatterRepository;

@RestController
public class ChatterRest {

    @Autowired
    private ChatterRepository chatterRepository;

    @GetMapping("/chatters")
    public List<Chatter> getChatters() {
        return chatterRepository.findAll();
    }
    
    @GetMapping("/findByName")
    public Chatter findByName(@RequestParam(value = "name", defaultValue = "") String name) {
        return chatterRepository.findByName(name);
    }
}

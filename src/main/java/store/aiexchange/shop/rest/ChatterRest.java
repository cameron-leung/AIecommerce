package store.aiexchange.shop.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import store.aiexchange.shop.entities.Chatter;
import store.aiexchange.shop.entities.ChatterRepository;

import java.util.List;

@RestController
public class ChatterRest {

    @Autowired
    private ChatterRepository chatterRepository;

    @GetMapping("/chatter")
    public Chatter getChatter() {
        Chatter chatter = new Chatter();
        chatter.setName("Sample Chatter");
        chatter.setCategory(List.of("Category1", "Category2"));
        chatter.setUsername("sampleUser");
        chatter.setPrice(0.00);
        chatter.setBlurb("This is a sample blurb.");
        chatter.setDescription("This is a sample description.");

        return chatter;
    }

    @GetMapping("/chatters")
    public List<Chatter> getChatters() {
        return chatterRepository.findAll();
    }
}

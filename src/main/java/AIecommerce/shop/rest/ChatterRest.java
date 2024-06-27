package AIecommerce.shop.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import AIecommerce.shop.entities.Chatter;

import java.util.Arrays;

@RestController
public class ChatterRest {

    @GetMapping("/chatter")
    public Chatter getChatter() {
        Chatter chatter = new Chatter();
        chatter.setName("Sample Chatter");
        chatter.setCategory(Arrays.asList("Category1", "Category2"));
        chatter.setUsername("sampleUser");
        chatter.setPrice(100);
        chatter.setBlurb("This is a sample blurb.");
        chatter.setDescription("This is a sample description.");
        
        return chatter;
    }
}

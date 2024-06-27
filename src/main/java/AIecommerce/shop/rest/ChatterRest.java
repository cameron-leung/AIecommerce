package AIecommerce.shop.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import AIecommerce.shop.entities.Chatter;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
public class ChatterRest {

    @GetMapping("/chatter")
    public Chatter getChatter() {
        Chatter chatter = new Chatter();
        chatter.setName("Sample Chatter");
        chatter.setCategory(Arrays.asList("Category1", "Category2"));
        chatter.setUsername("sampleUser");
        chatter.setPrice(0.00);
        chatter.setBlurb("This is a sample blurb.");
        chatter.setDescription("This is a sample description.");
        
        return chatter;
    }
    
    @GetMapping("/chatters")
    public List<Chatter> getChatters() {
    	Chatter lili = new Chatter("Lili", Arrays.asList("Helpful", "Personal"), "@B", 2.00, "Your guide to small talk", "Young woman with modern, open-minded, charismatic personality. Expert in social skills and first impressions. Role-plays educational mock interactions over call and video call.");
    	Chatter jerry = new Chatter("Jerry", Arrays.asList("Helpful"), "@S", 0.00, "Authentic home chef", "Elderly Asian grandpa of few words. Authentic home cook to familiarize you with cooking skills, hacks, and recipes.");
    	List<Chatter> chatters = new ArrayList<Chatter>();
    	chatters.add(lili);
    	chatters.add(jerry);
    	return chatters;
    }
}

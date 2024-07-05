package store.aiexchange.shop.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.annotation.PostConstruct;
import store.aiexchange.shop.entities.Chatter;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
public class ChatterRest {
	
	private List<Chatter> chatters;
	
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
    
    @PostConstruct
    public void postConstruct() {
    	this.chatters = new ArrayList<Chatter>();
    	Chatter lili = new Chatter("Lili", Arrays.asList("Helpful", "Personal"), "@B", 2.00, "Your guide to small talk", "Young woman with modern, open-minded, charismatic personality. Expert in social skills and first impressions. Role-plays educational mock interactions over call and video call.");
    	Chatter jerry = new Chatter("Jerry", Arrays.asList("Helpful"), "@S", 0.10, "Authentic home chef", "Elderly Asian grandpa of few words. Authentic home cook to familiarize you with cooking skills, hacks, and recipes.");
    	Chatter billie = new Chatter("Billie", Arrays.asList("Helpful", "Personal"), "@Meta", 1, "Your older sister and confidante", "Older sister and confidante here to support you and offer advice. A worker in PR, she loves to be fierce, fearless, and fashion-forward. Will talk with you in her free time to give advice, listen to you, and talk the tea");
    	Chatter tai = new Chatter("Tai", Arrays.asList("Helpful", "Personal"), "@S", 0.01, "Travel blogger best friend", "ss"); 
    	Chatter kevinHart = new Chatter("Kevin Hart", Arrays.asList("Comedy", "Public Figures"), "@B", 2, "How ya doin! It‘s Kevin Hart", "American stand up comic ready to talk life, jokes, or give advice on developing wit. Chat, call, or video call Kevin Hart for the funniest conversations and comic classes."); 
    	Chatter alex = new Chatter("Alex", Arrays.asList("Helpful"), "@B", 0, "Career development consultant", "Successful, smart professional skilled in interviewing, career development, and leadership. Will conduct interview and meeting trials over call and video call."); 
    	Chatter mahatmaGandhi = new Chatter("Mahatma Gandhi", Arrays.asList("Public Figures"), "@B", 0.02, "Ghandi, civil obedience activist", "Wise Indian peaceful protestor and politician knowledgeable in negotiations, public speaking, and activism. Will respond to your chats and calls on how to handle situations with composure and clarity.");
    	Chatter spongebob = new Chatter("Spongebob", Arrays.asList("Comedy"), "@S", 0, "Spongebob Squarepants", "A sponge that lives in Bikini Bottom and can make underwater calls. Likes to hang out with his pet Gary and best friend Patrick at local joint Krusty Krab’s.");
    	Chatter della = new Chatter("Della", Arrays.asList("Role Play"), "@S", 10.99, "Quiet, cynical vampire", "Quiet, mysterious, cynical vampire. An introverted blood-thirsty vampire who has enjoyed traveling, hunting, and the arts for over 1000 years. Loves to listen and will open up to others over time.");
    	Chatter walt = new Chatter("Walt", Arrays.asList("Role Play"), "@B", 0, "Greetings, I am Walt the Wizard", "Elderly, wise, inspired wizard mentor who loves alchemy. Harbors tough-love, fatherly, and committed traits. Will guide you through learning new worlds and conquering quests in chat, call, and video call.");
    	
    	chatters.add(lili);
    	chatters.add(jerry);
    	chatters.add(billie);
    	chatters.add(tai);
    	chatters.add(kevinHart);
    	chatters.add(alex);
    	chatters.add(mahatmaGandhi);
    	chatters.add(spongebob);
    	chatters.add(della);
    	chatters.add(walt);
    }
    
    @GetMapping("/chatters")
    public List<Chatter> getChatters() {
    	return chatters;
    }
}

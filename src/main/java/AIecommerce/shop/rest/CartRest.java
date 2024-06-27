package AIecommerce.shop.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import AIecommerce.shop.entities.Chatter;

@RestController
public class CartRest {
	
	@Autowired
	private ChatterRest chatterRest;
	

    @PostMapping("/addToCart")
    public String addToCart(@RequestBody Chatter chatter) {
        System.out.println("Received chatter: " + chatter.getName());

        return "Chatter added to cart successfully";
    }
    
    @GetMapping
    public Chatter findByName(@RequestParam(name = "name") String name) {
    	return chatterRest.getChatters().stream()
        .filter(chatter -> chatter.getName().equalsIgnoreCase(name))
        .findFirst()
        .orElse(null);
    }
}

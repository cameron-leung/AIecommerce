package AIecommerce.shop.rest;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
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
	
	private List<Chatter> cart = new ArrayList<>();
	

	@PostMapping("/addToCart")
	public String addToCart(@RequestBody Chatter chatter) {

	    // Check if the chatter already exists in the cart
	    boolean chatterExists = cart.stream()
	            .anyMatch(c -> (c.getName().replaceAll("[^a-zA-Z]", "")).equalsIgnoreCase(chatter.getName().replaceAll("[^a-zA-Z]", "")));
	    
	    
	    if (chatterExists) {
	    	System.out.println("Chatter is already in the cart");
	        return "Chatter is already in the cart";
	    }

	    // Find the chatter by name to ensure valid data
	    Chatter chatterToAdd = findByName(chatter.getName());
	    System.out.println(cart);
	    if (chatterToAdd != null) {
	        cart.add(chatterToAdd);
	        return "Chatter added to cart successfully";
	    } else {
	    	
	        return "Chatter not found";
	    }
	}

    
    @GetMapping("/findByName")
    public Chatter findByName(@RequestParam(value = "name", defaultValue = "") String name) {
    	return chatterRest.getChatters().stream()
        .filter(chatter -> chatter.getName().equalsIgnoreCase(name))
        .findFirst()
        .orElse(null);
    }
    
    @PostMapping("/removeFromCart")
    public String removeFromCart(@RequestBody String name) {
        // Check if the chatter already exists in the cart
    	String trimmedName = name.replaceAll("[^a-zA-Z]", "");
    	
    	boolean chatterExists = cart.stream().anyMatch(c -> (c.getName().replaceAll("[^a-zA-Z]", "")).equalsIgnoreCase(trimmedName));

    	synchronized (cart) {
            if (chatterExists) {
                cart.removeIf(c -> (c.getName().replaceAll("[^a-zA-Z]", "")).equalsIgnoreCase(trimmedName));
                return "Chatter removed from cart successfully";
            } else {
                return "Chatter not found in the cart";
            }
        }
    }

    
    @GetMapping("/contents")
    public List<Chatter> getCartContents() {
        return cart;
    }
}

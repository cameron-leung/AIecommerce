package store.aiexchange.shop.rest;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import store.aiexchange.shop.entities.Chatter;

@RestController
public class CartRest {
    
    @Autowired
    private ChatterRest chatterRest;
    
    private List<Chatter> cart = new ArrayList<>();
    private List<Chatter> purchaseList = new ArrayList<>();

    @PostMapping("/addToCart")
    public String addToCart(@RequestBody Chatter chatter) {
    	System.out.println("add to cart: ");
        return addToList(chatter, cart);
    }
    
    @PostMapping("/addToPurchase")
    public String addToPurchase(@RequestBody Chatter chatter) {
    	System.out.println("add to purchase:");
        return addToList(chatter, purchaseList);
    }
    
    private String addToList(Chatter chatter, List<Chatter> list) {
        // Check if the chatter already exists in the list
        boolean chatterExists = list.stream()
                .anyMatch(c -> c.getName().replaceAll("[^a-zA-Z]", "").equalsIgnoreCase(chatter.getName().replaceAll("[^a-zA-Z]", "")));
        
        if (chatterExists) {
            System.out.println("Chatter is already in the list");
            return "Chatter is already in the list";
        }

        // Find the chatter by name to ensure valid data
        Chatter chatterToAdd = findByName(chatter.getName());
        if (chatterToAdd != null) {
            list.add(chatterToAdd);
            System.out.println(list);
            return "Chatter added to list successfully";
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
    	System.out.println("remove from cart ");
        return removeFromList(name, cart);
    }
    
    @PostMapping("/clearCart")
    public String clearCart() {
    	cart = new ArrayList<>();
    	return "cart cleared successfully";
    }
    
    @PostMapping("/removeFromPurchase")
    public String removeFromPurchase(@RequestBody String name) {
    	System.out.println("remove from purchase ");
        return removeFromList(name, purchaseList);
    }
    
    private String removeFromList(String name, List<Chatter> list) {
        // Check if the chatter exists in the list
        String trimmedName = name.replaceAll("[^a-zA-Z]", "");
        boolean chatterExists = list.stream()
                .anyMatch(c -> c.getName().replaceAll("[^a-zA-Z]", "").equalsIgnoreCase(trimmedName));

        synchronized (list) {
            if (chatterExists) {
                list.removeIf(c -> c.getName().replaceAll("[^a-zA-Z]", "").equalsIgnoreCase(trimmedName));
                return "Chatter removed from list successfully";
            } else {
                return "Chatter not found in the list";
            }
        }
    }
    
    @GetMapping("/cart")
    public List<Chatter> getCart() {
    	return cart;
    }
    @GetMapping("/purchaseList")
    public List<Chatter> getPurchase() {
    	return purchaseList;
    }
}

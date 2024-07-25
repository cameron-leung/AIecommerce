// client side not server side, byuild cart by cookies
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
import store.aiexchange.shop.repositories.ChatterRepository;

@RestController
public class CartRest {
    
    @Autowired
    private ChatterRest chatterRest;
    @Autowired
    private ChatterRepository chatterRepository;
    
    private List<Chatter> cart = new ArrayList<>();
    private List<Chatter> purchaseList = new ArrayList<>();

    @PostMapping("/addToCart")
    public String addToCart(@RequestBody Chatter chatter) {
        return addToList(chatter, cart);
    }
    
    @PostMapping("/addToPurchase")
    public String addToPurchase(@RequestBody Chatter chatter) {
        return addToList(chatter, purchaseList);
    }
    
    private String addToList(Chatter chatter, List<Chatter> list) {
        // Check if the chatter already exists in the list
        boolean chatterExists = list.stream()
                .anyMatch(c -> c.getName().replaceAll("[^a-zA-Z]", "").equalsIgnoreCase(chatter.getName().replaceAll("[^a-zA-Z]", "")));
        String returnString = "";
        if (chatterExists) {
            returnString = "Chatter is already in the list";
        }
        // Find the chatter by name to ensure valid data
        Chatter chatterToAdd = findByName(chatter.getName());
        if (chatterToAdd != null) {
            list.add(chatterToAdd);
            returnString = "Chatter added to list successfully";
        } else {
            returnString = "Chatter not found";
        }
        return returnString;
    }

    @GetMapping("/findByName")
    public Chatter findByName(@RequestParam(value = "name", defaultValue = "") String name) {
        return chatterRepository.findByName(name);
    }

    @PostMapping("/removeFromCart")
    public String removeFromCart(@RequestBody String name) {
        return removeFromList(name, cart);
    }
    
    public void clearCart() {
    	cart.clear();
    }
    
    @PostMapping("/removeFromPurchase")
    public String removeFromPurchase(@RequestBody String name) {
        return removeFromList(name, purchaseList);
    }
    
    private String removeFromList(String name, List<Chatter> list) {
        // Check if the chatter exists in the list
        String trimmedName = name.replaceAll("[^a-zA-Z]", "");
        String returnString;
        boolean chatterExists = list.stream()
                .anyMatch(c -> c.getName().replaceAll("[^a-zA-Z]", "").equalsIgnoreCase(trimmedName));

        synchronized (list) {
            if (chatterExists) {
                list.removeIf(c -> c.getName().replaceAll("[^a-zA-Z]", "").equalsIgnoreCase(trimmedName));
                returnString = "Chatter removed from list successfully";
                 
            } else {
                returnString = "Chatter not found in the list";
            }
        }
        return returnString;
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

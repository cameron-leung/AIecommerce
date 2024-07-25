package store.aiexchange.shop.entities;

import java.util.ArrayList;
import java.util.List;


public class Cart {
	private List<Chatter> cart;
	
	public Cart() {
		cart = new ArrayList<>();
	}
	
	public void addToCart(Chatter chatter) {
		boolean chatterInCart = cart.stream()
                .anyMatch(c -> c.getName().replaceAll("[^a-zA-Z]", "").equalsIgnoreCase(chatter.getName().replaceAll("[^a-zA-Z]", "")));

        if (!chatterInCart && chatter != null) {
        	cart.add(chatter);
        }
    }
	
	public void removeFromCart(Chatter chatter) {
		boolean chatterInCart = cart.stream()
                .anyMatch(c -> c.getName().replaceAll("[^a-zA-Z]", "").equalsIgnoreCase(chatter.getName().replaceAll("[^a-zA-Z]", ""))); 
		if (chatter != null && chatterInCart) {
			cart.remove(chatter);
		}
	}
	public List<Chatter> getCart() {
		return cart;
	}
}

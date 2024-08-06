package store.aiexchange.shop.entities;

import java.util.List;

public class Order {
	private String name;
	private String username;
	private String cardholderName;
	private List<Chatter> orderItems;
	
	public Order(String name, String username, String cardholderName, List<Chatter> orderItems) {
		this.name = name;
		this.username = username;
		this.cardholderName = cardholderName;
		this.orderItems = orderItems;
	}
	
	public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
    public String getCardholderName() {
        return cardholderName;
    }

    public void setCardholderName(String cardholderName) {
        this.cardholderName = cardholderName;
    }
    public List<Chatter> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<Chatter> orderItems) {
        this.orderItems = orderItems;
    }
    @Override
    public String toString() {
    	return this.username + " " + orderItems;
    }
}

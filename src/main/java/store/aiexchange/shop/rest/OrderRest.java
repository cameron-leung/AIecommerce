package store.aiexchange.shop.rest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import store.aiexchange.shop.entities.Order;
import store.aiexchange.shop.repositories.OrderRepository;

@RestController
public class OrderRest {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private ProfileRest profileRest;

    @Autowired
    private ChatterRest chatterRest;

    @PostMapping("/addOrder")
    public Order addOrder(@RequestBody Order orderData) {
    	System.out.println("Received order data: " + orderData);

    	Order returnOrder = null;
    	if(orderData.getUsername() != null) {
    		System.out.println("Processing order for username: " + orderData.getUsername());
    		Order newOrder = new Order(orderData.getName(), orderData.getUsername(),
                    orderData.getCardholderName(), orderData.getOrderItems());
             // Call addChatters with the constructed requestBody map
             profileRest.addChatters(orderData.getUsername(), orderData.getOrderItems());
             returnOrder = orderRepository.save(newOrder);  
             System.out.println("Order saved: " + returnOrder);
    	} else {
    		System.out.println("Invalid order data: missing username");
    	}
    	return returnOrder;
    }

    @GetMapping("/orders")
    public List<Order> getOrders() {
        return orderRepository.findAll();
    }
}

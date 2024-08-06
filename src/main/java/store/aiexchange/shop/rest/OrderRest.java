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

    	Order returnOrder = null;
    	if(orderData.getUsername() != null) {
    		Order newOrder = new Order(orderData.getName(), orderData.getUsername(),
                    orderData.getCardholderName(), orderData.getOrderItems());
             // Call addChatters with the constructed requestBody map
             returnOrder = orderRepository.save(newOrder);  
    	}
    	return returnOrder;
    }

    @GetMapping("/orders")
    public List<Order> getOrders() {
        return orderRepository.findAll();
    }
}

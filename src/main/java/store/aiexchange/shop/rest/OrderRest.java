package store.aiexchange.shop.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import store.aiexchange.shop.entities.Chatter;
import store.aiexchange.shop.entities.Order;
import store.aiexchange.shop.entities.OrderRepository;

@RestController
public class OrderRest {

    @Autowired
    private OrderRepository orderRepository;
    
    private List<Order> orders;

    @PostMapping("/addOrder")
    public Order addOrder(String name, String username, String cardholderName, List<Chatter> orderItems) {
    	Order newOrder = new Order(name, username, cardholderName, orderItems);
    	orders.add(newOrder);
    	return newOrder;
    }

    @GetMapping("/orders")
    public List<Chatter> getChatters() {
        return orderRepository.findAll();
    }
}

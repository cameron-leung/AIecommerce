package store.aiexchange.shop.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import store.aiexchange.shop.entities.Chatter;
import store.aiexchange.shop.entities.Order;
import store.aiexchange.shop.entities.OrderRepository;

@RestController
public class OrderRest {

    @Autowired
    private OrderRepository orderRepository;

    @PostMapping("/addOrder")
    public Order addOrder(@RequestBody Order orderData) {
    	Order newOrder = new Order(orderData.getName(), orderData.getUsername(),
                orderData.getCardholderName(), orderData.getOrderItems());
    	return orderRepository.save(newOrder);
    }

    @GetMapping("/orders")
    public List<Order> getOrders() {
        return orderRepository.findAll();
    }
}

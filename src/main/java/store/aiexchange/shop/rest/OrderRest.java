package store.aiexchange.shop.rest;

import java.util.List;

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
    //PROFILErest.getprofileMap()
    @Autowired
    private CartRest cartRest;
    @Autowired
    private ChatterRest chatterRest;

    @PostMapping("/addOrder")
    public Order addOrder(@RequestBody Order orderData) {
    	Order newOrder = new Order(orderData.getName(), orderData.getUsername(),
                orderData.getCardholderName(), orderData.getOrderItems());
    	profileRest.addChatters(orderData.getUsername(), orderData.getOrderItems());
    	cartRest.clearCart();
    	return orderRepository.save(newOrder); //return HTTPS success
    }

    @GetMapping("/orders")
    public List<Order> getOrders() {
        return orderRepository.findAll();
    }
}

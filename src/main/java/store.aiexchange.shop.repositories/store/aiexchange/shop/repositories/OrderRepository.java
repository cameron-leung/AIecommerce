package store.aiexchange.shop.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import store.aiexchange.shop.entities.Order;

public interface OrderRepository extends MongoRepository<Order, String> {
}

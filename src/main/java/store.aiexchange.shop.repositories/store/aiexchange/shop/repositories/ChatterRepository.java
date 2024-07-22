package store.aiexchange.shop.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import store.aiexchange.shop.entities.Chatter;

public interface ChatterRepository extends MongoRepository<Chatter, String> {
}

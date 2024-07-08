package store.aiexchange.shop.entities;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChatterRepository extends MongoRepository<Chatter, String> {
}

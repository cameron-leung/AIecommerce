package store.aiexchange.shop.entities;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatterRepository extends MongoRepository<Chatter, String> {
}

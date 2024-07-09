package store.aiexchange.shop.entities;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProfileRepository extends MongoRepository<Profile, String> {
	Profile findByUsername(String username);
}

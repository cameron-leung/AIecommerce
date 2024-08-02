package store.aiexchange.shop.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import store.aiexchange.shop.entities.Profile;

public interface ProfileRepository extends MongoRepository<Profile, String> {
	Profile findByUsername(String username);
	List<Profile> findAllById(List<String> ids);
}

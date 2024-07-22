package store.aiexchange.shop;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import store.aiexchange.shop.repositories.ChatterRepository;
import store.aiexchange.shop.repositories.ProfileRepository;

@SpringBootTest
class ShopApplicationTests {
	
	@Autowired
	private ChatterRepository chatterRepository;
	@Autowired
	private ProfileRepository profileRepository;

	@Test
	void contextLoads() {
		System.out.println(profileRepository.findByUsername("S"));
	}
}

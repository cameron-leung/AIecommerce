package store.aiexchange.shop;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import store.aiexchange.shop.entities.ChatterRepository;

@SpringBootTest
class ShopApplicationTests {
	
	@Autowired
	private ChatterRepository chatterRepository;

	@Test
	void contextLoads() {
		System.out.println(chatterRepository.findAll());
	}
}

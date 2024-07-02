package AIecommerce.shop;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import store.aiexchange.shop.rest.ChatterRest;

@SpringBootTest
class ShopApplicationTests {
	
	@Autowired
	private ChatterRest chatterRest;

	@Test
	void contextLoads() {
		System.out.println(chatterRest.getChatter().getName());
	}
}

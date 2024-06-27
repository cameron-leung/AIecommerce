package AIecommerce.shop.entities;
import java.util.List;
import java.util.ArrayList;

public class Chatter {
	private String name;
	private List<String> category;
	private String username;
	private double price;
	private String blurb;
	private String description;
	
	// Default constructor
    public Chatter() {
        this.category = new ArrayList<>();
    }

    // Parameterized constructor
    public Chatter(String name, List<String> category, String username, double price, String blurb, String description) {
        this.name = name;
        this.category = category;
        this.username = username;
        this.price = price;
        this.blurb = blurb;
        this.description = description;
    }

    // Getter and setter methods
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getCategory() {
        return category;
    }

    public void setCategory(List<String> category) {
        this.category = category;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getBlurb() {
        return blurb;
    }

    public void setBlurb(String blurb) {
        this.blurb = blurb;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}

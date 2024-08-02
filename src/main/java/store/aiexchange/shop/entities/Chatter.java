package store.aiexchange.shop.entities;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "chatter")
public class Chatter {

	@Id
	private String _id;
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
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Chatter chatter = (Chatter) o;
        return username.equals(chatter.username);
    }

    @Override
    public int hashCode() {
        return Objects.hash(username);
    }
    
    @Override
    public String toString() {
    	return name;
    }
}



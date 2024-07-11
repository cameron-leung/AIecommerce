package store.aiexchange.shop.entities;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;

public class Profile {
	@Id
	private String _id;
    private String name;
    private String username;
    private String password;
    private String email;
    private List<Chatter> myChatters;
    private List<Order> myOrders;
    private List<Profile> followers;
    private List<Profile> following;

    // Constructors
    public Profile() {}

    public Profile(String name, String username, String email, String password) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.email = email;
        this.myChatters= new ArrayList<Chatter>();
        this.myOrders = new ArrayList<Order>();
        this.followers = new ArrayList<Profile>();
        this.following = new ArrayList<Profile>();
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Chatter> getMyChatters() {
        return myChatters;
    }
    
    public int getNumMyChatters() {
    	return myChatters.size();
    }

    public void addToMyChatters(Chatter chatter) {
        this.myChatters.add(chatter);
    }
    public void removeFromMyChatters(Chatter chatter) {
        this.myChatters.remove(chatter);
    }
    public void addToMyOrders(Order order) {
    	this.myOrders.add(order);
    }
    public void removeFromMyOrders(Order order) {
    	this.myOrders.remove(order);
    }
    public List<Profile> getFollowers() {
        return followers;
    }
    
    public int getNumFollowers() {
    	return followers.size();
    }

    public void addToFollowers(Profile profile) {
        this.followers.add(profile);
    }
    public List<Profile> getFollowing() {
        return followers;
    }
    
    public int getNumFollowing() {
    	return following.size();
    }

    public void addToFollowing(Profile profile) {
        this.following.add(profile);
    }
    public void removeFromFollowing(Profile profile) {
        this.following.remove(profile);
    }
}

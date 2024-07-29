package store.aiexchange.shop.entities;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;

public class ProfileData{
	private String id;
    private String name;
    private String username;
    private String email;
    private List<Chatter> myChatters;
    private List<Order> myOrders;
    private List<String> followers;
    private List<String> following;
    

    // Constructors
    public ProfileData(String name, String username, String email) {
    	this.name = name;
        this.username = username;
        this.email = email;
        this.myChatters = new ArrayList<>();
        this.myOrders = new ArrayList<>();
        this.followers = new ArrayList<>();
        this.following = new ArrayList<>();
        
    }
    public ProfileData(ProfileData other) {
        this.name = other.name;
        this.username = other.username;
        this.email = other.email;
        this.myChatters = new ArrayList<>(other.myChatters);
        this.myOrders = new ArrayList<>(other.myOrders);
        this.followers = new ArrayList<>(other.followers);
        this.following = new ArrayList<>(other.following);
        
    }

	// Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Chatter> getMyChatters() {
        return myChatters;
    }

    public void setMyChatters(List<Chatter> myChatters) {
        this.myChatters = myChatters;
    }

    public List<Order> getMyOrders() {
        return myOrders;
    }

    public void setMyOrders(List<Order> myOrders) {
        this.myOrders = myOrders;
    }

    public List<String> getFollowers() {
        return followers;
    }

    public void setFollowers(List<String> followers) {
        this.followers = followers;
    }

    public List<String> getFollowing() {
        return following;
    }

    public void setFollowing(List<String> following) {
        this.following = following;
    }
    public void addToFollowing(String profileId) {
        if (!following.contains(profileId)) {
            following.add(profileId);
        }
    }
    public void removeFromFollowing(String profileId) {
        if(following.contains(profileId)) {
        	following.remove(profileId);
        }
    }
    public void addToFollowers(String profileId) {
    	if(!followers.contains(profileId)) {
        	followers.add(profileId);
        }
    }
    public void removeFromFollowers(String profileId) {
        if(followers.contains(profileId)) {
        	followers.remove(profileId);
        }
    }
    public void addToMyChatters(Chatter chatter) {
        this.myChatters.add(chatter);
    }

    public void removeFromMyChatters(Chatter chatter) {
        this.myChatters.remove(chatter);
    }
    
}

package store.aiexchange.shop.entities;

import java.util.ArrayList;
import java.util.List;

public class Profile {
    private String name;
    private String username;
    private String password;
    private String email;
    private List<Chatter> myChatters;
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

    public void setMyChatters(List<Chatter> myChatters) {
        this.myChatters = myChatters;
    }
}

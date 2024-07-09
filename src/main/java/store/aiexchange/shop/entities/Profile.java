package store.aiexchange.shop.entities;

import java.util.List;

public class Profile {
    private String name;
    private String username;
    private String password;
    private String email;
    private List<Chatter> myChatters;

    // Constructors
    public Profile() {}

    public Profile(String name, String username, String password, String email) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.email = email;
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

    public void setMyChatters(List<Chatter> myChatters) {
        this.myChatters = myChatters;
    }
}

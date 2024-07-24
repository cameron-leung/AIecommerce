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
        this.myChatters = new ArrayList<>();
        this.myOrders = new ArrayList<>();
        this.followers = new ArrayList<>();
        this.following = new ArrayList<>();
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

    public List<Order> getMyOrders() {
        return myOrders;
    }

    public void setMyOrders(List<Order> myOrders) {
        this.myOrders = myOrders;
    }

    public List<Profile> getFollowers() {
        return followers;
    }

    public void setFollowers(List<Profile> followers) {
        this.followers = followers;
    }

    public List<Profile> getFollowing() {
        return following;
    }

    public void setFollowing(List<Profile> following) {
        this.following = following;
    }

    // Convert to ProfileData
    public ProfileData toProfileData() {
        ProfileData profileData = new ProfileData();
        profileData.setMyChatters(this.myChatters);
        profileData.setMyOrders(this.myOrders);
        profileData.setFollowers(convertProfilesToProfileData(this.followers));
        profileData.setFollowing(convertProfilesToProfileData(this.following));
        return profileData;
    }

    // Convert ProfileData to Profile
    public static Profile fromProfileData(ProfileData profileData, String name, String username, String email, String password) {
        Profile profile = new Profile(name, username, email, password);
        profile.setMyChatters(profileData.getMyChatters());
        profile.setMyOrders(profileData.getMyOrders());
        profile.setFollowers(convertProfileDataToProfiles(profileData.getFollowers()));
        profile.setFollowing(convertProfileDataToProfiles(profileData.getFollowing()));
        return profile;
    }

    private static List<Profile> convertProfileDataToProfiles(List<ProfileData> profileDataList) {
        List<Profile> profiles = new ArrayList<>();
        for (ProfileData data : profileDataList) {
            profiles.add(Profile.fromProfileData(data, "", "", "", ""));
        }
        return profiles;
    }

    private static List<ProfileData> convertProfilesToProfileData(List<Profile> profiles) {
        List<ProfileData> profileDataList = new ArrayList<>();
        for (Profile profile : profiles) {
            profileDataList.add(profile.toProfileData());
        }
        return profileDataList;
    }
}

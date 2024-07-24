package store.aiexchange.shop.entities;

import java.util.ArrayList;
import java.util.List;

public class ProfileData {
	private List<Chatter> myChatters;
    private List<Order> myOrders;
    private List<Profile> followers;
    private List<Profile> following;
    
    public ProfileData() {
		this.myChatters = new ArrayList<>();
		this.myOrders = new ArrayList<>();
		this.followers = new ArrayList<>();
		this.following = new ArrayList<>();
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
	
}

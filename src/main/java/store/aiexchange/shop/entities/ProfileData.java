package store.aiexchange.shop.entities;

import java.util.List;

import org.springframework.data.annotation.Id;

public class ProfileData {

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
	private List<Chatter> myChatters;
    private List<Order> myOrders;
    private List<Profile> followers;
    private List<Profile> following;
}

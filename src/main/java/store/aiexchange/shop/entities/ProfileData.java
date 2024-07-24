package store.aiexchange.shop.entities;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;

public class ProfileData {

	private List<Chatter> myChatters;
	private List<Order> myOrders;
	private List<ProfileData> followers;
	private List<ProfileData> following;

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

	public List<ProfileData> getFollowers() {
		return followers;
	}

	public void setFollowers(List<ProfileData> followers) {
		this.followers = followers;
	}

	public List<ProfileData> getFollowing() {
		return following;
	}

	public void setFollowing(List<ProfileData> following) {
		this.following = following;
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

	public void addToFollowers(ProfileData profile) {
		this.followers.add(profile);
	}

	public void removeFromFollowers(ProfileData profile) {
		this.followers.remove(profile);
	}

	public void addToFollowing(ProfileData profile) {
		this.following.add(profile);
	}

	public void removeFromFollowing(ProfileData profile) {
		this.following.remove(profile);
	}
}

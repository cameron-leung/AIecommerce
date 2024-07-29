package store.aiexchange.shop.entities;

import org.springframework.data.annotation.Id;

public class Profile extends ProfileData{
    
	@Id
    private String _id;
	private String password;
	
	public Profile(String name, String username, String email, String password) {
		super(name, username, email);
		this.password = password;
	}
	@Override
    public String getId() {
        return _id;
    }

    public void setId() {
        super.setId(this._id);
    }
	
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
}

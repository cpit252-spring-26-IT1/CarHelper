package com.carhelper.user;

public class UserAuthManager {

    private static UserAuthManager instance;

    private UserAuthManager() {}

    public static synchronized UserAuthManager getInstance() {
        if (instance == null) {
            instance = new UserAuthManager();
        }
        return instance;
    }

    public boolean loginUser(String email, String password) {
        System.out.println("Login user: " + email);
        return true;
    }
}
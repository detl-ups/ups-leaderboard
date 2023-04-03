package ec.edu.ups.leaderboard.util;

public class StringRandoms {


    /* Generate random string with len*/
    public static String generateRandomString(int len) {
        String AB = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        StringBuilder sb = new StringBuilder(len);
        for (int i = 0; i < len; i++)
            sb.append(AB.charAt((int) (Math.random() * AB.length())));
        return sb.toString();
    }
}

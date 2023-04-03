package ec.edu.ups.leaderboard.util;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;

public class FileCsvUtil {

    public static ArrayList<String[]> leerCsv(byte[] content) {
        ArrayList<String[]> lst = new ArrayList<>();
        try {
            String row;
            BufferedReader csvReader = new BufferedReader(new InputStreamReader(new ByteArrayInputStream(content)));
            String firsLine = row = csvReader.readLine();
            while ((row = csvReader.readLine()) != null) {
                String[] data = row.split(";");
                // do something with the data
                lst.add(data);
            }
            csvReader.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return lst;
    }
    public static String[] splitFirstLineBy(byte[] content, String splitCharacter) {
        String[] lst = null;
        try {
            lst = leerFirstLineCsv(content).split(splitCharacter);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return lst;
    }
    public static String leerFirstLineCsv(byte[] content) {
        String line = null;
        try {

            BufferedReader csvReader = new BufferedReader(new InputStreamReader(new ByteArrayInputStream(content)));
            line = csvReader.readLine();
            csvReader.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return line;
    }
}

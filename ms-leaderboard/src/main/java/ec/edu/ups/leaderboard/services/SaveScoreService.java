package ec.edu.ups.leaderboard.services;

import ec.edu.ups.leaderboard.entities.Student;
import ec.edu.ups.leaderboard.model.RequestSaveCourse;

import java.util.List;

public interface SaveScoreService {


    String generateCourse();

    void saveScore(RequestSaveCourse requestSaveCourse);

    List <Student> getStudentByCourse(String course);
}

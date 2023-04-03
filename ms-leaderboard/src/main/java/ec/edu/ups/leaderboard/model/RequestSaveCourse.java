package ec.edu.ups.leaderboard.model;

import ec.edu.ups.leaderboard.entities.Label;
import ec.edu.ups.leaderboard.entities.Student;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestSaveCourse {

    String course;
    List<Label>field;
    List<Student> students;
}

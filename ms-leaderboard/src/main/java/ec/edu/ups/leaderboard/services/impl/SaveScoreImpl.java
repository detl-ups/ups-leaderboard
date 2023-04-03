package ec.edu.ups.leaderboard.services.impl;

import ec.edu.ups.leaderboard.entities.Student;
import ec.edu.ups.leaderboard.model.RequestSaveCourse;
import ec.edu.ups.leaderboard.repository.StudentRepository;
import ec.edu.ups.leaderboard.services.SaveScoreService;
import ec.edu.ups.leaderboard.util.StringRandoms;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class SaveScoreImpl implements SaveScoreService {

    @Autowired
    StudentRepository studentRepository;


    @Override
    public String generateCourse() {
        String course = StringRandoms.generateRandomString(4);
        return studentRepository.existsByCourse(course)?  generateCourse():course.toUpperCase();
    }

    @Override
    public void saveScore(RequestSaveCourse requestSaveCourse) {

        if(requestSaveCourse.getStudents().isEmpty()){
            throw new RuntimeException("No hay estudiantes para guardar");
        }
        if(requestSaveCourse.getCourse().isEmpty()){
            throw new RuntimeException("No hay curso para guardar");
        }
        if (studentRepository.existsByCourse(requestSaveCourse.getCourse())){

            studentRepository.removeByCourse(requestSaveCourse.getCourse());
        }

        requestSaveCourse.getStudents().forEach(student -> {
            student.setCourse(requestSaveCourse.getCourse());
            studentRepository.save(student);
        });


    }

    @Override
    public List<Student> getStudentByCourse(String course) {
        ArrayList<Student> students = new ArrayList<>();
        studentRepository.findAllByCourse(course).forEach(students::add);

        return students;
    }
}

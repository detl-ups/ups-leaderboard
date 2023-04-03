package ec.edu.ups.leaderboard.repository;

import ec.edu.ups.leaderboard.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface StudentRepository extends JpaRepository<Student, Long> {

    public boolean existsByCourse(String course);

        Long  removeByCourse(String course);

        List<Student> findAllByCourse(String course);
}

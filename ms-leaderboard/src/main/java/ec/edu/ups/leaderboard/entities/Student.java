package ec.edu.ups.leaderboard.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "student")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Student {

    @Id
    @GeneratedValue
    long id;
    String name;
    int rank;
    String nota;
    String course;

}

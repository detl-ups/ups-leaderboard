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
@Table(name = "labels")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Label {

    String field;
    String header;

    @Id
    @GeneratedValue
    private Long id;


}

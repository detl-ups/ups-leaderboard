package ec.edu.ups.leaderboard.controller;

import ec.edu.ups.leaderboard.model.RequestSaveCourse;
import ec.edu.ups.leaderboard.services.SaveScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/score")
@CrossOrigin(origins = "*")
public class ScoreController {

    @Autowired
    SaveScoreService saveScoreService;

    @GetMapping(  produces = "application/json")
    public ResponseEntity generateCourse(){
        return ResponseEntity.ok("{\"course\": \""+saveScoreService.generateCourse()+"\"}");
    }
    @PostMapping("/")
    public ResponseEntity saveScore(@RequestBody RequestSaveCourse requestSaveCourse){
        saveScoreService.saveScore(requestSaveCourse);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/list")
    public ResponseEntity<?> listFields(@RequestParam("course") String course){

        return ResponseEntity.ok(saveScoreService.getStudentByCourse(course));
    }

}

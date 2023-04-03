import 'package:flutter/material.dart';

import 'package:flutter/material.dart';
import 'package:score/model/student.dart';
import 'package:score/screen/grades_screen.dart';
import 'package:score/util/api.dart';
import 'package:score/widget/code_input.dart';

class InitialScreen extends StatefulWidget {
  const InitialScreen({super.key});

  @override
  State<InitialScreen> createState() => _InitialScreenState();
}

class _InitialScreenState extends State<InitialScreen> {
  final TextEditingController courseController = TextEditingController();
  final ApiClient _apiClient = ApiClient();

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;

    return Scaffold(
      body: Container(
        // decoration: BoxDecoration(
        //   // Box decoration takes a gradient
        //   gradient: LinearGradient(
        //     // Where the linear gradient begins and ends
        //     begin: Alignment.topRight,

        //     end: Alignment.bottomLeft,
        //     // Add one stop for each color. Stops should increase from 0 to 1
        //     stops: [0.1, 0.3, 0.6, 0.9],
        //     colors: [
        //       // Colors are easy thanks to Flutter's Colors class.
        //       Color.fromARGB(255, 198, 198, 198)!,
        //       Color.fromARGB(255, 183, 183, 184)!,
        //       Color.fromARGB(255, 182, 182, 182)!,
        //       Color.fromARGB(255, 185, 185, 185)!,
        //     ],
        //   ),
        // ),
        child: SingleChildScrollView(
            scrollDirection: Axis.vertical,
            child: Center(
                child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: <Widget>[
                SizedBox(height: size.height * 0.1),
                Column(
                  children: [
                    Container(
                      width: size.width * 0.7,
                      height: size.height * 0.3,
                      child: Image.asset('assets/images/leaderboard.png'),
                    ),
                  ],
                ),
                SizedBox(height: 20),
                Text(
                  'Ingrese el código',
                  style: TextStyle(
                    color: Colors.black,
                    fontSize: 30,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Text(
                  'Proporcionado por su profesor',
                  style: TextStyle(
                    color: Colors.black54,
                    fontSize: 15,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(height: 15),
                VerificationCodeInput(
                  itemDecoration: BoxDecoration(
                    color: Colors.black12,
                    borderRadius: BorderRadius.circular(10),
                  ),
                  keyboardType: TextInputType.text,
                  length: 4,
                  autofocus: true,
                  onCompleted: (String value) {
                    //...
                    print(value);

                    getStudents(value);
                  },
                ),
              ],
            ))),
      ),
    );
  }

  void getStudents(course) async {
    dynamic res = await _apiClient.listStudiante(course);

    print("Se obtuvo los detalles del curso $course");
    List<Student> students = Student.listFromJson(res);

    if (students.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          duration: Duration(seconds: 1),
          backgroundColor: Colors.red.shade300,
          content: Text('No se encontraron estudiantes'),
        ),
      );

      return;
    }
    students.sort((a, b) => a.rank.compareTo(b.rank));
    FocusScopeNode currentFocus = FocusScope.of(context);

    if (!currentFocus.hasPrimaryFocus) {
      currentFocus.unfocus();
    }

    // Navigate to the second screen using a named route.
    Navigator.push(
        context,
        MaterialPageRoute(
            builder: (context) => GradesScreen(
                  course: course.toUpperCase(),
                  data: students,
                )));
  }
}

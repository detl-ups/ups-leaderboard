import 'package:flutter/material.dart';

import 'package:flutter/material.dart';
import 'package:score/model/student.dart';
import 'package:score/util/api.dart';

class GradesScreen extends StatefulWidget {
  final String course;
  final List<Student> data;
  const GradesScreen({super.key, required this.course, required this.data});

  @override
  State<GradesScreen> createState() => _GradesScreenState();
}

class _GradesScreenState extends State<GradesScreen> {
  final ApiClient _apiClient = ApiClient();
  DateTime currentBackPressTime = DateTime.now();

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;
    print(widget.course);
    return Scaffold(
        body: WillPopScope(
      // ignore: sort_child_properties_last
      child: SizedBox(
          width: size.width,
          height: size.height,
          child: Container(
            width: size.width,
            height: size.height,
            // Add box decoration
            decoration: BoxDecoration(
              // Box decoration takes a gradient
              gradient: LinearGradient(
                // Where the linear gradient begins and ends
                begin: Alignment.topRight,
                end: Alignment.bottomLeft,
                // Add one stop for each color. Stops should increase from 0 to 1
                stops: [0.1, 0.9],
                colors: [
                  // Colors are easy thanks to Flutter's Colors class.
                  Color.fromARGB(255, 244, 244, 247)!,
                  Color.fromARGB(255, 210, 219, 223)!,
                ],
              ),
            ),
            child: FutureBuilder<List<Student>>(
              future: Future.value(widget.data),
              builder: (context, snapshot) {
                if (snapshot.hasData) {
                  // if (snapshot.connectionState == ConnectionState.waiting) {
                  //   return Positioned.fill(
                  //     child: Container(
                  //       child: const Center(
                  //         child: CircularProgressIndicator(),
                  //       ),
                  //     ),
                  //   );
                  // }
                  if (snapshot.data == null || snapshot.data!.isEmpty) {
                    Navigator.pop(context, "an error");
                    return Container(
                      height: size.height / 5,
                      width: size.width / 5,
                      color: Colors.white,
                      child: const Center(
                        child: Text("No hay datos"),
                      ),
                    );
                  } else {
                    List<Student> students = snapshot.data!;

                    students.sort((a, b) => a.rank.compareTo(b.rank));
                    return buildData(students);
                  }
                } else if (snapshot.hasError) {
                  return Text("${snapshot.error}");
                }
                return const Center(
                  child: CircularProgressIndicator(),
                );
              },
            ),
          )),
      onWillPop: onWillPop,
    ));
  }

  Future<List<Student>> getStudents() async {
    dynamic res = await _apiClient.listStudiante(widget.course);

    print("Se obtuvo los detalles de multas");
    return Student.listFromJson(res);
  }

  Widget buildData(List<Student> data) {
    var size = MediaQuery.of(context).size;

    return Container(
        child: Column(
      children: [
        Container(
          width: size.width,
          height: size.height * 0.25,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                'Curso: ${widget.course}',
                textAlign: TextAlign.center,
                style: TextStyle(
                  color: Colors.black,
                  fontSize: 25,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 20),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Wrap(
                    crossAxisAlignment: WrapCrossAlignment.center,
                    children: [
                      Icon(
                        Icons.workspace_premium,
                        color: Color.fromARGB(255, 253, 223, 50),
                        size: 30,
                      ),
                      Text('  ${data[0].name ?? " ----- "}'),
                    ],
                  ),
                  Wrap(
                    crossAxisAlignment: WrapCrossAlignment.center,
                    children: [
                      Icon(
                        Icons.workspace_premium,
                        color: Color.fromARGB(255, 196, 195, 193),
                        size: 30,
                      ),
                      Text('  ${data[1].name ?? " ----- "}'),
                    ],
                  ),
                  Wrap(
                    crossAxisAlignment: WrapCrossAlignment.center,
                    children: [
                      Icon(
                        Icons.workspace_premium,
                        color: Color.fromARGB(255, 253, 172, 50),
                        size: 30,
                      ),
                      Text('  ${data[2].name ?? " ----- "}'),
                    ],
                  )
                ],
              )
            ],
          ),
        ),
        Container(
            width: size.width,
            height: size.height * 0.75,
            color: Colors.white,
            child: SingleChildScrollView(
                scrollDirection: Axis.vertical,
                child: DataTable(
                  showCheckboxColumn: false,
                  columnSpacing: size.width / 4,

                  // Datatable widget that have the property columns and rows.
                  columns: [
                    // Set the name of the column
                    // DataColumn(

                    //   label: Text('ID'),
                    // ),
                    DataColumn(
                      label: Text('Estudiante'),
                    ),
                    DataColumn(
                      label: Text('Nota'),
                    ),
                  ],
                  rows: _createRows(data),
                )))
      ],
    ));
  }

  List<DataRow> _createRows(List<Student> data) {
    List<DataRow> rows = [];
    data.forEach((element) {
      rows.add(DataRow(
        cells: [
          // DataCell(Text(element.idRegistroMD.toString())),
          DataCell((element.rank == 1 || element.rank == 2 || element.rank == 3)
              ? Text.rich(
                  TextSpan(
                    children: [
                      WidgetSpan(
                        child: Icon(Icons.workspace_premium),
                      ),
                      TextSpan(
                        text: element.name.toString(),
                      )
                    ],
                  ),
                )
              : Text(element.name.toString())),

          DataCell(Text(element.grade.toString())),
        ],
      ));
    });
    return rows;
  }

  Future<bool> onWillPop() {
    DateTime now = DateTime.now();
    if (currentBackPressTime == null ||
        now.difference(currentBackPressTime) > Duration(seconds: 2)) {
      currentBackPressTime = now;
      // Fluttertoast.showToast(msg: exit_warning);
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        duration: Duration(seconds: 1),
        content: const Text('Presione de nuevo para salir'),
        backgroundColor: Colors.green.shade300,
      ));
      return Future.value(false);
    }
    return Future.value(true);
  }
}

import 'dart:ffi';

class Student {
  String name;
  String grade;
  int rank;

  Student({required this.name, required this.grade, required this.rank});

  parseJson(Map<String, dynamic> json) {
    name = json['name'];
    grade = json['nota'];
    rank = json['rank'];
  }

  static fromJson(Map<String, dynamic> json) {
    return Student(name: json['name'], grade: json['nota'], rank: json['rank']);
  }

  static List<Student> listFromJson(List<dynamic> json) {
    List<Student> students = <Student>[];
    for (var element in json) {
      students.add(Student.fromJson(element));
    }
    return students;
  }
}

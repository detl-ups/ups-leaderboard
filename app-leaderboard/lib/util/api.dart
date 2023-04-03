import 'dart:async';
import 'dart:io';

import 'package:http/http.dart' as http;
import 'dart:convert';

class ApiClient {
  Future<List<dynamic>> listStudiante(String course) async {
    Map<String, String> qParams = {'course': course.toString()};

    Map<String, String> headers = {
      "Content-type": "application/json",
    };

    try {
      final response = await http
          .get(
            Uri.http('dtumbaco.online:8080', '/score/list', qParams),
            headers: headers,
          )
          .timeout(const Duration(seconds: 15));
      if (response.statusCode == 200) {
        return json.decode(utf8.decode(response.bodyBytes));
      } else {
        return jsonDecode(
            '{"ERROR": ${response.statusCode}, "message": "Ocurrió un error, intenta más tarde"}');
      }
    } on TimeoutException catch (_) {
      // A timeout occurred.
      return jsonDecode(
          '{"ERROR": "500", "message": "Por favor verifica tu conexión a internet e intenta de nuevo."}');
    } on SocketException catch (_) {
      // Other exception
      return jsonDecode(
          '{"ERROR": "500", "message": "Por favor verifica tu conexión a internet e intenta de nuevo."}');
    } on Exception catch (_) {
      // Other exception
      return jsonDecode(
          '{"ERROR": "500", "message": "Por favor verifica tu conexión a internet e intenta de nuevo."}');
    }
  }
}

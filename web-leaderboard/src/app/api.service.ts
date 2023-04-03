import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { environment } from "../environments/environment"
@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  get(endpoint) {
    let myHeaders: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
    })

    return this.http
      .get<any>(`${environment.service}/${endpoint}`, {
        headers: myHeaders,
      })
      .toPromise()
  }

  post(item, endpoint) {
    // this.dialogData = issue;
    let myHeaders: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
    })
    let body = JSON.stringify(item)
    return this.http
      .post<any>(`${environment.service}/${endpoint}`, body, {
        headers: myHeaders,
      })
      .toPromise()
  }
}

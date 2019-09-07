import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";

import { throwError as observableThrowError } from "rxjs";
import { Router } from "@angular/router";

interface registerData {
  success: boolean;
  message: string;
}
@Injectable({
  providedIn: "root"
})
export class RegisterService {
  apiUrl: string = "http://localhost:5000";
  constructor(private http: HttpClient, private router: Router) {}

  register(registerData) {
    return this.http
      .post<registerData>(this.apiUrl + "/signup", registerData)
      .pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error.message);
  }
}

import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";

import { throwError as observableThrowError } from "rxjs";
import { Router } from "@angular/router";

interface loginData {
  success: boolean;
  message: string;
  id: string;
  name: string;
  email: string;
  result: any;
}

@Injectable({
  providedIn: "root"
})
export class LoginService {
  apiUrl: string = "http://localhost:5000";
  constructor(private http: HttpClient, private router: Router) {}

  logIn(loginData) {
    return this.http
      .post<loginData>(this.apiUrl + "/login", loginData)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error.message);
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
    return user !== null;
  }
}

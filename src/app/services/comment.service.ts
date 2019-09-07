import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";

import { throwError as observableThrowError } from "rxjs";
import { Router } from "@angular/router";

interface comment {
  success: boolean;
  message: string;
  comment: any;
  result: any;
  _id: any;
  courseId: any;
  username: string;
}

@Injectable({
  providedIn: "root"
})
export class CommentService {
  apiUrl: string = "http://localhost:5000";
  constructor(private http: HttpClient, private router: Router) {}

 // post comment  
  commentcourse(comment, courseId) {
    console.log("comment", comment);

    return this.http
      .post<comment>(this.apiUrl + "/coursecomments/" + courseId, comment)
      .pipe(catchError(this.errorHandler));
  }

  // get comments
  commentedcourse(courseId) {
    return this.http
      .get(this.apiUrl + "/commentedcourse/" + courseId)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error.message);
  }
}

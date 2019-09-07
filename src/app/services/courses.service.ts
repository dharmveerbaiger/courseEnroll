import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";

import { throwError as observableThrowError } from "rxjs";
import { Router } from "@angular/router";

interface courses {
  id: number;
  courses: any;
  course: any;
  success: boolean;
  message: string;
  result: any;
}

interface coursesEnroll {
  id: number;
  courses: any;
  success: boolean;
  message: string;
  result: any;
}
interface courseDescription {
  id: number;
  description: string;
  success: boolean;
  descriptioncourse: any;
}
@Injectable({
  providedIn: "root"
})
export class CourseService {
  apiUrl: string = "http://localhost:5000";
  constructor(private http: HttpClient, private router: Router) {}

  // get all courses
  getALlCourses() {
    return this.http.get<courses>(this.apiUrl + "/allcourses");
  }

  // to enroll new course
  enrollcourse(courseid, userId, courseName) {
    var postData = {
      courseId: courseid,
      userId: userId,
      courseName: courseName
    };
    return this.http
      .post<courses>(this.apiUrl + "/usercourse", postData)
      .pipe(catchError(this.errorHandler));
  }
  // to get enrolled courses
  enrolledcourses(userId) {
    return this.http.get<coursesEnroll>(
      this.apiUrl + "/enrolledcourses/" + userId
    );
  }
  // get description ( introduction and what is course?)
  descriptionCourse(courseId) {
    return this.http.get<courseDescription>(
      this.apiUrl + "/description/" + courseId
    );
  }
  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error.message);
  }
}

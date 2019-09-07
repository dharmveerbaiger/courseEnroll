import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";

import { Observable, throwError as observableThrowError } from "rxjs";
import { Router } from "@angular/router";

interface rating {
  success: boolean;
  message: string;
  rating: any;
  courseId: any;
  averageRating: any;
}

@Injectable({
  providedIn: "root"
})
export class RatingServices {
  apiUrl: string = "http://localhost:5000";
  constructor(private http: HttpClient, private router: Router) {}

  // get average rating
  getAverageRating(courseId) {
    return this.http
      .get<rating>(this.apiUrl + "/totalrating/" + courseId)
      .pipe(catchError(this.errorHandler));
  }

  // post rating 
  postRating(courseId, rating) {
    return this.http
      .post<rating>(this.apiUrl + "/ratingcourse/" + courseId, { rating })
      .pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error.message);
  }
}

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CourseService } from "../services/courses.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  user: string;
  userID: string;
  allcourses: any;
  courseEnroll: any;
  coursesEnrolled: any;
  disableButton: boolean;
  object: any;
  buttons = Array(10).fill(false);
  EnrolledCourses: any;

  constructor(
    private coursesServices: CourseService,
    private router: Router,
    private enrollServies: CourseService
  ) {}

  ngOnInit() {
    this.user = localStorage.getItem("user");
    this.userID = localStorage.getItem("userID");
    console.log("hello", localStorage.getItem("user"));
    this.totalCourses();
    this.enrolledcourses();
  }


// go to course details 
  public gotoCourseDetails(name, id) {
    var myurl = `coursedetails/${id}/${name}`;
    this.router.navigateByUrl(myurl);
  }

  
// to get total course
  totalCourses() {
    this.coursesServices.getALlCourses().subscribe(data => {
      if (data.success) {
        console.log("allcourses", this.allcourses);

        this.allcourses = data.courses;
        console.log("all", this.allcourses);
      } else {
        alert("try again later!");
      }
      console.log("allcourses", this.allcourses);
    });
  }
  arrayToObject = (array, keyField) =>
    array.reduce((obj, item) => {
      obj[item[keyField]] = item;
      return obj;
    }, {});

// to show  enrolled button that course is enrolled  or not
  enrolledcourses() {
    this.enrollServies.enrolledcourses(this.userID).subscribe(data => {
      if (data.success) {
        console.log("data", data);
        this.coursesEnrolled = data.result;
        console.log("crs", this.coursesEnrolled);
        this.EnrolledCourses = this.arrayToObject(
          this.coursesEnrolled,
          "courseId"
        );
        console.log(
          "coursesEnrolled1",
          this.coursesEnrolled,
          this.EnrolledCourses
        );
      } else {
        alert("try again later!");
      }
    });
  }
// to enroll new course
  enrollcourse(el, courseName, i) {
    let courseId = el.getAttribute("data-course-id");
    this.userID = localStorage.getItem("userID");
    console.log("coursename", courseName);
    this.coursesServices
      .enrollcourse(courseId, this.userID, courseName)
      .subscribe(data => {
        if (data.success) {
          this.courseEnroll = data;
          this.EnrolledCourses[courseId] = courseId;
          console.log("data1", data);
          console.log("EnrolledCourse", this.EnrolledCourses);
        } else {
          alert("try again later");
        }
      });
  }
}

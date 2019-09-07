import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CourseService } from "../services/courses.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  user: any;
  userID: string;
  coursesEnrolled: any;

  constructor(private enrollServies: CourseService, private router: Router) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.userID = localStorage.getItem("userID");
    this.enrolledcourses();
  }

// go to course details
  public gotoCourseDetails(name, id) {
    var myurl = `coursedetails/${id}/${name}`;
    this.router.navigateByUrl(myurl);
  }
  
//get total enrolled courses
  enrolledcourses() {
    this.enrollServies.enrolledcourses(this.userID).subscribe(data => {
      if (data.success) {
        console.log("data", data);
        this.coursesEnrolled = data.result;
        console.log("coursesEnrolled1", this.coursesEnrolled);
      } else {
        alert("try again later!");
      }
    });
  }
}

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CourseService } from "../services/courses.service";
import { CommentService } from "../services/comment.service";
import { RatingServices } from "../services/rating.services";

@Component({
  selector: "app-coursedetails",
  templateUrl: "./coursedetails.component.html",
  styleUrls: ["./coursedetails.component.css"]
})
export class CoursedetailsComponent implements OnInit {
  courseId: number;
  courseName: string;
  courseDescription: string;
  introduction: string;
  commentscourse: any;
  commented: any;
  CourseCommented: any;
  user: any;
  result: any;
  name: string;
  averageRating: number;
  ratingPost: any;
  postRating: number = 0;

  constructor(
    private activerouter: ActivatedRoute,
    private courseService: CourseService,
    private commentservice: CommentService,
    private ratingService: RatingServices
  ) {}

  ngOnInit() {
    this.activerouter.params.subscribe(params => {
      this.courseId = params.id;
      this.courseName = params.name;
      this.courseDesciption();
      this.user = JSON.parse(localStorage.getItem("user"));
      this.commentedcourse();
      this.getAverageRating();
    });
  }

  // get average rating
  getAverageRating() {
    this.ratingService.getAverageRating(this.courseId).subscribe(data => {
      if (data.message) {
        this.averageRating = data.averageRating;
        console.log("rating1", this.averageRating);
      } else {
        console.log("comment not found");
      }
    });
  }
  // post rating 
  rating() {
    setTimeout(() => {
      console.log("rating6", this.postRating);
      this.ratingService
        .postRating(this.courseId, this.postRating)
        .subscribe(data => {
          if (data.success) {
            console.log("rating2", data);
            this.ratingPost = data;
            this.getAverageRating();
          }
        });
    });
  }

  arrayToObject = (array, keyField) =>
    array.reduce((obj, item) => {
      obj[item[keyField]] = item;
      return obj;
    }, {});


//post comment for course
  commentcourse(form) {
    console.log("user", this.user.result.name);
    console.log("form", form.value);
    var postData = form.value;
    postData.username = this.user.result.name;
    this.commentservice
      .commentcourse(postData, this.courseId)
      .subscribe(data => {
        console.log("API   ---commentdata", data);
        if (data.success) {
          this.commented.push(data.comment);

          form.reset();
        } else {
          console.log("comment not found");
        }
      });
  }

  // get comments on the course
  commentedcourse() {
    this.commentservice.commentedcourse(this.courseId).subscribe(data => {
      if (data["success"]) {
        console.log("username", data);
        this.commented = data["result"];
        console.log("cmt", this.commented);
      }
    });
  }

  // get course description( introduction and what is in course? )
  courseDesciption() {
    this.courseService.descriptionCourse(this.courseId).subscribe(data => {
      if (data.success) {
        this.introduction = data.descriptioncourse.introduction;
        this.courseDescription = data.descriptioncourse.description;
        console.log("description", this.courseDescription);
      } else {
        alert("try again later!");
      }
    });
  }
}

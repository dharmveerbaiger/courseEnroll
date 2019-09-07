import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "src/app/services/login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  user: any;
  userID: string;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {}

  login(form) {
    this.loginService.logIn(form.value).subscribe(data => {
      if (data.success) {
        console.log("data", data);
        this.user = data;
        this.userID = data.result._id;
        localStorage.setItem("userID", JSON.stringify(this.userID));
        localStorage.setItem("user", JSON.stringify(this.user));
        this.router.navigate(["home"]);
      } else {
        localStorage.setItem("user", null);
        alert("Incorrect username or password");
      }
      console.log(data);
    });
    console.log(form.value);
  }
}

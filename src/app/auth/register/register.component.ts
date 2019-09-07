import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RegisterService } from "src/app/services/register.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  user: any;

  constructor(
    private registerServise: RegisterService,
    private router: Router
  ) {}

  ngOnInit() {}

  register(form) {
    this.registerServise.register(form.value).subscribe(data => {
      if (data.success) {
        this.user = data;
        this.router.navigate(["auth/login"]);
      } else {
        alert("Email address is already used");
      }
      console.log(data);
    });
    console.log(form.value);
  }
}

import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { AdminGuard } from "./admin/admin.guard";
import { CoursedetailsComponent } from "./coursedetails/coursedetails.component";
import { MainComponent } from "./main/main.component";

const routes: Routes = [
  { path: "auth", loadChildren: "./auth/auth.module#AuthModule" },
  {
    path: "",
    component: MainComponent,
    canActivate: [AdminGuard],
    children: [
      { path: "", component: HomeComponent, canActivate: [AdminGuard] },
      { path: "home", component: HomeComponent, canActivate: [AdminGuard] },
      {
        path: "profile",
        component: ProfileComponent,
        canActivate: [AdminGuard]
      },
      {
        path: "coursedetails/:id/:name",
        component: CoursedetailsComponent,
        canActivate: [AdminGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

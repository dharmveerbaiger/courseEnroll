import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { ApiconfigService } from "../services/apiconfig.service";

@Injectable({
  providedIn: "root"
})
export class AdminGuard implements CanActivate {
  constructor(private apiconfig: ApiconfigService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    console.log(this.apiconfig.isLoggedIn);
    if (this.apiconfig.isLoggedIn) {
      return true;
    } else {
      this.router.navigate(["auth/login"]);
      return false;
    }
  }
}

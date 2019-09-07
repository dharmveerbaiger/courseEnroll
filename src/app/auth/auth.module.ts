import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AuthRoutingModule, routingComponents } from "./auth-routing.module";

@NgModule({
  declarations: [routingComponents],
  imports: [CommonModule, FormsModule, AuthRoutingModule]
})
export class AuthModule {}

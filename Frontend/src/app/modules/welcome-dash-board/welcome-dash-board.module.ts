import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeDashboardRoutingModule } from './welcome-dash-board-routing.module';
import { LoginComponent } from './components/login/login.component';
import { StartPageComponent } from './components/start-page/start-page.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    LoginComponent,
    StartPageComponent,
    RegisterComponent
  ],
  imports: [    
    WelcomeDashboardRoutingModule,
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class WelcomeDashBoardModule { }

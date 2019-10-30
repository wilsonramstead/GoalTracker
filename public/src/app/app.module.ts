import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { GoalPagesComponent } from './goal-pages/goal-pages.component';
import { NewGoalComponent } from './goal-pages/new-goal/new-goal.component';
import { MyGoalsComponent } from './goal-pages/my-goals/my-goals.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    GoalPagesComponent,
    NewGoalComponent,
    MyGoalsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }

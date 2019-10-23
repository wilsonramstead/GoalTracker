import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MyGoalsComponent } from './my-goals/my-goals.component';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { NewGoalComponent } from './new-goal/new-goal.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    MyGoalsComponent,
    NewGoalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }

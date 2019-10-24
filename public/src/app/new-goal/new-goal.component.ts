import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../http.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-goal',
  templateUrl: './new-goal.component.html',
  styleUrls: ['./new-goal.component.css'],
  providers: [DatePipe]
})
export class NewGoalComponent implements OnInit {
  @Output() navLink = new EventEmitter<string>();

  constructor(private _httpService: HttpService) { }

  newGoal: any;
  monthNum: any;
  currentMonth: any;
  allGoals: any;
  weekDays: any;
  date: any;
  dayOfMonth: any;
  dayOfWeek: any;

  ngOnInit() {
    this.getGoals();
    this.newGoal = { 'Name': '', 'Description': '', 'CurrentMonthName': '', 'CurrentMonth': [{'Day': 1, 'WeekDay': '', 'Status': 'undefined'}, {'Day': 2, 'WeekDay': '', 'Status': 'undefined'}, {'Day': 3, 'WeekDay': '', 'Status': 'undefined'}, {'Day': 4, 'WeekDay': '', 'Status': 'undefined'}, {'Day': 5, 'WeekDay': '', 'Status': 'undefined'}, {'Day': 6, 'WeekDay': '', 'Status': 'undefined'}, {'Day': 7, 'WeekDay': '', 'Status': 'undefined'}, {'Day': 8, 'WeekDay': '', 'Status': 'undefined'}, {'Day': 9, 'WeekDay': '', 'Status': 'undefined'},{'Day': 10, 'WeekDay': '', 'Status': 'undefined'},{'Day': 11, 'WeekDay': '', 'Status': 'undefined'},{'Day': 12, 'WeekDay': '', 'Status': 'undefined'},{'Day': 13, 'WeekDay': '', 'Status': 'undefined'},{'Day': 14, 'WeekDay': '', 'Status': 'undefined'},{'Day': 15, 'WeekDay': '', 'Status': 'undefined'},{'Day': 16, 'WeekDay': '', 'Status': 'undefined'},{'Day': 17, 'WeekDay': '', 'Status': 'undefined'},{'Day': 18, 'WeekDay': '', 'Status': 'undefined'},{'Day': 19, 'WeekDay': '', 'Status': 'undefined'},{'Day': 20, 'WeekDay': '', 'Status': 'undefined'},{'Day': 21, 'WeekDay': '', 'Status': 'undefined'},{'Day': 22, 'WeekDay': '', 'Status': 'undefined'},{'Day': 23, 'WeekDay': '', 'Status': 'undefined'},{'Day': 24, 'WeekDay': '', 'Status': 'undefined'},{'Day': 25, 'WeekDay': '', 'Status': 'undefined'},{'Day': 26, 'WeekDay': '', 'Status': 'undefined'},{'Day': 27, 'WeekDay': '', 'Status': 'undefined'},{'Day': 28, 'WeekDay': '', 'Status': 'undefined'},{'Day': 29, 'WeekDay': '', 'Status': 'undefined'},{'Day': 30, 'WeekDay': '', 'Status': 'undefined'},{'Day': 31, 'WeekDay': '', 'Status': 'undefined'}]};
    this.weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];    
    this.getMonth();
    this.getCurrentDay();
  }
  callParent(string) {
    this.navLink.next(string);
  }

  createGoal() {
    this.newGoal['CurrentMonthName'] = this.getMonth();
    for(var i = 0; i <= this.dayOfWeek-1; i++) {
      this.weekDays.push(this.weekDays.shift());
    }
    for(var i = this.dayOfMonth-1; i <= this.newGoal['CurrentMonth'].length-1; i++) {
      this.weekDays.push(this.weekDays[0]);
      this.newGoal['CurrentMonth'][i]['WeekDay'] = this.weekDays.shift();
    }
    this.weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    for(var i = 0; i <= this.dayOfWeek-2; i++) {
      this.weekDays.push(this.weekDays.shift());
    }
    for(var i = this.dayOfMonth-2; i >= 0; i--) {
      this.newGoal['CurrentMonth'][i]['WeekDay'] = this.weekDays[0];
      this.weekDays.unshift(this.weekDays.pop());
    }
    console.log('newGoal: ', this.newGoal);
    let observable = this._httpService.addGoal(this.newGoal);
    observable.subscribe(data => {
      console.log("Data: ", data);
      this.newGoal = { 'Name': '', 'Description': ''};
    })
  }
  
  getCurrentDay() {
    this.date = new Date();
    this.dayOfMonth = this.date.getDate();
    this.dayOfWeek = this.date.getDay();
    console.log('day: ', this.dayOfMonth);
    console.log('dayOfWeek: ', this.dayOfWeek);
    return this.dayOfMonth;
  }

  getGoals() {
    let observable = this._httpService.getGoals();
    observable.subscribe(data => {
        this.allGoals = data['data'];
    })
  }

  getMonth() {
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date();
    this.currentMonth = monthNames[date.getMonth()];
    this.monthNum = date.getMonth()+1;
    return this.currentMonth;
  }
}

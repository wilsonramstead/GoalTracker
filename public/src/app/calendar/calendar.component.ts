import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../http.service'; 
import * as $ from 'jquery';
import { createOfflineCompileUrlResolver } from '@angular/compiler';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Output() navLink = new EventEmitter<string>();

  constructor(private _httpService: HttpService) { }
  weeks: any;
  weekDays: any;
  monthNum: any;
  monthString: any;
  dayOfWeek: any;
  dayOfMonth: any;
  count: any;
  firstGoal: any;
  selectMessage: any;
  monthDays: any;
  currentGoal: any;
  currentYear: any;

  ngOnInit() {
    this.weeks = [1,2,3,4]
    this.monthNum = 0;
    this.weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    this.count = 2;
    this.getGoals();
    this.getDateInfo();
    this.firstGoal = this.allGoals[0];
    this.selectMessage = 'Select a Goal';
    this.monthDays = [];
  }

  callParent(string) {
    this.navLink.next(string);
  }

  allGoals = [];
  getGoals() {
    let observable = this._httpService.getGoals();
    observable.subscribe(data => {
        this.allGoals = (data['data']);
        console.log('allGoals: ', this.allGoals);
    })
    return this.allGoals;
  }

  goalSelect(id) {
    let observable = this._httpService.findOne(id);
    observable.subscribe(data => {
      this.currentGoal = data['data'];
      this.selectMessage = data['data'].Name;
      this.monthDays = data['data']['CurrentMonth'];
    })
    return this.monthDays;
  }

  
  getDateInfo() {
    const date = new Date();
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.monthString = monthNames[date.getMonth()];
    this.monthNum = date.getMonth()+1;
    this.dayOfMonth = date.getDate();
    this.dayOfWeek = date.getDay();
    this.currentYear = date.getFullYear();
  }

  dayNums() {
    if(this.count >= 31) {
      this.count = 0;
    } else {
      this.count++;      
    }
    return this.count;
  }


  checkDays(goal) {
    const dateArray = goal['UpdatedAt'].split('/');
    if(this.monthNum != Number(dateArray[0])) {
      this.stepTwo(goal);
    } else {
      if(this.dayOfMonth > Number(dateArray[1])) {
        this.updateDays(goal);
      }
    }
    return this.goalSelect(goal['_id']);
  }

  //if last updated day is less than current day num.
  updateDays(goal) {
    const dateArray = goal['UpdatedAt'].split('/');
    for(var i = this.dayOfMonth-2; i >= Number(dateArray[1])-2; i--) {
      console.log("goal['CurrentMonth'][i]: ", goal['CurrentMonth'][i]);
      if(goal['CurrentMonth'][i]['Status'] === 'Complete' || goal['CurrentMonth'][i]['Status'] === 'Incomplete') {
        break;
      } else {
        goal['CurrentMonth'][i]['Status'] = 'Incomplete';
      }
    }
    const monthDayYear = (this.monthNum + '/' + this.dayOfMonth + '/' + this.currentYear).toString();
    goal['UpdatedAt'] = monthDayYear;
    console.log('goal: ', goal);
    let observable = this._httpService.editGoal(goal._id, goal);
    observable.subscribe(data => {
      console.log("Data: ", data);
      return goal;
    })
  }
  
  // STEPS - if month has changed.
  //stepOne: Update rest of the CurrentMonth days 'Incomplete' then push into AllMonths (save old month into allmonths with old values)
  //stepTwo: Edit CurrentMonth to current months values (make a new current month)
  stepOne(value) {
    var currentGoal = value;
    const dateArray = currentGoal['UpdatedAt'].split('/');
    for(let i = Number(dateArray[1])-1; i < 31; i++) {
      currentGoal['CurrentMonth'][i]['Status'] = 'Incomplete';
    }
    var pastMonthName = currentGoal['CurrentMonthName'];
    var temp = {};
    temp[pastMonthName] = currentGoal['CurrentMonth'];
    let observable = this._httpService.addMonth(currentGoal._id, temp);
    observable.subscribe( data => {
      console.log("data['data']: ", data['data']);
    })
    return currentGoal;
  }

  stepTwo(value) {
    var currentGoal = this.stepOne(value);
    currentGoal['CurrentMonthName'] = this.monthString;
    for(let i = 0; i <= this.dayOfWeek-1; i++) {
      this.weekDays.push(this.weekDays.shift());
    }
    for(let i = this.dayOfMonth-1; i <= currentGoal['CurrentMonth'].length-1; i++) {
      this.weekDays.push(this.weekDays[0]);
      currentGoal['CurrentMonth'][i]['WeekDay'] = this.weekDays.shift();
      currentGoal['CurrentMonth'][i]['Status'] = 'Undefined';
    }
    this.weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    for(let i = 0; i <= this.dayOfWeek-2; i++) {
      this.weekDays.push(this.weekDays.shift());
    }
    for(let i = this.dayOfMonth-2; i >= 0; i--) {
      currentGoal['CurrentMonth'][i]['WeekDay'] = this.weekDays[0];
      this.weekDays.unshift(this.weekDays.pop());
      currentGoal['CurrentMonth'][i]['Status'] = 'Undefined';
    }
    const monthDayYear = (this.monthNum + '/' + this.dayOfMonth + '/' + this.currentYear).toString();
    currentGoal['UpdatedAt'] = monthDayYear;
    let observable = this._httpService.editGoal(currentGoal._id, currentGoal);
    observable.subscribe( data => {
      console.log("data['data']: ", data['data']);
    })
    return currentGoal;
  }
}

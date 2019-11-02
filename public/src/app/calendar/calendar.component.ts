import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpService } from '../http.service'; 
import * as $ from 'jquery';
import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Output() navLink = new EventEmitter<string>();
  @Input() dateInfo: any;
  @Input() allGoals: any;

  constructor(private _httpService: HttpService) { }
  weeks: any;
  count: any;
  weekDays: any;
  selectMessage: any;
  currentGoal: any;
  currentMonth: any;
  iterator: any;
  stoppingPoint: any;
  monthIndex: any;
  dateArray: any;
  startingDays: any;

  ngOnInit() {
    this.weeks = [1,2,3,4]
    this.count = 2;
    this.selectMessage = 'Select a Goal';
    this.weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    this.iterator = 0;
    this.stoppingPoint = false;
  }

  callParent(string) {
    this.navLink.next(string);
  }
  getStartingDays(currentMonth) {
    var weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.startingDays = [];
    for(var i = 0; i <= weekDays.length-1; i++) {
      if(weekDays[i] === currentMonth[0]['WeekDay']) {
        return this.startingDays;
      } else {
        this.startingDays.push(weekDays[i]);
      }
    }
    return this.startingDays;
  }
  getPrevMonth() {
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.iterator++;
    if(this.currentGoal['AllMonths'][this.currentGoal.AllMonths.length-(this.iterator+1)] === undefined) {
      this.stoppingPoint = true;
    } 
    // console.log('AllMonths: ', this.currentGoal['AllMonths'][this.currentGoal['AllMonths'].length-this.iterator]);
    this.currentMonth = this.currentGoal['AllMonths'][this.currentGoal['AllMonths'].length-this.iterator][monthNames[this.dateArray[0] - 1 - this.iterator]];
    this.monthIndex = this.dateArray[0]-this.iterator;
    console.log("monthNames[this.dateArray[0]-1-this.iterator]: ", monthNames[this.dateArray[0]-1-this.iterator]);
    console.log('currentMonth: ', this.currentMonth);
  }
  getNextMonth() {
    this.stoppingPoint = false;
    this.iterator--;
    if(this.iterator === 0) {
      this.currentMonth = this.currentGoal['CurrentMonth'];
    } else {
      this.currentMonth = this.currentGoal['AllMonths'][this.currentGoal.AllMonths.length-this.iterator];
    }
    this.monthIndex = this.dateArray[0]-this.iterator;
    console.log('currentMonth: ', this.currentMonth);
  }

  goalSelect(id) {
    let observable = this._httpService.findOne(id);
    observable.subscribe(data => {
      this.currentGoal = data['data'];
      this.selectMessage = data['data'].Name;
      this.currentMonth = data['data']['CurrentMonth'];    
      this.dateArray = data['data']['UpdatedAt'].split('/');
      console.log('dateArray: ', this.dateArray);
      this.monthIndex = this.dateArray[0];
      this.getStartingDays(this.currentMonth);
    })
    return this.currentGoal;
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
    if(this.dateInfo['monthNum'] != Number(dateArray[0])) {
      this.stepTwo(goal);
    } else {
      if(this.dateInfo['dayOfMonth'] > Number(dateArray[1])) {
        this.updateDays(goal);
      }
    }
    return this.goalSelect(goal['_id']);
  }

  //if last updated day is less than current day num.
  updateDays(goal) {
    const dateArray = goal['UpdatedAt'].split('/');
    for(var i = this.dateInfo['dayOfMonth']-2; i >= Number(dateArray[1])-2; i--) {
      console.log("goal['CurrentMonth'][i]: ", goal['CurrentMonth'][i]);
      if(goal['CurrentMonth'][i]['Status'] === 'Complete' || goal['CurrentMonth'][i]['Status'] === 'Incomplete') {
        break;
      } else {
        goal['CurrentMonth'][i]['Status'] = 'Incomplete';
      }
    }
    const monthDayYear = (this.dateInfo['monthNum'] + '/' + this.dateInfo['dayOfMonth'] + '/' + this.dateInfo['currentYear']).toString();
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
    currentGoal['CurrentMonthName'] = this.dateInfo['monthString'];
    var weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    for(let i = 0; i <= this.dateInfo['dayOfWeek']-1; i++) {
      weekDays.push(weekDays.shift());
    }
    console.log('weekDays: ', weekDays);
    for(let i = this.dateInfo['dayOfMonth']-1; i <= currentGoal['CurrentMonth'].length-1; i++) {
      weekDays.push(weekDays[0]);
      currentGoal['CurrentMonth'][i]['WeekDay'] = weekDays.shift();
      currentGoal['CurrentMonth'][i]['Status'] = 'Undefined';
    }
    weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    for(let i = 0; i <= this.dateInfo['dayOfWeek']-2; i++) {
      weekDays.push(weekDays.shift());
    }
    for(let i = this.dateInfo['dayOfMonth']-2; i >= 0; i--) {
      currentGoal['CurrentMonth'][i]['WeekDay'] = this.weekDays[0];
      weekDays.unshift(weekDays.pop());
      currentGoal['CurrentMonth'][i]['Status'] = 'Undefined';
    }
    const monthDayYear = (this.dateInfo['monthNum'] + '/' + this.dateInfo['dayOfMonth'] + '/' + this.dateInfo['currentYear']).toString();
    currentGoal['UpdatedAt'] = monthDayYear;
    console.log('currentGoal: ', currentGoal);
    let observable = this._httpService.editGoal(currentGoal._id, currentGoal);
    observable.subscribe( data => {
      console.log("data['data']: ", data['data']);
    })
    return currentGoal;
  }
}

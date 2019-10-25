import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../http.service'; 
import * as $ from 'jquery';

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

  ngOnInit() {
    this.weeks = [1,2,3,4]
    this.monthNum = 0;
    this.weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    this.count = 2;
    this.getGoals();
    this.getDateInfo();
    // this.firstGoal = this.allGoals[0];
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
    console.log('monthString: ', this.monthString)
    this.monthNum = date.getMonth()+1;
    console.log('monthNum: ', this.monthNum);
    this.dayOfMonth = date.getDate();
    console.log('dayOfMonth: ', this.dayOfMonth);
    this.dayOfWeek = date.getDay();
    console.log('dayOfWeek: ', this.dayOfWeek);
  }

  dayNums() {
    if(this.count >= 31) {
      this.count = 0;
    } else {
      this.count++;      
    }
    return this.count;
  }
}

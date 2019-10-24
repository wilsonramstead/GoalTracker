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
  // monthNums: any;
  currentMonth: any
  count: any;
  firstGoal: any;
  selectMessage: any;
  monthDays: any;
  currentGoal: any;
  currentDay: any;

  ngOnInit() {
    $(document).ready(function() { 
      $('.day').hover(function() {
        $(this).css('transform', 'scale(1.1)');
      }, function() {
        $(this).css('transform', 'scale(1.0)');
      })
    })
    this.weeks = [1,2,3,4]
    // this.monthNums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
    this.weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    this.currentMonth = this.getMonth();
    this.count = 2;
    this.currentDay = this.getCurrentDay();
    this.getGoals();
    this.firstGoal = this.allGoals[0];
    this.selectMessage = 'Select a Goal';
    this.monthDays = [];
    console.log('this.monthDays: ', this.monthDays);
  }

  getCurrentDay() {
    const date = new Date();
    const day = date.getDate();
    console.log('day: ', day);
    return day;
  }

  dayNums() {
    if(this.count >= 31) {
      this.count = 0;
    } else {
      this.count++;      
    }
    return this.count;
  }

  getMonth() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date();
    console.log('date: ', date);
    const month = monthNames[date.getMonth()];
    this.monthNum = date.getMonth()+1;
    console.log('month: ', month);
    return month;
  }



  goalSelect(id) {
    console.log('id: ', id);
    let observable = this._httpService.findOne(id);
    observable.subscribe(data => {
      this.currentGoal = data['data'];
      this.selectMessage = data['data'].Name;
      this.monthDays = data['data']['CurrentMonth'];
      console.log('this.monthDays: ', this.monthDays);
      console.log('data: ', data);
    })
    return this.monthDays;
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

  callParent(string) {
    this.navLink.next(string);
  }
}

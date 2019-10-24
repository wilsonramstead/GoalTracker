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

  ngOnInit() {
    this.getGoals();
    this.newGoal = { 'Name': '', 'Description': '', 'CurrentMonthName': '', 'CurrentMonth': [{'Day': 1, 'Status': 'undefined'}, {'Day': 2, 'Status': 'undefined'}, {'Day': 3, 'Status': 'undefined'}, {'Day': 4, 'Status': 'undefined'}, {'Day': 5, 'Status': 'undefined'}, {'Day': 6, 'Status': 'undefined'}, {'Day': 7, 'Status': 'undefined'}, {'Day': 8, 'Status': 'undefined'}, {'Day': 9, 'Status': 'undefined'},{'Day': 10, 'Status': 'undefined'},{'Day': 11, 'Status': 'undefined'},{'Day': 12, 'Status': 'undefined'},{'Day': 13, 'Status': 'undefined'},{'Day': 14, 'Status': 'undefined'},{'Day': 15, 'Status': 'undefined'},{'Day': 16, 'Status': 'undefined'},{'Day': 17, 'Status': 'undefined'},{'Day': 18, 'Status': 'undefined'},{'Day': 19, 'Status': 'undefined'},{'Day': 20, 'Status': 'undefined'},{'Day': 21, 'Status': 'undefined'},{'Day': 22, 'Status': 'undefined'},{'Day': 23, 'Status': 'undefined'},{'Day': 24, 'Status': 'undefined'},{'Day': 25, 'Status': 'undefined'},{'Day': 26, 'Status': 'undefined'},{'Day': 27, 'Status': 'undefined'},{'Day': 28, 'Status': 'undefined'},{'Day': 29, 'Status': 'undefined'},{'Day': 30, 'Status': 'undefined'},{'Day': 31, 'Status': 'undefined'}]};
    this.getMonth();
  }
  callParent(string) {
    this.navLink.next(string);
  }

  createGoal() {
    this.newGoal['CurrentMonthName'] = this.getMonth();
    let observable = this._httpService.addGoal(this.newGoal);
    observable.subscribe(data => {
      console.log("Data: ", data);
      this.newGoal = { 'Name': '', 'Description': ''};
    })
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

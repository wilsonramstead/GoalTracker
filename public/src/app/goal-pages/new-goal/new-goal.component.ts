import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-new-goal',
  templateUrl: './new-goal.component.html',
  styleUrls: ['./new-goal.component.css']
})
export class NewGoalComponent implements OnInit {
  @Output() getGoals = new EventEmitter();
  @Input() allGoals: any;
  @Input() dateInfo: any;


  constructor(private _httpService: HttpService) { }
  newGoal: any;

  ngOnInit() {
    this.newGoal = { 'Name': '', 'Description': '', 'CreationDay': '', 'UpdatedAt': '', 'CurrentMonthName': '', 'CurrentMonth': [{'Day': 1, 'WeekDay': '', 'Status': 'undefined'}, {'Day': 2, 'WeekDay': '', 'Status': 'undefined'}, {'Day': 3, 'WeekDay': '', 'Status': 'undefined'}, {'Day': 4, 'WeekDay': '', 'Status': 'undefined'}, {'Day': 5, 'WeekDay': '', 'Status': 'undefined'}, {'Day': 6, 'WeekDay': '', 'Status': 'undefined'}, {'Day': 7, 'WeekDay': '', 'Status': 'undefined'}, {'Day': 8, 'WeekDay': '', 'Status': 'undefined'}, {'Day': 9, 'WeekDay': '', 'Status': 'undefined'},{'Day': 10, 'WeekDay': '', 'Status': 'undefined'},{'Day': 11, 'WeekDay': '', 'Status': 'undefined'},{'Day': 12, 'WeekDay': '', 'Status': 'undefined'},{'Day': 13, 'WeekDay': '', 'Status': 'undefined'},{'Day': 14, 'WeekDay': '', 'Status': 'undefined'},{'Day': 15, 'WeekDay': '', 'Status': 'undefined'},{'Day': 16, 'WeekDay': '', 'Status': 'undefined'},{'Day': 17, 'WeekDay': '', 'Status': 'undefined'},{'Day': 18, 'WeekDay': '', 'Status': 'undefined'},{'Day': 19, 'WeekDay': '', 'Status': 'undefined'},{'Day': 20, 'WeekDay': '', 'Status': 'undefined'},{'Day': 21, 'WeekDay': '', 'Status': 'undefined'},{'Day': 22, 'WeekDay': '', 'Status': 'undefined'},{'Day': 23, 'WeekDay': '', 'Status': 'undefined'},{'Day': 24, 'WeekDay': '', 'Status': 'undefined'},{'Day': 25, 'WeekDay': '', 'Status': 'undefined'},{'Day': 26, 'WeekDay': '', 'Status': 'undefined'},{'Day': 27, 'WeekDay': '', 'Status': 'undefined'},{'Day': 28, 'WeekDay': '', 'Status': 'undefined'},{'Day': 29, 'WeekDay': '', 'Status': 'undefined'},{'Day': 30, 'WeekDay': '', 'Status': 'undefined'},{'Day': 31, 'WeekDay': '', 'Status': 'undefined'}]};
  }
  createGoal() {
    this.newGoal['CurrentMonthName'] = this.dateInfo['monthString'];
    var weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];      

    for(var i = 0; i <= this.dateInfo['dayOfWeek']-1; i++) {
      weekDays.push(weekDays.shift());
    }
    for(var i = this.dateInfo['dayOfMonth']-1; i <= this.newGoal['CurrentMonth'].length-1; i++) {
      weekDays.push(weekDays[0]);
      this.newGoal['CurrentMonth'][i]['WeekDay'] = weekDays.shift();
    }
    weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    for(var i = 0; i <= this.dateInfo['dayOfWeek']-2; i++) {
      weekDays.push(weekDays.shift());
    }
    for(var i = this.dateInfo['dayOfMonth']-2; i >= 0; i--) {
      this.newGoal['CurrentMonth'][i]['WeekDay'] = weekDays[0];
      weekDays.unshift(weekDays.pop());
    }
    const monthDayYear = (this.dateInfo['monthNum'] + '/' + this.dateInfo['dayOfMonth'] + '/' + this.dateInfo['currentYear']).toString();
    this.newGoal['CreationDay'] = monthDayYear;
    this.newGoal['UpdatedAt'] = monthDayYear;
    console.log('newGoal: ', this.newGoal);
    let observable = this._httpService.addGoal(this.newGoal);
    observable.subscribe(data => {
      console.log("Data: ", data);
    })
    this.getGoals.emit();
  }
}

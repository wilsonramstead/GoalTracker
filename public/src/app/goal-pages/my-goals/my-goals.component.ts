import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-my-goals',
  templateUrl: './my-goals.component.html',
  styleUrls: ['./my-goals.component.css']
})
export class MyGoalsComponent implements OnInit {
  @Output() getGoals = new EventEmitter<string>();
  @Output() changePage = new EventEmitter();
  @Input() allGoals: any;
  @Input() dateInfo: any;

  constructor(private _httpService: HttpService) { }
  showFullGoal: any;


  ngOnInit() {

  }

  // callParent() {
  //   this.changePage.next('NewEvent');
  // }

  getGoalInfo(id) {
    if(this.showFullGoal != id) {
      this.showFullGoal = id;
    } else {
      this.showFullGoal = '';
    }
  }

  makeStatusComplete(goal) {
    event.stopPropagation();
    goal['CurrentMonth'][this.dateInfo['dayOfMonth']-1]['Status'] = 'Complete';
    const monthDayYear = (this.dateInfo['monthNum'] + '/' + this.dateInfo['dayOfMonth'] + '/' + this.dateInfo['currentYear']).toString();
    goal['UpdatedAt'] = monthDayYear;
    console.log('goal: ', goal);
    let observable = this._httpService.changeStatus(goal['_id'], goal['CurrentMonth']);
    observable.subscribe( data => {
      console.log('data: ', data);
    })
  }

  makeStatusIncomplete(goal) {
    event.stopPropagation();
    goal['CurrentMonth'][this.dateInfo['dayOfMonth']-1]['Status'] = 'Incomplete';
    const monthDayYear = (this.dateInfo['monthNum'] + '/' + this.dateInfo['dayOfMonth'] + '/' + this.dateInfo['currentYear']).toString();
    goal['UpdatedAt'] = monthDayYear;
    console.log('goal: ', goal);
    let observable = this._httpService.changeStatus(goal['_id'], goal['CurrentMonth']);
    observable.subscribe( data => {
      console.log('data: ', data);
    })
  }

  deleteGoal(id) {
    event.stopPropagation();
    let observable = this._httpService.delete(id);
    observable.subscribe(data => {
      console.log('data: ', data);
    })
    this.getGoals.emit();
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
      currentGoal['CurrentMonth'][i]['WeekDay'] = weekDays[0];
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

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-new-goal',
  templateUrl: './new-goal.component.html',
  styleUrls: ['./new-goal.component.css']
})
export class NewGoalComponent implements OnInit {
  @Output() navLink = new EventEmitter<string>();

  constructor(private _httpService: HttpService) { }

  newGoal: any;
  newMonth: any;
  message: any;
  monthNum: any;
  currentMonth: any;
  allGoals: any;
  createdMonth: any;

  ngOnInit() {
    this.getGoals();
    this.newGoal = { 'Name': '', 'Description': ''};
    this.newMonth = { 'Name': '', 'GoalID': '', 'DayOne': false, 'DayTwo': false, 'DayThree': false, 'DayFour': false, 'DayFive': false, 'DaySix': false, 'DaySeven': false, 'DayEight': false, 'DayNine': false, 'DayTen': false, 'DayEleven': false, 'DayTwelve': false, 'DayThirteen': false, 'DayFourteen': false, 'DayFifteen': false, 'DaySixteen': false, 'DaySeventeen': false, 'DayEighteen': false, 'DayNineteen': false, 'DayTwenty': false, 'DayTwentyone': false, 'DayTwentytwo': false, 'DayTwentythree': false, 'DayTwentyfour': false, 'DayTwentyfive': false, 'DayTwentysix': false, 'DayTwentyseven': false, 'DayTwentyeight': false, 'DayTwentynine': false, 'DayThirty': false, 'DayThirtyone': false};
    this.currentMonth = 'test';
    this.getMonth();
  }
  callParent(string) {
    this.navLink.next(string);
  }

  processAll() {
    this.createGoal();
    this.createMonth();
    this.joinGoalMonth();
  }

  joinGoalMonth() {
    console.log("this.allGoals[this.allGoals.length-1]['_id']: ", this.allGoals[this.allGoals.length-1]['_id']);
    console.log('this.createdMonth', this.createdMonth);
    let observable = this._httpService.joinTwo(this.allGoals[this.allGoals.length-1]['_id'], this.createdMonth);
    observable.subscribe(data => {
        console.log('data: ', data);
    })
  }


  createMonth() {
    this.newMonth['Name'] = this.getMonth();
    this.newMonth['GoalID'] = this.allGoals[this.allGoals.length-1]['_id'];
    console.log('this.newMonth: ', this.newMonth);
    this.createdMonth = this.newMonth;
    let observable = this._httpService.addMonth(this.newMonth);
    observable.subscribe(data => {
      if(data['message'] === "Error") {
        this.message = data;
      }
      console.log('data: ', data);
      this.newMonth = { 'Name': '', 'GoalID': '', 'DayOne': false, 'DayTwo': false, 'DayThree': false, 'DayFour': false, 'DayFive': false, 'DaySix': false, 'DaySeven': false, 'DayEight': false, 'DayNine': false, 'DayTen': false, 'DayEleven': false, 'DayTwelve': false, 'DayThirteen': false, 'DayFourteen': false, 'DayFifteen': false, 'DaySixteen': false, 'DaySeventeen': false, 'DayEighteen': false, 'DayNineteen': false, 'DayTwenty': false, 'DayTwentyone': false, 'DayTwentytwo': false, 'DayTwentythree': false, 'DayTwentyfour': false, 'DayTwentyfive': false, 'DayTwentysix': false, 'DayTwentyseven': false, 'DayTwentyeight': false, 'DayTwentynine': false, 'DayThirty': false, 'DayThirtyone': false};
    })
    this.joinGoalMonth();
  }

  createGoal() {
    console.log('this.newGoal: ', this.newGoal);
    let observable = this._httpService.addGoal(this.newGoal);
    observable.subscribe(data => {
      if(data['message'] == "Error") {
        this.message = data;
      }
      console.log("Data: ", data);
      this.newGoal = { 'Name': '', 'Description': ''};
    })
    this.createMonth();
  }

  getGoals() {
    let observable = this._httpService.getGoals();
    observable.subscribe(data => {
        this.allGoals = data['data'];
        console.log("allGoalsinside: ", this.allGoals);
        // console.log("this.allGoals[this.allGoals.length-1]['_id']", this.allGoals[this.allGoals.length-1]['_id']);
    })
  }

  getMonth() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date();
    console.log('date: ', date);
    this.currentMonth = monthNames[date.getMonth()];
    this.monthNum = date.getMonth()+1;
    console.log('month: ', this.currentMonth);
    return this.currentMonth;
  }

}

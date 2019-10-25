import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-my-goals',
  templateUrl: './my-goals.component.html',
  styleUrls: ['./my-goals.component.css']
})
export class MyGoalsComponent implements OnInit {
  @Output() navLink = new EventEmitter<string>();

  constructor(private _httpService: HttpService) { }
  monthString; any;
  currentGoal: any;
  monthNum: any;
  dayOfMonth: any;
  dayOfWeek: any;
  allMonths: any;
  updatedGoal: any;
  currentYear: any;
  weekDays: any;

  ngOnInit() {
    this.getGoals();
    this.getDateInfo();
    this.weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];    
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

  checkGoals() {
    this.allGoals.forEach(function(value) {
      console.log('value: ', value);
      const dateArray = value['UpdatedAt'].split('/');

      if(this.monthNum != Number(dateArray[0])) {
        // step1: If it is a new month, assign the rest of the untouched month days as incomplete (if not complete) and this old month into the allMonths history data field ;
        // step2: Update existing current month as the new, current month;
        // step3: edit the goal with this information by editing/updating with service;
        for(var i = Number(dateArray[1])-1; i <= 31; i++) {
          console.log('CHANGED');
          value['CurrentMonth'][i]['Status'] = 'Incomplete';
        }
        this.value['AllMonths'].push(value['CurrentMonth']);
        this.value['CurrentMonthName'] = this.monthString;
        for(var i = 0; i <= this.dayOfWeek-1; i++) {
          this.weekDays.push(this.weekDays.shift());
        }
        for(var i = this.dayOfMonth-1; i <= this.value['CurrentMonth'].length-1; i++) {
          this.weekDays.push(this.weekDays[0]);
          this.value['CurrentMonth'][i]['WeekDay'] = this.weekDays.shift();
        }
        this.weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        for(var i = 0; i <= this.dayOfWeek-2; i++) {
          this.weekDays.push(this.weekDays.shift());
        }
        for(var i = this.dayOfMonth-2; i >= 0; i--) {
          this.value['CurrentMonth'][i]['WeekDay'] = this.weekDays[0];
          this.weekDays.unshift(this.weekDays.pop());
        }
        const monthDayYear = (this.monthNum + '/' + this.dayOfMonth + '/' + this.currentYear).toString();
        this.value['UpdatedAt'] = monthDayYear;
        console.log('value: ', this.value);
        let observable = this._httpService.editGoal(this.value._id, this.value);
        observable.subscribe(data => {
          console.log("Data: ", data);
        })
      }
      if(this.dayOfMonth > Number(dateArray[1])) {
        // if current month, check past days to see if complete; if not, make incomplete.
        for(var i = this.dayOfMonth-2; i > Number(dateArray[1]); i--) {
          if(value['CurrentMonth'][i]['Status'] != 'undefined') {
            console.log('DONE');
            break;
          } else {
            console.log('CHANGED');
            value['CurrentMonth'][i]['Status'] = 'Incomplete';
          }
        }
        const monthDayYear = (this.monthNum + '/' + this.dayOfMonth + '/' + this.currentYear).toString();
        this.value['UpdatedAt'] = monthDayYear;
        let observable = this._httpService.editGoal(this.value._id, this.value);
        observable.subscribe(data => {
          console.log("Data: ", data);
        })
      }
    })
  }

  goalSelect(id) {
    let observable = this._httpService.findOne(id);
    observable.subscribe(data => {
      this.currentGoal = data['data'];
    })
    return this.currentGoal;
  }

  makeStatusComplete(id, goal) {
    this.currentGoal = goal;
    console.log('currentGoal: ', this.currentGoal);
    console.log('dayOfMonth: ', this.dayOfMonth);
    // console.log(':::::::', this.currentGoal['CurrentMonth'][this.dayOfMonth-1]['Status'])
    this.currentGoal['CurrentMonth'][this.dayOfMonth-1]['Status'] = 'Complete';
    const monthDayYear = (this.monthNum + '/' + this.dayOfMonth + '/' + this.currentYear).toString();
    this.currentGoal['UpdatedAt'] = monthDayYear;
    const tempGoal = this.currentGoal['CurrentMonth'];
    console.log('tempGoal: ', tempGoal);
    let observable = this._httpService.changeStatus(id, tempGoal);
    observable.subscribe( data => {
      console.log('data: ', data);
    })
    this.getGoals();
  }

  // makeStatusIncomplete(id) {
  //   let observable = this._httpService.changeStatus(id, 'Incomplete');
  //   observable.subscribe( data => {
  //     console.log('data: ', data);
  //   })
  // }

  deleteGoal(id) {
    console.log('id: ', id);
    let observable = this._httpService.delete(id);
    observable.subscribe(data => {
      console.log('data: ', data);
    })
    this.getGoals();
  }

  callParent(string) {
    this.navLink.next(string);
  }

  getDateInfo() {
    const date = new Date();
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.monthString = monthNames[date.getMonth()];
    this.currentYear = date.getFullYear();
    console.log('monthString: ', this.monthString)
    this.monthNum = date.getMonth()+1;
    console.log('monthNum: ', this.monthNum);
    this.dayOfMonth = date.getDate();
    console.log('dayOfMonth: ', this.dayOfMonth);
    this.dayOfWeek = date.getDay();
    console.log('dayOfWeek: ', this.dayOfWeek);
  }

}


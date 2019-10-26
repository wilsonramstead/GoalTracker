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
  newGoal: any;
  testVar: any;

  ngOnInit() {
    this.getGoals();
    this.getDateInfo();
    this.weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    this.checkGoals();
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
    })
    return this.currentGoal;
  }

  //stepOne: Update rest of the CurrentMonth days 'Incomplete' then push into AllMonths (save old month into allmonths with old values)
  //stepTwo: Edit CurrentMonth to current months values (make a new current month)
  //stepThree:


  stepOne(value) {
    console.log("STEP ONE");
    var currentGoal = value;
    const dateArray = currentGoal['UpdatedAt'].split('/');
    for(let i = Number(dateArray[1])-1; i < 31; i++) {
      currentGoal['CurrentMonth'][i]['Status'] = 'Incomplete';
    }
    console.log('stepOneCG: ', currentGoal);
    var pastMonthName = currentGoal['CurrentMonthName'];
    var temp = {};
    temp[pastMonthName] = currentGoal['CurrentMonth'];
    // currentGoal['AllMonths'][pastMonthName] = currentGoal['CurrentMonth'];
    console.log('stepOneCG: ', currentGoal);
    let observable = this._httpService.addMonth(currentGoal._id, temp);
    observable.subscribe( data => {
      console.log("data['data']: ", data['data']);
    })
    return currentGoal;
  }


  stepTwo(value) {
    console.log("STEP TWO");
    var currentGoal = this.stepOne(value);
    console.log("STEP AGAIN");    

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
    console.log('stepTwoCG: ', currentGoal);
    return currentGoal;
  }
  stepThree(value) {
    this.stepTwo(value);
    let observable = this._httpService.findOne(value._id);
    observable.subscribe( data => {
      console.log("data['data']: ", data['data']);
    })
    return;
  }

  checkGoals() {
    for(var goal of this.allGoals) {
      const dateArray = goal['UpdatedAt'].split('/');
      if(this.monthNum != Number(dateArray[0])) {
        this.stepThree(goal);
      }
    }

    // this.allGoals.forEach(function(value) {
    //   const dateArray = value['UpdatedAt'].split('/');
    //   if(monthNum != Number(dateArray[0])) {
    //     this.test(value);
        // for(let i = Number(dateArray[1])-1; i < 31; i++) {
        //   value['CurrentMonth'][i]['Status'] = 'Incomplete';
        // }
        // console.log('value: ', value['CurrentMonth']);
        // var pastMonthName =  value['CurrentMonthName'];
        // value['AllMonths'][pastMonthName] = value['CurrentMonth'];

        // let observable = this._httpService.editGoal(value._id, value);
        // observable.subscribe(data => {
        //   console.log("Data: ", data);
        // })
      // } else {
      //   if(dayOfMonth > Number(dateArray[1]) && monthNum === Number(dateArray[0])) {
      //     console.log('------------------------- this.dayOfMonth > Number(dateArray[1]) AND this.monthNum === Number(dateArray[0]) --------------------------');
      //     // if current month, check past days to see if complete; if not, make incomplete.
      //     for(var i = dayOfMonth-2; i > Number(dateArray[1]); i--) {
      //       if(value['CurrentMonth'][i]['Status'] != 'undefined') {
      //         console.log('DONE');
      //         break;
      //       } else {
      //         console.log('CHANGED');
      //         value['CurrentMonth'][i]['Status'] = 'Incomplete';
      //       }
      //     }
      //     const monthDayYear = (monthNum + '/' + dayOfMonth + '/' + currentYear).toString();
      //     value['UpdatedAt'] = monthDayYear;
          // let observable = this._httpService.editGoal(value._id, value);
          // observable.subscribe(data => {
          //   console.log("Data: ", data);
          // })
      //   }
      // }
    // })
    // console.log('the shit ran!');
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


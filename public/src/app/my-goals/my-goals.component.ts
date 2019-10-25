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

  ngOnInit() {
    this.getGoals();
    this.getDateInfo();
  }

  allGoals = [];
  getGoals() {
    let observable = this._httpService.getGoals();
    observable.subscribe(data => {
        this.allGoals = (data['data']);
        console.log('allGoals: ', this.allGoals);
        // this.allMonths =
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

  makeStatusComplete(id, goal) {
    this.currentGoal = goal;
    console.log('currentGoal: ', this.currentGoal);

    console.log('dayOfMonth: ', this.dayOfMonth);
    // console.log(':::::::', this.currentGoal['CurrentMonth'][this.dayOfMonth-1]['Status'])
    this.currentGoal['CurrentMonth'][this.dayOfMonth-1]['Status'] = 'Complete';
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
    console.log('monthString: ', this.monthString)
    this.monthNum = date.getMonth()+1;
    console.log('monthNum: ', this.monthNum);
    this.dayOfMonth = date.getDate();
    console.log('dayOfMonth: ', this.dayOfMonth);
    this.dayOfWeek = date.getDay();
    console.log('dayOfWeek: ', this.dayOfWeek);
  }
}


import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-goal-pages',
  templateUrl: './goal-pages.component.html',
  styleUrls: ['./goal-pages.component.css']
})
export class GoalPagesComponent implements OnInit {
  @Input() dateInfo: any;
  @Input() allGoals: any;
  @Output() navLink = new EventEmitter<string>();
  @Output() getGoals = new EventEmitter();

  constructor(private _httpService: HttpService) { }
  page: any;
  // allGoals: any;
  // dateInfo: any;

  ngOnInit() {
    this.page = 'MyGoals';
    // this.getDateInfo();
    // this.getGoals();
  }
  callSelf(string) {
    this.page = string;
  }
  callParent(string) {
    this.navLink.next(string);
  }
  getGoalsFromParent() {
    this.getGoals.emit();
  }
  // getGoals() {
  //   let observable = this._httpService.getGoals();
  //   observable.subscribe(data => {
  //       this.allGoals = data['data'];
  //   })
  // }
  // getDateInfo() {
  //   const date = new Date();
  //   var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  //   const monthString = monthNames[date.getMonth()];
  //   const currentYear = date.getFullYear();
  //   const monthNum = date.getMonth()+1;
  //   const dayOfMonth = date.getDate();
  //   const dayOfWeek = date.getDay();
  //   this.dateInfo = { 'monthString': monthString, 'currentYear': currentYear, 'monthNum': monthNum, 'dayOfMonth': dayOfMonth, 'dayOfWeek': dayOfWeek };
  //   return this.dateInfo;
  // }
}

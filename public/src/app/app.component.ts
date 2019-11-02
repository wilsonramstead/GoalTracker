import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(private _httpService: HttpService) {}
  page: any;
  allGoals: any;
  dateInfo: any;

  ngOnInit() {
    this.backgroundColor();
    this.page = 'Calendar';
    this.getGoals();
    this.getDateInfo();
  }

  showPage(string) {
    this.page = string;
  }
  backgroundColor() {
    $(document).ready(function() {
      $(".mainContainer").mousemove(function(event) {
        this.wrapperWidth = $(".mainContainer").width();
        this.wrapperHeight = $(".mainContainer").height();
        this.mouseXpercentage = Math.round(event.pageX / this.wrapperWidth * 100);
        this.mouseYpercentage = Math.round(event.pageY / this.wrapperHeight * 100);
        $(".mainContainer").css('background', 'radial-gradient(at ' + this.mouseXpercentage + '% ' + this.mouseYpercentage + '%, white, #2e2e2e)');
      })
    })
  }
  getGoals() {
    let observable = this._httpService.getGoals();
    observable.subscribe(data => {
        this.allGoals = data['data'];
        console.log('allGoals: ', this.allGoals);
    })
    return this.allGoals;
  }
  getDateInfo() {
    const date = new Date();
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthString = monthNames[date.getMonth()];
    const currentYear = date.getFullYear();
    const monthNum = date.getMonth()+1;
    const dayOfMonth = date.getDate();
    const dayOfWeek = date.getDay();
    this.dateInfo = { 'monthString': monthString, 'currentYear': currentYear, 'monthNum': monthNum, 'dayOfMonth': dayOfMonth, 'dayOfWeek': dayOfWeek };
    return this.dateInfo;
  }
}

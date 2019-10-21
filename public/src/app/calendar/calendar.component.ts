import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor() { }

  currentMonth: any

  ngOnInit() {
    $(document).ready(function() {
      $('#calMonth').css('color', 'orange');
    })

    this.currentMonth = this.getMonth();

  }

  getMonth() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date();
    console.log('date: ', date);
    const month = monthNames[date.getMonth()];
    console.log('month: ', month);
    return month;
  }

}

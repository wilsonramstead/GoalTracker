import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
// @Output() triggerEvent = new EventEmitter<string>();
  page: any;

  ngOnInit() {
    // this.midnightEvent('15:42', this.triggerThis);
    this.backgroundColor();
    this.page = 'Calendar';
    // this.midnightEvent('14:06', this.triggerThis);
  }



  showPage(string) {
    console.log('string: ', string);
    this.page = string;
  }
  backgroundColor() {
    $(document).ready(function() {
      $(".mainContainer").mousemove(function(event) {
        this.wrapperWidth = $(".mainContainer").width();
        this.wrapperHeight = $(".mainContainer").height();
        this.mouseXpercentage = Math.round(event.pageX / this.wrapperWidth * 100);
        this.mouseYpercentage = Math.round(event.pageY / this.wrapperHeight * 100);
        $(".mainContainer").css('background', 'radial-gradient(at ' + this.mouseXpercentage + '% ' + this.mouseYpercentage + '%, white, #aaaaaa)');
      })
    })
  }


  midnightEvent(time, triggerThis) {
    // time = '14:00';
    // get hour and minute from hour:minute param received, ex.: '16:00'
    const hour = Number(time.split(':')[0]);
    const minute = Number(time.split(':')[1]);

    // create a Date object at the desired timepoint
    const startTime = new Date(); startTime.setHours(hour, minute);
    console.log('startTime: ', startTime);

    const now = new Date();

    // increase timepoint by 24 hours if in the past
    if (startTime.getTime() < now.getTime()) {
      startTime.setHours(startTime.getHours() + 24);
    }

    // get the interval in ms from now to the timepoint when to trigger the alarm
    const firstTriggerAfterMs = startTime.getTime() - now.getTime();
    console.log('firstTriggerAfterMs: ', firstTriggerAfterMs);

    // trigger the function triggerThis() at the timepoint
    // create setInterval when the timepoint is reached to trigger it every day at this timepoint
    setTimeout(function(){
      triggerThis();
      setInterval(triggerThis, 24 * 60 * 60 * 1000);
    }, firstTriggerAfterMs);
  }

  triggerThis = function() {

  }

}

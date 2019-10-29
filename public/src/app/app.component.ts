import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  page: any;

  ngOnInit() {
    this.backgroundColor();
    this.page = 'Calendar';
    console.log('test1');
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
        $(".mainContainer").css('background', 'radial-gradient(at ' + this.mouseXpercentage + '% ' + this.mouseYpercentage + '%, white, #aaaaaa)');
      })
    })
  }
}

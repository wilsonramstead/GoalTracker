import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    this.backgroundColor();
  }





  backgroundColor() {
    $(document).ready(function() {
      $(".mainContainer").mousemove(function(event) {
        this.wrapperWidth = $(".mainContainer").width();
        this.wrapperHeight = $(".mainContainer").height();
        this.mouseXpercentage = Math.round(event.pageX / this.wrapperWidth * 100);
        console.log("posX: ", event.pageX);
        this.mouseYpercentage = Math.round(event.pageY / this.wrapperHeight * 100);
        console.log("posY: ", event.pageY);
        $(".mainContainer").css('background', 'radial-gradient(at ' + this.mouseXpercentage + '% ' + this.mouseYpercentage + '%, white, aqua)');
      })
    })
  }

}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-my-goals',
  templateUrl: './my-goals.component.html',
  styleUrls: ['./my-goals.component.css']
})
export class MyGoalsComponent implements OnInit {
  @Output() navLink = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }
  callParent(string) {
    this.navLink.next(string);
  }

}

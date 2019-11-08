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

  ngOnInit() {
    this.page = 'MyGoals';
  }
  callSelf(string) {
    this.page = string;
    console.log('page: ', this.page);
  }
  callParent(string) {
    this.navLink.next(string);
  }
  getGoalsFromParent() {
    this.getGoals.emit();
  }
}

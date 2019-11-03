import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-my-goals',
  templateUrl: './my-goals.component.html',
  styleUrls: ['./my-goals.component.css']
})
export class MyGoalsComponent implements OnInit {
  @Output() getGoals = new EventEmitter<string>();
  @Output() changePage = new EventEmitter();
  @Input() allGoals: any;
  @Input() dateInfo: any;

  constructor(private _httpService: HttpService) { }
  showFullGoal: any;


  ngOnInit() {

  }

  // callParent() {
  //   this.changePage.next('NewEvent');
  // }

  getGoalInfo(id) {
    if(this.showFullGoal != id) {
      this.showFullGoal = id;
    } else {
      this.showFullGoal = '';
    }
  }

  makeStatusComplete(goal) {
    event.stopPropagation();
    goal['CurrentMonth'][this.dateInfo['dayOfMonth']-1]['Status'] = 'Complete';
    const monthDayYear = (this.dateInfo['monthNum'] + '/' + this.dateInfo['dayOfMonth'] + '/' + this.dateInfo['currentYear']).toString();
    goal['UpdatedAt'] = monthDayYear;
    console.log('goal: ', goal);
    let observable = this._httpService.changeStatus(goal['_id'], goal['CurrentMonth']);
    observable.subscribe( data => {
      console.log('data: ', data);
    })
  }

  makeStatusIncomplete(goal) {
    event.stopPropagation();
    goal['CurrentMonth'][this.dateInfo['dayOfMonth']-1]['Status'] = 'Incomplete';
    const monthDayYear = (this.dateInfo['monthNum'] + '/' + this.dateInfo['dayOfMonth'] + '/' + this.dateInfo['currentYear']).toString();
    goal['UpdatedAt'] = monthDayYear;
    console.log('goal: ', goal);
    let observable = this._httpService.changeStatus(goal['_id'], goal['CurrentMonth']);
    observable.subscribe( data => {
      console.log('data: ', data);
    })
  }

  deleteGoal(id) {
    event.stopPropagation();
    let observable = this._httpService.delete(id);
    observable.subscribe(data => {
      console.log('data: ', data);
    })
    this.getGoals.emit();
  }
}

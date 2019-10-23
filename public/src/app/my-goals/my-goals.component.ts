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

  ngOnInit() {
    this.getGoals();
  }

  allGoals = [];
  getGoals() {
    let observable = this._httpService.getGoals();
    observable.subscribe(data => {
        this.allGoals = data['data'];
        console.log("allPets: ", this.allGoals);
    })
  }


  callParent(string) {
    this.navLink.next(string);
  }

}

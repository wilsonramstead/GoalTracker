import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getGoals() {
    return this._http.get('/goals');
}
  getMonths() {
    return this._http.get('/months');
  }
  addGoal(newGoal) {
    return this._http.post('/goals', newGoal);
  }
  addMonth(newMonth) {
    return this._http.post('/months', newMonth);
  }
  findOne(id) {
    return this._http.get('/goals/' + id);
  }
  editGoal(id, goal) {
    return this._http.put('/goals/' + id, goal);
  }
  joinTwo(id, month) {
    return this._http.post('/goals/' + id, month);
  }

  // likePet(id, pet) {
  //   console.log('Here');
  //     return this._http.put('/pets/like/' + id, pet);
  // }
  delete(id) {
    return this._http.delete('/goals/' + id);
  }
  deleteMonth(id) {
    return this._http.delete('/months/' + id);
  }
// findDuplicate() {
//     return this._http.get('/pets');
// }

}
